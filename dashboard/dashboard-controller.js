angular.module('myApp.dashboard', [
        'myApp.dashboard'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        })
    }])
    .controller('DashboardCtrl', [
        '$scope',
        'feed',
        function($scope, feed) {
        
        // feed.latest()
        //     .then(function(latestFeed) {
        //         $scope.latestFeed = latestFeed;
        //     });
    }]);