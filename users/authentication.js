    angular.module('myApp.users.authentication', [])
        .factory('authentication', [
            '$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) {
                
                function registerUser(user) {
                    var deferred = $q.defer();
                    
                    $http.post(BASE_URL + 'api/Account/Register', user)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            
                        });
                    
                    return deferred.promise;
                }
                
                function loginUser(user) {
                    var deferred = $q.defer();

                    var loginData = 'Username=' + user.username + '&Password=' + user.password + '&grant_type=password';

                    console.log( user );

                    var request = {
                        method: 'POST',
                        url: BASE_URL + 'api/Token',
                        data: loginData,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    };

                    $http(request)
                        .then(function(response) {
                            console.log(response.data);
                            deferred.resolve(response.data);
                        }, function() {
                            
                        });
                        
                    return deferred.promise;
                }
                
                function logout() {
                    
                }
                
                return {
                    registerUser: registerUser,
                    loginUser: loginUser,
                    logout: logout
                }
        }]);