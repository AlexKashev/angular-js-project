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
                    $scope.project = project.data;
                });

            issues.getProjectIssuesById(projectId)
                .then( function( issues ) {
                    $scope.projectIssues = issues.data;

                    console.log($scope.projectIssues);
                })

            $scope.editProject = function() {
                issues.updateProject( $scope.project.Id, $scope.project )    
                    .then( 
                        function( project ) {
                            toastr.success( 'Project successfully edited!' );
                        },
                        function( errMessage ) {
                            toastr.error( errMessage );
                        }
                    );
            }

            $scope.addIssue = function() {
                $location.path('projects/:id/add-issue')
                // console.log('qko')
            } 

            $scope.openIssue = function( id ) {
                $location.path('issues/' + id );
            }

            $scope.openDashboard = function() {
                $location.path('')
                console.log('gaco');
            }
    }]);