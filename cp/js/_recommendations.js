this.recommendOpen = function(){
    setActiveMenu('recommend');
    clearBlock();
    var mainDiv = document.createElement("div");
    mainDiv.className = "wrap_block";
    mainDiv.appendChild(createTitle('<b>Рекомендации</b>'));
    var content = document.getElementById("content");
    content.innerHTML = '';
    content.appendChild(mainDiv);
    mainDiv.appendChild(div(
    "<p>Для безопасной работы мы НАСТОЯТЕЛЬНО рекомендуем: </p>\
    <p>1. Работать через индивидуальные ipv4 прокси.</p>\
    <p>2. В настройках аккаунта указывайте действующий email и мобильный телефон.</p>\
    <p>3. Все аккаунты привязывайте к Фейсбуку. Для этого из приложения Instagram в телефоне перейдите в настройки вашего аккаунта. Выберите пункт «Связанные аккаунты», после чего выберите «Facebook» и следуйте указаниям системы.</p>\
    <p>4. Убедиться, что возраст аккаунта больше 3 месяцев.</p>\
    <p>5. Загрузите аватарку и описание аккаунта.</p>\
    <p>6. Для молодых аккаунтов не указывайте в описании аккаунта никаких ссылок. Ссылку можно добавить спустя месяц активной раскрутки.</p>\
    <p>Внимание! Однократно Инстаграм может попросить вас сменить пароль. Это штатная процедура вызванная тем, что раньше вы работали с одного IP, а теперь наш сервис обращается к вашему аккаунту с другого IP. Просто смените пароль и обновите его у нас в STIV'е.</p>\
    ", 'news_text'));
}