angular.module('myApp.singleIssue', [
        'myApp.singleIssue',
        'ngRoute'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'issues/issue-page.html',
            controller: 'SingleIssueCtrl'
        })
    }])
    .controller('SingleIssueCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'issues',
        function($scope, $location, $routeParams, issues) {
            var issueId = $routeParams.id;

            issues.getIssueById(issueId)
                .then( function( issue ) {
                    console.log( issue.data );
                    $scope.issuePage = issue.data;
                })

            $scope.editIssue = function() {
                issues.updateIssue( $scope.issuePage.Id, $scope.issuePage )    
                    .then( function( issue ) {
                        console.log( issue );
                    });
            }

            $scope.addIssue = function() {
                $location.path('projects/:id/add-issue')
                console.log('qko')
            } 
    }]);