"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./login/register.component");
var nopagefound_component_1 = require("./shared/nopagefound/nopagefound.component");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: '**', component: nopagefound_component_1.NopagefoundComponent }
];
exports.APP_ROUTES = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
