//tripEditorController.js
(function () {
    "use strict";

    angular.module("app-favlinks")
        .controller("favlinkEditorController", favlinkEditorController);
    function favlinkEditorController($routeParams, $http, $sce) {
        var vm = this;
        vm.favlinkName = $routeParams.favlinkName;
        vm.linkName = $routeParams.linkName;
        vm.links = [];
        vm.errorMessage = "";
        vm.isBusy = true;
        vm.newLink = {};
        vm.newLink.name = "Play Demo";
        vm.currentLink = {};
        vm.currentLink.url = "https://www.bing.com/";
        vm.curUrl = $sce.trustAsResourceUrl('https://www.bing.com/');
        //var url = "/api/favlinks/" + vm.favlinkName + "/links";
        var url = "/api/favlinks/" + vm.favlinkName + "/links";
        //var url_link = "/api/favlinks/" + vm.favlinkName + "/links/";
        var url_link = "/api/favlinks/" + vm.favlinkName + "/links/";

        $http.get(url)
            .then(function (response) {
                //success
                angular.copy(response.data, vm.links);
                //_showLinkPage(vm.links);
            }, function (err) {
                //failure
                vm.errorMessage = "Failed to load links";
            })
            .finally(function () {
                vm.isBusy = false;
            });


        vm.addLink = function () {
            vm.isBusy = true;
            $http.post(url, vm.newLink)
                .then(function (response) {
                    //success
                    vm.links.push(response.data);
                    //_showLinkPage(vm.links);
                    vm.newLink = {};
                }, function () {
                    //failure
                    vm.errorMessage = "Failed to add new link";
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        };
        vm.delLink = function (delLinkId) {
            alert(delLinkId);
            vm.isBusy = true;
            $http.delete(url_link + delLinkId)
                .then(function (response) {
                    //success
                    //_showLinkPage(vm.links);
                    vm.newLink = {};
                    vm.links = [];

                    //vm.isBusy = true;
                    $http.get(url)
                        .then(function (response) {
                            //success
                            angular.copy(response.data, vm.links);
                            //_showLinkPage(vm.links);
                        }, function (err) {
                            //failure
                            vm.errorMessage = "Failed to load links";
                        })
                        .finally(function () {
                            //vm.isBusy = false;
                        });
                }, function () {
                    //failure
                    vm.errorMessage = "Failed to delete link";
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        };
        vm.editLink = function () {
            vm.isBusy = true;
            $http.put(url, vm.newLink)
                .then(function (response) {
                    //success
                    //_showLinkPage(vm.links);
                    vm.newLink = {};
                    vm.links = [];

                    //vm.isBusy = true;
                    $http.get(url)
                        .then(function (response) {
                            //success
                            angular.copy(response.data, vm.links);
                            //_showLinkPage(vm.links);
                        }, function (err) {
                            //failure
                            vm.errorMessage = "Failed to load links";
                        })
                        .finally(function () {
                            //vm.isBusy = false;
                        });
                }, function () {
                    //failure
                    vm.errorMessage = "Failed to add new link";
                })
                .finally(function () {
                    vm.isBusy = false;
                });

        };

        vm.showLink = function (linkUrl) {
            vm.isBusy = true;
            $http.get(url_link + linkUrl)
                .then(function (response) {
                    //success
                    angular.copy(response.data, vm.currentLink);
                    angular.copy(response.data, vm.newLink);
                    vm.curUrl = $sce.trustAsResourceUrl(vm.currentLink.url);
                    //_showLinkPage(vm.currentLink);
                }, function (err) {
                    //failure
                    vm.errorMessage = "Failed to load specified link";
                })
                .finally(function () {
                    vm.isBusy = false;
                });

        };
    }
    function _showLinkPage(links) {
        var linkPageUrl;
        if (links) {
            if(links.length > 0) {
                if(links.length > 1){
                    linkPageUrl = "welcome.page";
                    //Show Link Page
                    alert("The following page will be displayed : " + linkPageUrl);
                }
                else {
                    linkPageUrl = links.url;
                    //Show Link Page
                    alert("The following page will be displayed : " + linkPageUrl);
                }
            }
            else {
                alert("Links are assigned with less or equal to amount of 0 ");
            }
        }
        else {
            alert("Links are assigned with no real data");
        }

    }

})();

