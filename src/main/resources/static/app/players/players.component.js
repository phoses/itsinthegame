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
var player_1 = require('./player');
var backend_service_1 = require('../backend/backend.service');
var PlayersComponent = (function () {
    function PlayersComponent(backendService) {
        this.backendService = backendService;
        this.players = [];
    }
    PlayersComponent.prototype.getPlayers = function () {
        var _this = this;
        this.backendService
            .getPlayers()
            .then(function (players) {
            _this.players = players;
        });
    };
    PlayersComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name || this.players.indexOf(new player_1.Player(name)) === 0) {
            return;
        }
        this.backendService.createPlayer(name)
            .then(function (name) {
            _this.players.push(new player_1.Player(name));
        })
            .catch(this.handleError);
    };
    PlayersComponent.prototype.ngOnInit = function () {
        this.getPlayers();
    };
    PlayersComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    PlayersComponent = __decorate([
        core_1.Component({
            selector: 'players',
            templateUrl: 'app/players/players.html'
        }), 
        __metadata('design:paramtypes', [backend_service_1.BackendService])
    ], PlayersComponent);
    return PlayersComponent;
}());
exports.PlayersComponent = PlayersComponent;
//# sourceMappingURL=players.component.js.map