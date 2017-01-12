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
var backend_service_1 = require('../backend/backend.service');
var TournamentList = (function () {
    function TournamentList(backendService) {
        this.backendService = backendService;
        this.tournaments = [];
        this.selected = '';
    }
    TournamentList.prototype.getTournaments = function () {
        var _this = this;
        this.backendService
            .getTournaments()
            .then(function (tournaments) {
            _this.tournaments = tournaments;
        });
    };
    TournamentList.prototype.ngOnInit = function () {
        this.getTournaments();
    };
    TournamentList.prototype.setSelected = function (selected) {
        this.selected = selected;
    };
    TournamentList.prototype.getSelected = function () {
        return this.selected;
    };
    TournamentList = __decorate([
        core_1.Component({
            selector: 'tournamentlist',
            templateUrl: 'app/tournamentlist/tournamentlist.html'
        }), 
        __metadata('design:paramtypes', [backend_service_1.BackendService])
    ], TournamentList);
    return TournamentList;
}());
exports.TournamentList = TournamentList;
//# sourceMappingURL=tournamentlist.component.js.map