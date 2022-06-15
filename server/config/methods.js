const fs = require('fs');
const execFile = require('child_process').execFile;
const mkdirp = require('mkdirp');
const Future = require('fibers/future');
const Promise = require('bluebird');
const slugify = require('slugify');
const moment = require('moment');

Meteor.methods({
  exportAllResponses: function() {
    var responses = Responses.find().fetch();

    var fields = [];

    responses[0].survey.questions.forEach(function(question) {
      fields.push(question.question);
    });

    var data = [];

    _.each(responses, function(response, index) {
      data[index] = [];
      response.questions.forEach(function(question) {
        data[index].push(question.answer);
      });
    });

    return {fields: fields, data: data};
  },
  resetUsers: function(){
    Meteor.users.find({}).forEach(function(user) {
      Meteor.users.update(
          {has_submitted: true},
          {$set: {has_submitted: false}},
          {multi: true});
    });
  },
  resetResponses: function() {
    Responses.remove({});
  },
  submitResponse: function(response) {
    response.dateAdded = new Date();
    Responses.insert(response, function(err, id) {
      if (err) console.log('error', err);
      Meteor.users.update(Meteor.userId(), {$set: {has_submitted: true}});
    });
  },
  /*
   * Get the publicId from the getPublicId program stored in sandstorm-integration.
   * See https://docs.sandstorm.io/en/latest/developing/web-publishing/ for more.
   */
  getPublicID: function () {
    const responses = Responses.find().fetch();

    // writeXMLFeedForEntries('./var/www/', responses);
    const sandstormSessionID = this.connection.sandstormSessionId();
    const pathToPublicID = '/getPublicId';

    return new Promise(function (resolve, reject) {
      execFile(pathToPublicID, [sandstormSessionID], function (error, stdout, stderr) {
        let lines = [];
        let url;
        if (error) {
          reject(error);
          console.log('You need to be running inside Sandstorm for this.', error);
        } else {
          lines = stdout.split('\n');
          url = lines[2];
          writeXMLFeedForEntries('/var/www/', responses, url);
        }
        resolve(url);

        // stdout comes in lines. Parse it for the details you need.
        // Then call a function to
          // to set this survey to be published. This will mean creating a function
          //    that automatically updates the RSS feed for the survey.
          //    whenever a new entry is published.
          // to respond to the user with where their domain is located at.
      });
    });
  },
});

function writeXMLFeedForEntries (directory, responses, url) {
  directory = directory || '/var/www/';
  let content = ('<?xml version="1.0" encoding="utf-8"?>' +
                 '<feed xmlns="http://www.w3.org/2005/Atom">' +
                 '<title>Quick Survey Feed</title>' +
                 '<subtitle>A subtitle.</subtitle>' +
                 '<link href="' + url + '/feed.xml" rel="self" />' +
                 '<link href="' + url + '" />' +
                 '<updated>' + moment().format() + '</updated>' +
                 '<author><name>Quick Survey</name></author>' +
                 '<id>' + url + '</id>');


  responses.forEach(function (response, index) {
    console.log(response._id);
    content += '<entry>';
    content += '<title>Survey Response</title>';
    content += '<id>' + url + '/' + response._id + '</id>';
    content += '<link href="' + url + '" />';
    content += '<updated>' + moment(response.dateAdded || new Date()).format() + '</updated>';
    content += '<content>';
    response.questions.forEach(function (question) {
      content += '<slug>' + slugify(question.question) + '</slug>';
      content += '<title>' + question.question + '</title>';
      content += '<answer>' + question.answer + '</answer>';
    });
    content += '</content>';
    content += '</entry>';
  });
  content += '</feed>';

  mkdirp(directory, function (err) {
    if (err) { console.error(err); }

    // TODO: Write an index.html that says. Oops, this content doens't exist!

    fs.writeFile(directory + 'feed.xml', content, function(err) {
      if(err) {
        return console.log(err);
      }
    });
  });

}
