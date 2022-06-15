Meteor.startup(function () {

  if (Surveys.find().count() === 0) {
    var survey = {
      'active': true,
      'questions': [],
      'description': '',
      'close_date': undefined,
      'name': 'Active Survey',
      'require_sign_in': false
    };
    Surveys.insert(survey);
  }
});

