Surveys = new Mongo.Collection("surveys");

// TODO, use Meteor Methods to do this kind of stuff.
// Also this can all be simplified if we remove
// the things that rely on Meteor.user();
Surveys.allow({

  insert: function (userId, survey) {
    if (Meteor.user() && Meteor.user().is_admin)
      return true;

    var sandstorm = Meteor.user().services.sandstorm;
    if (sandstorm && sandstorm.permissions[0] === 'owner')
      return true;
    return false;
  },

  update: function (userId, survey, fields, modifier) {
    if (Meteor.user() && Meteor.user().is_admin) {
      return true;
    }

    var user = DDP._CurrentInvocation.get().connection.sandstormUser();

    var managePermissions = ['owner', 'manage'];
    var canUpdate = false;
    managePermissions.forEach(function (permission) {
      // See https://github.com/sandstorm-io/meteor-accounts-sandstorm/issues/19
      if (user.permissions.indexOf(permission) > -1) {
        canUpdate = true;
      }
    });
    return canUpdate;
  },

  remove: function (userId, survey) {
    if (Meteor.user() && Meteor.user().is_admin) {
      return true;
    }

    var sandstorm = Meteor.user().services.sandstorm;
    if (sandstorm && sandstorm.permissions[0] === 'owner')
      return true;

    return false;
  }

});
