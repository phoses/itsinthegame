"use strict";
var Game = (function () {
    function Game(tournamentName, homePlayers, homeGoals, awayPlayers, awayGoals, timeMillis) {
        this.tournamentName = tournamentName;
        this.homePlayers = homePlayers;
        this.homeGoals = homeGoals;
        this.awayPlayers = awayPlayers;
        this.awayGoals = awayGoals;
        this.timeMillis = timeMillis;
    }
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map