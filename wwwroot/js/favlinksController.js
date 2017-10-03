(function () {
    "use strict";
    //getting the existing module
    angular.module("app-favlinks")
        .controller("favlinksController", favlinksController);
    function favlinksController($http) {
        var vm = this;
        vm.favlinks = [];
        vm.newFavlink = {};

        vm.errorMessage = "";
        vm.isBusy = true;

        //$http.get("/api/favlinks")
        $http.get("/api/favlinks")
            .then(function (response) {
                //Success
                angular.copy(response.data, vm.favlinks);
            }, function (error) {
                // Failure
                vm.errorMessage = "Failed to load data: " + error;
            })
            .finally(function () {
                vm.isBusy = false;
            });

        vm.addFavlink = function () {
            vm.isBusy = true;
            vm.errorMessage = "";
            //$http.post("/api/favlinks", vm.newFavlink)
            $http.post("/api/favlinks", vm.newFavlink)
                .then(function (response) {
                    // successs
                    vm.favlinks.push(response.data);
                    vm.newFavlink = {};
                }, function () {
                    // failure
                    vm.errorMessage = "Failed to save new favourite link";
                })
                .finally(function () {
                    vm.isBusy = false;
                });

        };
    }
})();