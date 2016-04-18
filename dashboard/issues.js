angular.module('myApp.issues', [])
    .factory('issues', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {
            return {
                getUserIssues: function() {
                    var deferred = $q.defer(),
                        url = BASE_URL + 'Issues/me?pageSize=' + 100 + '&pageNumber=' + 1 + '&orderBy=' + 'Title';
                    
                    $http.get(url)
                        .then(function(issues) {
                            deferred.resolve(issues);
                        });
                    
                    return deferred.promise;
                }
            };
    }]);