angular.module('quick-survey').directive('surveyQuestionCheckbox',
  function ($timeout) {
  return {
    restrict: 'A',
    scope: {
      question: '=',
    },
    controller: function ($scope, $attrs, $element) {
      $scope.choosingOther = false;

      $scope.question.answer = [];

      $scope.addOptionToAnswer = function(option) {
        var idx = $scope.question.answer.indexOf(option.value);
        if (idx > -1) {
          $scope.question.answer.splice(idx, 1);
        } else {
          $scope.question.answer.push(option.value);
        }
      };

      $scope.optionChanged = function (option) {

        if ($scope.choosingOther) {
          $scope.choosingOther = false;
        } else {
          $scope.choosingOther = true;
          $timeout(function() {
            $element.find('.other')[0].focus();
          }, 100);
        }
      };

      $scope.changeOption = function(option){
        $scope.optionChanged();
      };
    },
    templateUrl: 'client/js/surveys/directives/survey-question-checkbox.ng.html',
  };
});
