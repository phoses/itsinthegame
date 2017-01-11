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
var core_1 = require('@angular/core');
var game_1 = require('../games/game');
var randomteams_1 = require('./randomteams');
var backend_service_1 = require('../backend/backend.service');
var games_component_1 = require('../games/games.component');
var results_component_1 = require('../results/results.component');
var RandomizerComponent = (function () {
    function RandomizerComponent(backendService) {
        this.backendService = backendService;
        this.players = [];
        this.selectedPlayers = [];
        this.randomteams = new randomteams_1.RandomTeams([], []);
        this.gameAdded = false;
    }
    RandomizerComponent.prototype.addPlayer = function (player) {
        var index = this.selectedPlayers.indexOf(player);
        if (index !== -1) {
            this.selectedPlayers.splice(index, 1);
        }
        else {
            this.selectedPlayers.push(player);
        }
    };
    RandomizerComponent.prototype.isSelected = function (player) {
        var index = this.selectedPlayers.indexOf(player);
        return index !== -1;
    };
    RandomizerComponent.prototype.generateTeams = function () {
        var _this = this;
        this.backendService
            .getRandomTeams(this.selectedPlayers)
            .then(function (randomteams) {
            _this.randomteams = randomteams;
            console.log(_this.randomteams);
            _this.homeGoals = null;
            _this.awayGoals = null;
            _this.gameAdded = false;
        });
    };
    RandomizerComponent.prototype.getPlayers = function () {
        var _this = this;
        this.backendService
            .getPlayers()
            .then(function (players) {
            _this.players = players;
        });
    };
    RandomizerComponent.prototype.saveGame = function (tournamentName) {
        var _this = this;
        var game = new game_1.Game(tournamentName, this.randomteams.homeTeam, this.homeGoals, this.randomteams.awayTeam, this.awayGoals);
        this.backendService.createGame(game)
            .then(function (game) {
            _this.gameAdded = true;
            _this.gamesRef.getGames();
            _this.resultsRef.getResults(tournamentName);
        });
    };
    RandomizerComponent.prototype.ngOnInit = function () {
        this.getPlayers();
    };
    RandomizerComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', games_component_1.GamesComponent)
    ], RandomizerComponent.prototype, "gamesRef", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', results_component_1.ResultsComponent)
    ], RandomizerComponent.prototype, "resultsRef", void 0);
    RandomizerComponent = __decorate([
        core_1.Component({
            selector: 'randomizer',
            templateUrl: 'app/randomgenerator/randomizer.html'
        }), 
        __metadata('design:paramtypes', [backend_service_1.BackendService])
    ], RandomizerComponent);
    return RandomizerComponent;
}());
exports.RandomizerComponent = RandomizerComponent;
//# sourceMappingURL=randomizer.component.js.map