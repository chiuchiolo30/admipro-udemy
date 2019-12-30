"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Graficas1Component = /** @class */ (function () {
    function Graficas1Component() {
    }
    Graficas1Component.prototype.ngOnInit = function () {
    };
    Graficas1Component = __decorate([
        core_1.Component({
            selector: 'app-graficas1',
            templateUrl: './graficas1.component.html',
            styles: []
        })
    ], Graficas1Component);
    return Graficas1Component;
}());
exports.Graficas1Component = Graficas1Component;
