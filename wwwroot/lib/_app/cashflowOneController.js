!function(){function e(e,t,n){var a=this;a.targetAmount=2e6,a.cashflowName=e.cashflowName,a.cashitems=[],a.DateMoneyData=[],a.errorMessage="",a.successMessage="",a.isBusy=!0,a.newCashitem={},a.units=[{value:"元"},{value:"￥（円）"},{value:"$(American Dollar)"}],a.directions=[{value:"In"},{value:"Out"},{value:"ByPass"}],a.currentCashitem={},a.currentCashitem.description="What do you want more?",a.totalBalance=0,a.query="",a.order="transactionDate",a.ascdesc=!0;var o="/ASPNET/api/cashflows/"+a.cashflowName+"/cashitems",i="/ASPNET/api/cashflows/"+a.cashflowName+"/cashitems/",r="/ASPNET/api/cashflows/"+a.cashflowName+"/totalBalance";t.get(o).then(function(e){angular.copy(e.data,a.cashitems),t.get(r).then(function(e){a.totalBalance=e.data},function(e){a.errorMessage="Failed to load total Balance"})["finally"](function(){a.drawChart()})},function(e){a.errorMessage="Failed to load cashitems"})["finally"](function(){a.isBusy=!1}),a.addCashitem=function(){a.isBusy=!0,a.successMessage="",delete a.newCashitem.id,t.post(o,a.newCashitem).then(function(e){a.cashitems.push(e.data),a.newCashitem.moneyAmount=null,a.errorMessage="",a.successMessage="succeeded in adding cash item",t.get(r).then(function(e){a.totalBalance=e.data},function(e){a.errorMessage="Failed to load total Balance"})["finally"](function(){a.drawChart()})},function(){a.errorMessage="Failed to add new cashitem"})["finally"](function(){a.isBusy=!1})},a.delLink=function(e){a.isBusy=!0,a.successMessage="";var n=confirm(e);1==n?t["delete"](i+e).then(function(e){a.newCashitem.moneyAmount=null,a.currentCashitem={},a.cashitems=[],a.errorMessage="",a.successMessage="succeeded in deleting cash item",t.get(o).then(function(e){angular.copy(e.data,a.cashitems),t.get(r).then(function(e){a.totalBalance=e.data},function(e){a.errorMessage="Failed to load total Balance"})["finally"](function(){})},function(e){a.errorMessage="Failed to load cashitems"})["finally"](function(){a.drawChart()})},function(){a.errorMessage="Failed to delete cashitem"})["finally"](function(){a.isBusy=!1}):a.isBusy=!1},a.editCashitem=function(){a.isBusy=!0,a.successMessage="",t.put(o,a.newCashitem).then(function(e){a.newCashitem.moneyAmount=null,a.currentCashitem={},a.cashitems=[],a.errorMessage="",a.successMessage="Succeeded in editing cashitem",t.get(o).then(function(e){angular.copy(e.data,a.cashitems),t.get(r).then(function(e){a.totalBalance=e.data},function(e){a.errorMessage="Failed to load total Balance"})["finally"](function(){a.drawChart()})},function(e){a.errorMessage="Failed to load cashitems"})["finally"](function(){})},function(){a.errorMessage="Failed to edit cashitem"})["finally"](function(){a.isBusy=!1})},a.showCashitem=function(e){a.isBusy=!0,a.successMessage="",t.get(i+e).then(function(e){angular.copy(e.data,a.currentCashitem),angular.copy(e.data,a.newCashitem),a.errorMessage="",a.successMessage=""},function(e){a.errorMessage="Failed to load specified cashitem"})["finally"](function(){a.isBusy=!1})},$("#datetimepicker1").datetimepicker({format:"YYYY-MM-DDTHH:mm:ss",useCurrent:!1}).on("dp.change",function(){n.selecteddate=$("#transactionDate").val(),a.newCashitem.transactionDate=n.selecteddate}),$("#datetimepicker2").datetimepicker({format:"YYYY-MM-DD",useCurrent:!1}).on("dp.change",function(){a.drawChart()}),$("#datetimepicker3").datetimepicker({format:"YYYY-MM-DD",useCurrent:!1}).on("dp.change",function(){a.drawChart()}),a.prepareDateMoneyData=function(e,t,n){var o=0;a.DateMoneyData=[];for(var i in n)void 0!=e&&null!=e||(e="0000-01-01"),void 0!=t&&null!=t||(t="9999-12-31"),moment(n[i].transactionDate).format("YYYY-MM-DD")<moment(e).format("YYYY-MM-DD")||moment(n[i].transactionDate).format("YYYY-MM-DD")>moment(t).format("YYYY-MM-DD")||(a.DateMoneyData[o]=n[i],o++)},a.drawChart=function(){d3.json(o,function(e,t){var n=d3.time.format("%Y-%m-%dT%H:%M:%S"),o=d3.time.format("%Y"),i=d3.time.format("%b"),r=d3.time.format("%a");a.prepareDateMoneyData(a.startDate,a.endDate,t),_.each(a.DateMoneyData,function(e){"Out"==$.trim(e.flowDirection)?e.moneyAmount=-e.moneyAmount:e.moneyAmount=+e.moneyAmount,e.transactionDate_dt=n.parse(e.transactionDate),e.transactionDate_year=+o(e.transactionDate_dt),e.transactionDate_month=i(e.transactionDate_dt),e.transactionDate_day=r(e.transactionDate_dt)});var c=crossfilter(a.DateMoneyData),s=c.dimension(function(e){return e.transactionDate_year}),u=c.dimension(dc.pluck("transactionDate_month")),l=c.dimension(dc.pluck("transactionDate_day")),d=c.dimension(dc.pluck("moneyAmount")),m=c.dimension(dc.pluck("flowDirection")),f=c.dimension(dc.pluck("fromParty")),h=c.dimension(dc.pluck("toParty")),g=c.dimension(dc.pluck("moneyUnit")),y=c.dimension(function(e){return e}),p=c.groupAll(),D=s.group().reduceSum(function(e){return e.moneyAmount}),M=u.group().reduceSum(function(e){return e.moneyAmount}),w=l.group().reduceSum(function(e){return e.moneyAmount}),A=(d.group().reduceSum(function(e){return e.moneyAmount}),m.group().reduceSum(function(e){return e.moneyAmount}),f.group().reduceSum(function(e){return e.moneyAmount}),h.group().reduceSum(function(e){return e.moneyAmount}),g.group().reduceSum(function(e){return e.moneyAmount}),dc.pieChart("#chart-ring-year")),C=dc.pieChart("#chart-ring-month"),Y=dc.rowChart("#chart-row-day"),k=dc.dataCount("#data-count"),v=dc.dataTable("#data-table");A.width(150).height(150).dimension(s).group(D).innerRadius(20),C.width(150).height(150).dimension(u).group(M).innerRadius(20).ordering(function(e){var t={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};return t[e.key]}),Y.width(150).height(150).margins({top:2,left:2,right:15,bottom:20}).dimension(l).group(w).ordering(function(e){var t={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6};return t[e.key]}).elasticX(!0).xAxis().ticks(2),k.dimension(c).group(p),v.dimension(y).group(function(e){return"dc.js insists on putting a row here so I remove it using JS"}).size(100).columns([function(e){return e.transactionDate},function(e){return e.flowDirection},function(e){return e.fromParty},function(e){return e.toParty},function(e){return e.moneyAmount},function(e){return e.moneyUnit},function(e){return e.moneyDescription}]).sortBy(dc.pluck("transactionDate")).order(d3.descending).on("renderlet",function(e){e.select("tr.dc-table-group").remove()}),d3.selectAll("a#all").on("click",function(){dc.filterAll(),dc.renderAll()}),d3.selectAll("a#year").on("click",function(){A.filterAll(),dc.redrawAll()}),d3.selectAll("a#month").on("click",function(){C.filterAll(),dc.redrawAll()}),d3.selectAll("a#day").on("click",function(){Y.filterAll(),dc.redrawAll()}),d3.selectAll("a#volume").on("click",function(){volumeChart.filterAll(),dc.redrawAll()}),dc.renderAll()})}}e.$inject=["$routeParams","$http","$scope"],angular.module("app-cashflows").controller("cashflowOneController",e)}();