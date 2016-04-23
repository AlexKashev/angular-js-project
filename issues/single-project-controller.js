angular.module('myApp.singleProject', [
        'myApp.singleProject',
        'ngRoute'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'issues/single-project.html',
            controller: 'SingleProjectCtrl'
        })
    }])
    .controller('SingleProjectCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'issues',
        function($scope, $location, $routeParams, issues) {
            var projectId = $routeParams.id;

            issues.getProjectById(projectId)
                .then( function( project ) {
                    console.log( project.data );

                    $scope.project = project.data;
                })

            $scope.editProject = function() {
                issues.updateProject( $scope.project.Id, $scope.project )    
                    .then( function( project ) {
                        console.log( project );
                    });
            }

            $scope.addIssue = function() {
                $location.path('projects/:id/add-issue')
                console.log('qko')
            } 
    }]);