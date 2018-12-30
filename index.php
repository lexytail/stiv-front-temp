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
    <link href="./css/boutique.css" rel="stylesheet">
    <script type="text/javascript" src='https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'></script>
    <script type="text/javascript" src="./js/jquery-1.12.0.min.js"></script>
    <script type="text/javascript" src="./js/carousel.js?<?php echo time(); ?>"></script>
    <script type="text/javascript" src="./js/slick.min.js"></script>
    <script type="text/javascript" src="./js/controller.js?<?php echo time(); ?>"></script>
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
                        <form class="form">
                        <input type="text" id="logemail" name="email" placeholder="Введите e-mail">
                        <input type="password" id="logpass" name="password" placeholder="Введите пароль">
                        <div class="error_text" id="login_error">&nbsp;</div>
                        <div id="description" style="margin-top:0px;margin-bottom: 10px;"></div>
                        <div class="g-recaptcha" id="capcha_login" data-callback="showEnterButton"></div>
                        <button class="but" id="enterbut" style="display:none;">Войти</button>
                        </form>
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
        <div class="block1" id="block1">
            <div class="planet"></div>
            <div class="container max">
                <div class="counter">
                    <div class="number">01</div>
                    <div class="title">Чем мы отличаемся от</div>
                    <div class="description">остальных?</div>
                </div>
                <div class="table1">
                    <div class="insaev"></div>
                    <div class="tbl">
                        <table>
                            <thead>
                            <tr>
                                <td>Основные преимущества</td>
                                <td>Конкуренты</td>
                                <td><img src="./images/stiv_table.png"></td>
                            </tr>
                            </thead>
                            <tr>
                                <td>Широкий функционал</td>
                                <td><img src="./images/no.png"></td>
                                <td><img src="./images/yes.png"></td>
                            </tr>
                            <tbody>
                            <tr>
                                <td>Уникальные особенности</td>
                                <td><img src="./images/no.png"></td>
                                <td><img src="./images/yes.png"></td>
                            </tr>
                            <tr>
                                <td>Лояльные цены, подходящие для всех</td>
                                <td><img src="./images/no.png"></td>
                                <td><img src="./images/yes.png"></td>
                            </tr>
                            <tr>
                                <td>Постоянная поддержка и частые обновления</td>
                                <td><img src="./images/no.png"></td>
                                <td><img src="./images/yes.png"></td>
                            </tr>
                            <tr>
                                <td>Безопасность и максимальная защита</td>
                                <td><img src="./images/no.png"></td>
                                <td><img src="./images/yes.png"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="block2" id="block2">
            <div class="container max">
                <div class="counter">
                    <div class="number">02</div>
                    <div class="title">Основные функции</div>
                    <div class="description">сервиса</div>
                </div>
                    <div class="cubes slider responsive">
                        <div class="cube">
                            <div class="image" style="background: url(./images/func1.png) no-repeat 50% 100%;"></div>
                            <div class="title">Продвижение</div>
                            <div class="description">Конверсия, которую Вы заслужили</div>
                        </div>
                        <div class="cube">
                            <div class="image" style="background: url(./images/func2.png) no-repeat 50% 100%;"></div>
                            <div class="title">Публикации</div>
                            <div class="description">Отложенный постинг</div>
                        </div>
                        <div class="cube">
                            <div class="image" style="background: url(./images/func3.png) no-repeat 50% 100%;"></div>
                            <div class="title">Автоматизация</div>
                            <div class="description">Настройте и забудьте</div>
                        </div>
                        <div class="cube">
                            <div class="image" style="background: url(./images/func4.png) no-repeat 50% 100%;"></div>
                            <div class="title">Аналитика</div>
                            <div class="description">Статистика в режиме Live</div>
                        </div>
                        <div class="cube">
                            <div class="image" style="background: url(./images/func5.png) no-repeat 50% 100%;"></div>
                            <div class="title">Наполнение</div>
                            <div class="description">Стив сам создаст контент</div>
                        </div>
                    </div>
                 <div class="videoBlock">
                    <div class="insaev"></div>
                    <div class="description">
                        Много вопросов или что-то осталось непонятным?<br/> Посмотрите видео и всё поймете.
                    </div>
                        <a class="button_white" href="https://www.youtube.com/watch?v=riQ9uT0DuU0" target="_blank">Смотреть видео</a>
                </div>
            </div>
        </div>
        <div class="block3">
            <div class="container max">
                <div class="counter">
                    <div class="number">03</div>
                    <div class="title">Статистика по</div>
                    <div class="description">сервису</div>
                </div>
                <div class="insaev"></div>
                <div class="insaev_hidden"></div>
                <div class="leftStat">
                    <div class="stat1">
                        <div class="title" id="totalSubscribers"></div>
                        <div class="description">подписчиков получили пользователи</div>
                    </div>
                    <div class="stat2">
                        <div class="title" id="todayUsers"></div>
                        <div class="description">зарегистрировались сегодня</div>
                    </div>
                    <div class="stat3">
                        <div class="title" id="totalUsers"></div>
                        <div class="description">пользователей сервиса</div>
                    </div>
                </div>
                <div class="rightStat">
                <div class="stat1">
                        <div class="title" id="todaySubscribers"></div>
                        <div class="description">новых подписчиков сегодня</div>
                    </div>
                    <div class="stat2">
                        <div class="title" id="totalLiked"></div>
                        <div class="description">лайков всего</div>
                    </div>
                    <div class="stat3">
                        <div class="title" id="totalPosted"></div>
                        <div class="description">постов всего</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block4">
            <div class="container max">
                <div class="info">
                    <div class="title">Попробуйте наши инструменты прямо сейчас</div>
                    <div class="description">Все еще думаешь? Подписчики сами тебя не найдут. Запусти продвижение сейчас и получай подписчиков бесплатно в течении 3 дней!</div>
                </div>
                <div class="but regopen">Попробовать</div>
            </div>
        </div>
        <div class="block5">
            <div class="container max">
                <div class="counter">
                    <div class="number">04</div>
                    <div class="title">Стоимость и выбор</div>
                    <div class="description">подходящего тарифа</div>
                </div>
                <div class="pictureSlider poster-main" data-setting='{
                    "width":1000,
                    "height":510,
                    "posterWidth": 280,
                    "posterHeight":510,
                    "scale":0.9,
                    "autoPlay":true,
                    "delay":20000,
                    "speed":300
               }'>
                    <div class="poster-btn poster-prev-btn"></div>
                    <ul class="poster-list">

                    </ul>
                    <div class="poster-btn poster-next-btn"></div>
                </div>
            </div>
        </div>
        <div class="block6" id="block6">
            <div class="container max">
                <div class="counter">
                    <div class="number">05</div>
                    <div class="title">Форма обратной связи</div>
                    <div class="description">и отзывы</div>
                </div>

                <div class="feedback_container">
                    <div class="control_feed"><div class="arrow up"></div><div class="arrow down"></div></div>
                    <div class="feedback_list">
                        <div class="feedblock">
                            <div class="feed_autor">
                                <div class="avatar" style="background: url(./images/avatars/nik.salimov.jpg) 50% 50% / 100%;"></div>
                                <div class="autor_insta"><a href="https://instagram.com/nik.salimov" target="_blank">@nik.salimov</a></div>
                                <div class="autor_name">Николай</div>
                            </div>
                            <div class="feed_text">
                                STIV - лучший помощник для развития собственной сети аккаунтов в инстаграме. Этот преданный друг поможет с наполнением и привлечением ЖИВОЙ аудитории. Две недели работаю над развитием своей сети, каждый день на аккаунт подписывается в среднем 200-300 человек, при лучшем подборе доноров цифра будет только увеличиваться. Автонаполнение аккаунтов лучшими постами не может не радовать. Стив все делает сам, мне лишь остается отобрать хороших доноров и смотреть на результат и рост моих аккаунтов. Кого интересует развитие собственных аккаунтов в инстаграме, настоятельно рекомендую познакомиться со STIV'ом!
                            </div>
                        </div>

                        <div class="feedblock">
                            <div class="feed_autor">
                                <div class="avatar" style="background: url(./images/avatars/coffee_hard.jpg) 50% 50% / 100%;"></div>
                                <div class="autor_insta"><a href="https://vk.com/vladicofe" target="_blank">@vladicofe</a></div>
                                <div class="autor_name">Владислав</div>
                            </div>
                            <div class="feed_text">
                                Довольно крутая штука, я вам скажу! Заводишь нужных конкурентов, вписываешь лимиты и "о, чудо" - Стив без тебя, на полной автоматизации сам начинает подписываться на нужную тебе аудиторию. Изначально тестировал на двух баннерных профилях данный сервис, результаты: при подписках в среднем около 500 в день, за 10 дней с ДВУХ профилей перешло по ссылке в описании аккаунтов 220 человек. А теперь представьте результат, если бы я добавил 25 аккаунтов? Это круто, ребят. Дядя Стив, спасибо!)
                            </div>
                        </div>
                        <div class="feedblock">
                            <div class="feed_autor">
                                <div class="avatar" style="background: url(./images/avatars/zloykun.jpg) 50% 50% / 100%;"></div>
                                <div class="autor_insta"><a href="https://vk.com/zloykun" target="_blank">zloykun</a></div>
                                <div class="autor_name">Владимир</div>
                            </div>
                            <div class="feed_text">
                                ИМХО Stiv - ультимативный сервис в сфере продвижения intagram аккаунтов.<br/>
                                Единственный сервис где ты не кидаешь деньги на ветер, сервис который даёт наивысшее КПД из всего что я пробовал, сервис который не требует от меня ежедневной возни с настройками задач.<br/>
                                Он меня действительно радует, он прост, он удобен, он имеет отзывчивую и быстро реагирующую тех.поддержку.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="feedback">
                    <div class="title">Остались вопросы?<br/><span>Напишите нам</span></div>
                    <input type="text" placeholder="Ваш Email" id="feedemail">
                    <textarea type="text" placeholder="Введите ваш текст" id="feedtext"></textarea>
                    <div class="feed_error">&nbsp;</div>
                    <div class="g-recaptcha" id="capcha_feed" data-callback="showFeedButton"></div>
                    <div class="but" id="sendfeed">Отправить</div>
                    <div class="conf">Мы против спама! Указанная информация не передаётся третьим лицам, подробнее на странице <a href="#">Политика конфиденциальности</a></div>
                </div>
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
