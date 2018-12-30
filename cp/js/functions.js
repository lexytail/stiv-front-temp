"use strict";

var drawers;
var scOptions = {wheelSpeed: 1};

    var switched = false;
    var updateTables = function() {
        if (($(window).width() < 767) && !switched) {
            switched = true;
            
            console.log($("table.responsive"));

            $("table.responsive").each(function(i, element) {console.log($(element)); splitTable($(element)); });
        } else if (switched && ($(window).width() > 767)) {
            switched = false;
            
            $("table.responsive").each(function(i, element) { unsplitTable($(element)); });
        }
    };

    function splitTable(original) {
        original.wrap("<div class='table-wrapper' />");
        var copy = original.clone();
        copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
        copy.removeClass("responsive");
        original.closest(".table-wrapper").append(copy);
        copy.wrap("<div class='pinned' />");
        original.wrap("<div class='scrollable' />");
    }

    function unsplitTable(original) {
        original.closest(".table-wrapper").find(".pinned").remove();
        original.unwrap();
        original.unwrap();
    }
(function ($) {
    
    $(window).on('load', function(){updateTables();}) ;
    $(window).on('resize', function () {updateTables();});
    
    
    
    
    $(window).on('load', function () {
        // PAGE IS FULLY LOADED
        // FADE OUT YOUR OVERLAYING DIV
        $(".loader-backdrop").fadeOut('normal');
        $(".loader-backdrop").css('background-color', 'transparent');
    });

    var $body = $('body');

    var slideDuration = 250;

    $("ul.nav-menu > li.menu").on("click", function () {
        var menuLi = this;
        $("ul.nav-menu > li.menu").not(menuLi).removeClass("open");
        $("ul.nav-menu > li.menu ul").not($("ul", menuLi)).slideUp(slideDuration);
        $(" > ul", menuLi).slideToggle(slideDuration, function () {
            $(menuLi).toggleClass("open");
        });
    });

    $("ul.sub-menu li").on('click', function (e) {
        var $current_sm_li = $(this);
        var $current_sm_li_parent = $current_sm_li.parent();

        if ($current_sm_li_parent.parent().hasClass("active")) {
            console.log('has parent');
            $("li ul", $current_sm_li_parent).not($("ul", $current_sm_li)).slideUp(slideDuration, function () {
                $("li", $current_sm_li_parent).not($current_sm_li).removeClass("active");
            });

        } else {
            $("ul.sub-menu li ul").not($(" ul", $current_sm_li)).slideUp(slideDuration, function () {
                //$("ul.sub-menu li").not($current_sm_li).removeClass("active");console.log('has not parent');
            });
        }

        $(" > ul", $current_sm_li).slideToggle(slideDuration, function () {
            $($current_sm_li).toggleClass("active");
        });

        e.stopPropagation();
    });

    //popover
    $('[data-toggle="popover"]').popover();

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // color theme panel
    $('#colorTheme, #close-setting-panel').bigSlide({
        menu: '#colorSidebar',
        easyClose: true,
        menuWidth: "280px",
        side: 'right',
        beforeOpen: function () {
            $(".menu-backdrop").toggle();
            $(".menu-backdrop").toggleClass("in");
        },
        afterClose: function () {
            $(".menu-backdrop").toggle();
            $(".menu-backdrop").toggleClass("in");
        }
    });


    /* ============================================================================================
     Scrollbar Settings
     ==============================================================================================*/
    if ($.isFunction(PerfectScrollbar)) {
        var scOptions = {
            wheelSpeed: 2
        };


        if ($('.main-menu').length > 0) {
            new PerfectScrollbar('.main-menu', scOptions);
        }

        if ($('.gx-main-content').length > 0) {
            new PerfectScrollbar('.gx-main-content', scOptions);
        }

        if ($('.dropdown-menu-perfectscrollbar').length > 0) {
            new PerfectScrollbar('.dropdown-menu-perfectscrollbar', scOptions);
        }

        if ($('.dropdown-menu-perfectscrollbar1').length > 0) {
            new PerfectScrollbar('.dropdown-menu-perfectscrollbar1', scOptions);
        }

        if ($('.color-theme-body').length > 0) {
            new PerfectScrollbar('.color-theme-body', scOptions);
        }

        $('.ps-custom-scrollbar').each(function () {
            new PerfectScrollbar(this, scOptions);
        });
    }

    // Add slideUp animation to Bootstrap dropdown when collapsing.
    $('.dropdown, .split-dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(200);
    });

    $('.dropdown, .split-dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });

    var $window = $(window);
    
    drawers = {
        states: {},
        readableName: function (handle) {
            return handle.replace(/\s|-|\.|#+/g, '_').toLowerCase();
        },
        init: function (handle, options) {
            var defaults = {
                easyClose: true,
                menuWidth: "280px",
                beforeOpen: function () {
//                    $(".menu-backdrop").show();
                    $(".menu-backdrop").addClass("in");
                },
                afterClose: function () {
                    $(".menu-backdrop").hide();
                    $(".menu-backdrop").removeClass("in");
                }
            };

            if(options && typeof options === 'object') {
                options = $.extend(defaults, options);
            } else {
                options = defaults;
            }

            var handleName = this.readableName(handle);

            if ($(handle).length > 0) {
                this.states[handleName] = $(handle).bigSlide(options);
            }
        },
        destroy: function (handle) {
            var handleName = this.readableName(handle);
            if (this.states[handleName] && typeof this.states[handleName] !== 'undefined') {
                this.states[handleName].bigSlideAPI.destroy();
                this.states[handleName] = undefined;
            }
        }
    };


    var window_width = $window.outerWidth();

    if (window_width < 992) {
        drawers.init('.menu-toggle');
        drawers.init('#gxModuleSideNav', {menu: '#gxModuleSidebar', menuWidth: "230px"});
//        drawers.init('#gxChatModuleSideNav', {menu: '#gxChatModuleSidebar'});
    } else {
        drawers.destroy('.menu-toggle');
        drawers.destroy('#gxModuleSideNav');
//        drawers.destroy('#gxChatModuleSideNav');
    }

    $window.on('resize', function () {
        window_width = $window.outerWidth();
        if (window_width < 992) {
            drawers.init('.menu-toggle');
            drawers.init('#gxModuleSideNav', {menu: '#gxModuleSidebar', menuWidth: "230px"});
//            drawers.init('#gxChatModuleSideNav', {menu: '#gxChatModuleSidebar'});
        } else {
            drawers.destroy('.menu-toggle');
            drawers.destroy('#gxModuleSideNav');
//            drawers.destroy('#gxChatModuleSideNav');
        }
    });


    /*Custom Modules Height*/
    if ($('.custom-scrollbar').length > 0) {
        calc_height();
        $window.on('resize', function () {
            calc_height();
        });
    }

    if ($('.custom-side-scrollbar').length > 0) {
        if (window_width >= 991) {
            module_sidebar_height();
        } else {
            mobile_module_sidebar_height();
        }

        $window.on('resize', function () {
            window_width = $window.outerWidth();
            if (window_width >= 991) {
                module_sidebar_height();
            } else {
                mobile_module_sidebar_height();
            }
        });
    }

})(jQuery);

function calc_height() {
    var body_height = jQuery('body').height();
    var main_header_height = jQuery('.main-header').outerHeight();
    var main_footer_height = jQuery('.gx-footer').outerHeight();

    var main_content_padding = parseInt(jQuery('.gx-main-content').css('padding-top'));

    var gxwrapper_margin = parseInt(jQuery('.gx-wrapper').css('margin-bottom'));

    var gxmodule_margin = parseInt(jQuery('.gx-module').css('margin-top')) + parseInt(jQuery('.gx-module').css('margin-bottom'));

    var modulebox_header_height = jQuery('.module-box-header').outerHeight();

    var modulebox_topbar_height = jQuery('.module-box-topbar').outerHeight();

    var module_listScroll_padding = parseInt(jQuery('.module-list-scroll').css('padding-top')) + parseInt(jQuery('.module-list-scroll').css('padding-bottom'));

    var todo_main_footer = 0;
    if(jQuery('.todo-main-footer').length > 0) {
        todo_main_footer = jQuery('.todo-main-footer').outerHeight();
    }

    var scrollbar_height = body_height - (main_header_height + main_content_padding + gxwrapper_margin + gxmodule_margin + main_footer_height + modulebox_header_height + modulebox_topbar_height + module_listScroll_padding + todo_main_footer);
    jQuery('.custom-scrollbar').height(scrollbar_height);
}

/*Sidebar height*/
function module_sidebar_height() {
    var body_height = jQuery('body').height();
    var main_header_height = jQuery('.main-header').outerHeight();
    var main_footer_height = jQuery('.gx-footer').outerHeight();

    var main_content_padding = parseInt(jQuery('.gx-main-content').css('padding-top'));

    var gxwrapper_margin = parseInt(jQuery('.gx-wrapper').css('margin-bottom'));

    var gxmodule_padding = parseInt(jQuery('.gx-module').css('padding-top'));
    var gxmodule_margin = parseInt(jQuery('.gx-module').css('margin-top')) + parseInt(jQuery('.gx-module').css('margin-bottom'));

    var module__sideheader_height = jQuery('.module-side-header').outerHeight();

    var scrollbar_height = body_height - (main_header_height + main_content_padding + gxwrapper_margin + gxmodule_padding + gxmodule_margin + module__sideheader_height + main_footer_height);
    jQuery('.custom-side-scrollbar').height(scrollbar_height);
}

function mobile_module_sidebar_height() {
    var body_height = jQuery('body').height();

    var module__sideheader_height = jQuery('.module-side-header').outerHeight();

    var scrollbar_height = body_height - (module__sideheader_height);
    jQuery('.custom-side-scrollbar').height(scrollbar_height);
}
