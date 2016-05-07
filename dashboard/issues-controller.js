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

                getAllProjects: function() {
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
                },

                getProjectIssuesById: function( id ) {
                    var deferred = $q.defer(),
                        url = BASE_URL + 'Projects/' + id + '/Issues';

                    $http.get(url)
                        .then(function(issues){
                            deferred.resolve(issues);
                        });

                    return deferred.promise;
                },

                getIssueById: function (id) {
                    var deferred = $q.defer(),
                        url = BASE_URL + 'Issues/' + id;

                    $http.get(url)
                        .then(function(issue){
                            deferred.resolve(issue);
                        });

                    return deferred.promise;
                },

                updateProject: function( id, model ) {
                    var deferred = $q.defer(),
                        url = BASE_URL + 'Projects/' + id,
                        data = {
                            Name: model.Name,
                            Description: model.Description,
                            LeadId: model.Lead.Id
                        };

                    $http.put(url, data)
                        .then(
                            function(project){
                                deferred.resolve(project);
                            },
                            function( error ) {
                                deferred.reject( error.data.Message );
                            }
                        );

                    return deferred.promise;
                },

                updateIssue: function( id, model ) {
                    var deferred = $q.defer(),
                        url = BASE_URL + 'Issues/' + id,
                        data = {
                            Title: model.Title,
                            Description: model.Description,
                            AssigneeId: model.Assignee.Id,
                            PriorityId: model.Priority.Id,
                            DueDate: model.DueDate
                        };

                    $http.put(url, data)
                        .then(function(issue){
                            deferred.resolve(issue);
                        },
                        function( error ) {
                            deferred.reject( error.data.Message );
                        });

                    return deferred.promise;
                },

                addIssue: function( model ) {
                    var deferred = $q.defer(),
                        url = BASE_URL + 'Issues/',
                        data = {
                            Title: model.Title,
                            Description: model.Description,
                            ProjectId: model.ProjectId,
                            AssigneeId: model.AsigneeId,
                            PriorityId: model.PriorityId,
                            DueDate: model.DueDate
                        };

                    $http.post(url, data)
                        .then(
                            function(issue){
                                deferred.resolve(issue);
                            },
                            function(error) {
                                deferred.reject(error.data.Message);
                            });

                    return deferred.promise;
                },

            };
    }]);