/**
 * Created by Workspace on 14-Sep-17.
 */
app.controller("statsController", ['$http', function ($http) {

    var main = this;
    this.matches = [];
    main.teamStatistics = {}; //will contain data about all the teams
    this.getAllMatches = function () {
        $http({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
        }).then(function successCallback(response) {
            var data = response.data;
            var rounds = data.rounds;
            angular.forEach(rounds, function (match) {
                main.matches = main.matches.concat(match.matches);

            });
        }, function errorCallback(response) {
            alert("some error occured, check console");
            console.log(response);
        });

        $http({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
        }).then(function successCallback(response) {
            var data = response.data;
            var rounds = data.rounds;
            rounds.forEach(function (match) {
                main.matches = main.matches.concat(match.matches);
            });
            main.matches.forEach(function (match) {
                if (!main.teamStatistics[match.team1.key]) {
                    //if not present make a new property of that team
                    main.teamStatistics[match.team1.key] = {

                        name: match.team1.name,
                        teamCode: match.team1.code,
                        key: match.team1.key,
                        played: 0,
                        won: 0,
                        goals: 0,
                        lost: 0,
                        form: [],
                        draw: 0

                    };

                }
                if (main.teamStatistics[match.team1.key]) {
                    //if present update some values
                    (main.teamStatistics[match.team1.key]["played"]) ++;
                    if (match.score1 > match.score2) {
                        main.teamStatistics[match.team1.key]["won"]++;
                        main.teamStatistics[match.team1.key]["form"].push("W");
                    } else if (match.score1 < match.score2) {
                        main.teamStatistics[match.team1.key]["lost"]++;
                        main.teamStatistics[match.team1.key]["form"].push("L");
                    } else {
                        main.teamStatistics[match.team1.key]["draw"]++;
                        main.teamStatistics[match.team1.key]["form"].push("D");
                    }


                    main.teamStatistics[match.team1.key]["goals"] += match.score1;
                }
                if (!main.teamStatistics[match.team2.key]) {
                    //doing the same thing but with team 2 this time
                    main.teamStatistics[match.team2.key] = {

                        name: match.team2.name,
                        teamCode: match.team2.code,
                        key: match.team2.key,
                        played: 0,
                        won: 0,
                        goals: 0,
                        lost: 0,
                        form: [],
                        draw: 0
                    };

                }
                if (main.teamStatistics[match.team2.key]) {

                    main.teamStatistics[match.team2.key]["played"]++;
                    if (match.score1 < match.score2) {
                        main.teamStatistics[match.team2.key]["won"]++;
                        main.teamStatistics[match.team2.key]["form"].push("W");
                    } else if (match.score1 > match.score2) {
                        main.teamStatistics[match.team2.key]["lost"]++;
                        main.teamStatistics[match.team2.key]["form"].push("L");

                    } else {
                        main.teamStatistics[match.team2.key]["draw"]++;
                        main.teamStatistics[match.team2.key]["form"].push("D");
                    }
                    main.teamStatistics[match.team2.key]["goals"] += match.score2;

                }
            });

        }, function errorCallback(response) {
            alert("some error occured, check console");
            console.log(response);
        });




    };
    this.getAllMatches();

}]);
