angular.module('myApp.addIssue', [
        'myApp.addIssue',
        'ngRoute'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'issues/add-issue.html',
            controller: 'addIssueCtrl'
        })
    }])
    .controller('addIssueCtrl', [
        '$scope',
        '$location',
        'issues',
        'authentication',
        function($scope, $location, issues, authentication) {
            $scope.priorities = [];  

            issues.getAllProjects()    
                .then( function( projects ) {
                    $scope.allProjects = projects.data;
            });

            authentication.getAllUsers()
                .then( function( users ) {
                    $scope.allUsers = users.slice(1, 100); //because the users are too much
                    console.log( users );
            });

            $scope.getProjectPriorities = function () {
                for( var i in $scope.allProjects ) {
                    if( $scope.allProjects[i].Id == $scope.issue.ProjectId ) {
                        $scope.priorities = $scope.allProjects[i].Priorities;
                    }
                }
            }

            $scope.addIssue = function() {
                issues.addIssue( $scope.issue )    
                    .then( 
                        function( issue ) {
                            toastr.success( 'Issue added successfully!' );
                        },
                        function( errMessage ) {
                            toastr.error( errMessage );
                        }
                    );
            } 
    }]);