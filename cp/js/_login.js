this.loginClass = function(force){
    window.location = 'https://stiv.insaev.ru';
    document.body.innerHTML = "";
    return;
/*
    popup();
    createSvgIcons();
    function popup(){
        var effects = new Array();
        effects['opacity'] = {speed:0.15};
        effects['transform'] = {speed:0.3, animType:'cubic-bezier(0.17, 0.54, 0.27, 1.55)'};
        var overlay2 = document.createElement("div");
        setCssEffect(overlay2, effects);
        overlay2.id = 'overlay2';
        
        var midPos = document.createElement("div");
        midPos.style.display = 'table-cell';
        midPos.style['vertical-align'] = 'middle';
        var popup = document.createElement("div");
        popup.id = 'popup_info';
        popup.style.display = 'none';
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
        overlay2.appendChild(midPos);
        document.body.appendChild(overlay2);

    }
    
    loadAnim.style.opacity = '0';
    var effects = new Array();
    effects['opacity'] = {speed:0.3};
    effects['transform'] = {speed:0.5, animType:'cubic-bezier(0.17, 0.54, 0.27, 1.55)'};
    effects['margin-left'] = {speed:0.3, animType:'ease-in-out'};

    var background = document.createElement("div");
    background.id = "login_background";
    background.style.cssText = 'background: url(./img/login_background.jpg) 50% 50%; width: 100%; height: 100%; opacity: 0; background-repeat: no-repeat; position: absolute;';

    
    //background.appendChild(container);
    console.log('force 2 ',force);
    if(!force)
        background.appendChild(landing());
    else
        background.appendChild(loginPanel());

    setCssEffect(background, effects);
    setTimeout(function(){background.style.opacity = '1';}, 10);

    
    document.body.appendChild(background);
    function loginPanel(){
        var container = document.createElement("div");
        container.id = 'login_container';
        container.style.cssText = 'top: 50%; left: 50%; width: 360px; position: absolute; margin-left: -180px; margin-top: -145px; transform: scale(0.5);  opacity: 0; overflow: hidden;';
        setCssEffect(container, effects);
    
        container.appendChild(div('', 'login_logo'));
        
        var form = document.createElement("div");
        form.id = 'form';
        form.style.cssText = 'width: 1110px; margin-left: -370px;';
        setCssEffect(form, effects);
    
        form.appendChild(getRegForm());
        form.appendChild(getLoginForm());
        form.appendChild(getRestoreForm());
    
        container.appendChild(form);
        setTimeout(function(){
            container.style.transform = 'scale(1)';
            container.style.opacity = '1';
        }, 300);
        return container;
    }
    function landing(){
        var container = div('', 'landing_container');
        container.appendChild(div('', 'login_logo'));
        var content = div(global_main_text, 'content')
        var enterbut = div(global_entrance, 'blueButton save_button');
        enterbut.style.width = '200px';
        enterbut.style.margin = 'auto';

        content.appendChild(enterbut);
        
        container.appendChild(content);
        setCssEffect(container, effects);
        setTimeout(function(){
            container.style.transform = 'scale(1)';
            container.style.opacity = '1';
        }, 300);
        enterbut.addEventListener("click", function(e){
            container.style.transform = 'scale(0.5)';
            container.style.opacity = '0';
            setTimeout(function(){
                background.removeChild(container);
                background.appendChild(loginPanel());
            }, 300);
        });
        return container;
    }

    function gotoForm(formid){
        var form = getId('form');
        switch(formid){
            case 1:
                form.style['margin-left'] = '0px';
                console.log(form, formid);
            break;
            case 2:
                form.style['margin-left'] = '-370px';
            break;
            case 3:
                form.style['margin-left'] = '-740px';
            break;
        }
    }
    function getRegForm(){
        var regForm = document.createElement("div");
        regForm.className = 'inlineblock';
        regForm.style.cssText = 'width: 360px; float: left;  margin-right: 10px;';

        var nameTF = document.createElement("input");
        nameTF.className = 'editTextField';
        nameTF.style.cssText = 'margin-top: 40px; width: 360px;'
        nameTF.setAttribute('placeholder', global_enterName);
        regForm.appendChild(nameTF);
        
        var emailTF = document.createElement("input");
        emailTF.className = 'editTextField';
        emailTF.style.cssText = 'margin-top: 14px; width: 360px;'
        emailTF.setAttribute('placeholder', global_enterEmail);
        regForm.appendChild(emailTF);

        var promoTF = document.createElement("input");
        promoTF.className = 'editTextField';
        promoTF.style.cssText = 'margin-top: 14px; width: 360px;'
        promoTF.setAttribute('placeholder', global_enter_ref_code);
        regForm.appendChild(promoTF);

        var pass1TF = document.createElement("input");
        pass1TF.className = 'editTextField';
        pass1TF.style.cssText = 'margin-top: 14px; width: 360px;'
        pass1TF.type = 'password';
        pass1TF.setAttribute('placeholder', global_enterPassword);
        regForm.appendChild(pass1TF);

        var pass2TF = document.createElement("input");
        pass2TF.className = 'editTextField';
        pass2TF.style.cssText = 'margin-top: 14px; width: 360px;'
        pass2TF.type = 'password';
        pass2TF.setAttribute('placeholder', global_enterRePassword);
        regForm.appendChild(pass2TF);

        var capcha = div('', 'g-recaptcha');
        capcha.id = 'capcha';
        regForm.appendChild(capcha);
        var _capcha;
        setTimeout(function(){
            _capcha = grecaptcha.render(capcha, {
                'sitekey' : '6LfoPjAUAAAAAEDSJqVAXiIBzBZNl2WO3OvR--Y3'
            });
        }, 20);

        var enterBut = document.createElement("div");
        enterBut.className = 'blueButton';
        enterBut.style.cssText = 'margin-top: 14px; width: 360px;'
        enterBut.innerText = global_join;
        regForm.appendChild(enterBut);
        enterBut.addEventListener("click", function(){
            if(!regEnable){
                popupInfo('error', 'Ошибка', 'Регистрация временно недоступна', global_close);
                return;
            }
            if(nameTF.value == ''){
                regForm.appendChild(cloudComment(global_no_enter_name, '20px', '50px'));
                return;
            }
            if(!validateEmail(emailTF.value)){
                regForm.appendChild(cloudComment(global_email_not_correct, '20px', '100px'));
                return;
            }
            if(pass1TF.value == ''){
                regForm.appendChild(cloudComment(global_no_enter_password, '20px', '198px'));
                return;
            }
            if(pass2TF.value == ''){
                regForm.appendChild(cloudComment(global_no_enter_password, '20px', '248px'));
                return;
            }
            if(grecaptcha.getResponse(_capcha) == ''){
                capcha.appendChild(cloudComment(global_capcha_error, '20px', '300px'));
                return;
            }
            if(pass1TF.value == pass2TF.value){
                document.getElementById("overlay2").style.display = 'table';
                setTimeout(function(){
                    document.getElementById("overlay2").style.opacity = '1';
                }, 20);
                createUser(nameTF.value, emailTF.value, pass1TF.value, promoTF.value, grecaptcha.getResponse(_capcha));
                grecaptcha.reset(_capcha);
            }else{
                regForm.appendChild(cloudComment(global_passwords_do_not_match, '20px', '198px'));
                return;
            }
        });
        
        var lineButtons = document.createElement("div");

        var toLoginForm = document.createElement("div");
        toLoginForm.className = 'inlineButtons';
        toLoginForm.style.cssText = 'margin-top: 14px; width: 360px; text-align: center;';
        toLoginForm.innerHTML = global_foundAccount+' <a style="color:#2ca0f7">'+global_enterMini+'</a>';
        toLoginForm.onclick=function(){gotoForm(2);};
        lineButtons.appendChild(toLoginForm);

        regForm.appendChild(lineButtons);
        return regForm;
    }
    function getLoginForm(){
        var loginForm = document.createElement("form");
        loginForm.className = 'inlineblock';
        loginForm.style.cssText = 'width: 360px; float: left; margin-right: 10px;';

        var loginTF = document.createElement("input");
        loginTF.className = 'editTextField';
        loginTF.style.cssText = 'margin-top: 40px; width: 360px;'
        loginTF.setAttribute('placeholder', global_enterEmail);
        loginForm.appendChild(loginTF);
        
        var passTF = document.createElement("input");
        passTF.className = 'editTextField';
        passTF.style.cssText = 'margin-top: 14px; width: 360px;'
        passTF.type = 'password';
        passTF.setAttribute('placeholder', global_enterPassword);
        passTF.addEventListener("keydown", function(e){
            if(e.keyCode == 13)
                enter(loginTF.value, passTF.value);
        });
        loginForm.appendChild(passTF);
        var capcha = div('', 'g-recaptcha');
        capcha.id = 'capcha';
        loginForm.appendChild(capcha);
        var _capcha;
        setTimeout(function(){
            _capcha = grecaptcha.render(capcha, {
                'sitekey' : '6LfoPjAUAAAAAEDSJqVAXiIBzBZNl2WO3OvR--Y3'
            });
        }, 20);
        var enterBut = document.createElement("div");
        enterBut.className = 'blueButton';
        enterBut.type = 'submit';
        enterBut.style.cssText = 'margin-top: 14px; width: 360px;'
        enterBut.innerText = global_enter;
        enterBut.addEventListener("click", enterMouse);
        
        function enterMouse(e){
            enter(loginTF.value, passTF.value);
        }
        loginForm.appendChild(enterBut);
        
        var lineButtons = document.createElement("div");

        var createAccount = document.createElement("div");
        createAccount.className = 'inlineButtons';
        createAccount.style.cssText = 'margin-top: 14px;'
        createAccount.innerText = global_noAccount;
        createAccount.onclick= function(){ gotoForm(1);};
        lineButtons.appendChild(createAccount);

        var restorePass = document.createElement("div");
        restorePass.className = 'inlineButtons';
        restorePass.style.cssText = 'margin-top: 14px; float: right;'
        restorePass.innerText = global_restorePassword;
        restorePass.onclick=function(){gotoForm(3);};
        lineButtons.appendChild(restorePass);
        loginForm.appendChild(lineButtons);
        function enter(login, password){
            if(!validateEmail(login)){
                loginForm.appendChild(cloudComment(global_email_not_correct, '20px', '50px'));
                return;
            }
            if(password == ''){
                loginForm.appendChild(cloudComment(global_no_enter_password, '20px', '100px'));
                return;
            }
            if(grecaptcha.getResponse(_capcha) == ''){
                capcha.appendChild(cloudComment(global_capcha_error, '20px', '150px'));
                return;
            }
            enterBut.removeEventListener("click", enterMouse);
            enterBut.innerHTML = '<svg width="14" height="14" style="fill:#fff"><use xlink:href="#miniload-svg"></use></svg>';
            ajax('login', {"email":login, "password":password, "g-recaptcha-response":grecaptcha.getResponse(_capcha)}, 'post', function(res){
                if(res.success){
                    if(res.data.token){
                        setCookie("auth_token", res.data.token, {expires:5184000});
                        token = res.data.token;
                        checkAutorize(true);
                    }
                }else{
                    loginForm.appendChild(cloudComment(global_wrong_password, '20px', '50px'));
                }
                enterBut.addEventListener("click", enterMouse);
                enterBut.innerText = global_enter;
                grecaptcha.reset(_capcha);
            });
        }
        return loginForm;
    }
    function getRestoreForm(){
        var restoreForm = document.createElement("div");
        restoreForm.className = 'inlineblock';
        restoreForm.style.cssText = 'width: 360px; float: left; margin-right: 10px;';

        var loginTF = document.createElement("input");
        loginTF.className = 'editTextField';
        loginTF.style.cssText = 'margin-top: 40px; width: 360px;'
        loginTF.setAttribute('placeholder', global_enterYourEmail);
        restoreForm.appendChild(loginTF);

        var capcha = div('', 'g-recaptcha');
        capcha.id = 'capcha';
        restoreForm.appendChild(capcha);
        var _capcha;
        setTimeout(function(){
            _capcha = grecaptcha.render(capcha, {
                'sitekey' : '6LfoPjAUAAAAAEDSJqVAXiIBzBZNl2WO3OvR--Y3'
            });
            
        }, 20);

        var warningTable = document.createElement("div");
        var warningIcon = document.createElement("div");
        var warningText = document.createElement("div");
        
        warningIcon.style.cssText = 'background: url(./img/warning_icon.png) 50% 50%; background-repeat: no-repeat; width: 18px; height: 16px; display:inline-block; padding: 7px 11px 0px 0px;';
        warningTable.appendChild(warningIcon);
        warningText.style.cssText = 'display:inline-block; width: 327px; margin-top: 14px; color: #b5becb; font-size: 13px;';
        warningText.innerText = global_restorePassHelp;
        warningTable.appendChild(warningText);

        restoreForm.appendChild(warningTable);
        var enterBut = document.createElement("div");
        enterBut.className = 'blueButton';
        enterBut.style.cssText = 'margin-top: 14px; width: 360px;'
        enterBut.innerText = global_restorePasswordButton;
        restoreForm.appendChild(enterBut);
        
        var lineButtons = document.createElement("div");

        var backTologinForm = document.createElement("div");
        backTologinForm.className = 'inlineButtons';
        backTologinForm.style.cssText = 'margin-top: 14px;'
        backTologinForm.innerText = global_passRestored;
        backTologinForm.onclick = function(){ gotoForm(2);};
        lineButtons.appendChild(backTologinForm);

        restoreForm.appendChild(lineButtons);
        enterBut.addEventListener("click", restore);
        function restore(e){
            if(!validateEmail(loginTF.value)){
                restoreForm.appendChild(cloudComment(global_email_not_correct, '20px', '50px'));
                return;
            }
            if(grecaptcha.getResponse(_capcha) == ''){
                capcha.appendChild(cloudComment(global_capcha_error, '20px', '100px'));
                return;
            }
            enterBut.removeEventListener("click", restore);
            enterBut.innerHTML = '<svg width="14" height="14" style="fill:#fff"><use xlink:href="#miniload-svg"></use></svg>';
            ajax("user/reset", {user:loginTF.value, "g-recaptcha-response":grecaptcha.getResponse(_capcha)}, "POST", function(res){
                console.log(res);
                if(res.data.success){
                    popupInfo('ok', global_restore_password, global_restore_password_desc);
                }else{
                    popupInfo('error', global_restore_password, global_restore_password_fail_desc, global_close);
                }
                grecaptcha.reset(_capcha);
                enterBut.innerText = global_restorePasswordButton;
                enterBut.addEventListener("click", restore);
            });
        };
        return restoreForm;
    }
    function createUser(username, login, password, promoCode, capcha){
        ajax('user', {"username":username,"email":login, "password":password, "promoCode":promoCode, "inviteCode":(getCookie('ref'))?getCookie('ref'):"", "g-recaptcha-response":capcha}, 'post', function(res){
            if(res.success){
                if(res.data.success){
                    popupInfo('ok', global_registration_title, global_registration_success);
                }else{
                    popupInfo('ok', global_error, res.data.message);
                }
            }else{
                popupInfo('error', global_error, localError(res.data), global_close);
            }
        })/*
        $.post( host+"/user", )
        .done(function(data) {
            console.log("Data Loaded: " + data);
        })
        .fail(function(data) {
            console.log("error", data);
        })
        * /
    }
    */
}

console.log(this);

this.loginWidgetInit = function(force){
    var images = new Array();

    images.push({url: './img/login_background.jpg', status: false});
    images.push({url: './img/login_logo.png', status: false});

    var loadedCount = 0;
    for(var i in images){
        var imgloader = new Image();
        imgloader.src = images[i].url;
        imgloader.onerror = function(e){
            imgLoaded();
        }
        imgloader.onload = function(e){
            imgLoaded();
        };
    }
    function imgLoaded(){
        loadedCount++;
        if(loadedCount==images.length){
            console.log('force', force)
            loginClass(force);
        }
    }
}