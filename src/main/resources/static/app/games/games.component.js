"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var game_1 = require("./game");
var backend_service_1 = require("../backend/backend.service");
var GamesComponent = (function () {
    function GamesComponent(backendService) {
        this.backendService = backendService;
        this.games = [];
        this.tournaments = [];
        this.players = [];
        this.showAddGame = false;
    }
    GamesComponent.prototype.getPlayers = function () {
        var _this = this;
        this.backendService
            .getPlayers()
            .then(function (players) {
            _this.players = players;
        });
    };
    GamesComponent.prototype.getTournaments = function () {
        var _this = this;
        this.backendService
            .getTournaments()
            .then(function (tournaments) {
            _this.tournaments = tournaments;
        });
    };
    GamesComponent.prototype.getGames = function () {
        var _this = this;
        this.backendService
            .getGames()
            .then(function (games) {
            _this.games = games;
        });
    };
    GamesComponent.prototype.ngOnInit = function () {
        this.getPlayers();
        this.getGames();
    };
    GamesComponent.prototype.saveGame = function (tournamentName, homePlayer1, homePlayer2, homePlayer3, homeGoals, awayPlayer1, awayPlayer2, awayPlayer3, awayGoals) {
        var _this = this;
        var homePlayers = [homePlayer1, homePlayer2, homePlayer3];
        var awayPlayers = [awayPlayer1, awayPlayer2, awayPlayer3];
        homePlayers = homePlayers.filter(function (n) { return n !== ""; });
        awayPlayers = awayPlayers.filter(function (n) { return n !== ""; });
        var game = new game_1.Game(tournamentName, homePlayers, homeGoals, awayPlayers, awayGoals);
        this.backendService.createGame(game)
            .then(function (game) {
            _this.games.push(game);
        });
    };
    return GamesComponent;
}());
GamesComponent = __decorate([
    core_1.Component({
        selector: 'games',
        templateUrl: 'app/games/games.html'
    }),
    __metadata("design:paramtypes", [backend_service_1.BackendService])
], GamesComponent);
exports.GamesComponent = GamesComponent;
//# sourceMappingURL=games.component.js.map