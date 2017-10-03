// Write your JavaScript code.
// site.js
(function (inputParam) {

        //var ele = $("#username");
        var tempStr;
        var ele = $("#username");
        tempStr = ele.text();
        //ele.text(inputParam + "Leo Lin");
        ele.mouseenter(function () {
            ele.text("Who's your GF?");
        });
        ele.mouseleave(function () {
            ele.text(tempStr);
        });
        var main = $("#main1");

        //effective
        //main.mouseenter(function () {
        //    main.css("background-color", "#888");
        //});
        //main.mouseleave(function () {
        //    main.css("background-color", "");
        //});

        //non-effective
        //main.onmouseenter = function () {
        //    main.style = "background-color: #888;";
        //};

        //main.on("mouseenter", function () {
        //    main.style = "background-color: #888;";
        //});
        //main.on("mouseleave", function () {
        //    main.style = "";
        //});

        //var menuItems = $("ul.menu li a");
        //menuItems.on("click", function () {
        //    alert("Hello");
        //});




        var $sidebarAndWrapper = $("#sidebar, #wrapperLeo");
        var $icon = $("#sidebarToggle i.fa");
        var $sidebar = $("#sidebar, #navSide");
        var $wrapper = $("#wrapperLeo");
        var $navWrapper = $("#navWrapper");
        $("#sidebarToggle").on("click", function () {
            $sidebarAndWrapper.toggleClass("hide-sidebar");
            if ($sidebarAndWrapper.hasClass("hide-sidebar")) {
                $icon.removeClass("fa-angle-left");
                $icon.addClass("fa-angle-right");
                $wrapper.removeClass("col-lg-11");
                $wrapper.removeClass("col-md-10");
                $wrapper.removeClass("col-sm-9");
                $wrapper.removeClass("col-xs-8");
                $wrapper.addClass("col-lg-12");
                $wrapper.addClass("col-md-12");
                $wrapper.addClass("col-sm-12");
                $wrapper.addClass("col-xs-12");
                $navWrapper.removeClass("col-lg-11");
                $navWrapper.removeClass("col-md-10");
                $navWrapper.removeClass("col-sm-9");
                $navWrapper.removeClass("col-xs-8");
                $navWrapper.addClass("col-lg-12");
                $navWrapper.addClass("col-md-12");
                $navWrapper.addClass("col-sm-12");
                $navWrapper.addClass("col-xs-12");
                $navWrapper.addClass("aniTrans");
                //$sidebar.removeClass("col-md-1");
                //$sidebar.addClass("hidden-lg");
                //$sidebar.addClass("col-lg-pull-1");
                //$sidebar.addClass("col-md-pull-2");
                //$sidebar.addClass("col-sm-pull-3");
                //$sidebar.addClass("col-xs-pull-4");
                $wrapper.removeClass("col-lg-push-1");
                $wrapper.removeClass("col-md-push-2");
                $wrapper.removeClass("col-sm-push-3");
                $wrapper.removeClass("col-xs-push-4");

            } else {
                $icon.removeClass("fa-angle-right");
                $icon.addClass("fa-angle-left");
                $wrapper.removeClass("col-lg-12");
                $wrapper.removeClass("col-md-12");
                $wrapper.removeClass("col-sm-12");
                $wrapper.removeClass("col-xs-12");
                $wrapper.addClass("col-lg-11");
                $wrapper.addClass("col-md-10");
                $wrapper.addClass("col-sm-9");
                $wrapper.addClass("col-xs-8");
                $navWrapper.removeClass("col-lg-12");
                $navWrapper.removeClass("col-md-12");
                $navWrapper.removeClass("col-sm-12");
                $navWrapper.removeClass("col-xs-12");
                $navWrapper.addClass("col-lg-11");
                $navWrapper.addClass("col-md-10");
                $navWrapper.addClass("col-sm-9");
                $navWrapper.addClass("col-xs-8");
                $navWrapper.removeClass("aniTrans");
                //$sidebar.addClass("col-md-1");
                //$sidebar.removeClass("hidden-lg");
                //$sidebar.removeClass("col-lg-pull-1");
                //$sidebar.removeClass("col-md-pull-2");
                //$sidebar.removeClass("col-sm-pull-3");
                //$sidebar.removeClass("col-xs-pull-4");
                $wrapper.addClass("col-lg-push-1");
                $wrapper.addClass("col-md-push-2");
                $wrapper.addClass("col-sm-push-3");
                $wrapper.addClass("col-xs-push-4");
            }
        });

        //var $forHighlight = $("#testHighlight1");
        //var $forCodestyle = $("#codeStyle1");
        //var $forHLObject = hljs.highlightAuto("int abcde = 123;");
        //alert($forHighlight.text());
        //alert($forHLObject.value);
        //alert("hljs " + $forHLObject.language);

        $(document).ready(function () {
            //$('pre code').each(function (i, block) {
            //    hljs.highlightBlock(block);
            //});
            //hljs.initHighlighting();
            //$forCodestyle.attr("class", "hljs " + $forHLObject.language);
            //var $forHighlight = $("#testHighlight1");
            //$forHighlight.html("<p>This is</p>");
            //alert($forHLObject.value);
            //alert("OK");
            var $navBarHeight = $("#nav1").outerHeight();
            var $footerHeight = $("footer").outerHeight();
            var $wrapper = $("#wrapperLeo");
            $wrapper.css("margin-top", $navBarHeight);
            $wrapper.css("margin-bottom", $footerHeight);
        });


        //alert($("myChart").text);
        //var ctx = $("#myChart").getContext("2d");
        //This will get the first returned node in the jQuery collection.
        //var myNewChart = new Chart(ctx).Radar(data,options);


        $(window).resize(function () {
            //var $iframeObj = $("#framePage");
            var $navBarHeight = $("#nav1").outerHeight();
            var $footerHeight = $("footer").outerHeight();
            var $wrapper = $("#wrapperLeo");

            //$iframeObj.height = document.documentElement.clientHeight;
            $wrapper.css("margin-top", $navBarHeight);
            $wrapper.css("margin-bottom", $footerHeight);
            //alert($navBarHeight);
        });
    })("Hello, ");

