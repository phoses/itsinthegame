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
require('rxjs/add/operator/toPromise');
var http_1 = require('@angular/http');
var BackendService = (function () {
    function BackendService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.backendUrl = '';
        this.playersUrl = this.backendUrl + '/players';
        this.tournamentsUrl = this.backendUrl + '/tournaments';
        this.gamesUrl = this.backendUrl + '/games';
        this.resultsUrl = this.backendUrl + '/results';
    }
    BackendService.prototype.getPlayers = function () {
        console.log("getPlayers()");
        return this.http.get(this.playersUrl)
            .toPromise()
            .then(function (response) {
            if (response.json()._embedded !== undefined) {
                return response.json()._embedded.players;
            }
            else {
                return [];
            }
        })
            .catch(this.handleError);
    };
    BackendService.prototype.getTournaments = function () {
        console.log("getTournaments()");
        return this.http.get(this.tournamentsUrl)
            .toPromise()
            .then(function (response) {
            if (response.json()._embedded !== undefined) {
                return response.json()._embedded.tournaments;
            }
            else {
                return [];
            }
        })
            .catch(this.handleError);
    };
    BackendService.prototype.getGames = function () {
        console.log("getGames()");
        return this.http.get(this.gamesUrl)
            .toPromise()
            .then(function (response) {
            if (response.json()._embedded !== undefined) {
                return response.json()._embedded.games;
            }
            else {
                return [];
            }
        })
            .catch(this.handleError);
    };
    BackendService.prototype.getResults = function () {
        console.log("getResults()");
        return this.http.get(this.resultsUrl)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    BackendService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    BackendService.prototype.createPlayer = function (name) {
        return this.http
            .post(this.playersUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function () { return name; })
            .catch(this.handleError);
    };
    BackendService.prototype.createTournament = function (name) {
        return this.http
            .post(this.tournamentsUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function () { return name; })
            .catch(this.handleError);
    };
    BackendService.prototype.createGame = function (game) {
        return this.http
            .post(this.gamesUrl, JSON.stringify(game), { headers: this.headers })
            .toPromise()
            .then(function () { return game; })
            .catch(this.handleError);
    };
    BackendService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BackendService);
    return BackendService;
}());
exports.BackendService = BackendService;
//# sourceMappingURL=backend.service.js.map