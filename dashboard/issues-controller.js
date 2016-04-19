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
                },

                getUserProjects: function() {
                    var deferred = $q.defer(),
                        url = BASE_URL + 'Projects/?pageSize=' + 100 + '&pageNumber=' + 1;// + '&filter=Lead.Username="1@1"';

                    $http.get(url)
                        .then(function(projects){
                            deferred.resolve(projects);
                        });

                    return deferred.promise;
                },

                getProjectById: function( id ) {
                    var deferred = $q.defer(),
                        url = BASE_URL + 'Projects/' + id;

                    $http.get(url)
                        .then(function(project){
                            deferred.resolve(project);
                        });

                    return deferred.promise;
                }
            };
    }]);