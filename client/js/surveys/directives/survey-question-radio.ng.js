angular.module('quick-survey').directive('surveyQuestionRadio',
  function ($timeout) {
  return {
    restrict: 'A',
    scope: {
      question: '=',
    },
    controller: function ($scope, $attrs, $element) {
      $scope.other = '';
      $scope.choosingOther = false;

      $scope.optionChanged = function (option) {
        if (option.type != 'other') {
          $scope.other = '';
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
    templateUrl: 'client/js/surveys/directives/survey-question-radio.ng.html',
  };
});
