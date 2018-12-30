<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <title>STIV</title>

    <link rel='shortcut icon' type='image/x-icon' href='images/favicon.ico' />

    <link rel="stylesheet" href="/cp/fonts/material-design-iconic-font/css/material-design-iconic-font.min.css?<?php echo time(); ?>">
    <link href="/cp/css/jumbo-bootstrap.css?<?php echo time(); ?>" rel="stylesheet">
    <link href="/cp/css/jumbo-core.min.css?<?php echo time(); ?>" rel="stylesheet">
    <link href="/cp/css/datepicker.min.css?<?php echo time(); ?>" rel="stylesheet" type="text/css">
    <link id="override-css-id" href="/cp/css/theme-dark-blue.css?<?php echo time(); ?>" rel="stylesheet">
    <link href="/cp/assets/perfect-scrollbar/css/perfect-scrollbar.css?<?php echo time(); ?>" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
    
    <link href="/cp/css/main.css?<?php echo time(); ?>" rel="stylesheet">

    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js?<?php echo time(); ?>"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js?<?php echo time(); ?>"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js?<?php echo time(); ?>"></script>

    <!--script type="text/javascript" id="hde-kb-widget" data-host="support.insaev.ru" data-lang="ru">(function () {function a() {var b = document.createElement("script");b.charset = "utf-8";b.src = "//support.insaev.ru/custom/kb-widget-init.js?<?php echo time(); ?>";b.type = "text/javascript";b.async = !0;var a = document.getElementById("hde-kb-widget");a.parentNode.insertBefore(b, a)}window.attachEvent ? window.attachEvent("onload", a) : window.addEventListener("load", a, !1)})();</script-->

    <script type="text/javascript" id="hde-kb-widget" data-host="support.insaev.ru" data-lang="ru">(function () {function a() {var b = document.createElement("script");b.charset = "utf-8";b.src = "//support.insaev.ru/custom/kb-widget-init.js";b.type = "text/javascript";b.async = !0;var a = document.getElementById("hde-kb-widget");a.parentNode.insertBefore(b, a)}window.attachEvent ? window.attachEvent("onload", a) : window.addEventListener("load", a, !1)})();</script>
    <style>#hde-kb-btn.hde-kb-btn-hover{top:67px !important;}</style>
</head>

<body id="body" data-theme="dark-blue" class="dark-blue">


<div class="loader-backdrop">
    <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
        </svg>
    </div>
</div>

<div class="gx-container" id="main">

    <div id="menu" class="side-nav gx-sidebar">
        <div class="navbar-expand-lg">
            <div class="sidebar-header">

                <div class="logo" style="margin: 25px auto; width: 150px; height: 27px; background: url(/cp/img/logo_sidebar.png); cursor: pointer;"></div>

                <div class="user-profile">
                    <div class="user-avatar" id="profileSettings" style="background: url(http://via.placeholder.com/150?text=❤) 50% 50% / 100% no-repeat;"></div>

                    <div class="user-detail">
                        <h4 class="user-name">
                            <span class="dropdown">
                                <a id="userAccount">&nbsp;</a>
                                <div class="settings"></div>
                            </span>
                        </h4>
                    </div>
                </div>
                <div class="balance_sidebar">
                    <div>
                        <div class="balance_name">Баланс:</div>
                        <div class="balance">0 руб.</div>
                    </div><div class="balance_add" id="profileSettings">
                    <a>пополнить</a>
                    </div>
                </div>
            </div>

            <div id="main-menu" class="main-menu navbar-collapse collapse">
            </div>
        </div>
    </div>
    <div class="gx-main-container">
        <header class="main-header">
            <div class="gx-toolbar">
                <div class="sidebar-mobile-menu d-block d-lg-none">
                    <a class="gx-menu-icon menu-toggle" href="#menu">
                        <span class="menu-icon"></span>
                    </a>
                </div>

                <div class="tarif">
                    <div class="container">
                        <div class="head">
                            <div class="name">Тариф: <span>None</span></div>
                            <div class="days">Осталось <span>Нет подписки</span></div>
                        </div>
                        <div class="scale"><div class="blue"></div></div>
                    </div>
                </div>

                <a href="javascript:void(0)"  id="LVideo" target="_blank" class="gx-btn-xs gx-btn-deep-orange" style="white-space: nowrap; display: none;"> 
                    <i class="zmdi zmdi-play"></i> <span>Обучение</span>
                </a>

                <ul class="quick-menu header-notifications ml-auto">
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="d-inline-block logout" >
                            <i class="zmdi zmdi-sign-in zmdi-hc-fw"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </header>

        <div class="gx-main-content" id="wrap">
            <div class="gx-wrapper" id="content">
                <div id="root"></div>
            </div>
            <footer class="gx-footer">
                <div class="d-flex flex-row justify-content-between">
                    
                </div>
            </footer>
        </div>
    </div>

</div>

<div class="menu-backdrop fade"></div>

<script type="text/babel" src="/cp/js/global.js?<?php echo time(); ?>"></script>
<script src="/cp/js/menu.js?<?php echo time(); ?>"></script>
<script type="text/babel" src="/cp/js/loadMenu.js?<?php echo time(); ?>"></script>
<script type="text/babel" src="/cp/js/loadChat.js?<?php echo time(); ?>"></script>
<script src="/cp/assets/jquery/dist/jquery.min.js?<?php echo time(); ?>"></script>
<script src="/cp/assets/bootstrap/dist/js/bootstrap.bundle.min.js?<?php echo time(); ?>"></script>
<script src="/cp/assets/perfect-scrollbar/dist/perfect-scrollbar.min.js?<?php echo time(); ?>"></script>
<script src="/cp/assets/bigslide/dist/bigSlide.min.js?<?php echo time(); ?>"></script>
<script src="/cp/assets/sweetalert/dist/sweetalert.min.js?<?php echo time(); ?>"></script>
<script src="/cp/js/chart.min.js?<?php echo time(); ?>"></script>
<script src="/cp/js/datepicker.min.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_lang_0.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_main.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_login.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_addAccount.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_accountList.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_accountSettings.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_fillingSettings.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_postsFeed.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_posting.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_promotionAccount.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_unblock.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_unblock.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_referal.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_errors.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_faq.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_recommendations.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_profileSettingsNew.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_statistic.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_payment.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_activate.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_proxySale.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_buyAccounts.js?<?php echo time(); ?>"></script>
<script src="/cp/js/chat.js?<?php echo time(); ?>"></script>
<script src="/cp/js/_chat.js?<?php echo time(); ?>"></script>
<script src="/cp/js/controller.js?<?php echo time(); ?>"></script>
<script src="/cp/js/functions.js?<?php echo time(); ?>"></script>


<!--script id="hde-chat-widget" src="//cdn.helpdeskeddy.com//omnichannel/chat-widget/main.js?v=1511188039" data-lang="ru" data-host="support.insaev.ru" data-config='{"bg_color":"23869B","text_color":"FFF","button_text":{"ru":"\u0417\u0430\u0434\u0430\u0442\u044c \u0432\u043e\u043f\u0440\u043e\u0441","ua":"\u0417\u0430\u0434\u0430\u0442\u0438 \u043f\u0438\u0442\u0430\u043d\u043d\u044f","en":"Ask a question"},"alert_new_message":{"ru":"\u041d\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435","ua":"\u041d\u043e\u0432\u0435 \u043f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f","en":"New message"}}' defer></script-->

    

</body>
</html>

