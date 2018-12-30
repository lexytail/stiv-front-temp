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
            <div class="menu_but"><a href="#block1">Преимущества</a></div>
            <div class="menu_but"><a href="#block2">О сервисе</a></div>
            <div class="menu_but"><a href="#block6">Контакты</a></div>
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
         <div class="header">
            <div class="stars"></div>
            <div class="container max">
                <div class="earth"></div>
                <div class="moon"></div>
                <div class="insaev"></div>

                <div class="logo"></div>
                <div class="mobile_button"></div>
                <div class="top_menu" id="main_menu">
                    <div class="menu_but"><a href="#block1">Преимущества</a></div>
                    <div class="menu_but"><a href="#block2">О сервисе</a></div>
                    <div class="menu_but"><a href="#block6">Контакты</a></div>
                    <div class="login_menu">
                        <div class="reg regopen">Регистрация</div>
                        <div class="login enter">Вход</div>
                    </div>
                </div>
                <div class="block">
                    <h1>Сервис для профессионального продвижения в Instagram</h1>
                    <div class="description">Вы сможете привлечь подписчиков в аккаунт, трафик на сайт или увеличить продажи уже через 1 день после запуска.</div>
                    <div class="but regopen">Начать сейчас</div>
                    <div class="partner_but friends_but"><a href="./friends.php">Партнерская программа</a></div>
                </div>
            </div>
        </div>
        <div class="block5">
            <div class="container max" style="color:#000; padding:30px;">
            Условия предоставления сервиса<br/>
            <br/>
            1. Все права на сервис STIV (далее "Сервис") принадлежат только его Администрации.<br/>
            <br/>
            2. Администрация оставляет за собой право отменить действие данных условий или изменить их в одностороннем порядке.<br/>
            <br/>
            3. Сервис предоставляется вам «как есть». Своей регистрацией вы показываете, что принимаете его в таком виде, в котором он есть.<br/>
            <br/>
            4. Вы используете Сервис на свой риск. Администрация Сервиса не будет отвечать ни за какие потери и/или искажения данных, любую упущенную выгоду в процессе использования и/или неправильного использования Сервиса.<br/>
            <br/>
            5. Вы соглашаетесь с тем, что не будете использовать Сервис для действий, запрещенных законодательством РФ.<br/>
            <br/>
            6. Администрация Сервиса вправе уведомлять вас по электронной почте о новостях и акциях, а так же отправлять вам информационные письма.<br/>
            <br/>
            7. Средства зачисленные в Сервис выводу из Сервиса не подлежат.<br/>
            <br/>
            8. Цены, тарифные планы и условия предоставления услуг могут быть изменены Администрацией в одностороннем порядке.<br/>
            <br/>
            9. В Сервисе запрещается одним лицом создавать более одной учетной записи. Такие учетные записи будут удалены Администрацией без предупреждения.<br/>
            <br/>
            10. Запрещено продавать зарегистрированные в Сервисе аккаунты третьим лицам.<br/>
            <br/>
            11. Регистрация в Сервисе означает, что вы поняли и согласились со всеми положениями данного условия.<br/>
            <br/>
            12. Сервис хранит ваши персональные данные только для целей идентификации вас в рамках Сервиса.<br/>
            </div>
        </div>
        
        <div class="footer">
            <div class="container max">
                <div class="top_menu">
                    <div class="menu_but"><a href="#block6">Контакты</a></div>
                    <div class="menu_but friends_but"><a href="./friends.php">Партнерская программа</a></div>
                    <div class="menu_but regopen">Регистрация</div>
                    <div class="menu_but enter">Вход</div>
                </div>
                <div class="description">
                    Изначально STIV мы создавали для себя. Мы хотели получать больше подписчиков из Instagram, не используя спам-механики и накрутку (покупку) подписчиков и их действий. В какой-то момент нас стали просить дать попользоваться STIV'ом и мы решили его сделать доступным для всех. Теперь он всем пользователям помогает делать аккаунт популярным, а бизнесу получать продажи из Инстаграма.
                </div>
                <div class="logos">
                    <div class="blue_logo"></div>
                    <div class="mpay"></div>
                    <div class="socials">
                        <div class="stele"></div>
                        <div class="svk"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
