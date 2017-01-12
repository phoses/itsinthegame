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
var tournament_1 = require("./tournament");
var backend_service_1 = require("../backend/backend.service");
var TournamentsComponent = (function () {
    function TournamentsComponent(backendService) {
        this.backendService = backendService;
        this.tournaments = [];
    }
    TournamentsComponent.prototype.getTournaments = function () {
        var _this = this;
        this.backendService
            .getTournaments()
            .then(function (tournaments) {
            _this.tournaments = tournaments;
        });
    };
    TournamentsComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name || this.tournaments.indexOf(new tournament_1.Tournament(name)) === 0) {
            return;
        }
        this.backendService.createTournament(name)
            .then(function (name) {
            _this.tournaments.push(new tournament_1.Tournament(name));
        })
            .catch(this.handleError);
    };
    TournamentsComponent.prototype.ngOnInit = function () {
        this.getTournaments();
    };
    TournamentsComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return TournamentsComponent;
}());
TournamentsComponent = __decorate([
    core_1.Component({
        selector: 'tournaments',
        templateUrl: 'app/tournaments/tournaments.html'
    }),
    __metadata("design:paramtypes", [backend_service_1.BackendService])
], TournamentsComponent);
exports.TournamentsComponent = TournamentsComponent;
//# sourceMappingURL=tournaments.component.js.map