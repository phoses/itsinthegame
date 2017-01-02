"use strict";
var Game = (function () {
    function Game(tournamentName, homePlayers, homeGoals, awayPlayers, awayGoals) {
        this.tournamentName = tournamentName;
        this.homePlayers = homePlayers;
        this.homeGoals = homeGoals;
        this.awayPlayers = awayPlayers;
        this.awayGoals = awayGoals;
    }
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map