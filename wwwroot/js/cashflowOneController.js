//tripEditorController.js
(function () {
    //"use strict";
    angular.module("app-cashflows")
        .controller("cashflowOneController", cashflowOneController);
    function cashflowOneController($routeParams, $http, $scope) {


        var vm = this;
        vm.targetAmount = 2000000;
        vm.cashflowName = $routeParams.cashflowName;
        //vm.cashitemName = $routeParams.cashitemName;
        vm.cashitems = [];
        vm.DateMoneyData = [];
        vm.errorMessage = "";
        vm.successMessage = "";
        vm.isBusy = true;
        vm.newCashitem = {};
        //vm.newCashitem.name = "Play Demo";
        vm.units = [
            { 'value': '元' },
            { 'value': '￥（円）' },
            { 'value': '$(American Dollar)' },
        ]
        vm.directions = [
            { 'value': 'In' },
            { 'value': 'Out' },
            { 'value': 'ByPass' },
        ]
        //vm.unit = vm.units[0];
        vm.currentCashitem = {};
        vm.currentCashitem.description = "What do you want more?";
        vm.totalBalance = 0;
        vm.query = "";
        vm.order = "transactionDate";
        vm.ascdesc = true;

        //var url = "/api/cashflows/" + vm.cashflowName + "/cashitems";
        var url = "/api/cashflows/" + vm.cashflowName + "/cashitems";
        //var url_cashitem = "/api/cashflows/" + vm.cashflowName + "/cashitems/";
        var url_cashitem = "/api/cashflows/" + vm.cashflowName + "/cashitems/";
        //var url_totalBalance = "/api/cashflows/" + vm.cashflowName + "/totalBalance";
        var url_totalBalance = "/api/cashflows/" + vm.cashflowName + "/totalBalance";



        $http.get(url)
            .then(function (response) {
                //success
                angular.copy(response.data, vm.cashitems);
//chart.js part1
                //vm.prepareDateMoneyData("2012-01-01", "2016-06-01");
                //alert(vm.DateMoneyData[0].x);
                $http.get(url_totalBalance)
                    .then(function (response) {
                        //success
                        vm.totalBalance = response.data;
                        //vm.errorMessage = "";
                        //_showLinkPage(vm.links);
                    }, function (err) {
                        //failure
                        vm.errorMessage = "Failed to load total Balance";
                    })
                    .finally(function () {
                        //vm.isBusy = false;
                        vm.drawChart();
                    });
                //_showLinkPage(vm.links);
            }, function (err) {
                //failure
                vm.errorMessage = "Failed to load cashitems";
            })
            .finally(function () {
                vm.isBusy = false;
            });

        vm.addCashitem = function () {
            vm.isBusy = true;
            vm.successMessage = "";
            delete vm.newCashitem.id;
            $http.post(url, vm.newCashitem)
                .then(function (response) {
                    //success
                    vm.cashitems.push(response.data);
                    //_showLinkPage(vm.links);
                    vm.newCashitem.moneyAmount = null;
                    vm.errorMessage = "";
                    vm.successMessage = "succeeded in adding cash item";
                    $http.get(url_totalBalance)
                        .then(function (response) {
                            //success
                            vm.totalBalance = response.data;
                            //vm.errorMessage = "";
                            //_showLinkPage(vm.links);
                        }, function (err) {
                            //failure
                            vm.errorMessage = "Failed to load total Balance";
                        })
                        .finally(function () {
                            //vm.isBusy = false;
                            vm.drawChart();
                        });
                }, function () {
                    //failure
                    vm.errorMessage = "Failed to add new cashitem";
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        };
        vm.delLink = function (delCashitemId) {
            vm.isBusy = true;
            vm.successMessage = "";
            var tempFlag = confirm(delCashitemId);
            if (tempFlag == true)
            {
                $http.delete(url_cashitem + delCashitemId)
                    .then(function (response) {
                        //success
                        //_showLinkPage(vm.links);
                        vm.newCashitem.moneyAmount = null;
                        vm.currentCashitem = {};
                        vm.cashitems = [];
                        vm.errorMessage = "";
                        vm.successMessage = "succeeded in deleting cash item";
                        //vm.isBusy = true;
                        $http.get(url)
                            .then(function (response) {
                                //success
                                angular.copy(response.data, vm.cashitems);
                                //vm.errorMessage = "";
                                $http.get(url_totalBalance)
                                    .then(function (response) {
                                        //success
                                        vm.totalBalance = response.data;
                                        //vm.errorMessage = "";
                                        //_showLinkPage(vm.links);
                                    }, function (err) {
                                        //failure
                                        vm.errorMessage = "Failed to load total Balance";
                                    })
                                    .finally(function () {
                                        //vm.isBusy = false;
                                    });
                                //_showLinkPage(vm.links);
                            }, function (err) {
                                //failure
                                vm.errorMessage = "Failed to load cashitems";
                            })
                            .finally(function () {
                                //vm.isBusy = false;
                                vm.drawChart();
                            });
                    }, function () {
                        //failure
                        vm.errorMessage = "Failed to delete cashitem";
                    })
                    .finally(function () {
                        vm.isBusy = false;
                    });
            }
            else
            {
                vm.isBusy = false;
            }

        };
        vm.editCashitem = function () {
            vm.isBusy = true;
            vm.successMessage = "";
            $http.put(url, vm.newCashitem)
                .then(function (response) {
                    //success
                    //_showLinkPage(vm.links);
                    vm.newCashitem.moneyAmount = null;
                    vm.currentCashitem = {};
                    vm.cashitems = [];
                    vm.errorMessage = "";
                    vm.successMessage = "Succeeded in editing cashitem";
                    //vm.isBusy = true;
                    $http.get(url)
                        .then(function (response) {
                            //success
                            angular.copy(response.data, vm.cashitems);
                            //vm.errorMessage = "";
                            $http.get(url_totalBalance)
                                .then(function (response) {
                                    //success
                                    vm.totalBalance = response.data;
                                    //vm.errorMessage = "";
                                    //_showLinkPage(vm.links);
                                }, function (err) {
                                    //failure
                                    vm.errorMessage = "Failed to load total Balance";
                                })
                                .finally(function () {
                                    //vm.isBusy = false;
                                    vm.drawChart();
                                });
                            //_showLinkPage(vm.links);
                        }, function (err) {
                            //failure
                            vm.errorMessage = "Failed to load cashitems";
                        })
                        .finally(function () {
                            //vm.isBusy = false;
                        });
                }, function () {
                    //failure
                    vm.errorMessage = "Failed to edit cashitem";
                })
                .finally(function () {
                    vm.isBusy = false;
                });

        };

        vm.showCashitem = function (cashitemId) {
            vm.isBusy = true;
            vm.successMessage = "";
            $http.get(url_cashitem + cashitemId)
                .then(function (response) {
                    //success
                    angular.copy(response.data, vm.currentCashitem);
                    angular.copy(response.data, vm.newCashitem);
                    vm.errorMessage = "";
                    vm.successMessage = "";
                    //alert(vm.newCashitem.transactionDate);
                    //_showLinkPage(vm.currentLink);
                }, function (err) {
                    //failure
                    vm.errorMessage = "Failed to load specified cashitem";
                })
                .finally(function () {
                    vm.isBusy = false;
                });

        };

        //$(function () {
        //    $('#datetimepicker1').datetimepicker();
        //});

        $('#datetimepicker1').datetimepicker({
            format: 'YYYY-MM-DDTHH:mm:ss',
            useCurrent: false
        }).on("dp.change", function () {
            $scope.selecteddate = $("#transactionDate").val();
            //alert("selected date is " + $scope.selecteddate);
            vm.newCashitem.transactionDate = $scope.selecteddate;
        });
        $('#datetimepicker2').datetimepicker({
            format: 'YYYY-MM-DD',
            useCurrent: false
        }).on("dp.change", function () {
            //alert("start date changed");
            vm.drawChart();
        });
        $('#datetimepicker3').datetimepicker({
            format: 'YYYY-MM-DD',
            useCurrent: false
        }).on("dp.change", function () {
            //alert("end date changed");
            vm.drawChart();
        });
//chart.js part 2
        //var data = {
        //    datasets: [{
        //        label: 'Scatter Dataset',
        //        data: vm.DateMoneyData
        //    }]
        //};
        //var options = {
        //    scales: {
        //        xAxes: [{
        //            type: 'linear',
        //            position: 'bottom'
        //        }]
        //    }
        //};
        //var ctx = $("#myChart");
        //var myChart = new Chart(ctx, {
        //    type: 'line',
        //    data: data,
        //    options: options,
        //});

        //chart.js part 3
        vm.prepareDateMoneyData = function (startDate, endDate, data) {
            var i = 0;
            //alert(data.length);
            vm.DateMoneyData = [];
            for (var cashitemNo in data) {
                //alert(vm.cashitems[0].transactionDate);
                //alert(vm.cashitem);
                //alert(cashitem.transactionDate);
                if (startDate == undefined || startDate == null) {
                    startDate = '0000-01-01';
                }
                if (endDate == undefined || endDate == null) {
                    endDate = '9999-12-31';
                }

                //alert(moment(startDate).format('YYYY-MM-DD'));
                //alert(moment(endDate).format('YYYY-MM-DD'));
                //alert(data[cashitemNo].transactionDate);
                if (moment(data[cashitemNo].transactionDate).format('YYYY-MM-DD') < moment(startDate).format('YYYY-MM-DD') || moment(data[cashitemNo].transactionDate).format('YYYY-MM-DD') > moment(endDate).format('YYYY-MM-DD')) {

                } else {

                    vm.DateMoneyData[i] = data[cashitemNo];
                    i++;
                }
            }
        };

        /* instantiate and configure map */
        //var map = L.map('leafletMap');
        //var breweryMarkers = new L.FeatureGroup();

        //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        //    id: 'mapbox.wheatpaste',
        //    accessToken: 'pk.eyJ1IjoibGVvbGluMTYiLCJhIjoiY2lwMG4zM3RvMDBpanc5a2prczN0Z2RnbiJ9.xW9p4yqGv8mHkOSwfWRbcw',
        //    maxZoom: 16
        //}).addTo(map);

        ////test
        //vm.wrapper = {
        //    "test": vm.cashitems
        //};
        vm.drawChart = function () {
            d3.json(url, function (error, data) {
                //var testData = data.test;
                var fullDateFormatMoney = d3.time.format('%Y-%m-%dT%H:%M:%S');
                var yearFormatMoney = d3.time.format('%Y');
                var monthFormatMoney = d3.time.format('%b');
                var dayOfWeekFormatMoney = d3.time.format('%a');
                vm.prepareDateMoneyData(vm.startDate, vm.endDate, data);
                _.each(vm.DateMoneyData, function (d) {
                    // round to nearest 500
                    if ($.trim(d.flowDirection) == "Out") {
                        //d.moneyAmount = Math.round(-d.moneyAmount / 500) * 500;
                        d.moneyAmount = -d.moneyAmount;
                    } else {
                        //d.moneyAmount = Math.round(+d.moneyAmount / 500) * 500;
                        d.moneyAmount = +d.moneyAmount;
                    }

                    d.transactionDate_dt = fullDateFormatMoney.parse(d.transactionDate);
                    //alert(d.transactionDate_dt);
                    d.transactionDate_year = +yearFormatMoney(d.transactionDate_dt);
                    d.transactionDate_month = monthFormatMoney(d.transactionDate_dt);
                    //alert(d.transactionDate_month);
                    d.transactionDate_day = dayOfWeekFormatMoney(d.transactionDate_dt);
                    //alert(d.transactionDate_day);
                });
                // set crossfilter
                var ndxMoney = crossfilter(vm.DateMoneyData);

                // create dimensions (x-axis values)
                var yearDimMoney = ndxMoney.dimension(function (d) { return d.transactionDate_year; }),
                    // dc.pluck: short-hand for same kind of anon. function we used for yearDim
                    monthDimMoney = ndxMoney.dimension(dc.pluck('transactionDate_month')),
                    dayOfWeekDimMoney = ndxMoney.dimension(dc.pluck('transactionDate_day')),
                    moneyAmountDimMoney = ndxMoney.dimension(dc.pluck('moneyAmount')),
                    flowDirectionDimMoney = ndxMoney.dimension(dc.pluck('flowDirection')),
                    fromPartyDimMoney = ndxMoney.dimension(dc.pluck('fromParty')),
                    toPartyDimMoney = ndxMoney.dimension(dc.pluck('toParty')),
                    moneyUnitDimMoney = ndxMoney.dimension(dc.pluck('moneyUnit')),
                allDimMoney = ndxMoney.dimension(function (d) { return d; });

                // create groups (y-axis values)
                var all = ndxMoney.groupAll();
                var countPerYearMoney = yearDimMoney.group().reduceSum(function (d) { return d.moneyAmount; }),
                    countPerMonthMoney = monthDimMoney.group().reduceSum(function (d) { return d.moneyAmount; }),
                    countPerDayMoney = dayOfWeekDimMoney.group().reduceSum(function (d) { return d.moneyAmount; }),
                    countPerMAMoney = moneyAmountDimMoney.group().reduceSum(function (d) { return d.moneyAmount; }),
                    countPerFLMoney = flowDirectionDimMoney.group().reduceSum(function (d) { return d.moneyAmount; }),
                    countPerFPMoney = fromPartyDimMoney.group().reduceSum(function (d) { return d.moneyAmount; }),
                    countPerTPMoney = toPartyDimMoney.group().reduceSum(function (d) { return d.moneyAmount; }),
                    countPerMUMoney = moneyUnitDimMoney.group().reduceSum(function (d) { return d.moneyAmount; });

                // specify charts
                var yearChart = dc.pieChart('#chart-ring-year'),
                    monthChart = dc.pieChart('#chart-ring-month'),//dc.barChart('#monthly-volume-chart');
                    dayChart = dc.rowChart('#chart-row-day'),//dc.rowChart('#day-of-week-chart');
                    //volumeChart = dc.lineChart('#chart-line-volume'),
                //    moneyAmountChart = dc.barChart('#chart-money-amount'),//not used
                //    flowDirectionChart = dc.barChart('#chart-flow-direction'),//dc.pieChart('#gain-loss-chart');
                //    fromPartyChart = dc.barChart('#chart-from-party'),//dc.pieChart('#gain-loss-chart');
                //    toPartyChart = dc.barChart('#chart-to-party'),
                //    moneyUnitChart = dc.barChart('#chart-money-unit'),
                    dataCount = dc.dataCount('#data-count'),
                dataTable = dc.dataTable('#data-table');


                yearChart
                    .width(150)
                    .height(150)
                    .dimension(yearDimMoney)
                    .group(countPerYearMoney)
                    .innerRadius(20);

                monthChart
                    .width(150)
                    .height(150)
                    .dimension(monthDimMoney)
                    .group(countPerMonthMoney)
                    .innerRadius(20)
                    .ordering(function (d) {
                        var order = {
                            'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4,
                            'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8,
                            'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
                        };
                        return order[d.key];
                    });

                dayChart /* dc.rowChart('#day-of-week-chart', 'chartGroup') */
                    .width(150)
                    .height(150)
                    .margins({ top: 2, left: 2, right: 15, bottom: 20 })
                    .dimension(dayOfWeekDimMoney)
                    .group(countPerDayMoney)
                    .ordering(function (d) {
                        var order = {
                            'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3,
                            'Fri': 4, 'Sat': 5, 'Sun': 6
                        }
                        return order[d.key];
                    })
                    // Assign colors to each value in the x scale domain
                    //.ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
                    //.label(function (d) {
                    //    return d.key.split('.')[1];
                    //})
                    // Title sets the row text
                    //.title(function (d) {
                    //    return d.value;
                    //})
                    .elasticX(true)
                    .xAxis().ticks(2);

                //volumeChart /* dc.lineChart('#monthly-move-chart', 'chartGroup') */
                //    //.renderArea(true)
                //    .width(700)
                //    .height(200)
                //    .transitionDuration(1000)
                //    .margins({ top: 30, right: 50, bottom: 25, left: 40 })
                //    .dimension(monthDimMoney)
                //    .mouseZoomable(true)
                //// Specify a "range chart" to link its brush extent with the zoom of the current "focus chart".
                //    //.rangeChart(volumeChart)
                //    .x(d3.time.scale().domain([new Date(2012, 0, 1), new Date(2016, 11, 31)]))
                //    .round(d3.time.month.round)
                //    .xUnits(d3.time.months)
                //    .elasticY(true)
                //    .renderHorizontalGridLines(true)
                ////##### Legend

                //    // Position the legend relative to the chart origin and specify items' height and separation.
                //    .legend(dc.legend().x(600).y(10).itemHeight(13).gap(5))
                //    .brushOn(false)
                //    // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
                //    // legend.
                //    // The `.valueAccessor` will be used for the base layer
                //    .group(countPerMonthMoney);
                //    //.valueAccessor(function (d) {
                //    //    return d.value;
                //    //})
                //    // Stack additional layers with `.stack`. The first paramenter is a new group.
                //    // The second parameter is the series name. The third is a value accessor.

                //    // Title can be called by any stack layer.

                //moneyAmountChart
                //    .width(300)
                //    .height(180)
                //    .dimension(ratingDim)
                //    .group(countPerRating)
                //    .x(d3.scale.linear().domain([0, 5.2]))
                //    .elasticY(true)
                //    .centerBar(true)
                //    .barPadding(5)
                //    .xAxisLabel('My rating')
                //    .yAxisLabel('Count')
                //    .margins({ top: 10, right: 20, bottom: 50, left: 50 });
                //moneyAmountChart.xAxis().tickValues([0, 1, 2, 3, 4, 5]);

                //flowDirectionChart
                //    .width(300)
                //    .height(180)
                //    .dimension(flowDirectionDimMoney)
                //    .group(countPerFLMoney)
                //    .x(d3.scale.linear().domain([0, 5.2]))
                //    .elasticY(true)
                //    .centerBar(true)
                //    .barPadding(5)
                //    .xAxisLabel('Community rating')
                //    .yAxisLabel('Count')
                //    .margins({ top: 10, right: 20, bottom: 50, left: 50 });
                //flowDirectionChart.xAxis().tickValues([0, 1, 2, 3, 4, 5]);

                //fromPartyChart
                //    .width(300)
                //    .height(180)
                //    .dimension(abvDim)
                //    .group(countPerABV)
                //    .x(d3.scale.linear().domain([-0.2, d3.max(beerData, function (d) { return d.beer.beer_abv; }) + 0.2]))
                //    .elasticY(true)
                //    .centerBar(true)
                //    .barPadding(2)
                //    .xAxisLabel('Alcohol By Volume (%)')
                //    .yAxisLabel('Count')
                //    .margins({ top: 10, right: 20, bottom: 50, left: 50 });

                //toPartyChart
                //    .width(300)
                //    .height(180)
                //    .dimension(ibuDim)
                //    .group(countPerIBU)
                //    .x(d3.scale.linear().domain([-2, d3.max(beerData, function (d) { return d.beer.beer_ibu; }) + 2]))
                //    .elasticY(true)
                //    .centerBar(true)
                //    .barPadding(5)
                //    .xAxisLabel('International Bitterness Units')
                //    .yAxisLabel('Count')
                //    .xUnits(function (d) { return 5; })
                //    .margins({ top: 10, right: 20, bottom: 50, left: 50 });

                //moneyUnitChart
                //    .width(300)
                //    .height(180)
                //    .dimension(ibuDim)
                //    .group(countPerIBU)
                //    .x(d3.scale.linear().domain([-2, d3.max(beerData, function (d) { return d.beer.beer_ibu; }) + 2]))
                //    .elasticY(true)
                //    .centerBar(true)
                //    .barPadding(5)
                //    .xAxisLabel('International Bitterness Units')
                //    .yAxisLabel('Count')
                //    .xUnits(function (d) { return 5; })
                //    .margins({ top: 10, right: 20, bottom: 50, left: 50 });

                dataCount
                    .dimension(ndxMoney)
                    .group(all);

                dataTable
                 .dimension(allDimMoney)
                 .group(function (d) { return 'dc.js insists on putting a row here so I remove it using JS'; })
                 .size(100)
                 .columns([
                   function (d) { return d.transactionDate; },
                   function (d) { return d.flowDirection; },
                   function (d) { return d.fromParty; },
                   function (d) { return d.toParty; },
                   function (d) { return d.moneyAmount; },
                   function (d) { return d.moneyUnit; },
                   function (d) { return d.moneyDescription; }
                 ])
                 .sortBy(dc.pluck('transactionDate'))
                 .order(d3.descending)
                 .on('renderlet', function (table) {
                     // each time table is rendered remove nasty extra row dc.js insists on adding
                     table.select('tr.dc-table-group').remove();

                     // update map with breweries to match filtered data
                     //breweryMarkers.clearLayers();
                     //_.each(allDimMoney.top(Infinity), function (d) {
                     //    var loc = d.brewery.location;
                     //    var name = d.brewery.brewery_name;
                     //    var marker = L.marker([loc.lat, loc.lng]);
                     //    marker.bindPopup("<p>" + name + " " + loc.brewery_city + " " + loc.brewery_state + "</p>");
                     //    breweryMarkers.addLayer(marker);
                     //});
                     //map.addLayer(breweryMarkers);
                     //map.fitBounds(breweryMarkers.getBounds());
                 });

                // register handlers
                d3.selectAll('a#all').on('click', function () {
                    dc.filterAll();
                    dc.renderAll();
                });

                d3.selectAll('a#year').on('click', function () {
                    yearChart.filterAll();
                    dc.redrawAll();
                });

                d3.selectAll('a#month').on('click', function () {
                    monthChart.filterAll();
                    dc.redrawAll();
                });

                d3.selectAll('a#day').on('click', function () {
                    dayChart.filterAll();
                    dc.redrawAll();
                });

                d3.selectAll('a#volume').on('click', function () {
                    volumeChart.filterAll();
                    dc.redrawAll();
                });

                // showtime!
                dc.renderAll();
            });

        };



    }


    //function _showLinkPage(cashitems) {
    //    var linkPageUrl;
    //    if (cashitems) {
    //        if (cashitems.length > 0) {
    //            if (cashitems.length > 1) {
    //                linkPageUrl = "welcome.page";
    //                //Show Link Page
    //                alert("The following page will be displayed : " + linkPageUrl);
    //            }
    //            else {
    //                linkPageUrl = cashitems.url;
    //                //Show Link Page
    //                alert("The following page will be displayed : " + linkPageUrl);
    //            }
    //        }
    //        else {
    //            alert("Links are assigned with less or equal to amount of 0 ");
    //        }
    //    }
    //    else {
    //        alert("Links are assigned with no real data");
    //    }

    //}

})();
//$(function () {
//    $('#datetimepicker1').datetimepicker();
//});
