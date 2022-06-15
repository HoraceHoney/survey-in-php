angular.module('quick-survey').directive('editSurveyDetails', function () {
  return {
    restrict: 'A',
    scope: {
      survey: '=',
      form: '='
    },
    controller: function ($scope) {

      $scope.saved = false;

      $scope.save = function() {
        $scope.form.$pristine = true;
        $scope.saved = false;

        var survey = $scope.survey;

        Surveys.update({_id: survey._id},
          { $set: {
              name: survey.name,
              description: survey.description,
              active: survey.active,
              endNote: survey.endNote,
              require_sign_in: survey.require_sign_in,
              canBeShared: survey.canBeShared
          } }, function () {
            $scope.$apply(function ( ){
              $scope.saved = true;
            });
          });
      };
    },
    templateUrl: 'client/js/manage/directives/edit-survey-details.ng.html',
  };
});
