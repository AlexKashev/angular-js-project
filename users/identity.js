angular.module('myApp.users.identity', [ 'myApp.users.identity' ])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {           
            return {
                getCurrentUser: function () {
                    var deferred = $q.defer(),
                        currentUser = undefined,
                        accessToken = localStorage.getItem( 'access-token' );

                    if( accessToken ) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                        
                        $http.get(BASE_URL + 'users/me')
                            .then(function(response) {
                                currentUser = response.data;
                                isAuthenticated = true;

                                deferred.resolve(currentUser);
                            });
                    }

                    return deferred.promise;
                }
            };
    }]);