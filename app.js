'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.common',
  'myApp.home',
  'myApp.dashboard',
  'myApp.view2',
  'myApp.version',
  'myApp.singleProject',
  'myApp.allProjects',
])
.config(['$routeProvider', function($routeProvider) {
    // $routeProvider.otherwise({redirectTo: '/'});
}])
.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
