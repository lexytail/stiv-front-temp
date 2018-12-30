this.addAccount = function(){
    setActiveMenu('add_account');
    clearBlock();
    var lastheight = '447px';
    var lastheight2 = '210px';
    var mainDiv = document.createElement("div");
//    $('.topHelpBut').html('<a class="butHelp" href="https://www.youtube.com/watch?v=LBU0WJXtQsM" target="_blank"><div class="blueButton">Обучение</div></a>');

    $('#LVideo').show();
    $('#LVideo').attr('href', 'https://www.youtube.com/watch?v=LBU0WJXtQsM');

    mainDiv.className = "add-account-wrap";
    var back = document.createElement("div");
    back.className = "addAccount-background";
    back.style.height = '567px';
    var effects = new Array();
    effects['all'] = {speed:0.3, animType:'ease-in-out'};
    setCssEffect(back, effects);

    var form = createForm();
    back.appendChild(form);
    mainDiv.appendChild(back);
    var content = document.getElementById("content");
    content.innerHTML = '';
    content.appendChild(mainDiv);
//    back.style.height = '447px';
    var sendList = false;
    document.getElementById("easy-switch").addEventListener("click", function(){
        //back.style.height = lastheight;
        //form.listAccForm.style.height = "0px"
        //form.oneAccForm.style.height = lastheight2;
        form.oneAccForm.style.display = "block";
        form.listAccForm.style.display = "none"

        document.getElementById("easy-switch").className = "but active";
        document.getElementById("advanced-switch").className = "but";
        
        getClass('blueButton add-account-input')[0].innerHTML = global_addAccount;
        sendList = false;
        form.oneAccForm.delayStyle('overflow', null, 300);
    });
    document.getElementById("advanced-switch").addEventListener("click", function(){
        //form.oneAccForm.style.overflow = "hidden";
        document.getElementById("easy-switch").className = "but";
        document.getElementById("advanced-switch").className = "but active";
        //form.listAccForm.style.height = "300px"
        //form.oneAccForm.style.height = "0px"

        form.oneAccForm.style.display  = "none";
        form.listAccForm.style.display = "block"

        getClass('blueButton add-account-input')[0].innerHTML = global_addAccounts;
        sendList = true;
    });
    function createForm(){
        var form = document.createElement("div");
        var title = document.createElement("div");
        title.innerHTML = global_addAccountTitle;
        title.className = "add-account-title";
        form.appendChild(title);
        var buttonSwitch = document.createElement("div");
        buttonSwitch.className = 'buttonSwitch';
        buttonSwitch.innerHTML = '<div id="easy-switch" class="but active">'+global_oneAccount+'</div><div class="seporator"></div><div id="advanced-switch" class="but">'+global_listAccount+'</div>';
        form.appendChild(buttonSwitch);
        //form.appendChild(warningDiv(global_addAccountWarning)).className = "add-account-warning";

        var inputForm = document.createElement("form");
        inputForm.className = 'add-account-form';
        
        var oneAccForm = document.createElement("div");
        //oneAccForm.style.overflow = "hidden";
//        oneAccForm.style.height = "210px"
        setCssEffect(oneAccForm, effects);

        var login = createInputTextField('*'+global_enterLogin);
        oneAccForm.appendChild(login);
        tooltip(login, global_tip_instalogin);

        var password = createInputTextField('*'+global_enterPassword);
        tooltip(password, global_tip_instapassword);
        password.type = 'password';
        oneAccForm.appendChild(password);
        
        var phone = createInputTextField(global_phoneNumber);
        tooltip(phone, global_tip_instaphone);
        oneAccForm.appendChild(phone);

        var proxy = createInputTextField('*'+global_enterProxy);
        tooltip(proxy, global_tip_instaproxy, '450px');
        oneAccForm.appendChild(proxy);
        var autoProxyCheck = div('', 'flex');

        /*
        var flexID = document.getElementById('flex');
        if (flexID !== null)
            while (flexID.lastChild) {
                console.log('flexID.removeChild');
              //  flexID.removeChild(flexID.lastChild);
            }
        */
        var checkbox = createCheckBox(false, function(toggle){
            if(toggle){
//                oneAccForm.style.height = "270px"
//                lastheight2 = '270px';
                proxy.value = '';
                proxy.setAttribute('placeholder', 'Ежемесячное списание 30 руб.');
                proxy.disabled = true;
                //$('#country', oneAccForm).show();
//                back.style.height = '480px';
//                lastheight = '480px'
                $('#country', oneAccForm).fadeIn(200);
                $('.regulations', oneAccForm).fadeIn(200);
            }else{
                $('#country', oneAccForm).fadeOut(150);
                $('.regulations', oneAccForm).fadeOut(150);
                proxy.setAttribute('placeholder', '*'+global_enterProxy);
                proxy.disabled = false;
//                oneAccForm.style.height = "210px"
//                lastheight2 = '210px';
//                back.style.height = '447px';
//                lastheight = '447px';
            }
        }, 'proxy_cb');
        form.checkbox = checkbox;
        autoProxyCheck.appendChild(checkbox);
        $(autoProxyCheck).append('<span class="lable_r proxy_lable">Подключить прокси автоматически</span>');
        oneAccForm.appendChild(autoProxyCheck);

        $(document).on('click', '.proxy_lable', function() {$('#proxy_cb').click();} );

        $(oneAccForm).append('\
        <div id="country" class="wrapper-dropdown" tabindex="1"><span></span>\
            <ul class="dropdown">\
            <li data="ru"><svg width="19" height="19"><use xlink:href="#russia-svg"></use></svg>Россия</li>\
            <li data="ua"><svg width="19" height="19"><use xlink:href="#ukraine-svg"></use></svg>Украина</li>\
            <li data="au"><svg width="19" height="19"><use xlink:href="#australia-svg"></use></svg>Австралия</li>\
            <li data="de"><svg width="19" height="19"><use xlink:href="#germany-svg"></use></svg>Германия</li>\
            <li data="nl"><svg width="19" height="19"><use xlink:href="#netherlands-svg"></use></svg>Нидерланды</li>\
            <li data="fr"><svg width="19" height="19"><use xlink:href="#france-svg"></use></svg>Франция</li>\
            <li data="jp"><svg width="19" height="19"><use xlink:href="#japan-svg"></use></svg>Япония</li>\
            </ul>\
            </div><div class="regulations hide">Соглашение</div>');
        $('#country', oneAccForm).hide();
        $('.regulations', oneAccForm).on("click", function(){
            popupInfo('ok', global_warning, 'STIV не берет на себя ответственность за работоспособность прокси,так как он предоставляется сторонним сервисом.', global_close);
        });
        form.cb = new DropDown($('#country', oneAccForm));
        inputForm.appendChild(oneAccForm);
        form.oneAccForm = oneAccForm;

        var listAccForm = document.createElement("div");
        listAccForm.style.overflow = "hidden";
//        listAccForm.style.height = "0px"
        listAccForm.className = 'add-account-list-div';
        setCssEffect(listAccForm, effects);

        var accList = document.createElement("textarea");
        accList.setAttribute('placeholder', global_helpAddAccountList);
        accList.className = 'editTextField add-account-list';
        listAccForm.appendChild(accList);
        form.appendChild(listAccForm);
        form.listAccForm = listAccForm;
        /*var advInputsDiv = document.createElement("div");
        advInputsDiv.style.overflow = "hidden";
        advInputsDiv.style.height = "0px"
        setCssEffect(advInputsDiv, effects);


        form.advInputs = new Array();
        form.advInputs[0] = createInputTextField("Номер телефона");
        setCssEffect(form.advInputs[0], effects);
        advInputsDiv.appendChild(form.advInputs[0]);            

        form.advInputs[1] = createInputTextField("Прокси (ip:port:login:password)");
        setCssEffect(form.advInputs[1], effects);
        advInputsDiv.appendChild(form.advInputs[1]);
        
        inputForm.appendChild(advInputsDiv);
         form.advInputsDiv = advInputsDiv;
*/
       
        var butSend = document.createElement("div");
        tooltip(butSend, global_tip_instaadd);
        butSend.className = 'blueButton add-account-input';
        butSend.style['margin-bottom'] = '30px';
        butSend.innerText = global_addAccount;
        inputForm.appendChild(butSend);
        butSend.addEventListener("click", submitAccount);
        
/*
        var butSend = document.createElement("div");
        
        butSend.className = 'blueButton add-account-input';
        butSend.style['margin-bottom'] = '30px';
        butSend.innerText = global_addAccount;
        inputForm.appendChild(butSend);
        butSend.addEventListener("click", function(){
            popupInfo('error', 'Заголовок', 'Текст мелкий описание бла бла');
        });

        var butSend = document.createElement("div");
        
        butSend.className = 'blueButton add-account-input';
        butSend.style['margin-bottom'] = '30px';
        butSend.innerText = global_addAccount;
        inputForm.appendChild(butSend);
        butSend.addEventListener("click", function(){
            popupInfo('ok', 'Заголовок', 'Текст мелкий описание бла бла');
        });
*/
        form.oneAccForm.style.display = "block";
        form.listAccForm.style.display = "none";

        form.appendChild(inputForm);

        return form;
    }
    function submitAccount(){
        var butSend = getClass('blueButton add-account-input')[0];
        butSend.innerHTML = '<svg width="14" height="14" style="fill:#fff"><use xlink:href="#miniload-svg"></use></svg>';
        butSend.removeEventListener("click", submitAccount);
        if(!sendList)
            sendAccount(getClass('editTextField add-account-input')[0].value, getClass('editTextField add-account-input')[1].value, getClass('editTextField add-account-input')[3].value, getClass('editTextField add-account-input')[2].value);
        else
            sendingList(getClass('editTextField add-account-list')[0].value);
    };
    function createInputTextField(placeholder){
        var tf = document.createElement("input");
        tf.autocomplete="off";
        tf.className = 'editTextField add-account-input form-control';
        tf.name="instapass";
        tf.setAttribute('placeholder', placeholder);
        return tf;
    }
    function sendingList(acclist){
//        back.style.height = '0px';
        var table = mainDiv.appendChild(createSendingTable());

        var accounts = acclist.split('\n');
        for(var i in accounts){
            var obj = accounts[i].split('|');
            if(obj[2] == undefined)
                obj[2] = '';
            if(obj[3] == undefined)
                obj[3] = '';
            var tr = table.addTr(obj[0], obj[1], obj[2], obj[3], global_waiting_result);
            sendAccount(obj[0], obj[1], obj[3], obj[2], tr.status);
        }
    }
    function sendAccount(login, password, proxy, phone, cb){
        if(login == '' || password == ''){
            if(cb){
                cb(global_not_login_or_pass);
                return;
            }
            getClass('blueButton add-account-input')[0].addEventListener("click", submitAccount);
            getClass('blueButton add-account-input')[0].innerText = global_addAccount;
            popupInfo('error', global_error, global_not_login_or_pass);
            return;
        }
        
        if(!form.checkbox.enabled)
            if(!checkURL(proxy)){
                if(cb){
                    cb(global_fail_proxy);
                    return;
                }
                popupInfo('error', global_error, global_fail_proxy);
                getClass('blueButton add-account-input')[0].addEventListener("click", submitAccount);
                getClass('blueButton add-account-input')[0].innerText = global_addAccount;
                return;
            }
        ajax('account', {"login":login, "password":password, "proxyUrl":proxy, "phone":phone, "systemProxy":((form.checkbox.enabled)?"1":"0"), "systemProxyCountry":form.cb.getData()}, 'post', function(resp){
            console.log("getClass('blueButton add-account-input')[0]", getClass('blueButton add-account-input')[0]);
            if(getClass('blueButton add-account-input')[0]){
                getClass('blueButton add-account-input')[0].addEventListener("click", submitAccount);
                getClass('blueButton add-account-input')[0].innerText = global_addAccount;
            }
            if(resp.success){
                if(resp.data.success){
                    updateAccount(resp.data.account);
                    if(cb){
                        cb(global_account_added);
                        return;
                    }
                    popupInfo('ok', global_done, global_account_added, global_close);//result.value += arr[0]+" ОК\n";
                    return;
                }
            }
            if(cb){
                console.log(resp.data, resp);
                cb(resp.data.message);
                return;
            }
            popupInfo('error', global_error, localError(resp.data), global_close);//result.value += arr[0]+" error: "+resp.message+"\n";
        });
    }
}
function createSendingTable(){
    var table = document.createElement('table');
    var tableCount = 1;
    table.className = 'accList_table'
    var titletr = table.appendChild(document.createElement('tr'));
    titletr.className = 'title';
    titletr.appendChild(createTd(global_table_num));
    titletr.appendChild(createTd(global_login));
    titletr.appendChild(createTd(global_password));
    titletr.appendChild(createTd(global_phone_number));
    titletr.appendChild(createTd(global_proxy));
    titletr.appendChild(createTd(global_status));
    table.addTr = addTr;

    function addTr(login, password, phone, proxy, status){
        var tr = document.createElement('tr');

        tr.appendChild(createTd(login));
        tr.appendChild(createTd(password));
        tr.appendChild(createTd(phone));
        tr.appendChild(createTd(proxy));
        var status = tr.appendChild(createTd(status));
        tr.status = function(res){
            status.innerHTML = res;
        }

        table.appendChild(tr);
        return tr;
    }
    function createTd(text){
        var td = document.createElement('td');
        td.innerHTML = text;
        return td;
    }
    return table;
}
function warningDiv(text){
    var warning = document.createElement("div");
    warning.innerHTML = '<div style="background: url(./img/warning_icon.png) 50% 50% no-repeat; width: 18px; height: 16px; display: table-cell; padding: 7px 11px 0px 0px;"></div><div style="display: table-cell; color: rgb(181, 190, 203); font-size: 13px; text-align: left; vertical-align: middle;">'+text+'</div>';
    return warning;
}