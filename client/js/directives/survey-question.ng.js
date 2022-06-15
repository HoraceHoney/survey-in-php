angular.module('quick-survey').directive('surveyQuestion',
  function ($timeout) {
  return {
    restrict: 'A',
    scope: {
      question: '=surveyQuestion',
    },
    templateUrl: 'client/js/directives/survey-question.ng.html',
  };
});
