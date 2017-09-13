/**
 * Created by Workspace on 14-Sep-17.
 */
app.controller("matchController", ['$http', '$routeParams', function ($http, $routeParams) {

    var matchDate = $routeParams.matchDate;
    var team1 = $routeParams.team1;
    var team2 = $routeParams.team2;
    var main = this;
    this.matches = [];
    this.show = {}; //will store the data of that match which was clicked
    this.getAllMatches = function () {
        $http({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
        }).then(function successCallback(response) {
                var data = response.data;

                var rounds = data.rounds;
                angular.forEach(rounds, function (match) {
                    main.matches = main.matches.concat(match.matches);

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
                main.matches = main.matches.concat(match.matches);
            });


            console.log(main.matches);
            angular.forEach(main.matches, function (match) {
                if (match.date === matchDate && match.team1.name === team1 && match.team2.name === team2) {
                    main.show.team1 = match.team1.name;
                    main.show.team2 = match.team2.name;
                    main.show.score1 = match.score1;
                    main.show.score2 = match.score2;
                    main.show.date = match.date;
                    if (match.score1 > match.score2) {
                        main.show.winner = match.team1.name
                    } else if (match.score1 < match.score2) {

                        main.show.winner = match.team2.name;
                    } else {
                        main.show.winner = "NONE Match Draw !";
                    }
                }

            })

        }, function errorCallback(response) {
            alert("some error occured, check console");
            console.log(response);
        })
    };

    this.getAllMatches();
    console.log(main.matches);


}]);
