angular.module('myApp.allProjects', [
        'myApp.allProjects',
        'ngRoute'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'home/projects.html',
            controller: 'allProjectsCtrl'
        })
    }])
    .controller('allProjectsCtrl', [
        '$scope',
        '$location',
        'issues',
        function($scope, $location, issues) {
            issues.getAllProjects()    
                .then( function( projects ) {
                    //console.log( projects );
                    $scope.allProjects = projects.data;
                });

        $scope.openProject = function( id ) {
            $location.path('projects/' + id );
        }
    }]);