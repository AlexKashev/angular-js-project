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
                            localStorage.setItem( 'access-token', response.data.access_token );
                            console.log(response)
                            deferred.resolve(response.data);
                            toastr.success( 'Registered successfull!' );
                        }, function(error) {
                            toastr.error('This email is already taken');
                        });
                    
                    return deferred.promise;
                }
                
                function loginUser(user) {
                    var deferred = $q.defer(),
                        loginData = 'Username=' + user.username + '&Password=' + user.password + '&grant_type=password',
                            request = {
                            method: 'POST',
                            url: BASE_URL + 'api/Token',
                            data: loginData,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        };

                    $http(request)
                        .then(function(response) {
                            localStorage.setItem( 'access-token', response.data.access_token );

                            toastr.success( 'Login successfull!' );
                            deferred.resolve(response.data);

                        }, function( err ) {
                            toastr.error( err.data.error_description );
                        });
                        
                    return deferred.promise;
                }
                
                return {
                    registerUser: registerUser,
                    loginUser: loginUser
                }
        }]);