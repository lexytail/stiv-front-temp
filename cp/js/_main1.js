this.mainClass = function(fromLogin){
/*
*/
    var openMobileMenu = false;
    //var maindiv = document.getElementById("main");
    var maindiv = document.createElement("div");
    maindiv.id = "main";
    var overlay = document.createElement("div");
    overlay.id = 'overlay';
    maindiv.appendChild(overlay);
    getAccountList();
    popupCreate();
    function popupCreate(){
        var effects = new Array();
        effects['opacity'] = {speed:0.15};
        effects['transform'] = {speed:0.3, animType:'cubic-bezier(0.17, 0.54, 0.27, 1.55)'};
        var overlay2 = document.createElement("div");
        setCssEffect(overlay2, effects);
        overlay2.id = 'overlay2';
        var overlay3 = document.createElement("div");
        setCssEffect(overlay3, effects);
        overlay3.id = 'overlay3';
        var midPos = document.createElement("div");
        midPos.style.display = 'table-cell';
        midPos.style['vertical-align'] = 'middle';
        overlay2.appendChild(midPos);
        var popup = document.createElement("div");
        popup.id = 'popup_info';
        setCssEffect(popup, effects);
        var iconpopup = document.createElement("div");
        iconpopup.className = 'popup_icon';
        var title = document.createElement("div");
        title.id = 'popup_title';
        var text = document.createElement("div");
        text.id = 'popup_text';
        var butSend = document.createElement("div");
        butSend.className = 'blueButton';
        butSend.id = 'popup_butok';
        butSend.innerText = global_excellent;

        var butcancel = document.createElement("div");
        butcancel.id = 'popup_butcancel';
        butcancel.innerHTML = global_cancel;
        butcancel.style.display = 'none';
        popup.appendChild(iconpopup);
        popup.appendChild(title);
        popup.appendChild(text);
        popup.appendChild(butSend);
        popup.appendChild(butcancel);
        midPos.appendChild(popup);
        maindiv.appendChild(overlay2);
        maindiv.appendChild(overlay3);
    }

    var sidebar = maindiv.appendChild(createSideBar());
    var wrap = maindiv.appendChild(createWrapper());
    createSvgIcons();
    document.body.appendChild(maindiv);

    //addAccount(wrap.content);
    wrap.openMenu.addEventListener("click", function(e){
        if(!openMobileMenu){
            openMobileMenu = true;
            sidebar.style.left = '0px';
            wrap.style['padding-left'] = '300px';
            overlay.style.display = 'block';
            overlay.addEventListener("click", closeMobileMenu);
        }
    });
    wrap.exit.addEventListener("click", function(e){
         setCookie("_auth_token", "");
         accountsArr = new Array();
         loginClass();
    });

    function closeMobileMenu(e){
        overlay.removeEventListener("click", closeMobileMenu);
        sidebar.style.left = null;
        wrap.style['padding-left'] = null;
        overlay.style.display = 'none';
        openMobileMenu = false;
    }
    
    $('.user_name').html(user_email);
    //sidebar.balance.innerHTML = 
    $('.tarif').html('<div class="containerq"><div class="head"><div class="name">Тариф: <span>'+tariff.name+'</span></div><div class="days">Осталось <span>'+getSubscriptionTime()+'</span></div></div><div class="scale"><div class="blue"></div></div></div>');
    // 260/100*(100 / секундвсего * секундосталось)
    var secSubAll = tariff.period*24*60*60;
    $('.tarif .blue').css('width', (310/100*(100/secSubAll*user.secondsUntilSubscriptionEnded))+'px');
    
    function createWrapper(){
        var wrap = document.createElement("div");
        wrap.id = "wrap";
        wrap.wrapInner = document.createElement("div");
        wrap.wrapInner.id = "wrap-inner";

        wrap.topBlock = document.createElement("div");
        wrap.topBlock.className = "top-block"
        
        //topBlock

        wrap.openMenu = document.createElement("div");
        wrap.openMenu.className = 'open-menu';
        wrap.exit = document.createElement("div");
        wrap.exit.className = 'exit';

        //content

        wrap.content = document.createElement("div");
        wrap.content.id = "content";
        
        wrap.topBlock.appendChild(wrap.exit);
        wrap.topBlock.appendChild(wrap.openMenu);
        wrap.topBlock.appendChild(div('', 'topHelpBut'));
        wrap.topBlock.appendChild(div('', 'tarif'));
        wrap.wrapInner.appendChild(wrap.topBlock);
        wrap.wrapInner.appendChild(wrap.content);

        wrap.appendChild(wrap.wrapInner);

        return wrap;
    }
    
    function createSideBar(){
        var sidebar1 = document.createElement("div");
        sidebar1.className = "sidebar";
        var sidebar = sidebar1.appendChild(div('', 'containerq'));
        var effects = new Array();
        effects['left'] = {speed:0.3, animType:'ease-in-out'};
        effects['margin-left'] = {speed:0.3, animType:'ease-in-out'};
        setCssEffect(sidebar1, effects);

        sidebar.logo = document.createElement("div");
        sidebar.logo.className = "logo";
        sidebar.logo.addEventListener("click", function(e){
            openPageByName('account_list', true, false);
        });

        sidebar.avatar = document.createElement("div");
        sidebar.avatar.className = "avatar profile";
        sidebar.avatar.id = "profileSettings";
        sidebar.avatar.addEventListener("click", menuClick);
        updateProfileAvatars();
        //sidebar.avatar.style.background = "url('"+host+"/user/avatar?token="+token+"') 50% 50% / 100% no-repeat";
        var nameGroup = document.createElement("div");
        nameGroup.className = "name_sidebar";

        sidebar.name = document.createElement("div");
        sidebar.name.className = "user_name";
        sidebar.name.id = "profileSettings";
        sidebar.name.addEventListener("click", menuClick);

        sidebar.settingsName = document.createElement("div");
        sidebar.settingsName.className = "settings";
        sidebar.settingsName.id = "profileSettings";
        sidebar.settingsName.addEventListener("click", menuClick);

        nameGroup.appendChild(sidebar.name);
        nameGroup.appendChild(sidebar.settingsName);

        var balanceGroup = document.createElement("div");
        balanceGroup.className = "balance_sidebar";
            var balancetext = document.createElement("div");
            var balanceStaticName = document.createElement("div");
            balanceStaticName.innerText = global_balance+':';
            balanceStaticName.className = 'balance_name';

            //sidebar.balance = document.createElement("div");            sidebar.balance.className = "balance";
            var currency = document.createElement("div");
            currency.className = "balance";
            currency.innerHTML = user.balance+' руб.';
            //endSubscriptionSeconds = 18000;
           // fromLogin = true;
           var endSubscriptionSeconds = user.secondsUntilSubscriptionEnded;
            var days = Math.ceil(endSubscriptionSeconds/60/60/24);
            if(days > 0){
                //currency.innerHTML = ((days<3)?'<span style="color:#fb4a4a">':((days<10)?'<span style="color:#f7b10f">':''))+declension(days,global_day)+((days<10)?'</span>':'');
                if(fromLogin)
                    if(days <= 3)
                        setTimeout(function(){popupInfo('question', global_subscription, global_subscription_ex+'<span style="color:#fb4a4a">'+declension(days,global_day)+'</span>', global_payment_sub, global_close, function(){
                            openPageByName('profileSettings', true, true);
                        })},20);
            }else if(endSubscriptionSeconds/60/60 >= 1){
               // currency.innerHTML = '<span style="color:#fb4a4a">'+declension(Math.ceil(endSubscriptionSeconds/60/60),global_hour)+'</span>';
                if(fromLogin)
                    setTimeout(function(){popupInfo('question', global_subscription, global_subscription_ex+'<span style="color:#fb4a4a">'+declension(Math.ceil(endSubscriptionSeconds/60/60),global_hour)+'</span>', global_payment_sub, global_close, function(){
                        openPageByName('profileSettings', true, true);
                    })},20);
            }else if(endSubscriptionSeconds > 0){
                //currency.innerHTML = declension(Math.ceil(endSubscriptionSeconds/60),global_minute);
                if(fromLogin)
                    setTimeout(function(){popupInfo('question', global_subscription, global_subscription_ex+'<span style="color:#fb4a4a">'+declension(Math.ceil(endSubscriptionSeconds/60),global_minute)+'</span>', global_payment_sub, global_close, function(){
                        openPageByName('profileSettings', true, true);
                    })},20);
            }else if(endSubscriptionSeconds == 0){
                //balanceStaticName.innerText = global_no_subscription;
                if(fromLogin)
                    setTimeout(function(){popupInfo('question', global_subscription_not_active, global_subscription_no, global_pay, global_close, function(){
                        openPageByName('profileSettings', true, true);
                    })},20);
            }
            
            balancetext.appendChild(balanceStaticName);
            //balancetext.appendChild(sidebar.balance);
            balancetext.appendChild(currency);
            
        sidebar.balanceAdd = document.createElement("div");
        sidebar.balanceAdd.className = "balance_add";
        sidebar.balanceAdd.id = "profileSettings";
        sidebar.balanceAdd.innerHTML = '<a>'+global_balanceAdd+'</a>';
        sidebar.balanceAdd.addEventListener("click", menuClick);
        balanceGroup.appendChild(balancetext);
        balanceGroup.appendChild(sidebar.balanceAdd);

        sidebar.menu = document.createElement("ul");
        sidebar.menu.className = "menu_sidebar";
        sidebar.menu.addEventListener("click", menuClick); 

        addVideo(sidebar.menu.appendChild(createMenu('add-account-svg', 'add_account', global_addAccount)), 'LBU0WJXtQsM');
        addVideo(sidebar.menu.appendChild(createMenu('account-list-svg', 'account_list', global_accountList)), '8cmDdik3Fww');
        sidebar.menu.appendChild(createMenu('options-svg', 'account_settings', global_account_settings));
        var filSettings = createUnderMenu('filling-account-svg', global_accountFilling, sidebar.menu);
        addVideo(filSettings.addMenu('options-svg', 'filling_settings', global_settings), 'fLJZLZt5wn4');
        addVideo(filSettings.addMenu('posts-feed-svg', 'postsFeed', global_feed_posts), 'n2r_RGQSorE');
        filSettings.addMenu('post-add-svg', 'posting', global_add_post);
        var promotionMenu = createUnderMenu('promotion-svg', global_promotionAccounts, sidebar.menu);
        addVideo(promotionMenu.addMenu('options-svg', 'promotionAccount', global_settings), 'WvPEUKB0DpA');
        addVideo(sidebar.menu.appendChild(createMenu('unblock-svg', 'unblock', global_unblock)), 'psNpkLGIuHk');
        addVideo(sidebar.menu.appendChild(createMenu('referal-svg', 'referal', global_referal_system)), 'n2X-xCJ2VoY');
        sidebar.menu.appendChild(createMenu('forum-svg', 'forum', global_forum)).addEventListener("click", function(e){
            window.open('https://community.insaev.ru');
        });
        var  helpMenu = createUnderMenu('help-svg', global_help, sidebar.menu);
        helpMenu.addMenu('training-svg', 'video', global_training).addEventListener("click", function(e){
            window.open('https://www.youtube.com/watch?v=riQ9uT0DuU0');
        });
        helpMenu.addMenu('faq-svg', 'errors', 'Расшифровка логов');
        helpMenu.addMenu('faq-svg', 'faq', 'FAQ');
        helpMenu.addMenu('recommend-svg', 'recommend', 'Рекомендации');
        var teleg = sidebar.menu.appendChild(createMenu('telegram-svg', 'telergam', 'Чат в Telegram'));
        teleg.addEventListener("click", function(e){
            window.open('https://tele.click/joinchat/DAQ8mk8cX_Kwl25ofFu8Xg');
        });
        $('.group', teleg).css('background', '#125486');
        //helpMenu.addMenu('proxysale-svg', 'proxySale', global_buy_proxy);
        //helpMenu.addMenu('instagram-svg', 'buyAccounts', global_buy_accounts);
       
        
       // sidebar.menu.appendChild(createMenu('account-list-svg', 'statistic', global_statistic));
        
        sidebar.appendChild(sidebar.logo);
        var cont = div('', 'blackblock');
        cont.appendChild(sidebar.avatar);
        cont.appendChild(nameGroup);
        cont.appendChild(balanceGroup);
        sidebar.appendChild(cont);

        sidebar.appendChild(sidebar.menu);

        return sidebar1;
    }
    
    function createMenu(svgIcon, id, name){
        var li = document.createElement("li");
        li.id = id;
        li.innerHTML = '<div class="group"><p><svg class="icon" width="19" height="19"><use xlink:href="#'+svgIcon+'"></use></svg></p><span class="menu">'+name+'</span></div>';
        return li;
    }
    
    function addVideo(menu, idv){
        $('div', menu)[0].innerHTML += '<a href="https://www.youtube.com/watch?v='+idv+'" target="_blank"><p><svg width="19" height="19" class="video_train"><use xlink:href="#training-svg"></use></svg></a></p>';
        $('.video_train', menu).on('click', function(e){
            console.log('click');
        });
    }
    
    function createUnderMenu(svgIcon, name, parent){
        var subgroup = document.createElement("li");
        subgroup.id = "subgroup";
        subgroup.innerHTML = '<div class="group"><p><svg width="19" height="19"><use xlink:href="#'+svgIcon+'"></use></svg></p><span class="menu">'+name+'</span><span class="arrow arrow--right"></span></div>';
        subgroup.butCount = 0;
        var undermenu = document.createElement("div");
        undermenu.className = "undermenu";
        undermenu.open = false;
        var effects = new Array();
        effects['height'] = {speed:0.15};
        setCssEffect(undermenu, effects);
        var menu = document.createElement("ul");
        undermenu.appendChild(menu);
        
        subgroup.addMenu = function(svg, id, name){
            subgroup.butCount++;
            var but = document.createElement("li");
            but.id = id;
            but.innerHTML = '<div class="group subgroup"><p><svg width="19" height="19"><use xlink:href="#'+svg+'"></use></svg></p><span class="menu">'+name+'</span></div>';
            menu.appendChild(but);
            return but;
        }
        
        subgroup.addEventListener("click", function(e){
            var arrow = e.currentTarget.getElementsByClassName('arrow')[0];
            if(undermenu.open){
                undermenu.style['height'] = '0px';
                arrow.style.transform = 'rotate(0deg)';
                undermenu.open = false;
                e.currentTarget.className = null;
            }else{
                undermenu.style['height'] = (e.currentTarget.butCount*30)+'px';
                arrow.style.transform = 'rotate(90deg)';
                undermenu.open = true;
                e.currentTarget.className = "active";
            }
        });
        parent.appendChild(subgroup);
        parent.appendChild(undermenu);
        return subgroup;
    }

    function menuClick(event){
        
        if(typeof event.target.className == 'object' && event.target.className.baseVal == 'video_train'){
            console.log('menu click', typeof event.target.className, event.target.className.baseVal== 'video_train');
            return;
        }
        var id = event.target.id;
        if(id==''){//ебаный IE...
            id = event.target.parentElement.id;
            if(id=='')
                id = event.target.parentElement.parentElement.id;
        }
        openPageByName(id);
        console.log('openMobileMenu', openMobileMenu);
        if(id != 'subgroup')
            if(openMobileMenu)
                closeMobileMenu(event);
    }
}


