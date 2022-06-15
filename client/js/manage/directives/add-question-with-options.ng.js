angular.module('quick-survey').directive('addQuestionWithOptions', function () {
  return {
    restrict: 'A',
    scope: {
      question: '=question',
      existingOptions: '='
    },
    controller: function ($scope) {
      $scope.otherAlreadyAdded = false;

      if (!$scope.existingOptions) {
        $scope.question.options = [{
          'value': '',
          'type': 'normal'
        }];
      } else {
        $scope.existingOptions.forEach(function (option) {
          if (option.type === 'other') {
            $scope.otherAlreadyAdded = true;
          }
        });
      }

      $scope.remove = function (idx) {
        $scope.question.options.splice(idx, 1);
      };

      $scope.addOption = function () {
        $scope.question.options.push({
          'value': '',
          'type': 'normal'
        });
      };

      $scope.removeOther = function () {
        if ($scope.otherAlreadyAdded) {
          $scope.otherAlreadyAdded = false;
          $scope.question.options = $scope.question.options.filter(function (option) {
            return option.type !== 'other';
          });
        }
      };

      $scope.addOther = function () {
        if (!$scope.otherAlreadyAdded) {
          $scope.otherAlreadyAdded = true;
          $scope.question.options.push({
            'type': 'other'
          });
        }
      };
    },
    templateUrl: 'client/js/manage/directives/add-question-with-options.ng.html',
  };
});
