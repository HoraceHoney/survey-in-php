Responses = new Mongo.Collection("responses");

Responses.allow({

  insert: function (userId, response) {
    // Check if the active survey requires log in.
    var survey = Surveys.findOne({active: true});
    if (survey.require_sign_in)
      return !Meteor.users.find(userId).has_submitted;
    return true;
  },

  update: function (userId, response, fields, modifier) {
    if (Meteor.user()) return Meteor.user().is_admin;
    return false;
  },

  remove: function (userId, response) {
    if (Meteor.user()) return Meteor.user().is_admin;
    return false;
  }
});
