angular.module('myApp.home', [
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

            identity.getCurrentUser()
                .then( function ( loggedUser ) {
                    $scope.isAuthenticated = true;
                });

            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                        // $location.path('/dashboard');
                        $scope.isAuthenticated = true;                        
                    });
            };
            
            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function(registeredUser) {
                        $scope.isAuthenticated = true;
                    });
            };

            $scope.logout = function() {
                localStorage.removeItem( 'access-token' );
                $scope.isAuthenticated = false; 
            };

            issues.getUserIssues()
                .then( function( issues ) {
                    console.log( issues );
                });

            issues.getUserProjects()    
                .then( function( issues ) {
                    console.log( issues );
                });
        }]);