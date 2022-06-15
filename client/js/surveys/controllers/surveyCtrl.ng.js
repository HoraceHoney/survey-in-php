angular.module('quick-survey').controller('SurveyCtrl',
  ['$scope', '$q', '$rootScope', '$meteor', '$state',
  function ($scope, $q, $rootScope, $meteor, $state) {
  $scope.loaded = false;

  $scope.$state = $state;

  $scope.survey;

  Meteor.subscribe('surveys', {
    onReady: function () {
      // console.log('loaded surveys');
    },
    onStop: function () {
      // console.log('survey subscribe stopped');
    }
  })

  $scope.helpers({
    activeSurvey: function() {
      var surveys = Surveys.find({active: true}).fetch();
      if (surveys.length > 0) {
        var survey = Surveys.findOne(surveys[0]._id);
        $scope.loaded = true;

        if (!$scope.activeSurvey) {
            $scope.activeSurvey = survey;
            activate();
        }

        if (survey.questions.length > 0) {
          activate();
          return survey;
        }

      } else {
        return null;
      }
    }
  });

  function activate () {
    $scope.newResponse = {
      'survey': $scope.activeSurvey,
      'questions': $scope.activeSurvey ? angular.copy($scope.activeSurvey.questions) : []
    };
  }

  // TODO: only verify the user is we don't require logged in users.
  // $scope.has_submitted = Session.get('has_submitted');

  $scope.submit = function(newResponse) {
    newResponse.questions.forEach(function(question) {
      if (question.type === 'checkbox') {
        question.options.forEach(function(opt) {
          if (opt.type === 'other' &&
              opt.value !== '' &&
              opt.value !== undefined) {
            question.answer.push(opt.value);
          }
        });
      } else if (question.type === 'radio' && question.answer) {
        question.answer = question.answer.value;
      }
    });

    if ($scope.activeSurvey.require_sign_in) {
      newResponse.user = $rootScope.currentUser._id;
    }

    Meteor.call('submitResponse', angular.copy(newResponse), function(err, id) {
      $scope.$apply(function() {
        $scope.has_submitted = true;
      });
      Session.setPersistent('has_submitted', 1);
      $state.go('submitted');
    });
  };

}]);
