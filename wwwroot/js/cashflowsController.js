(function () {
    "use strict";
    //getting the existing module
    angular.module("app-cashflows")
        .controller("cashflowsController", cashflowsController);
    function cashflowsController($http) {
        var vm = this;
        vm.cashflows = [];
        vm.newCashflow = {};

        vm.errorMessage = "";
        vm.isBusy = true;

        //$http.get("/api/cashflows")
        $http.get("/api/cashflows")
            .then(function (response) {
                //Success
                angular.copy(response.data, vm.cashflows);
            }, function (error) {
                // Failure
                vm.errorMessage = "Failed to load data: " + error;
            })
            .finally(function () {
                vm.isBusy = false;
            });

        vm.addCashflow = function () {
            vm.isBusy = true;
            vm.errorMessage = "";
            //$http.post("/api/cashflows", vm.newCashflow)
            $http.post("/api/cashflows", vm.newCashflow)
                .then(function (response) {
                    // successs
                    vm.cashflows.push(response.data);
                    vm.newCashflow = {};
                }, function () {
                    // failure
                    vm.errorMessage = "Failed to save new cash flow";
                })
                .finally(function () {
                    vm.isBusy = false;
                });

        };
    }
})();