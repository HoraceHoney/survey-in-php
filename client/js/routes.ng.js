(function () {

  angular.module('quick-survey').run(function($rootScope, $state) {

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      if (error === 'SET_UP_COMPLETE')
        $state.go('index');
    });

  });

  angular.module("quick-survey").config(
    function ($urlRouterProvider, $stateProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('index', {
          url: '/',
          templateUrl: 'client/js/surveys/views/survey.ng.html',
          controller: 'SurveyCtrl',
          resolve: {
            'surveys': ['$q', function($q) {
              var deferred = $q.defer();

              Meteor.subscribe('surveys', {
                onReady: function() {
                  // Find the survey.
                  var surveys = Surveys.find({}).fetch();
                  if (surveys.length > 0) {
                    var survey = Surveys.findOne(surveys[0]._id);
                    deferred.resolve(survey);
                  } else {
                    deferred.resolve(null);
                  }
                },
                onStop: function (err, more) {
                  var surveys = Surveys.find({}).fetch();
                  // FIXME: this should be rejected.
                  deferred.resolve()
                }
              });

              return deferred.promise;
            }],
            'hasSubmitted': ['$q', '$auth', '$state', '$interval', function ($q, $auth, $state, $interval) {
              var deferred = $q.defer();
              var waitForUser = $interval(function () {
                if (!Meteor.loggingIn() && Meteor.sandstormUser()) {

                  if (Meteor.sandstormUser().has_submitted) {
                    // TODO: figure out if this should reject.
                    $state.go('submitted');
                  } else {
                    deferred.resolve(Meteor.sandstormUser());
                  }
                  $interval.cancel(waitForUser)
                }

              }, 1000);
              return deferred.promise;
            }],
          }
        })
        .state('submitted', {
          url: '/submitted',
          templateUrl: 'client/js/surveys/views/submitted.ng.html',
          controller: 'SubmittedCtrl',
          resolve: {
            'surveys': ['$q', function($q) {
              var deferred = $q.defer();

              Meteor.subscribe('surveys', {
                onReady: deferred.resolve,
                onStop: deferred.reject
              });

              return deferred.promise;
            }],
          }
        })
        .state('manage', {
          url: '/manage',
          templateUrl: 'client/js/manage/views/manage.ng.html',
          controller: 'ManageCtrl',
          resolve: {
            'currentUser': ['$q', '$auth', '$interval', function($q, $auth, $interval){
              return checkIfManager($q, $auth, $interval);
              // Meteor.autorun(function() {
              //   if (!Meteor.loggingIn()){
              //     var user = Meteor.user();
              //     if (user && user.is_admin)
              //       deferred.resolve();
              //     if (user) {
              //       var sandstorm = Meteor.user().services.sandstorm;
              //       if (sandstorm && sandstorm.permissions[0] === 'owner')
              //         deferred.resolve();

              //     }
              //    deferred.reject('UNAUTHORIZED');
              //   }
              // });

              // return deferred.promise;
            }],
            'activeSurvey': ['$q', function($q) {
              var deferred = $q.defer();

              Meteor.subscribe('surveys', {
                onReady: function() {
                  // Find the survey.
                  var surveys = Surveys.find({}).fetch();

                  if (surveys.length > 0) {
                    var survey = Surveys.findOne(surveys[0]._id);
                    deferred.resolve(survey);
                  } else {
                    // let's create an active survey
                    Surveys.insert({
                      questions: [],
                      description: 'This describes my first survey',
                      name: 'My First Survey',
                      require_sign_in: false,
                      active: true
                    }, function(err, id) {
                      if (err) deferred.reject(err);
                      deferred.resolve(Surveys.findOne(id));
                    });
                  }

                },
                onStop: deferred.reject
              });
              return deferred.promise;
            }],
            'responses': ['$q', function($q) {
              var deferred = $q.defer();

              Meteor.subscribe('responses', {
                onReady: function() {
                  deferred.resolve(Responses.find());
                },
                onStop: deferred.reject
              });

              return deferred.promise;
            }]
          }
        });

      $urlRouterProvider.otherwise("/");
    })

  .run(function($rootScope, $q, $state, $auth, $timeout, $interval) {

    $rootScope.on_sandstorm = true;

    checkIfManager($q, $auth, $interval)
      .then(function () {
        $rootScope.is_admin = true;
        $rootScope.on_sandstorm = true;
        $state.go('manage');
      })
      .catch(function () {
        $state.go('index');
      });
  });

  function checkIfUser($q, $auth) {

  }

  function checkIfManager($q, $auth, $interval) {
    return $q(function (resolve, reject) {

      var waitForUser = $interval(function () {
        if (!Meteor.loggingIn() && Meteor.sandstormUser()) {
          var user = Meteor.sandstormUser();
          if (user) {
            var isAdmin = false;
            var managePermissions = ['owner', 'manage'];
            managePermissions.forEach(function (permission) {
              if (user.permissions.indexOf(permission) > -1) {
                isAdmin = true;
              }
            });
            if (isAdmin) {
              resolve(user);
            } else {
              reject(user);
            }
          } else {
            reject();
          }
          $interval.cancel(waitForUser)
        }

      }, 1000);


      return $auth.waitForUser().then(function() {
        var user = Meteor.sandstormUser();
        if (user) {
          var isAdmin = false;
          var managePermissions = ['owner', 'manage'];
          managePermissions.forEach(function (permission) {
            if (user.permissions.indexOf(permission) > -1) {
              isAdmin = true;
            }
          });
          if (isAdmin) {
            resolve(user);
          } else {
            reject(user);
          }
        } else {
          reject();
        }
      });
    });
  }

})();
