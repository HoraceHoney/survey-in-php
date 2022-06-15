angular.module('quick-survey').directive('manageSurvey', function () {
  return {
    restrict: 'A',
    scope: {
      survey: '='
    },
    controller: function ($scope) {

      $scope.save = save;

      $scope.questionTypes = [
        {'type': 'number'},
        {'type': 'text'},
        {'type': 'email'},
        {'type': 'textarea'},
        {'type': 'radio'},
        {'type': 'checkbox'},
        {'type': 'date'}
        // ToDo: Add more question types as the question directive supports them.
      ];

      function save () {
        $scope.saved = false;
        Surveys.update($scope.survey._id,
          {$set: {
            questions: angular.copy($scope.survey.questions)
          }}, function(err, resp) {
            if (err) {
              console.log('error', err);
            } else {
              $scope.$apply(function () {
                $scope.saved = true;
              });
            }

          });
      };

    },
    templateUrl: 'client/js/manage/directives/manage-survey.ng.html',
  };
});
