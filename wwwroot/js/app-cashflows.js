(function () {
    "use strict";
    //creating the module
    angular.module("app-cashflows", ["simpleControls", "ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "cashflowsController",
                controllerAs: "vm",
                //templateUrl: "/views/cashflowsView.html"
                templateUrl: "/views/cashflowsView.html"
            });
            $routeProvider.when("/:cashflowName", {
                controller: "cashflowOneController",
                controllerAs: "vm",
                //templateUrl: "/views/cashflowOneView.html"
                templateUrl: "/views/cashflowOneView.html"
            });
            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });
})();