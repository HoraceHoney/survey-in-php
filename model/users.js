
// Meteor.users.allow({
//   update: function (userId, user, fieldNames) {
//     return (userId && userId === user._id) || Meteor.user().is_admin;
//   },
//   remove: function(userId, user) {
//     if (Meteor.user().is_admin) return true;
//     return false;
//   }
// });

Meteor.users.deny({
  update: function(userId, user, fieldnames, modifier) {
    if (user.has_submitted === true &&
        _.contains(fieldnames, 'has_submitted') && !Meteor.user().is_admin) {
      return true;
    }
    return false;
  }
});

