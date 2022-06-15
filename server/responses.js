Meteor.publish('responses', function () {
  return Responses.find();
});
