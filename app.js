'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.view2',
  'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
     $routeProvider.otherwise({redirectTo: '/'});
}])
.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');