var home = angular.module('myApp.home', [
        'myApp.users.authentication',
        'myApp.users.identity',
        'myApp.issues'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', [
        '$scope',
        '$location',
        'authentication',
        'identity',
        'issues',
        function($scope, $location, authentication, identity, issues ) {
            $scope.isAuthenticated = false;
            $scope.currentProjectsPage = 0;
            $scope.userProjects = [];
            $scope.userIssues = [];
            $scope.currentIssuesPage = 0;
            $scope.numberOfPagesProjects = function(){
                return Math.ceil( $scope.userProjects.length / 10 );                
            }

            $scope.numberOfPagesIssues = function(){
                return Math.ceil( $scope.userIssues.length / 10 );                
            }

            identity.getCurrentUser()
                .then( function ( loggedUser ) {
                    $scope.isAuthenticated = true;

                    getIssuesAndProjects();
                });

            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                        $scope.isAuthenticated = true;

                        getIssuesAndProjects(); 
                        scrollTop();                    
                    });
            };
            
            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function(registeredUser) {
                        $scope.isAuthenticated = true;

                        getIssuesAndProjects();
                        scrollTop();
                    });
            };

            $scope.logout = function() {
                localStorage.removeItem( 'access-token' );
                $scope.isAuthenticated = false; 
            };

            function scrollTop() {
                $(function() {
                   $('body').scrollTop(0);
                });
            }

            function getIssuesAndProjects() {
                issues.getUserIssues()
                    .then( function( issues ) {
                        $scope.userIssues = issues.data.Issues;
                    });

                issues.getAllProjects()    
                    .then( function( projects ) {
                        $scope.userProjects = projects.data;
                    });
            }


            $scope.openProjectsPage = function() {
                $location.path('projects');
            }   

            $scope.openProject = function( id ) {
                $location.path('projects/' + id );
            } 

            $scope.openIssue = function( id ) {
                $location.path('issues/' + id );
            }

        }]);
