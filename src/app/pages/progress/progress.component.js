"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProgressComponent = /** @class */ (function () {
    function ProgressComponent() {
        this.progreso = 50;
    }
    ProgressComponent.prototype.ngOnInit = function () {
    };
    ProgressComponent.prototype.cambiarValor = function (valor) {
        if (this.progreso <= 0 && valor < 0) {
            this.progreso = 5;
        }
        if (this.progreso >= 100 && valor > 0) {
            this.progreso = 95;
        }
        this.progreso = this.progreso + valor;
    };
    ProgressComponent = __decorate([
        core_1.Component({
            selector: 'app-progress',
            templateUrl: './progress.component.html',
            styles: []
        })
    ], ProgressComponent);
    return ProgressComponent;
}());
exports.ProgressComponent = ProgressComponent;
