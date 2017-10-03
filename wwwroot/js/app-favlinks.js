(function () {
    "use strict";
    //creating the module
    angular.module("app-favlinks", ["simpleControls", "ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "favlinksController",
                controllerAs: "vm",
                //templateUrl: "/views/favlinksView.html"
                templateUrl: "/views/favlinksView.html"
            });
            $routeProvider.when("/editor/:favlinkName", {
                controller: "favlinkEditorController",
                controllerAs: "vm",
                //templateUrl: "/views/favlinkEditorView.html"
                templateUrl: "/views/favlinkEditorView.html"
            });
            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });
})();