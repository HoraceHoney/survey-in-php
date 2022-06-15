Meteor.publish("surveys", function () {
  return Surveys.find();
});
