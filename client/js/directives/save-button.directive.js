
/* globals */

(function(angular) {
  'use strict';
  angular
    .module('quick-survey')
    .directive('saveButton', saveButton);

  saveButton.$inject = [];

  function saveButton() {
    return {
      restrict: 'E',
      templateUrl: 'client/js/directives/save-button.html',
      scope: {
        'text': '=',
        'clickEvent': '=',
        'savedIndicator': '=',
        'disabled': '='
      },
      transclude: true,
      controllerAs: 'vm',
      bindToController: true,
      controller: function ($scope){
        var vm = this;
      }
    };
  }

}(angular));
