import angularMeteor from 'angular-meteor';
import uiTree from 'angular-ui-tree';

angular.module('quick-survey', [
  angularMeteor,
  'angular-meteor.auth',
  'ui.router',
  'ngSanitize',
  'btford.markdown',
  uiTree]);
