'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.common',
  'myApp.home',
  'myApp.dashboard',
  'myApp.view2',
  'myApp.version',
  'myApp.singleProject',
  'myApp.allProjects',
  'myApp.addIssue',
  'myApp.singleIssue',
])
.config(['$routeProvider', function($routeProvider) {
    // $routeProvider.otherwise({redirectTo: '/'});
}])
.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
//let's make a startFrom filter
.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int

        if( input ){
          return input.slice(start);
        }
    }
});


$(window).load(function() {
  $( ".circle" ).click(function() {
  alert( "Handler for .click() called." );
});
  
});

$(document).on("click",".circle", function() {
  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
});




