app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html'
        })

        .when('/allMatches', {
            templateUrl: 'views/allMatches.html',
            controller: 'allMatchesController',
            controllerAs: 'allMatch'


        })
        .when('/allMatches/:team1/:team2/:matchDate', {

            templateUrl: 'views/singleMatchDetails.html',
            controller: 'matchController',
            controllerAs: 'matchDetails'
        })
        .when('/stats', {
            templateUrl: 'views/stats.html',
            controller: 'statsController',
            controllerAs: 'stats'

        })
        .otherwise({
            template: '<h2 style="color:white;text-align:center;">404 page not found</h2>'
        });




}]);
