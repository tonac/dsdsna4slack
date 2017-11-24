webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a {\n  cursor: pointer;\n}\n\n.help-block {\n  font-size: 12px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-alert></app-alert>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'SNA4Slack';
        this.image = 'assets/img/shutterstock_110216492.jpg';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_alert_alert_component__ = __webpack_require__("../../../../../src/app/components/alert/alert.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_home_home_component__ = __webpack_require__("../../../../../src/app/main/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__main_register_register_component__ = __webpack_require__("../../../../../src/app/main/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__main_dashboard_archive_archive_component__ = __webpack_require__("../../../../../src/app/main/dashboard/archive/archive.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http_testing__ = __webpack_require__("../../../http/@angular/http/testing.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_authentication_service__ = __webpack_require__("../../../../../src/app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_alert_service__ = __webpack_require__("../../../../../src/app/services/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__guards_auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__utils_mock_backend__ = __webpack_require__("../../../../../src/app/utils/mock-backend.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__main_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/main/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__main_dashboard_results_results_component__ = __webpack_require__("../../../../../src/app/main/dashboard/results/results.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_result_service__ = __webpack_require__("../../../../../src/app/services/result.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__main_dashboard_results_network_vis_network_vis_component__ = __webpack_require__("../../../../../src/app/main/dashboard/results/network-vis/network-vis.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var homeState = { name: 'home', url: '/', component: __WEBPACK_IMPORTED_MODULE_5__main_home_home_component__["a" /* HomeComponent */] };
var registerState = { name: 'register', url: '/register', component: __WEBPACK_IMPORTED_MODULE_6__main_register_register_component__["a" /* RegisterComponent */] };
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_9__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_http__["d" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_16__app_routing__["a" /* routing */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_4__components_alert_alert_component__["a" /* AlertComponent */],
            __WEBPACK_IMPORTED_MODULE_5__main_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_6__main_register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_17__main_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_7__main_dashboard_archive_archive_component__["a" /* ArchiveComponent */],
            __WEBPACK_IMPORTED_MODULE_18__main_dashboard_results_results_component__["a" /* ResultsComponent */],
            __WEBPACK_IMPORTED_MODULE_20__main_dashboard_results_network_vis_network_vis_component__["a" /* NetworkVisComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_14__guards_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_13__services_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_12__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_11__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_19__services_result_service__["a" /* ResultService */],
            // providers used to create fake backend
            __WEBPACK_IMPORTED_MODULE_15__utils_mock_backend__["a" /* mockBackendProvider */],
            __WEBPACK_IMPORTED_MODULE_10__angular_http_testing__["a" /* MockBackend */],
            __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* BaseRequestOptions */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_home_home_component__ = __webpack_require__("../../../../../src/app/main/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_register_register_component__ = __webpack_require__("../../../../../src/app/main/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_dashboard_dashboard_routes__ = __webpack_require__("../../../../../src/app/main/dashboard/dashboard.routes.ts");




var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__main_home_home_component__["a" /* HomeComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_2__main_register_register_component__["a" /* RegisterComponent */] }
].concat(__WEBPACK_IMPORTED_MODULE_3__main_dashboard_dashboard_routes__["a" /* DashboardRoutes */], [
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
]);
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/app/components/alert/alert.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/alert/alert.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message\"\n     [ngClass]=\"{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }\">\n  {{message.text}}\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/alert/alert.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alert_service__ = __webpack_require__("../../../../../src/app/services/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertComponent = (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getMessage().subscribe(function (message) {
            _this.message = message;
        });
    };
    return AlertComponent;
}());
AlertComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-alert',
        template: __webpack_require__("../../../../../src/app/components/alert/alert.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/alert/alert.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_alert_service__["a" /* AlertService */]) === "function" && _a || Object])
], AlertComponent);

var _a;
//# sourceMappingURL=alert.component.js.map

/***/ }),

/***/ "../../../../../src/app/guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object])
], AuthGuard);

var _a;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/main/dashboard/archive/archive.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".gray_overlay{\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 0%;\n\tleft: 0%;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: gray;\n\tz-index:1001;\n\t-moz-opacity: 0.8;\n\topacity:.80;\n\tfilter: alpha(opacity=80);\n}\n\n.white_content {\n    display: none;\n    border-radius: 25px;\n\tposition: absolute;\n\ttop: 25%;\n\tleft: 25%;\n\twidth: 30%;\n\theight: 30%;\n\tpadding: 3%;\n\tbackground-color: white;\n\tz-index:1002;\n\toverflow: auto;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/dashboard/archive/archive.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    \n    <div class=\"row\">\n        <div class=\"col-md-10\">\n          <div *ngIf=\"hasArchives\">\n              Your arhives will appear here.\n          </div>\n          <br>\n          <br>\n          <br>\n            <h1 *ngIf=\"!this.hasArchives\" style=\"text-align:end\">\n              Looks like you don't have any archives.\n              <br/>\n              Add one to get started.\n            </h1>\n        </div>\n\n\n\n        <div class=\"col-md-2\" style=\"text-align:end\">\n                <i (click)='add()' class=\"fa fa-plus-circle fa-5x\" aria-hidden=\"true\"></i>\n              <br>\n              <br>\n              <i  *ngIf=\"!this.hasArchives\" class=\"fa fa-reply fa-rotate-90 fa-5x\" aria-hidden=\"true\"></i>\n        </div>\n    </div>\n\n\n      <div id=\"light\" class=\"white_content\">\n          <form name=\"form\" (ngSubmit)=\"f.form.valid && submit()\" #f=\"ngForm\" novalidate>\n              <div class=\"form-group\">\n                <label>Choose from file</label>\n                <br/>\n                <input id=\"file\" type=\"file\" name=\"file\"/>\n              </div>\n              <div class=\"form-group\" style=\"justify-content: flex-end;display: flex;\">\n                <button class=\"btn btn-primary\">Submit</button>  \n                <span style=\"width:10pt\"></span>\n                <a class=\"btn btn-primary\" (click)=\"closePopup()\">Close</a>              \n              </div>\n              \n            </form>\n      </div>\n      \n\n      <div id=\"fade\" class=\"gray_overlay\"></div>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/main/dashboard/archive/archive.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArchiveComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ArchiveComponent = (function () {
    function ArchiveComponent() {
    }
    ArchiveComponent.prototype.ngOnInit = function () {
        this.archives = [];
        this.hasArchives = this.archives.length !== 0;
        this.text = "";
        // Observable.from(this.archives)
        //   .subscribe({next: name => 
        //   // this.text += name;
        //   console.log(name)
        // });
        // this.archives.push('test');
    };
    ArchiveComponent.prototype.add = function () {
        document.getElementById('light').style.display = 'block';
        document.getElementById('fade').style.display = 'block';
    };
    ArchiveComponent.prototype.submit = function () {
        this.closePopup();
        this.hasArchives = true;
        console.log("submit");
        var f = document.getElementById('file').files[0];
        this.archives.push(f.name);
    };
    ArchiveComponent.prototype.closePopup = function () {
        document.getElementById('light').style.display = 'none';
        document.getElementById('fade').style.display = 'none';
    };
    return ArchiveComponent;
}());
ArchiveComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-archive',
        template: __webpack_require__("../../../../../src/app/main/dashboard/archive/archive.component.html"),
        styles: [__webpack_require__("../../../../../src/app/main/dashboard/archive/archive.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ArchiveComponent);

//# sourceMappingURL=archive.component.js.map

/***/ }),

/***/ "../../../../../src/app/main/dashboard/archive/archive.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArchiveRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__guards_auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__archive_component__ = __webpack_require__("../../../../../src/app/main/dashboard/archive/archive.component.ts");


var ArchiveRoutes = [
    {
        path: 'archives',
        component: __WEBPACK_IMPORTED_MODULE_1__archive_component__["a" /* ArchiveComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_0__guards_auth_guard__["a" /* AuthGuard */]]
    }
];
//# sourceMappingURL=archive.routes.js.map

/***/ }),

/***/ "../../../../../src/app/main/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700);", ""]);

// module
exports.push([module.i, "/*\n    DEMO STYLE\n*/\n\n\nbody {\n    font-family: 'Poppins', sans-serif;\n    background: #fafafa;\n}\n\np {\n    font-family: 'Poppins', sans-serif;\n    font-size: 1.1em;\n    font-weight: 300;\n    line-height: 1.7em;\n    color: #999;\n}\n\na, a:hover, a:focus {\n    color: inherit;\n    text-decoration: none;\n    transition: all 0.3s;\n}\n\n.navbar {\n    padding: 15px 10px;\n    background: #fff;\n    border: none;\n    border-radius: 0;\n    margin-bottom: 40px;\n    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n}\n\n.navbar-btn {\n    box-shadow: none;\n    outline: none !important;\n    border: none;\n}\n\n.line {\n    width: 100%;\n    height: 1px;\n    border-bottom: 1px dashed #ddd;\n    margin: 40px 0;\n}\n\n/* ---------------------------------------------------\n    SIDEBAR STYLE\n----------------------------------------------------- */\n#sidebar {\n    width: 250px;\n    position: fixed;\n    top: 0;\n    left: 0;\n    height: 100vh;\n    z-index: 999;\n    background: #7386D5;\n    color: #fff;\n    transition: all 0.3s;\n}\n\n#sidebar.active {\n    margin-left: -250px;\n}\n\n#sidebar .sidebar-header {\n    padding: 20px;\n    background: #6d7fcc;\n}\n\n#sidebar ul.components {\n    padding: 20px 0;\n    border-bottom: 1px solid #47748b;\n}\n\n#sidebar ul p {\n    color: #fff;\n    padding: 10px;\n}\n\n#sidebar ul li a {\n    padding: 10px;\n    font-size: 1.1em;\n    display: block;\n}\n#sidebar ul li a:hover {\n    color: #7386D5;\n    background: #fff;\n}\n\n#sidebar ul li.active > a, a[aria-expanded=\"true\"] {\n    color: #fff;\n    background: #6d7fcc;\n}\n\n\na[data-toggle=\"collapse\"] {\n    position: relative;\n}\n\na[aria-expanded=\"false\"]::before, a[aria-expanded=\"true\"]::before {\n    content: '\\E259';\n    display: block;\n    position: absolute;\n    right: 20px;\n    font-family: 'Glyphicons Halflings';\n    font-size: 0.6em;\n}\na[aria-expanded=\"true\"]::before {\n    content: '\\E260';\n}\n\n\nul ul a {\n    font-size: 0.9em !important;\n    padding-left: 30px !important;\n    background: #6d7fcc;\n}\n\nul.CTAs {\n    padding: 20px;\n}\n\nul.CTAs a {\n    text-align: center;\n    font-size: 0.9em !important;\n    display: block;\n    border-radius: 5px;\n    margin-bottom: 5px;\n}\na.download {\n    background: #fff;\n    color: #7386D5;\n}\na.article, a.article:hover {\n    background: #6d7fcc !important;\n    color: #fff !important;\n}\n\n\n/* ---------------------------------------------------\n    CONTENT STYLE\n----------------------------------------------------- */\n#content {\n    width: calc(100% - 250px);\n    padding: 40px;\n    min-height: 100vh;\n    transition: all 0.3s;\n    position: absolute;\n    top: 0;\n    right: 0;\n}\n#content.active {\n    width: 100%;\n}\n\n\n/* ---------------------------------------------------\n    MEDIAQUERIES\n----------------------------------------------------- */\n@media (max-width: 768px) {\n    #sidebar {\n        width: 80px;\n    }\n    #sidebar.active {\n        margin-left: 0;\n    }\n    #content {\n        width: calc(100% - 80px);;\n    }\n    #content.active {\n        width: calc(100% - 250px);\n    }\n    #sidebarCollapse span {\n        display: none;\n    }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n    <!-- Sidebar Holder -->\n    <nav id=\"sidebar\">\n        <div class=\"sidebar-header\">\n            <a href=\"/dashboard/archives\" class=\"page-header\">\n                <h3>SNA4Slack</h3>\n            </a>\n        </div>\n\n        <ul class=\"list-unstyled components\">\n            <li>\n              <a [routerLink]=\"['/dashboard/archives']\">Archives</a>\n            </li>\n            <li>\n              <a [routerLink]=\"['/dashboard/results']\">Results</a>\n            </li>\n            <li>\n                <a href=\"\">Other</a>\n            </li>\n        </ul>\n\n        <ul class=\"list-unstyled CTAs\">\n            <li><a href=\"/\">Logout</a></li>\n        </ul>\n    </nav>\n\n    <!-- Page Content Holder -->\n    <div id=\"content\">\n        <router-outlet></router-outlet>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/main/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = (function () {
    function DashboardComponent(userService) {
        this.userService = userService;
        this.model = {};
        this.loading = false;
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    DashboardComponent.prototype.ngOnInit = function () {
        // this.content = '<app-archive></app-archive>';
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-dashboard',
        template: __webpack_require__("../../../../../src/app/main/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/main/dashboard/dashboard.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === "function" && _a || Object])
], DashboardComponent);

var _a;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/main/dashboard/dashboard.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashboard_component__ = __webpack_require__("../../../../../src/app/main/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__archive_archive_routes__ = __webpack_require__("../../../../../src/app/main/dashboard/archive/archive.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__results_results_routes__ = __webpack_require__("../../../../../src/app/main/dashboard/results/results.routes.ts");



var DashboardRoutes = [
    {
        path: 'dashboard',
        component: __WEBPACK_IMPORTED_MODULE_0__dashboard_component__["a" /* DashboardComponent */],
        children: __WEBPACK_IMPORTED_MODULE_1__archive_archive_routes__["a" /* ArchiveRoutes */].concat(__WEBPACK_IMPORTED_MODULE_2__results_results_routes__["a" /* ResultsRoutes */])
    }
];
//# sourceMappingURL=dashboard.routes.js.map

/***/ }),

/***/ "../../../../../src/app/main/dashboard/results/network-vis/network-vis.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/dashboard/results/network-vis/network-vis.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/main/dashboard/results/network-vis/network-vis.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkVisComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vis__ = __webpack_require__("../../../../vis/dist/vis.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vis__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_result_service__ = __webpack_require__("../../../../../src/app/services/result.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NetworkVisComponent = (function () {
    function NetworkVisComponent(resultService) {
        this.resultService = resultService;
    }
    NetworkVisComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.networkIndex);
        setTimeout(function () {
            var container = document.getElementById('network' + _this.networkIndex);
            var network = new __WEBPACK_IMPORTED_MODULE_1_vis__["Network"](container, _this.network, _this.resultService.getOptions());
        }, 50);
    };
    return NetworkVisComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], NetworkVisComponent.prototype, "network", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], NetworkVisComponent.prototype, "networkIndex", void 0);
NetworkVisComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-network-vis',
        template: __webpack_require__("../../../../../src/app/main/dashboard/results/network-vis/network-vis.component.html"),
        styles: [__webpack_require__("../../../../../src/app/main/dashboard/results/network-vis/network-vis.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_result_service__["a" /* ResultService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_result_service__["a" /* ResultService */]) === "function" && _a || Object])
], NetworkVisComponent);

var _a;
//# sourceMappingURL=network-vis.component.js.map

/***/ }),

/***/ "../../../../../src/app/main/dashboard/results/results.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#my_network {\n  width: 800px;\n  height: 600px;\n  border: 1px solid lightgray;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/dashboard/results/results.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"graphVisualization\">\n  <div id=\"my_network\" class=\"row\"></div>\n  <div class=\"row\" style=\"padding-top: 20px\">\n    <button class=\"btn btn-default btn-primary\" (click)=\"goBackToResults()\">Return to results list</button>\n  </div>\n</div>\n\n<div *ngIf=\"!graphVisualization\">\n  <div class=\"row\" *ngFor=\"let result of results; let i = index\">\n    <div class=\"col-md-3\">\n      <div [id]=\"getResultId(i)\"></div>\n    </div>\n    <div class=\"col-md-9\">\n      <button class=\"btn btn-default btn-primary\"  style=\"padding-top: 20px\" (click)=\"enlarge(result)\"> Enlarge</button>\n    </div>\n    <app-network-vis [network]=\"result\" [networkIndex]=\"i\"></app-network-vis>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/main/dashboard/results/results.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_result_service__ = __webpack_require__("../../../../../src/app/services/result.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vis__ = __webpack_require__("../../../../vis/dist/vis.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vis__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResultsComponent = (function () {
    function ResultsComponent(resultService) {
        this.resultService = resultService;
        this.graphVisualization = false;
    }
    ResultsComponent.prototype.ngOnInit = function () {
        this.results = this.resultService.getResults();
    };
    ResultsComponent.prototype.getResultId = function (index) {
        return 'network' + index;
    };
    ResultsComponent.prototype.enlarge = function (result) {
        var _this = this;
        this.graphVisualization = true;
        setTimeout(function () {
            var container = document.getElementById('my_network');
            var network = new __WEBPACK_IMPORTED_MODULE_2_vis__["Network"](container, result, _this.resultService.getOptions());
        }, 50);
    };
    ResultsComponent.prototype.goBackToResults = function () {
        this.graphVisualization = false;
    };
    return ResultsComponent;
}());
ResultsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-results',
        template: __webpack_require__("../../../../../src/app/main/dashboard/results/results.component.html"),
        styles: [__webpack_require__("../../../../../src/app/main/dashboard/results/results.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_result_service__["a" /* ResultService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_result_service__["a" /* ResultService */]) === "function" && _a || Object])
], ResultsComponent);

var _a;
//# sourceMappingURL=results.component.js.map

/***/ }),

/***/ "../../../../../src/app/main/dashboard/results/results.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultsRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__guards_auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__results_component__ = __webpack_require__("../../../../../src/app/main/dashboard/results/results.component.ts");


var ResultsRoutes = [
    {
        path: 'results',
        component: __WEBPACK_IMPORTED_MODULE_1__results_component__["a" /* ResultsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_0__guards_auth_guard__["a" /* AuthGuard */]]
    }
];
//# sourceMappingURL=results.routes.js.map

/***/ }),

/***/ "../../../../../src/app/main/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".about {\n  margin-top: 20%;\n  margin-left: 10%;\n  display: inline-block;\n  width: 50%;\n  /*background-image: url(/assets/img/graph.png);*/\n}\n\n.login-form {\n  border-radius: 25px;\n  background-color: rgba(192,192,192,0.8);\n  padding: 15pt;\n  margin-top: 15%;\n  margin-right: 8%;\n  width: 28%;\n  float: right;\n\n}\n\n.login-button {\n  width: 100%;\n  margin-bottom: 6%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"about\">\n  <h1>\n    SNA4Slack\n  </h1>\n  <p>\n    This is a descriptio alshal klkjash alkjdh alsdkjha lskjdha lksjdh alksjdh alkjsdh alkjsdh alkjdh alkjsdh alkjshd lakjhd lakjsh alkjshda lkjshd alkjdh alkjdh alkjhdal kjhdal kjdha lkjdha lkjdh alkjsdha lksjdha lkjdha lkjsdh alkjdshal kdjh alkdjhal kjdh alkjdsh\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    This is a description\n  </p>\n</div>\n\n\n<div class=\"col-sm-4 col-sm-offset-5 login-form\">\n  <h2>Login</h2>\n  <form name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\n      <input id=\"username\" type=\"text\" class=\"form-control\" name=\"username\" placeholder=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required />\n      <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username is required</div>\n    </div>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\n      <input id=\"password\" type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required />\n      <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\n    </div>\n    <div class=\"form-group\" style=\"text-align:center\">\n      <button [disabled]=\"loading\" class=\"btn btn-primary login-button\">Login</button>\n      <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n      <br>\n      <span>Don't have an account? <a [routerLink]=\"['/register']\">Register</a></span>\n    </div>\n  </form>\n</div>\n\n<div>\n  <p>\n    You can add images and descriptions here.\n  </p>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/main/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__("../../../../../src/app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alert_service__ = __webpack_require__("../../../../../src/app/services/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    function HomeComponent(route, router, authenticationService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/archives';
    };
    HomeComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        template: __webpack_require__("../../../../../src/app/main/home/home.component.html"),
        selector: 'app-home',
        styles: [__webpack_require__("../../../../../src/app/main/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_alert_service__["a" /* AlertService */]) === "function" && _d || Object])
], HomeComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/main/register/register.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".center {\n  float: none;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 8%;\n  border-radius: 25px;\n  background-color: rgba(192,192,192,0.8);\n  padding: 20pt;\n  width: 40%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"center\">\n\n  <h2>Register</h2>\n\n  <form name=\"form\" (ngSubmit)=\"f.form.valid && register()\" #f=\"ngForm\" novalidate>\n\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\n      <!-- <label for=\"firstName\">First Name</label> -->\n      <input type=\"text\" class=\"form-control\" name=\"firstName\" placeholder=\"First name\" [(ngModel)]=\"model.firstName\" #firstName=\"ngModel\"\n             required/>\n      <div *ngIf=\"f.submitted && !firstName.valid\" class=\"help-block\">First Name is required</div>\n    </div>\n\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\n      <!-- <label for=\"lastName\">Last Name</label> -->\n      <input type=\"text\" class=\"form-control\" name=\"lastName\" placeholder=\"Last name\" [(ngModel)]=\"model.lastName\" #lastName=\"ngModel\"\n             required/>\n      <div *ngIf=\"f.submitted && !lastName.valid\" class=\"help-block\">Last Name is required</div>\n    </div>\n\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\n      <!-- <label for=\"username\">Username</label> -->\n      <input type=\"text\" class=\"form-control\" name=\"username\" placeholder=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\"\n             required/>\n      <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username is required</div>\n    </div>\n\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\n      <!-- <label for=\"password\">Password</label> -->\n      <input type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\"\n             required/>\n      <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\n    </div>\n\n    <div class=\"form-group\" style=\"text-align:center\">\n      <button [disabled]=\"loading\" class=\"btn btn-primary\">Register</button>\n      <img *ngIf=\"loading\"\n           src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"/>\n      <a [routerLink]=\"['/login']\" class=\"btn btn-link\">Cancel</a>\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/main/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alert_service__ = __webpack_require__("../../../../../src/app/services/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = (function () {
    function RegisterComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Registration successful', true);
            _this.router.navigate(['/']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-register',
        template: __webpack_require__("../../../../../src/app/main/register/register.component.html"),
        styles: [__webpack_require__("../../../../../src/app/main/register/register.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_alert_service__["a" /* AlertService */]) === "function" && _c || Object])
], RegisterComponent);

var _a, _b, _c;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/alert.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertService = (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["b" /* Subject */]();
        this.keepAfterNavigationChange = false;
        // clear alert message on route change
        router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationStart */]) {
                if (_this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    // clear alert
                    _this.subject.next();
                }
            }
        });
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    return AlertService;
}());
AlertService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object])
], AlertService);

var _a;
//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (username, password) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], AuthenticationService);

var _a;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/result.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vis__ = __webpack_require__("../../../../vis/dist/vis.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vis__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResultService = (function () {
    function ResultService() {
    }
    ResultService.prototype.getResults = function () {
        return [this.getGraph2(), this.getGraph1()];
    };
    ResultService.prototype.getGraph1 = function () {
        var nodes;
        var edges;
        nodes = new __WEBPACK_IMPORTED_MODULE_1_vis__["DataSet"]([
            { id: 1, value: 2, label: 'Algie' },
            { id: 2, value: 31, label: 'Alston' },
            { id: 3, value: 12, label: 'Barney' },
            { id: 4, value: 16, label: 'Coley' },
            { id: 5, value: 17, label: 'Grant' },
            { id: 6, value: 15, label: 'Langdon' },
            { id: 7, value: 6, label: 'Lee' },
            { id: 8, value: 5, label: 'Merlin' },
            { id: 9, value: 30, label: 'Mick' },
            { id: 10, value: 18, label: 'Tod' },
        ]);
        // create an array with edges
        edges = new __WEBPACK_IMPORTED_MODULE_1_vis__["DataSet"]([
            { from: 2, to: 8, value: 3, title: '3 emails per week' },
            { from: 2, to: 9, value: 5, title: '5 emails per week' },
            { from: 2, to: 10, value: 1, title: '1 emails per week' },
            { from: 4, to: 6, value: 8, title: '8 emails per week' },
            { from: 5, to: 7, value: 2, title: '2 emails per week' },
            { from: 4, to: 5, value: 1, title: '1 emails per week' },
            { from: 9, to: 10, value: 2, title: '2 emails per week' },
            { from: 2, to: 3, value: 6, title: '6 emails per week' },
            { from: 3, to: 9, value: 4, title: '4 emails per week' },
            { from: 5, to: 3, value: 1, title: '1 emails per week' },
            { from: 2, to: 7, value: 4, title: '4 emails per week' }
        ]);
        // create a network
        return {
            nodes: nodes,
            edges: edges
        };
    };
    ResultService.prototype.getGraph2 = function () {
        var nodes;
        var edges;
        nodes = new __WEBPACK_IMPORTED_MODULE_1_vis__["DataSet"]([
            { id: 1, value: 2, label: 'Jasna' },
            { id: 2, value: 2, label: 'Marin' },
            { id: 3, value: 2, label: 'Sandi' },
            { id: 4, value: 2, label: 'Jesus' },
            { id: 5, value: 2, label: 'Ivan' },
            { id: 6, value: 2, label: 'Antonio' }
        ]);
        // create an array with edges
        edges = new __WEBPACK_IMPORTED_MODULE_1_vis__["DataSet"]([
            { from: 1, to: 2, value: 3 },
            // {from: 1, to: 3, value: 5},
            { from: 1, to: 4, value: 1 },
            // {from: 1, to: 5, value: 8},
            // {from: 1, to: 6, value: 2},
            { from: 2, to: 3, value: 1 },
            { from: 2, to: 4, value: 2 },
            // {from: 2, to: 5, value: 6},
            { from: 2, to: 6, value: 2 },
            { from: 3, to: 4, value: 1 },
            { from: 3, to: 5, value: 4 },
            // {from: 3, to: 6, value: 2},
            { from: 4, to: 5, value: 1 },
            { from: 4, to: 6, value: 4 },
            { from: 5, to: 6, value: 3 }
        ]);
        // create a network
        return {
            nodes: nodes,
            edges: edges
        };
    };
    ResultService.prototype.getOptions = function () {
        return {
            autoResize: true,
            nodes: {
                shape: 'dot',
                scaling: {
                    label: {
                        min: 8,
                        max: 20
                    }
                }
            },
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -26,
                    centralGravity: 0.005,
                    springLength: 230,
                    springConstant: 0.18
                },
                maxVelocity: 146,
                solver: 'forceAtlas2Based',
                timestep: 0.35,
                stabilization: { iterations: 150 }
            },
            interaction: {
                tooltipDelay: 100
            }
        };
    };
    return ResultService;
}());
ResultService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ResultService);

//# sourceMappingURL=result.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAll = function () {
        return this.http.get('/api/users', this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (id) {
        return this.http.get('/api/users/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        return this.http.post('/api/users', user, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.update = function (user) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.delete = function (id) {
        return this.http.delete('/api/users/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'Bearer ' + currentUser.token });
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["h" /* RequestOptions */]({ headers: headers });
        }
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/app/utils/mock-backend.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export useFactoryFunction */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mockBackendProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http_testing__ = __webpack_require__("../../../http/@angular/http/testing.es5.js");


function useFactoryFunction(backend, options) {
    // array in local storage for registered users
    var users = JSON.parse(localStorage.getItem('users')) || [];
    // configure mock backend
    backend.connections.subscribe(function (connection) {
        // wrap in timeout to simulate server api call
        setTimeout(function () {
            // authenticate
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* RequestMethod */].Post) {
                // get parameters from post request
                var params_1 = JSON.parse(connection.request.getBody());
                // find if any user matches login credentials
                var filteredUsers = users.filter(function (user) {
                    return user.username === params_1.username && user.password === params_1.password;
                });
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and mock jwt token
                    var user = filteredUsers[0];
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["i" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["j" /* ResponseOptions */]({
                        status: 200,
                        body: {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'mock-jwt-token'
                        }
                    })));
                }
                else {
                    // else return 400 bad request
                    connection.mockError(new Error('Username or password is incorrect'));
                }
            }
            // get users
            if (connection.request.url.endsWith('/api/users') && connection.request.method === __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* RequestMethod */].Get) {
                // check for mock auth token in header and return users if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer mock-jwt-token') {
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["i" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["j" /* ResponseOptions */]({ status: 200, body: users })));
                }
                else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["i" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["j" /* ResponseOptions */]({ status: 401 })));
                }
            }
            // get user by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* RequestMethod */].Get) {
                // check for mock auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer mock-jwt-token') {
                    // find user by id in users array
                    var urlParts = connection.request.url.split('/');
                    var id_1 = parseInt(urlParts[urlParts.length - 1]);
                    var matchedUsers = users.filter(function (user) {
                        return user.id === id_1;
                    });
                    var user = matchedUsers.length ? matchedUsers[0] : null;
                    // respond 200 OK with user
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["i" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["j" /* ResponseOptions */]({ status: 200, body: user })));
                }
                else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["i" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["j" /* ResponseOptions */]({ status: 401 })));
                }
            }
            // create user
            if (connection.request.url.endsWith('/api/users') && connection.request.method === __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* RequestMethod */].Post) {
                // get new user object from post body
                var newUser_1 = JSON.parse(connection.request.getBody());
                // validation
                var duplicateUser = users.filter(function (user) {
                    return user.username === newUser_1.username;
                }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('Username "' + newUser_1.username + '" is already taken'));
                }
                // save new user
                newUser_1.id = users.length + 1;
                users.push(newUser_1);
                localStorage.setItem('users', JSON.stringify(users));
                // respond 200 OK
                connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["i" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["j" /* ResponseOptions */]({ status: 200 })));
            }
            // delete user
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* RequestMethod */].Delete) {
                // check for mock auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer mock-jwt-token') {
                    // find user by id in users array
                    var urlParts = connection.request.url.split('/');
                    var id = parseInt(urlParts[urlParts.length - 1]);
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["i" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["j" /* ResponseOptions */]({ status: 200 })));
                }
                else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["i" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["j" /* ResponseOptions */]({ status: 401 })));
                }
            }
        }, 500);
    });
    return new __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */](backend, options);
}

var mockBackendProvider = {
    // use mock backend in place of Http service for backend-less development
    provide: __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */],
    useFactory: useFactoryFunction,
    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http_testing__["a" /* MockBackend */], __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* BaseRequestOptions */]]
};
//# sourceMappingURL=mock-backend.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map