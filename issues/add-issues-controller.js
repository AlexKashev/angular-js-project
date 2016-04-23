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

            $scope.addIssue = function() {
                $location.path('projects/:id/add-issue');
                // console.log('qko')
            }   

            issues.getAllProjects()    
                .then( function( projects ) {
                    //console.log( projects );
                    $scope.allProjects = projects.data;
            });

            authentication.getAllUsers()
                .then( function( users ) {
                    console.log( users );
                    $scope.users = users;
            });

            $scope.getProjectPriorities = function () {
                // console.log( $scope.project );
                // console.log( $scope.allProjects );

                for( var i in $scope.allProjects ) {
                    if( $scope.allProjects[i].Name === $scope.project ) {
                        $scope.priorities = $scope.allProjects[i].Priorities;

                        // console.log( $scope.priorities );
                    }
                }
            }
    }]);