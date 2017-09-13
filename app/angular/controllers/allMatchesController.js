/**
 * Created by Workspace on 14-Sep-17.
 */

app.controller("allMatchesController", ['$scope', '$http', function ($scope, $http) {



    var main = this;
    $scope.orderByField = 'name';
    $scope.reverseSort = false;
    this.matches = []; //will contain all the matches
    this.years = [2015, 2016, 2017]; //for filtering
    this.getAllMatches = function () {
        $http({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
        }).then(function successCallback(response) {
                var data = response.data;
                var rounds = data.rounds;
                angular.forEach(rounds, function (match) {
                    main.matches = main.matches.concat(match.matches); //push all matches of 2015-16

                })
            }, function errorCallback(response) {
                alert("some error occured, check console");
                console.log(response);
            }

        );


        $http({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
        }).then(function successCallback(response) {
                var data = response.data;
                var rounds = data.rounds;

                rounds.forEach(function (match) {
                    main.matches = main.matches.concat(match.matches); //push all matches of 2016-2017
                });



            }, function errorCallback(response) {
                alert("some error occured, check console");
                console.log(response);
            }

        )
    };

    this.getAllMatches();

}]);
