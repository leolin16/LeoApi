webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/alltimes/alltimes.component.html":
/***/ (function(module, exports) {

module.exports = "<p-dataTable #dt [value]=\"allTimesheetData\" sortMode=\"multiple\" [reorderableColumns]=\"true\"\n columnResizeMode=\"fit\" [resizableColumns]=\"true\"\n [globalFilter]=\"tableSearch\" exportFilename=\"alltimes\" [editable]=\"true\" (onEditComplete)=\"onEditComplete($event)\"\n [(selection)]=\"selectedRows\" (onRowSelect)=\"onRowSelect($event)\"\n dataKey=\"user\"\n [contextMenu]=\"tableContextMenu\"\n [scrollable]=\"true\" scrollHeight=\"70vh\"\n [paginator]=\"true\" [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,15,20]\" [totalRecords]=\"recordCount\" [pageLinks]=\"8\"\n [lazy]=\"true\" (onLazyLoad)=\"loadTimes($event)\"\n class=\"ui-g-12\" emptyMessage=\"No time entries found\">\n  <p-column selectionMode=\"multiple\" styleClass=\"selectBoxColumn\"></p-column>\n  <p-column field=\"user\" header=\"User\" [sortable]=\"true\" [editable]=\"true\"></p-column>\n  <p-column field=\"project\" header=\"Project\" [sortable]=\"true\" [filter]=\"true\" filterMatchMode=\"contains\" filterPlaceholder=\"Type a Project\"\n   [editable]=\"true\"></p-column>\n  <p-column field=\"category\" header=\"Category\" [sortable]=\"true\"></p-column>\n  <p-column field=\"startTime\" header=\"Start Time\" [sortable]=\"true\"></p-column>\n  <p-column field=\"endTime\" header=\"End Time\" [sortable]=\"true\"></p-column>\n  <p-column field=\"date\" header=\"Date\" [sortable]=\"true\"></p-column>\n  <p-footer>\n    <label for=\"tableSearch\">Search: </label>\n    <input pInputText id=\"tableSearch\" #tableSearch type=\"text\" placeholder=\"Search All The Things\">\n    <button type=\"button\" pButton icon=\"fa-table\" label=\"Export\"\n    (click)=\"dt.exportCSV()\" style=\"float:right;\"></button>\n\n    <ul>\n      <li *ngFor=\"let row of selectedRows\" style=\"text-align: left;\">{{row.user + ' - ' + row.project + ' - ' + row.category}}</li>\n    </ul>\n  </p-footer>\n</p-dataTable>\n\n<p-contextMenu #tableContextMenu [model]=\"contextMenu\"></p-contextMenu>\n"

/***/ }),

/***/ "../../../../../src/app/alltimes/alltimes.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "p-dataTable /deep/ .selectBoxColumn {\n  width: 3rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/alltimes/alltimes.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlltimesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dexie__ = __webpack_require__("../../../../dexie/dist/dexie.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dexie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dexie__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MAX_EXAMPLE_RECORDS = 1000;
var AlltimesComponent = (function () {
    function AlltimesComponent() {
        this.allTimesheetData = [
            { user: 'Glen', project: 'Payroll App', category: 'Backend', startTime: 1000, endTime: 1700, date: 1434243 },
            { user: 'Karen', project: 'Agile Times', category: 'Frontend', startTime: 900, endTime: 1700, date: 1434243 },
            { user: 'Si', project: 'Mobile App', category: 'Operation', startTime: 1100, endTime: 1700, date: 1434243 },
            { user: 'Rohit', project: 'Payroll App', category: 'Backend', startTime: 800, endTime: 1700, date: 1434243 },
        ];
        for (var x = 0; x < 5; x++) {
            this.allTimesheetData = this.allTimesheetData.concat(this.allTimesheetData);
        }
        this.recordCount = this.allTimesheetData.length;
        this.configureDatabase();
        this.populateDatabase();
    }
    AlltimesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contextMenu = [
            { label: 'Debug', icon: 'fa-bug', command: function (event) { return _this.onDebug(_this.selectedRows); } },
            { label: 'Delete', icon: 'fa-close', command: function (event) { return _this.onDelete(_this.selectedRows); } },
        ];
    };
    AlltimesComponent.prototype.configureDatabase = function () {
        this.db = new __WEBPACK_IMPORTED_MODULE_2_dexie___default.a('AgileTimes');
        // Define a schema
        this.db.version(1).stores({
            timesheet: 'id,user,project,category,startTime,endTime,date'
        });
    };
    AlltimesComponent.prototype.populateDatabase = function () {
        var _this = this;
        this.getRecordCount().then(function (count) {
            _this.recordCount = count;
            if (!count) {
                _this.resetDatabase();
            }
        });
    };
    AlltimesComponent.prototype.generateRandomUser = function (id) {
        var names = ['Joe', 'Mary', 'Phil', 'Karen', 'Si', 'Tim', 'Rohit', 'Jenny', 'Kim', 'Greg', 'Danni'];
        var allProjectNames = ['Payroll App', 'Mobile App', 'Agile Times'];
        var allCategories = ['Frontend', 'Backend', 'Operation'];
        var newUser = {
            id: id,
            user: names[id % names.length],
            project: allProjectNames[id % allProjectNames.length],
            category: allCategories[id % allCategories.length],
            startTime: Math.round(Math.random() * 1000),
            endTime: Math.round(Math.random() * 1000),
            date: Math.round(Math.random() * 100000)
        };
        newUser.endTime += newUser.startTime;
        return newUser;
    };
    AlltimesComponent.prototype.getRecordCount = function () {
        return this.db.table('timesheet').count();
    };
    AlltimesComponent.prototype.resetDatabase = function () {
        var that = this;
        this.dt.loading = true;
        this.db.table('timesheet').clear().then(function () {
            console.log('Database Cleared');
            __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].range(0, MAX_EXAMPLE_RECORDS).do(function (id) {
                var randomUser = that.generateRandomUser(id);
                that.db.table('timesheet').add(randomUser);
                if (id % 100 === 0) {
                    that.getRecordCount().then(function (count) {
                        that.recordCount = count;
                    });
                }
            }, function (err) {
                console.log('Do Error: %s', err);
            }, function () {
                console.log('Do complete');
                that.dt.loading = false;
                that.dt.reset();
            }).subscribe(function () {
                console.log('Finished Reset database');
                that.getRecordCount().then(function (count) {
                    that.recordCount = count;
                });
            });
        });
    };
    AlltimesComponent.prototype.loadTimes = function (event) {
        var _this = this;
        console.log(JSON.stringify(event));
        var table = this.db.table('timesheet');
        var query;
        if (event.filters && event.filters['project']) {
            query = table.where('project').equals(event.filters['project']['value']);
        }
        else if (event.globalFilter) {
            query = table.where('project').startsWithIgnoreCase(event.globalFilter)
                .or('user').startsWithIgnoreCase(event.globalFilter)
                .or('category').startsWithIgnoreCase(event.globalFilter);
        }
        else {
            query = table.orderBy(event.sortField);
        }
        query = query
            .offset(event.first)
            .limit(event.rows);
        if (event.sortOrder === -1) {
            query = query.reverse();
        }
        query.toArray(function (nextBlockOfTimes) {
            _this.allTimesheetData = nextBlockOfTimes;
        });
    };
    AlltimesComponent.prototype.onDebug = function (selectedRows) {
        console.log(JSON.stringify(selectedRows));
    };
    AlltimesComponent.prototype.onDelete = function (selectedRows) {
        this.allTimesheetData = this.allTimesheetData.filter(function (row) {
            return !selectedRows.includes(row);
        });
    };
    AlltimesComponent.prototype.onEditComplete = function (editInfo) {
        var fieldChanged = editInfo.column.field;
        var newRowValues = editInfo.data;
        alert("You edited " + fieldChanged + " to " + newRowValues[fieldChanged]);
        console.log(editInfo);
        // alert(JSON.stringify(editInfo));
    };
    AlltimesComponent.prototype.onRowSelect = function (rowInfo) {
        // alert(JSON.stringify(rowInfo));
        // alert(JSON.stringify(this.selectedRows));
    };
    return AlltimesComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dt'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["DataTable"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["DataTable"]) === "function" && _a || Object)
], AlltimesComponent.prototype, "dt", void 0);
AlltimesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-alltimes',
        template: __webpack_require__("../../../../../src/app/alltimes/alltimes.component.html"),
        styles: [__webpack_require__("../../../../../src/app/alltimes/alltimes.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], AlltimesComponent);

var _a;
//# sourceMappingURL=alltimes.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"ui-g ui-g-nopad\">\n  <div class=\"ui-g-12 ui-md-2 ui-g-nopad\" id=\"sidegutter\">\n    <div id=\"sidenav\">\n      <p-menu [model]=\"menuItems\"></p-menu>\n    </div>\n  </div>\n\n  <div id=\"content-body\" class=\"ui-g-12 ui-md-10 ui-g-nopad\">\n    <router-outlet></router-outlet>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "p-menu /deep/ .ui-menu {\n  width: 100%;\n  margin-right: 1rem; }\n\n#sidenav {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 1rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.menuItems = [
            { label: 'Dashboard', icon: 'fa-home', routerLink: ['/dashboard'] },
            { label: 'All Times', icon: 'fa-calendar', routerLink: ['/alltimes'] },
            { label: 'My Timesheet', icon: 'fa-clock-o', routerLink: ['/timesheet'] },
            { label: 'Add Project', icon: 'fa-tasks', routerLink: ['/projects'] },
            { label: 'My Profile', icon: 'fa-users', routerLink: ['/profile'] },
            { label: 'Settings', icon: 'fa-sliders', routerLink: ['/settings'] },
        ];
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        // let menuItems = this.menuItems;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__settings_settings_component__ = __webpack_require__("../../../../../src/app/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reuseables_statistic_statistic_component__ = __webpack_require__("../../../../../src/app/reuseables/statistic/statistic.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__projects_projects_component__ = __webpack_require__("../../../../../src/app/projects/projects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__reuseables_fielderror_fielderror_component__ = __webpack_require__("../../../../../src/app/reuseables/fielderror/fielderror.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__alltimes_alltimes_component__ = __webpack_require__("../../../../../src/app/alltimes/alltimes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__timesheet_timesheet_component__ = __webpack_require__("../../../../../src/app/timesheet/timesheet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__profile_profile_component__ = __webpack_require__("../../../../../src/app/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__reuseables_card_card_component__ = __webpack_require__("../../../../../src/app/reuseables/card/card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pipes_to_space_pipe__ = __webpack_require__("../../../../../src/app/pipes/to-space.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var appRoutes = [
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'projects', component: __WEBPACK_IMPORTED_MODULE_10__projects_projects_component__["a" /* ProjectsComponent */] },
    { path: 'settings', component: __WEBPACK_IMPORTED_MODULE_7__settings_settings_component__["a" /* SettingsComponent */] },
    { path: 'alltimes', component: __WEBPACK_IMPORTED_MODULE_12__alltimes_alltimes_component__["a" /* AlltimesComponent */] },
    { path: 'timesheet', component: __WEBPACK_IMPORTED_MODULE_13__timesheet_timesheet_component__["a" /* TimesheetComponent */] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_14__profile_profile_component__["a" /* ProfileComponent */] },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__settings_settings_component__["a" /* SettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_8__reuseables_statistic_statistic_component__["a" /* StatisticComponent */],
            __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_10__projects_projects_component__["a" /* ProjectsComponent */],
            __WEBPACK_IMPORTED_MODULE_11__reuseables_fielderror_fielderror_component__["a" /* FielderrorComponent */],
            __WEBPACK_IMPORTED_MODULE_12__alltimes_alltimes_component__["a" /* AlltimesComponent */],
            __WEBPACK_IMPORTED_MODULE_13__timesheet_timesheet_component__["a" /* TimesheetComponent */],
            __WEBPACK_IMPORTED_MODULE_14__profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_15__reuseables_card_card_component__["a" /* CardComponent */],
            __WEBPACK_IMPORTED_MODULE_16__pipes_to_space_pipe__["a" /* ToSpacePipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["RouterModule"].forRoot(appRoutes, { enableTracing: true }),
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MenuModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ChartModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputTextModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputMaskModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["InputTextareaModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["EditorModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["RadioButtonModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["FieldsetModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["MultiSelectModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ListboxModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SpinnerModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["SliderModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["RatingModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ContextMenuModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TabViewModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["StepsModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ScheduleModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TreeModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DataGridModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ConfirmDialogModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["DragDropModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["GalleriaModule"],
            __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["OrganizationChartModule"],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ConfirmationService"]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g\">\n\n  <p-panel header=\"Hours By Project (pie)\" class=\"ui-g-12 ui-md-6\">\n    <p-chart type=\"pie\" [data]=\"hoursByProjectChartData\"></p-chart>\n  </p-panel>\n  <p-panel header=\"Hours By Project (doughnut)\" class=\"ui-g-12 ui-md-6\">\n    <p-chart type=\"doughnut\" [data]=\"hoursByProjectChartData\"></p-chart>\n  </p-panel>\n  <p-panel header=\"Hours By Project (polarArea)\" class=\"ui-g-12 ui-md-6\">\n    <p-chart type=\"polarArea\" [data]=\"hoursByProjectChartData\"></p-chart>\n  </p-panel>\n</div>\n\n<div class=\"ui-g\">\n\n  <p-panel header=\"Hours By Team (bar)\" class=\"ui-g-12 ui-md-6\">\n    <p-chart type=\"bar\" [data]=\"hoursByTeamChartData\"></p-chart>\n  </p-panel>\n\n  <p-panel header=\"Hours By Team (line)\" class=\"ui-g-12 ui-md-6\">\n    <p-chart type=\"line\" [data]=\"hoursByTeamChartData\"></p-chart>\n  </p-panel>\n\n  <p-panel header=\"Hours By Team (radar)\" class=\"ui-g-12 ui-md-6\">\n    <p-chart type=\"radar\" height=\"150\" [data]=\"hoursByTeamChartData\"></p-chart>\n  </p-panel>\n\n  <p-panel header=\"Hours By Team (mixed)\" class=\"ui-g-12 ui-md-6\">\n    <p-chart #mixedChart type=\"bar\" [data]=\"hoursByTeamChartDataMixed\" [options]=\"chartOptions\" (onDataSelect)=\"onDataSelect($event)\"></p-chart>\n  </p-panel>\n\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

var DEFAULT_COLORS = [
    'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure',
    'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood',
    'CadetBlue', 'Chartreuse'
];
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.hoursByProject = [
            { id: 1, name: 'Payroll App', hoursSpent: 8 },
            { id: 2, name: 'Agile Times App', hoursSpent: 16 },
            { id: 3, name: 'Point of Sale App', hoursSpent: 24 },
        ];
        this.pieLabels = this.hoursByProject.map(function (proj) { return proj.name; });
        this.pieData = this.hoursByProject.map(function (proj) { return proj.hoursSpent; });
        this.pieColors = this.configureDefaultColors(this.pieData);
        this.hoursByProjectChartData = {
            labels: this.pieLabels,
            datasets: [
                {
                    data: this.pieData,
                    backgroundColor: this.pieColors
                }
            ]
        };
        this.hoursByTeamChartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Dev Team',
                    data: [65, 59, 80, 55, 67, 73],
                    backgroundColor: DEFAULT_COLORS[3],
                    fill: true
                },
                {
                    label: 'Ops Team',
                    data: [44, 63, 57, 90, 77, 70],
                    backgroundColor: DEFAULT_COLORS[5]
                }
            ]
        };
        this.hoursByTeamChartDataMixed = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Dev Team',
                    data: [65, 59, 80, 55, 67, 73],
                    backgroundColor: DEFAULT_COLORS[3],
                    fill: true
                },
                {
                    type: 'line',
                    label: 'Ops Team',
                    data: [44, 63, 57, 90, 77, 70],
                    backgroundColor: DEFAULT_COLORS[5]
                }
            ]
        };
        this.chartOptions = {
            title: {
                display: true,
                text: 'Hours By Team with Leo'
            },
            legend: {
                position: 'bottom'
            }
        };
    }
    DashboardComponent.prototype.configureDefaultColors = function (data) {
        var customColors = [];
        if (data.length) {
            customColors = data.map(function (element, idx) {
                return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
            });
        }
        return customColors;
    };
    DashboardComponent.prototype.onDataSelect = function (event) {
        var dataSetIndex = event.element._datasetIndex;
        var dataItemIndex = event.element._index;
        var labelClicked = this.hoursByTeamChartDataMixed.datasets[dataSetIndex].label;
        var valueClicked = this.hoursByTeamChartDataMixed.datasets[dataSetIndex].data[dataItemIndex];
        alert("Looks like " + labelClicked + " worked " + valueClicked + " hours");
    };
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].interval(3000).timeInterval().subscribe(function () {
            var hoursByTeam = _this.hoursByTeamChartDataMixed.datasets;
            var randomized = hoursByTeam.map(function (dataset) {
                dataset.data = dataset.data.map(function (hours) { return hours * (Math.random() * 2); });
            });
            _this.mixedChart.refresh();
        });
    };
    return DashboardComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mixedChart'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["UIChart"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["UIChart"]) === "function" && _a || Object)
], DashboardComponent.prototype, "mixedChart", void 0);
DashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__("../../../../../src/app/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/dashboard/dashboard.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], DashboardComponent);

var _a;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/to-space.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToSpacePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ToSpacePipe = (function () {
    function ToSpacePipe() {
    }
    ToSpacePipe.prototype.transform = function (value, character) {
        return value.replace(character, ' ');
    };
    return ToSpacePipe;
}());
ToSpacePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'toSpace'
    })
], ToSpacePipe);

//# sourceMappingURL=to-space.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"profile header ui-g-12\">\n  <h2>Profile Info</h2>\n  <h3>Galleria Drag and Drop</h3>\n</div>\n\n<p-panel header=\"My Profile Picture\" styleClass=\"profilePic\" class=\"ui-g-12 ui-md-4\"\n pDroppable=\"profilePic\" (onDrop)=\"onPicDrop()\">\n  <img *ngIf=\"profileImage; else showDropDiv\" [src]=\"profileImage\" alt=\"\" class=\"ui-g-12\">\n\n  <ng-template #showDropDiv class=\"ui-g-12\">\n    <span id=\"drop-message\" class=\"ui-g-12\">Drop Your Image Here</span>\n  </ng-template>\n</p-panel>\n\n<div class=\"spacer ui-g-12 ui-md-1\"></div>\n\n<p-galleria #galleria [images]=\"images\" class=\"ui-g-12 ui-md-7\"\n panelWidth=\"600\" panelHeight=\"400\"\n [showCaption]=\"true\" pDraggable=\"profilePic\"\n dragHandle=\".ui-panel-images\" (onImageClicked)=\"onImageSelected($event)\"\n (onDragStart)=\"onDragStart(galleria)\" (onDragEnd)=\"onDragEnd(galleria)\"></p-galleria>\n\n <div class=\"ui-g-12\">\n <hr />\n<h3>Organization of the Team</h3>\n<p-organizationChart [value]=\"orgData\"\n selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"onNodeSelect($event)\"\n styleClass=\"company\">\n  <ng-template let-node pTemplate=\"person\">\n    <div class=\"node-header ui-corner-top\">{{node.label}}</div>\n    <div class=\"node-content\">\n      <img src=\"http://i.pravatar.cc/600?u={{node.data.avatar}}\" alt=\"\" width=\"32\">\n      <div>{{node.data.name}}</div>\n    </div>\n  </ng-template>\n  <ng-template let-node pTemplate=\"department\">\n    {{node.label}}\n  </ng-template>\n</p-organizationChart>\n</div>\n\n\n\n\n\n\n\n<p-growl [(value)]=\"messages\"></p-growl>\n"

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".profile {\n  background-color: white;\n  font-family: \"Roboto\"; }\n\n.header {\n  padding: 1rem;\n  color: white;\n  background-color: #0275D8;\n  margin-bottom: 1rem; }\n\nh2 {\n  font-weight: bolder;\n  font-size: xx-large;\n  display: inline; }\n\nh3 {\n  font-weight: lighter;\n  font-size: xx-large;\n  display: inline; }\n\np-panel /deep/ .ui-panel-content {\n  height: 24rem; }\n\np-panel img {\n  width: 100%;\n  display: block; }\n\n#drop-message {\n  font-size: xx-large;\n  color: #2D353C;\n  background-color: lightgray;\n  width: 100%;\n  height: 85%;\n  border: 3px #2D353C solid;\n  text-align: center; }\n\np-organizationChart /deep/ .company.ui-organizationchart .ui-organizationchart-node-content.ui-person {\n  padding: 0;\n  border: 0 none; }\n\n.node-header, .node-content {\n  padding: .5em .7em; }\n\n.node-header {\n  background-color: #495ebb;\n  color: #ffffff; }\n\n.node-content {\n  text-align: center;\n  border: 1px solid #495ebb; }\n\n.node-content img {\n  border-radius: 50%; }\n\np-organizationChart /deep/ .department-cfo {\n  background-color: #7247bc;\n  color: #ffffff; }\n\np-organizationChart /deep/ .department-coo {\n  background-color: #a534b6;\n  color: #ffffff; }\n\np-organizationChart /deep/ .department-cto {\n  background-color: #e9286f;\n  color: #ffffff; }\n\np-organizationChart /deep/ .ui-person .ui-node-toggler {\n  color: #495ebb !important; }\n\np-organizationChart /deep/ .department-cto .ui-node-toggler {\n  color: #8a0a39 !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProfileComponent = (function () {
    function ProfileComponent() {
        this.images = [
            { source: 'http://i.pravatar.cc/600?u=Anne', title: 'Anne' },
            { source: 'http://i.pravatar.cc/600?u=Kerri', title: 'Kerri' },
            { source: 'http://i.pravatar.cc/600?u=Mary', title: 'Mary' },
            { source: 'http://i.pravatar.cc/600?u=Nancy', title: 'Nancy' },
            { source: 'http://i.pravatar.cc/600?u=Peta', title: 'Peta' },
        ];
        this.messages = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.orgData = [{
                label: 'CEO',
                type: 'person',
                styleClass: 'ui-person',
                expanded: true,
                data: { name: 'Walter White', 'avatar': 'walter.jpg' },
                children: [
                    {
                        label: 'CFO',
                        type: 'person',
                        styleClass: 'ui-person',
                        expanded: true,
                        data: { name: 'Saul Goodman', 'avatar': 'saul.jpg' },
                        children: [{
                                label: 'Tax',
                                styleClass: 'department-cfo'
                            },
                            {
                                label: 'Legal',
                                styleClass: 'department-cfo'
                            }],
                    },
                    {
                        label: 'COO',
                        type: 'person',
                        styleClass: 'ui-person',
                        expanded: true,
                        data: { name: 'Mike E.', 'avatar': 'mike.jpg' },
                        children: [{
                                label: 'Operations',
                                styleClass: 'department-coo'
                            }]
                    },
                    {
                        label: 'CTO',
                        type: 'person',
                        styleClass: 'ui-person',
                        expanded: true,
                        data: { name: 'Jesse Pinkman', 'avatar': 'jesse.jpg' },
                        children: [{
                                label: 'Development',
                                styleClass: 'department-cto',
                                expanded: true,
                                children: [{
                                        label: 'Analysis',
                                        styleClass: 'department-cto'
                                    },
                                    {
                                        label: 'Front End',
                                        styleClass: 'department-cto'
                                    },
                                    {
                                        label: 'Back End',
                                        styleClass: 'department-cto'
                                    }]
                            },
                            {
                                label: 'QA',
                                styleClass: 'department-cto'
                            },
                            {
                                label: 'R&D',
                                styleClass: 'department-cto'
                            }]
                    }
                ]
            }];
    };
    ProfileComponent.prototype.onNodeSelect = function (event) {
        this.messages = [{ severity: 'success', summary: 'Node Selected', detail: event.node.label }];
    };
    ProfileComponent.prototype.onImageSelected = function (event) {
        console.log(JSON.stringify(event));
    };
    ProfileComponent.prototype.onDragStart = function (galleria) {
        this.selectedProfile = this.images[galleria.activeIndex];
        galleria.stopSlideshow();
    };
    ProfileComponent.prototype.onDragEnd = function (galleria) {
        galleria.startSlideshow();
    };
    ProfileComponent.prototype.onPicDrop = function () {
        this.profileImage = this.selectedProfile.source;
        this.messages.push({ severity: 'info', summary: 'New Profile', detail: "Changed pic to " + this.selectedProfile.title });
        // console.log(JSON.stringify(this.messages));
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__("../../../../../src/app/profile/profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/profile/profile.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], ProfileComponent);

//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/projects/projects.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"projectForm\" (ngSubmit)=\"onSubmit()\" class=\"ui-g\">\n  <p-panel header=\"Add Project\" class=\"ui-g-12\">\n    <div class=\"ui-g\">\n      <label for=\"projectId\" class=\"ui-g-12 ui-md-2\">Project Id*</label>\n      <p-inputMask mask=\"aaa-999\" id=\"projectId\" formControlName=\"projectId\" placeholder=\"ABC-123\" slotChar=\"?\" class=\"ui-g-12 ui-md-5\"></p-inputMask>\n      <div class=\"ui-g-12 ui-md-5\">\n        <app-fielderror [form]=\"projectForm\" field=\"projectId\" nicename=\"Project ID\"></app-fielderror>\n      </div>\n    </div>\n\n    <div class=\"ui-g\">\n      <label for=\"description\" class=\"ui-g-12\">Description</label>\n      <p-editor id=\"description\" formControlName=\"description\" class=\"ui-g-12\" [style]=\"{'height':'200px'}\"></p-editor>\n      <div class=\"ui-g-12\">\n        <app-fielderror [form]=\"projectForm\" field=\"description\" nicename=\"Description\"></app-fielderror>\n      </div>\n    </div>\n\n    <div class=\"ui-g\">\n      <label for=\"startDate\" class=\"ui-g-12 ui-md-2\">Start Date</label>\n      <p-calendar [showIcon]=\"true\" id=\"startDate\" formControlName=\"startDate\" dateFormat=\"yy/mm/dd\" class=\"ui-g-12 ui-md-5\"></p-calendar>\n      <div class=\"ui-g-12 ui-md-5\">\n        <app-fielderror [form]=\"projectForm\" field=\"startDate\" nicename=\"Start Date\"></app-fielderror>\n      </div>\n    </div>\n\n    <div class=\"ui-g\">\n      <p-fieldset legend=\"Project Type\" class=\"ui-g-12\" [toggleable]=\"true\" [collapsed]=\"false\">\n        <p-radioButton name=\"projGroup\" label=\"Front End\" value=\"F\" formControlName=\"projectType\" class=\"ui-g-12 ui-md-2\"></p-radioButton>\n        <p-radioButton name=\"projGroup\" label=\"Back End\" value=\"B\" formControlName=\"projectType\" class=\"ui-g-12 ui-md-2\"></p-radioButton>\n        <p-radioButton name=\"projGroup\" label=\"Operation\" value=\"O\" formControlName=\"projectType\" class=\"ui-g-12 ui-md-2\"></p-radioButton>\n      </p-fieldset>\n    </div>\n\n    <div class=\"ui-g\">\n      <label for=\"leader\" class=\"ui-g-12 ui-md-2\">Assigned Leader</label>\n      <p-dropdown id=\"leader\" [options]=\"allDevs\" filter=\"true\" formControlName=\"selectedDevs\" class=\"ui-g-12 ui-md-10\">\n        <ng-template let-dev pTemplate=\"item\">\n          <img src=\"http://i.pravatar.cc/32?u={{dev.label}}\" alt=\"\" class=\"avatar\">\n          <span class=\"devName\">{{dev.label}}</span>\n        </ng-template>\n      </p-dropdown>\n\n      <label for=\"devs\" class=\"ui-g-12 ui-md-2\">Assigned Devs</label>\n      <p-multiSelect id=\"devs\" [options]=\"allDevs\" defaultLabel=\"Select a Dev or Two\" formControlName=\"selectedDevs\" class=\"ui-g-12 ui-md-10\"></p-multiSelect>\n\n      <label for=\"testers\" class=\"ui-g-12 ui-md-2\">Assigned Testers</label>\n      <p-listbox id=\"testers\" [options]=\"allDevs\" [multiple]=\"true\" [filter]=\"true\" formControlName=\"selectedDevs\" class=\"ui-g-12 ui-md-10\">\n        <ng-template let-dev pTemplate=\"item\">\n          <div class=\"ui-helper-clearfix\">\n            <img src=\"http://i.pravatar.cc/64?u={{dev.label}}\" alt=\"\" class=\"avatar\">\n            <span class=\"devName\">{{dev.value}}</span>\n          </div>\n        </ng-template>\n      </p-listbox>\n    </div>\n\n    <div class=\"ui-g\">\n      <label for=\"rating1\" class=\"ui-g-12 ui-md-2\">Project Coolness</label>\n      <p-spinner id=\"rating1\" formControlName=\"rating\" [min]=\"0\" [max]=\"5\" class=\"ui-g-12 ui-md-10\"></p-spinner>\n    </div>\n\n    <div class=\"ui-g\">\n      <label for=\"rating2\" class=\"ui-g-12 ui-md-2\">Project Coolness</label>\n      <p-slider id=\"rating2\" formControlName=\"rating\" [min]=\"0\" [max]=\"5\" class=\"ui-g-12 ui-md-5\"></p-slider>\n    </div>\n\n    <div class=\"ui-g\">\n        <label for=\"rating3\" class=\"ui-g-12 ui-md-2\">Project Coolness</label>\n        <p-rating id=\"rating3\" formControlName=\"rating\" [cancel]=\"false\" class=\"ui-g-12 ui-md-5\"></p-rating>\n        <pre class=\"ui-g-12 ui-md-5\">{{projectForm.getRawValue() | json}}</pre>\n      </div>\n\n    <button pButton type=\"submit\" [disabled]=\"hasFormErrors()\" label=\"Save\" icon=\"fa-floppy-o\"></button>\n  </p-panel>\n</form>\n\n<p-panel header=\"Projects\" class=\"ui-g-12\">\n  <h1>Upcoming Chubb Projects</h1>\n  <hr />\n  <div class=\"ui-g\">\n      <p-panel header=\"First Project\" class=\"ui-g-4\">\n        <p-footer>\n          <button pButton type=\"button\" icon=\"fa-plus\" label=\"New\" class=\"ui-button-info\"></button>\n          <button pButton type=\"button\" icon=\"fa-list\" label=\"View\" class=\"ui-button-success\"></button>\n        </p-footer>\n      </p-panel>\n      <app-card class=\"ui-g-4\" *ngFor=\"let project of projects\" [project]=\"project\" (onEdit)=\"onEdit($event)\" (onDel)=\"onDel($event)\" (onClose)=\"onClose($event)\"></app-card>\n  </div>\n</p-panel>\n\n"

/***/ }),

/***/ "../../../../../src/app/projects/projects.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "label {\n  margin-top: auto;\n  margin-bottom: auto; }\n\n:host p-listbox /deep/ .ui-listbox {\n  width: 100%;\n  height: 20rem; }\n\n.avatar {\n  display: inline-block;\n  vertical-align: middle;\n  margin: 5px 0 0 5px; }\n\n:host p-listbox .devName {\n  font-size: xx-large;\n  display: inline-block table-cell;\n  vertical-align: middle; }\n\np-rating {\n  font-size: xx-large; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/projects/projects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectsComponent = (function () {
    function ProjectsComponent(fb) {
        this.fb = fb;
        this.allDevs = [
            { label: 'Leo', value: 'Leo Lin' },
            { label: 'Ron', value: 'Ron Qian' },
            { label: 'Terry', value: 'Terry Wang' },
            { label: 'Tom', value: 'Tom Wang' },
            { label: 'Jack', value: 'Jack Sun' },
            { label: 'Bernie', value: 'Bernie Bai' },
            { label: 'Wade', value: 'Wade Jiang' },
            { label: 'Unknown', value: 'Unknown Cool' },
        ];
        this.projects = [
            {
                id: 1,
                name: 'Angular Connect',
                date: '2018/01/01',
                time: '10:01 am',
                price: 599.99,
                imageUrl: 'http://i.pravatar.cc/64?u=leo',
                location: {
                    address: '259 Nan Jing Dong Road',
                    city: 'Shanghai',
                    country: 'China'
                }
            },
            {
                id: 2,
                name: 'Angular Connect',
                date: '2018/01/01',
                time: '10:01 am',
                price: 599.99,
                imageUrl: 'http://i.pravatar.cc/64?u=leo',
                location: {
                    address: '259 Nan Jing Dong Road 259 Nan Jing Dong Road 259 Nan Jing Dong Road 259 Nan Jing Dong Road ',
                    city: 'Shanghai',
                    country: 'China'
                }
            },
            {
                id: 3,
                name: 'Angular Connect',
                date: '2018/01/01',
                time: '10:01 am',
                price: 599.99,
                imageUrl: 'http://i.pravatar.cc/64?u=jack',
                location: {
                    address: '259 Nan Jing Dong Road',
                    city: 'Shanghai',
                    country: 'China'
                }
            },
            {
                id: 4,
                name: 'Angular Connect',
                date: '2018/01/01',
                time: '10:01 am',
                price: 599.99,
                imageUrl: 'http://i.pravatar.cc/64?u=yvonne',
                location: {
                    address: '259 Nan Jing Dong Road',
                    city: 'Shanghai',
                    country: 'China'
                }
            },
            {
                id: 5,
                name: 'Angular Connect',
                date: '2018/01/01',
                time: '10:01 am',
                price: 599.99,
                imageUrl: 'http://i.pravatar.cc/64?u=sunny',
                location: {
                    address: '259 Nan Jing Dong Road',
                    city: 'Shanghai',
                    country: 'China'
                }
            }
        ];
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        this.projectForm = this.fb.group({
            projectId: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(5)]],
            description: ['My cool project', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(140)]],
            startDate: [new Date(), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            projectType: ['B'],
            selectedDevs: [[]],
            rating: [3],
        });
    };
    ProjectsComponent.prototype.hasFormErrors = function () {
        return !this.projectForm.valid;
    };
    ProjectsComponent.prototype.onSubmit = function () {
        alert(JSON.stringify(this.projectForm.value));
    };
    ProjectsComponent.prototype.onEdit = function (event) {
        console.log('received:', event);
    };
    ProjectsComponent.prototype.onDel = function (event) {
        console.log('received:', event);
    };
    ProjectsComponent.prototype.onClose = function (event) {
        console.log('received:', event);
    };
    return ProjectsComponent;
}());
ProjectsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-projects',
        template: __webpack_require__("../../../../../src/app/projects/projects.component.html"),
        styles: [__webpack_require__("../../../../../src/app/projects/projects.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _a || Object])
], ProjectsComponent);

var _a;
//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ "../../../../../src/app/reuseables/card/card.component.html":
/***/ (function(module, exports) {

module.exports = "<p-panel header=\"{{project?.name}}\">\n  <div>Date: {{project?.date}}</div>\n  <div>Time: {{project?.time}}</div>\n  <div>Price: ${{project?.price}}</div>\n  <div class=\"project-card-body\" *ngIf=\"project?.location\">\n    <span>Location: {{project?.location.address}}</span>\n    <span>&nbsp;</span>\n    <span>{{project?.location.city}}, {{project?.location.country}}</span>\n  </div>\n  <p-footer>\n    <button pButton type=\"button\" icon=\"fa-edit\" label=\"Edit\" (click)=\"toEdit()\" class=\"ui-button-info\"></button>\n    <button pButton type=\"button\" icon=\"fa-list\" label=\"Del\" (click)=\"toDel()\"  class=\"ui-button-success\"></button>\n    <button pButton type=\"button\" icon=\"fa-close\" label=\"Close\" (click)=\"toClose()\"  class=\"ui-button-warning\"></button>\n  </p-footer>\n</p-panel>\n"

/***/ }),

/***/ "../../../../../src/app/reuseables/card/card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".project-card-body {\n  min-height: 6rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/reuseables/card/card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CardComponent = (function () {
    function CardComponent() {
        this.onEdit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onDel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onClose = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    CardComponent.prototype.ngOnInit = function () {
    };
    CardComponent.prototype.toEdit = function () {
        this.onEdit.emit(this.project.name);
    };
    CardComponent.prototype.toDel = function () {
        this.onDel.emit(this.project.name);
    };
    CardComponent.prototype.toClose = function () {
        this.onClose.emit(this.project.name);
    };
    return CardComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "project", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "onEdit", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "onDel", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "onClose", void 0);
CardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-card',
        template: __webpack_require__("../../../../../src/app/reuseables/card/card.component.html"),
        styles: [__webpack_require__("../../../../../src/app/reuseables/card/card.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], CardComponent);

//# sourceMappingURL=card.component.js.map

/***/ }),

/***/ "../../../../../src/app/reuseables/fielderror/fielderror.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-message ui-messages-error\" *ngIf=\"fieldErrors(field)\">\n  <i class=\"fa fa-close\"></i>\n  <span *ngIf=\"fieldErrors(field).required\">{{ nicename }} is required</span>\n  <span *ngIf=\"fieldErrors(field).minlength\">{{ nicename }} must be >= {{ fieldErrors(field).minlength.requiredLength }} characters</span>\n  <span *ngIf=\"fieldErrors(field).maxlength\">{{ nicename }} must not exceed {{ fieldErrors(field).maxlength.requiredLength }} characters</span>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/reuseables/fielderror/fielderror.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/reuseables/fielderror/fielderror.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FielderrorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FielderrorComponent = (function () {
    function FielderrorComponent() {
    }
    FielderrorComponent.prototype.ngOnInit = function () {
    };
    FielderrorComponent.prototype.fieldErrors = function (field) {
        var controlState = this.form.controls[field];
        return (controlState.dirty && controlState.errors) ? controlState.errors : null;
    };
    return FielderrorComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('form'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]) === "function" && _a || Object)
], FielderrorComponent.prototype, "form", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('field'),
    __metadata("design:type", String)
], FielderrorComponent.prototype, "field", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('nicename'),
    __metadata("design:type", String)
], FielderrorComponent.prototype, "nicename", void 0);
FielderrorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-fielderror',
        template: __webpack_require__("../../../../../src/app/reuseables/fielderror/fielderror.component.html"),
        styles: [__webpack_require__("../../../../../src/app/reuseables/fielderror/fielderror.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], FielderrorComponent);

var _a;
//# sourceMappingURL=fielderror.component.js.map

/***/ }),

/***/ "../../../../../src/app/reuseables/statistic/statistic.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"statistic ui-g\" [style.background-color]=\"colour\">\n\n  <div class=\"icon ui-g-5\">\n    <i class=\"fa {{ icon }}\" *ngIf=\"icon\"></i>\n  </div>\n\n  <div class=\"data ui-g-7\">\n\n    <div class=\"value\">\n      {{ value }}\n    </div>\n\n    <div class=\"label\" *ngIf=\"label\">\n      {{ label }}\n    </div>\n  </div>\n\n\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/reuseables/statistic/statistic.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".statistic {\n  margin: 1em;\n  min-width: 17rem;\n  color: white;\n  text-align: center;\n  font-family: \"Roboto\"; }\n\n.icon {\n  font-size: 7rem;\n  background-color: rgba(0, 0, 0, 0.1);\n  margin: 0px;\n  padding: 5px; }\n\n.data {\n  padding: 1em;\n  vertical-align: middle; }\n\n.value {\n  padding: 3em; }\n\n.label {\n  text-transform: uppercase; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/reuseables/statistic/statistic.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatisticComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StatisticComponent = (function () {
    function StatisticComponent() {
    }
    StatisticComponent.prototype.ngOnInit = function () {
    };
    return StatisticComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], StatisticComponent.prototype, "icon", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], StatisticComponent.prototype, "label", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], StatisticComponent.prototype, "value", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], StatisticComponent.prototype, "colour", void 0);
StatisticComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-statistic',
        template: __webpack_require__("../../../../../src/app/reuseables/statistic/statistic.component.html"),
        styles: [__webpack_require__("../../../../../src/app/reuseables/statistic/statistic.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], StatisticComponent);

//# sourceMappingURL=statistic.component.js.map

/***/ }),

/***/ "../../../../../src/app/settings/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<p-panel header=\"Settings\">\n  <div class=\"ui-g\">\n    <label for=\"notify\" class=\"ui-g-12 ui-md-2\">Email To Notify:</label>\n    <input type=\"email\" id=\"notify\" placeholder=\"Enter an Email Address\" class=\"ui-g-12 ui-md-10\" required email />\n  </div>\n  <div class=\"ui-g\">\n    <label for=\"backup\" class=\"ui-g-12 ui-md-2\">Force Backup:</label>\n    <button id=\"backup\" class=\"ui-g-12 ui-md-10\">Backup System Now</button>\n  </div>\n  <div class=\"ui-g\">\n    <label for=\"statistic\" class=\"ui-g-12 ui-md-2\">Uptime Stats:</label>\n    <div id=\"statistic\" class=\"ui-g-12 ui-md-10 ui-g-nopad\">\n      <div class=\"icon ui-g-5\">\n        <i class=\"fa fa-cloud-download\"></i>\n      </div>\n      <div class=\"data ui-g-7\">\n        <div class=\"value\">20</div>\n        <div class=\"label\">Days Uptime</div>\n      </div>\n\n    </div>\n  </div>\n</p-panel>\n"

/***/ }),

/***/ "../../../../../src/app/settings/settings.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".icon {\n  font-size: 7rem;\n  background-color: rgba(0, 0, 0, 0.1);\n  margin: 0px;\n  padding: 5px; }\n\n.data {\n  padding: 1em;\n  vertical-align: middle; }\n\n.value {\n  padding: 3em; }\n\n.label {\n  text-transform: uppercase; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/settings/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsComponent = (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-settings',
        template: __webpack_require__("../../../../../src/app/settings/settings.component.html"),
        styles: [__webpack_require__("../../../../../src/app/settings/settings.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], SettingsComponent);

//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ "../../../../../src/app/timesheet/sample.people.data.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SamplePeopleData; });
var SamplePeopleData = (function () {
    function SamplePeopleData() {
    }
    return SamplePeopleData;
}());

SamplePeopleData.people = [
    { 'id': 1, 'firstName': 'Dennis', 'lastName': 'Vasquez',
        'email': 'dvasquez0@mediafire.com', 'avatar': 'http://i.pravatar.cc/100?u=Dennis' },
    { 'id': 2, 'firstName': 'Dennis', 'lastName': 'Vasquez',
        'email': 'dvasquez0@mediafire.com', 'avatar': 'http://i.pravatar.cc/100?u=Dennis' },
    { 'id': 3, 'firstName': 'Dennis', 'lastName': 'Vasquez',
        'email': 'dvasquez0@mediafire.com', 'avatar': 'http://i.pravatar.cc/100?u=Dennis' },
    { 'id': 4, 'firstName': 'Dennis', 'lastName': 'Vasquez',
        'email': 'dvasquez0@mediafire.com', 'avatar': 'http://i.pravatar.cc/100?u=Dennis' },
];
//# sourceMappingURL=sample.people.data.js.map

/***/ }),

/***/ "../../../../../src/app/timesheet/sample.projects.data.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleProjectsData; });
var SampleProjectsData = (function () {
    function SampleProjectsData() {
    }
    return SampleProjectsData;
}());

SampleProjectsData.projects = [
    {
        'label': 'Projects',
        'data': 'proj',
        'expandedIcon': 'fa-folder-open',
        'collapsedIcon': 'fa-folder',
        'selectable': false,
        'children': [
            {
                'label': 'Agile Times',
                'selectable': false,
                'data': 'agile',
                'expanedeIcon': 'fa-folder-open',
                'collapsedIcon': 'fa-folder',
                'children': [
                    { 'label': 'Frontend', 'icon': 'fa-chrome', 'data': 'fe' },
                    { 'label': 'Backend', 'icon': 'fa-cloud', 'data': 'be' },
                    { 'label': 'Operation', 'icon': 'fa-cogs', 'data': 'ops' }
                ]
            },
            {
                'label': 'Mobile App',
                'selectable': false,
                'data': 'mobile',
                'expanedeIcon': 'fa-folder-open',
                'collapsedIcon': 'fa-folder',
                'children': [
                    { 'label': 'Frontend', 'icon': 'fa-chrome', 'data': 'fe' },
                    { 'label': 'Backend', 'icon': 'fa-cloud', 'data': 'be' },
                    { 'label': 'Operation', 'icon': 'fa-cogs', 'data': 'ops' }
                ]
            }
        ]
    }
];
//# sourceMappingURL=sample.projects.data.js.map

/***/ }),

/***/ "../../../../../src/app/timesheet/timesheet.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"timesheet header ui-g-12\">\n  <h2>{{ day }}</h2>\n  <h3>{{ dateAndMonth }}</h3>\n</div>\n\n<!-- <p-tabView class=\"u-g-12 tabs\" (onChange)=\"onChangeTabs($event)\">\n  <p-tabPanel *ngFor=\"let tab of daysOfWeek\" header=\"{{tab}}\">\n    <p-dataTable [value]=\"getTimesForDay(tab)\" class=\"timesheet-grid\" role=\"tabpanel\">\n      <p-column field=\"project\" header=\"Project\"></p-column>\n      <p-column field=\"category\" header=\"Category\"></p-column>\n      <p-column field=\"startTime\" header=\"Start Time\"></p-column>\n      <p-column field=\"endTime\" header=\"End Time\"></p-column>\n    </p-dataTable>\n  </p-tabPanel>\n</p-tabView> -->\n\n<p-tabView class=\"u-g-12 tabs\" activeIndex=\"1\" (onChange)=\"onChangeTabs($event)\">\n  <p-tabPanel header=\"Monday\">\n    <p-dataTable [value]=\"getTimesForDay('Monday')\" class=\"timesheet-grid\">\n      <p-column field=\"project\" header=\"Project\"></p-column>\n      <p-column field=\"category\" header=\"Category\"></p-column>\n      <p-column field=\"startTime\" header=\"Start Time\"></p-column>\n      <p-column field=\"endTime\" header=\"End Time\"></p-column>\n    </p-dataTable>\n  </p-tabPanel>\n  <p-tabPanel header=\"Tuesday\">\n    <p-dataTable [value]=\"getTimesForDay('Tuesday')\" class=\"timesheet-grid\">\n      <p-column field=\"project\" header=\"Project\"></p-column>\n      <p-column field=\"category\" header=\"Category\"></p-column>\n      <p-column field=\"startTime\" header=\"Start Time\"></p-column>\n      <p-column field=\"endTime\" header=\"End Time\"></p-column>\n    </p-dataTable>\n  </p-tabPanel>\n</p-tabView>\n\n<button pButton label=\"Add Time Entry\" (click)=\"displayEditDialog = true\"></button>\n<p-dialog header=\"Create Time\" [modal]=\"true\" [(visible)]=\"displayEditDialog\"\n [ngSwitch]=\"dialogPageIndex\">\n  <p-steps [model]=\"dialogPages\" [(activeIndex)]=\"dialogPageIndex\" [readonly]=\"false\"></p-steps>\n\n  <div *ngSwitchCase=\"PageNames.TimePage\">\n    <p-schedule [events]=\"events\" [header]=\"headerConfig\" styleClass=\"calen\"\n     defaultView=\"agendaWeek\" [editable]=\"true\" [nowIndicator]=\"true\"\n     [allDaySlot]=\"false\"></p-schedule>\n  </div>\n\n  <div *ngSwitchCase=\"PageNames.ProjectPage\">\n    <p-tree [value]=\"projectsTree\" layout=\"horizontal\" selectionMode=\"single\"\n     [(selection)]=\"selectedProject\"></p-tree>\n  </div>\n\n  <div *ngSwitchCase=\"PageNames.PlacePage\">\n    Our place page goes here.\n  </div>\n\n  <div *ngSwitchCase=\"PageNames.PeoplePage\">\n    <p-dataGrid [value]=\"people\" [paginator]=\"true\" [rows]=\"4\">\n      <ng-template let-person pTemplate=\"item\">\n        <p-panel header=\"{{person.firstName}} {{person.lastName}}\" class=\"ui-g-12 ui-md-3\">\n          <img [src]=\"person.avatar\" [pTooltip]=\"person.email\" tooltipPosition=\"bottom\" />\n        </p-panel>\n      </ng-template>\n    </p-dataGrid>\n  </div>\n\n  <p-footer>\n    <button pButton label=\"Cancel\" icon=\"fa-times\" (click)=\"cancelDialog()\" class=\"ui-button-secondary\"></button>\n    <button pButton label=\"Save\" icon=\"fa-check\" (click)=\"saveNewEntry()\"></button>\n  </p-footer>\n</p-dialog>\n\n<p-confirmDialog #confirmDialog icon=\"fa fa-question-circle\" width=\"425\" [visible]=\"false\">\n  <p-footer>\n    <button type=\"button\" pButton icon=\"fa-close\" label=\"No, go back\" (click)=\"confirmDialog.reject()\"></button>\n    <button type=\"button\" pButton icon=\"fa-check\" label=\"Yes, lose changes\" (click)=\"confirmDialog.accept() && confirmDialog.hide()\"></button>\n  </p-footer>\n</p-confirmDialog>\n\n<p-growl [(value)]=\"messages\"></p-growl>\n"

/***/ }),

/***/ "../../../../../src/app/timesheet/timesheet.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".timesheet {\n  background-color: white;\n  font-family: \"Roboto\"; }\n\n.header {\n  padding: 1rem;\n  color: white;\n  background-color: #0275D8;\n  margin-bottom: 1rem; }\n\nh2 {\n  font-weight: bolder;\n  font-size: xx-large;\n  display: inline; }\n\nh3 {\n  font-weight: lighter;\n  font-size: xx-large;\n  display: inline; }\n\n.tabs /deep/ li {\n  width: 19%; }\n\np-dataGrid /deep/ .ui-panel {\n  border: 0px; }\n\np-dataGrid /deep/ .ui-panel-titlebar {\n  font-size: smaller;\n  background-color: #F15B2A;\n  text-align: center;\n  height: 3rem; }\n\np-dataGrid /deep/ .ui-panel-content {\n  padding: 0px; }\n\np-dataGrid /deep/ .ui-panel-content img {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/timesheet/timesheet.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PageNames */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimesheetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sample_projects_data__ = __webpack_require__("../../../../../src/app/timesheet/sample.projects.data.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sample_people_data__ = __webpack_require__("../../../../../src/app/timesheet/sample.people.data.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { MessageService } from 'primeng/components/common/messageservice';


var PageNames;
(function (PageNames) {
    PageNames[PageNames["TimePage"] = 0] = "TimePage";
    PageNames[PageNames["ProjectPage"] = 1] = "ProjectPage";
    PageNames[PageNames["PlacePage"] = 2] = "PlacePage";
    PageNames[PageNames["PeoplePage"] = 3] = "PeoplePage";
})(PageNames || (PageNames = {}));
var TimesheetComponent = (function () {
    function TimesheetComponent(confirmationService) {
        this.confirmationService = confirmationService;
        this.userTimeData = [
            { day: 'Monday', startTime: '9:00', endTime: '17:00', project: 'Agile Times', category: 'Frontend' },
            { day: 'Tuesday', startTime: '9:00', endTime: '17:00', project: 'Payroll App', category: 'Backend' },
            { day: 'Wednesday', startTime: '9:00', endTime: '17:00', project: 'Point of Sale App', category: 'Operation' },
            { day: 'Thursday', startTime: '9:00', endTime: '17:00', project: 'Mobile App', category: 'Planning' },
            { day: 'Friday', startTime: '9:00', endTime: '17:00', project: 'Agile Times', category: 'Requirement' }
        ];
        this.daysOfWeek = [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
        ];
        this.day = 'Monday';
        this.dateAndMonth = moment().day(this.day).format('MMMM Do, YYYY');
        this.displayEditDialog = false;
        this.PageNames = PageNames;
        this.dialogPageIndex = PageNames.TimePage;
        this.dialogPages = [
            { label: 'Time' },
            { label: 'Project' },
            { label: 'Place' },
            { label: 'People' }
        ];
        this.headerConfig = {
            left: 'prev, next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        this.events = [
            {
                title: 'Recent Work',
                start: moment().format(),
                end: moment().add(1, 'hour').format()
            }
        ];
        this.projectsTree = __WEBPACK_IMPORTED_MODULE_2__sample_projects_data__["a" /* SampleProjectsData */].projects;
        this.people = __WEBPACK_IMPORTED_MODULE_3__sample_people_data__["a" /* SamplePeopleData */].people;
        this.messages = [];
    }
    TimesheetComponent.prototype.getTimesForDay = function (tabName) {
        // alert(tabName);
        return this.userTimeData.filter(function (row) {
            return row.day === tabName;
        });
    };
    TimesheetComponent.prototype.onChangeTabs = function (event) {
        var index = event.index;
        this.day = this.daysOfWeek[index];
        this.dateAndMonth = moment().day(this.day).format('MMMM Do, YYYY');
    };
    TimesheetComponent.prototype.cancelDialog = function () {
        var _this = this;
        this.confirmationService.confirm({
            header: 'Cancel Time Creation',
            message: 'Cancel all changes. Are you sure?',
            accept: function () {
                _this.displayEditDialog = false;
                _this.messages.push({ severity: 'info', summary: 'Edits Cancelled', detail: 'No changes were saved' });
                // setTimeout(function() {
                //   this.messages.pop();
                // }, 5000);
            },
            reject: function () {
                console.log('False cancel. Just keep editing.');
                _this.messages.push({ severity: 'warn', summary: 'Cancelled the Cancel', detail: 'Please continue your editing' });
                // setTimeout(function() {
                //   this.messages.pop();
                // }, 5000);
            }
        });
    };
    TimesheetComponent.prototype.saveNewEntry = function () {
        this.displayEditDialog = false;
        this.messages.push({ severity: 'success', summary: 'Entry Created', detail: 'Your entry has been created' });
        // setTimeout(function() {
        //   this.messages.pop();
        // }, 5000);
    };
    TimesheetComponent.prototype.ngOnInit = function () {
        // alert(JSON.stringify(this.userTimeData));
    };
    return TimesheetComponent;
}());
TimesheetComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-timesheet',
        template: __webpack_require__("../../../../../src/app/timesheet/timesheet.component.html"),
        styles: [__webpack_require__("../../../../../src/app/timesheet/timesheet.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["ConfirmationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["ConfirmationService"]) === "function" && _a || Object])
], TimesheetComponent);

var _a;
//# sourceMappingURL=timesheet.component.js.map

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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map