angular.module('quick-survey').directive('questionDetails', function () {
  return {
    restrict: 'A',
    scope: {
      question: '=',
      questionTypes: '=',
      index: '=',
      // TODO: figure out a way to not pass survey through here, just
      // the save() method on survey.
      questions: '=',
      save: '='
    },
    controller: function ($scope) {
      $scope.editingQuestion = false;

      $scope.saved = false;

      $scope.editQuestion = function (question) {
        $scope.editingQuestion = !$scope.editingQuestion;
      };

      $scope.cancel = function(question) {
        $scope.editingQuestion = false;
      };

      $scope.deleteQuestion = function (index) {
        var success = confirm("Are you sure you want to delete this question?");
        if (success) {
          $scope.questions.splice(index, 1);
          $scope.save();
        }
      };

      $scope.isDisabled = function (question) {
        if (question.type === 'radio') {
          return question.options.length <= 1;
        }
        return false;
      }
    },
    templateUrl: 'client/js/manage/directives/question-details.ng.html',
  };
});
