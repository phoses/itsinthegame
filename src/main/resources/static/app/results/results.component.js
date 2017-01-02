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
var ResultsComponent = (function () {
    function ResultsComponent(backendService) {
        this.backendService = backendService;
        this.results = [];
    }
    ResultsComponent.prototype.getResults = function (tournamentName) {
        var _this = this;
        this.backendService
            .getResults(tournamentName)
            .then(function (results) {
            _this.results = results;
        });
    };
    ResultsComponent.prototype.ngOnInit = function () {
        this.getResults("");
    };
    ResultsComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ResultsComponent = __decorate([
        core_1.Component({
            selector: 'results',
            templateUrl: 'app/results/results.html'
        }), 
        __metadata('design:paramtypes', [backend_service_1.BackendService])
    ], ResultsComponent);
    return ResultsComponent;
}());
exports.ResultsComponent = ResultsComponent;
//# sourceMappingURL=results.component.js.map