<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>STIV - система эффективной раскрутки Instagram аккаунтов</title>
	<meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
    <link rel="icon" href="./favicon.ico" type="image/x-icon" />
    <link href="./css/main.css?<?php echo time(); ?>" rel="stylesheet">
    <link href="./css/slick-theme.css" rel="stylesheet">
    <link href="./css/slick.css" rel="stylesheet">
    <script type="text/javascript" src='https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'></script>
    <script type="text/javascript" src="./js/controller.js?<?php echo time(); ?>"></script>
    <script type="text/javascript" src="./js/jquery.js"></script>
    <script type="text/javascript" src="./js/slick.min.js"></script>
    <script type="text/javascript" id="hde-kb-widget" data-host="support.insaev.ru" data-lang="ru">(function () {function a() {var b = document.createElement("script");b.charset = "utf-8";b.src = "//support.insaev.ru/custom/kb-widget-init.js";b.type = "text/javascript";b.async = !0;var a = document.getElementById("hde-kb-widget");a.parentNode.insertBefore(b, a)}window.attachEvent ? window.attachEvent("onload", a) : window.addEventListener("load", a, !1)})();</script>
</head>
<body>
    <script id="hde-chat-widget" src="//cdn.helpdeskeddy.com//omnichannel/chat-widget/main.js?v=1511188039" data-lang="ru" data-host="support.insaev.ru" data-config='{"bg_color":"23869B","text_color":"FFF","button_text":{"ru":"\u0417\u0430\u0434\u0430\u0442\u044c \u0432\u043e\u043f\u0440\u043e\u0441","ua":"\u0417\u0430\u0434\u0430\u0442\u0438 \u043f\u0438\u0442\u0430\u043d\u043d\u044f","en":"Ask a question"},"alert_new_message":{"ru":"\u041d\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435","ua":"\u041d\u043e\u0432\u0435 \u043f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f","en":"New message"}}' defer></script>
    <div class="mobile_menu close">
        <div class="logo"></div>
        <div class="menu_list">
            <div class="menu_but"><a href="./index.php#block1">Преимущества</a></div>
            <div class="menu_but"><a href="./index.php#block2">О сервисе</a></div>
            <div class="menu_but"><a href="./index.php#block6">Контакты</a></div>
            <div class="menu_but regopen">Регистрация</div>
            <div class="menu_but enter">Вход</div>
        </div>
    </div>
    <div class="wrapper">
        <div class="overlay">
            <div class="verticalMiddle">
                <div class="regPanel popup_panel">
                    <div class="logo"></div>
                    <div class="container">
                    <div class="close" id="closeRegPanel"></div>
                    <div class="title" id="regTitle"><span>Регистрация</span><br/>нового пользователя</div>
                    <div id="regInputs">
                        <input type="text" id="username" placeholder="Введите логин (латинскими буквами)">
                        <input type="text" id="email" placeholder="Введите e-mail">
                        <input type="password" id="pass" placeholder="Введите пароль">
                        <input type="password" id="pass2" placeholder="Пароль ещё раз">
                        <div class="promocode_but" id="promocode_but">У меня есть промокод!</div>
                        <input type="text" id="promo" placeholder="Промокод">
                        <div class="error_text" id="reg_error">&nbsp;</div>
                        <div class="g-recaptcha" id="capcha_reg" data-callback="showRegButton"></div>
                        <div class="but" id="regbut">Зарегистрироваться</div>
                        <div class="go_to_auth" id="go_to_auth">Уже зарегистрированы? <span>Войти</span></div>
                    </div>
                    <div id="description"></div>
                    <div class="but" id="closereg">Хорошо</div>
                    <div class="soglashenie">Нажав на кнопку «Зарегистрироваться», вы автоматически принимаете условия <a href="./soglashenie.php" target="_blank">пользовательского соглашения</a></div>
                    </div>
                </div>
                <div class="loginPanel popup_panel">
                    <div class="container" id="enter_panel">
                        <div class="close" id="closeLoginPanel"></div>
                        <div class="title" id="loginTitle"><span>Вход</span><br/>в личный кабинет</div>
                        <input type="text" id="logemail" placeholder="Введите e-mail">
                        <input type="password" id="logpass" placeholder="Введите пароль">
                        <div class="error_text" id="login_error">&nbsp;</div>
                        <div id="description" style="margin-top:0px;margin-bottom: 10px;"></div>
                        <div class="g-recaptcha" id="capcha_login" data-callback="showEnterButton"></div>
                        <button class="but" id="enterbut" style="display:none;">Войти</button>
                        <div class="buts_bot">
                            <div class="but_grow" id="noacc">Нет учетной записи?</div>
                            <div class="but_grow r" id="lostPass">Забыли пароль?</div>
                            <div class="but_grow c" id="backLogin">Вспомнили пароль?</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="overlay" id="overlay"></div>
        <div class="header friends">
            <div class="stars"></div>
            <div class="container max" style="height: 100%;">
                <div class="friends_block"></div>
                <div class="logo"></div>
                <div class="mobile_button"></div>
                <div class="top_menu" id="main_menu">
                    <div class="menu_but"><a href="./index.php#block1">Преимущества</a></div>
                    <div class="menu_but"><a href="./index.php#block2">О сервисе</a></div>
                    <div class="menu_but"><a href="./index.php#block6">Контакты</a></div>
                    <div class="login_menu">
                        <div class="reg regopen">Регистрация</div>
                        <div class="login enter">Вход</div>
                    </div>
                </div>
                <div class="blockfriends">
                    <h1>Партнерская программа от Стива</h1>
                    <div class="descriptionf">Стив крайне дружелюбный и обожает новые знакомства,<br/>поэтому готов весьма щедро тебя отблагодарить.</div>
                </div>
            </div>
        </div>
        <div class="partnerBlock">
            <div class="container max">
                <div class="block">
                    <div class="stage">
                        <div class="circle right"></div>
                        <div class="img1"></div>
                        <div class="content">
                            <div class="title">Рассылай свою ссылку</div>
                            <div class="description">Знакомь Стива при помощи специальной ссылки или по собственному промокоду. Их можно получить в специальном разделе после регистрации.</div>
                        </div>
                    </div>
                    <div class="stage">
                        <div class="circle left"></div>
                        <div class="img2"></div>
                        <div class="content left">
                            <div class="prices">
                                
                                <div class="price free">
                                    <div class="priceblock">
                                        <div class="amount">30%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="description">Как только твой друг оплатит доступ <span>- на твой счет будет начислена сумма в зависимости от приобретенного им тарифа.<span></div>
                        </div>
                    </div>
                    <div class="stage">
                        <div class="circle right"></div>
                        <div class="img3"></div>
                        <div class="content">
                            <div class="title">Щедрость не знает границ</div>
                            <div class="description"><span>Думал все?</span> А вот и нет! Я же говорил, что Стив очень щедрый, поэтому с каждой последующей оплаты твоего друга ты будешь получить 10% пожизненно!</div>
                        </div>
                    </div>
                    <div class="gotofriends_block">
                        <div class="title">Ну что, будем дружить?</div>
                        <div class="but regopen">Конечно</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
