angular.module('quick-survey')
  .controller('SubmittedCtrl',
  function ($scope, $q, $rootScope, $meteor, $state, $window) {

    console.log('submitted ctrl loaded')

    $scope.helpers({
      activeSurvey: function() {
        var surveys = Surveys.find({active: true}).fetch()
        if (surveys.length > 0) {
          console.log('found a survey', surveys[0])
          return surveys[0]
        } else {
          return null;
        }
      }
    });

    $scope.share = function() {
      window.parent.postMessage({'startSharing': {}}, '*');
    };
});
