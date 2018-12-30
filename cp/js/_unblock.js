this.unblock = function(){
    setActiveMenu('unblock');
    clearBlock();
    var autoMode = false;
    var mainDiv = document.createElement("div");

    //$('.topHelpBut').html('<a class="butHelp" href="https://www.youtube.com/watch?v=psNpkLGIuHk" target="_blank"><div class="blueButton">Обучение</div></a>');
    
    $('#LVideo').show();
    $('#LVideo').attr('href', 'https://www.youtube.com/watch?v=psNpkLGIuHk');

    mainDiv.className = "wrap_block";
    var accList = mainDiv.appendChild(createList());
    var content = document.getElementById("content");
    content.innerHTML = '';
    content.appendChild(mainDiv);
    if(accountsArr.length != 0){
        fillAccountsList();
    }else{
        getAccountList(fillAccountsList);
    }
    function fillAccountsList(resp){
        for(var i in accountsArr){
            if(typeof accountsArr[i].challenge == 'object') {
                if (accountsArr[i].phone === 'undefined') accountsArr[i].phone = 'Не указан'
                accList.table.addTr(accountsArr[i]._id, accountsArr[i].id, accountsArr[i].phone, accountsArr[i]._id);
            }
        }
    }
    /*ajax('account/checkpoint', {}, 'get', function(resp){
        if(!resp.data.accounts){
            console.log('!resp.accounts', resp);
            return;
        }
        for(var i in resp.data.accounts){
            accList.table.addTr(host+'/account/avatar/'+resp.data.accounts[i]._id+'?token='+token, resp.data.accounts[i].id, resp.data.accounts[i].phone, resp.data.accounts[i]._id);
        }
    });*/
    function createList(){
        var accList = document.createElement("div");
        //accList.className = "accList";
        
        var title = document.createElement("div");
        title.className = 'fil_title';
        title.info = document.createElement("div");
        title.info.innerHTML = global_title_unblock;
        title.info.className = 'fil_title_text';
        title.appendChild(title.info);
        //tooltip(title.appendChild(div('','warning floatnone')), global_tip_unblock, '700px', 'left');
        title.appendChild(div(global_tip_unblock, 'fil_description'));
        accList.appendChild(title);
        
        var automod = div('', 'auto_mod_container');
        automod.appendChild(div('Автоматический режим'));
        var switchBut = automod.appendChild(switchButton(false, function(e){
            if(!getClass('unban_table')[0])
                return;
            if(e)
                getClass('unban_table')[0].className = 'unban_table auto_mod';
            else
                getClass('unban_table')[0].className = 'unban_table';
            autoMode = e;
        }, true));
        accList.appendChild(automod);
        tooltip(switchBut, global_tip_autounblock);
        var table = accList.appendChild(createTable());
        accList.table = table;
        return accList;
    }
    function createTable(){
        var table = document.createElement('table');
        var tableCount = 1;
        table.className = 'unban_table'
        var titletr = table.appendChild(document.createElement('tr'));
        titletr.className = 'title';
        titletr.appendChild(createTd(global_table_num));
        titletr.appendChild(createTd(global_table_ava));
        titletr.appendChild(createTd(global_table_account));
        titletr.appendChild(createTd(global_phone_number));
        titletr.appendChild(createTd(global_send_code));
        titletr.appendChild(createTd(global_enter_code));
        titletr.appendChild(createTd(global_unblock_account));

        table.addTr = addTr;

        function addTr(ava, account, phone, _id){
            var tr = document.createElement('tr');

            //tr.appendChild(createTd(tableCount));
            var noavatar = document.createElement('div');
            noavatar.className = 'avatar';
            noavatar.style.background = 'url("./img/noavatar.png") 0% 0% / 48px';
            var avatar = document.createElement('div');
            avatar.className = 'avatar';
            ajax('account/'+ava+'/avatar', {token:token}, 'GET', function(res){
                if(res.success){
                    avatar.style.background = "url(data:"+res.data.mimetype+";base64,"+res.data.img+")  50% 50% / 100% no-repeat";
                    noavatar.appendChild(avatar);
                }
            });
            var avatd = document.createElement('td');
            avatd.appendChild(noavatar);
            tr.appendChild(avatd);
            tr.appendChild(createTd(account));
            phone = (phone == 'undefined') ? '' : phone;
            tr.appendChild(createTd(phone));

            var containerButton = div();
            containerButton.style.width = '183px';
            containerButton.style.margin = 'auto';

            var smsButton = document.createElement('div');
            smsButton.className = 'mail_button sms';
            var mail_icon = document.createElement('div');
            mail_icon.className = 'sms_icon';
            mail_icon.innerHTML = '<svg width="19" height="19"><use xlink:href="#sms-svg"></use></svg>'
            var mail_title = document.createElement('div');
            mail_title.className = 'title';
            mail_title.innerHTML = 'SMS';
            smsButton.appendChild(mail_icon);
            smsButton.appendChild(mail_title);
            var accid = _id;
            smsButton.addEventListener('click', function(e){
                getCode(e, accid, 'phone');
            });
            containerButton.appendChild(smsButton);

            var mailButton = document.createElement('div');
            mailButton.className = 'mail_button email';
            var mail_icon = document.createElement('div');
            mail_icon.className = 'mail_icon';
            var mail_title = document.createElement('div');
            mail_title.className = 'title';
            mail_title.innerHTML = 'email';
            mailButton.appendChild(mail_icon);
            mailButton.appendChild(mail_title);
            mailButton.addEventListener('click', function(e){
                getCode(e, accid, 'email');
            });
            containerButton.appendChild(mailButton);

            var resendButton = document.createElement('div');
            mailButton.resendButton = resendButton;
            resendButton.style.display = 'none';
            resendButton.className = 'resend_button';
            var mail_icon = document.createElement('div');
            mail_icon.className = 'circle_check';
            var mail_title = document.createElement('div');
            mail_title.className = 'title';
            mail_title.innerHTML = global_again;
            resendButton.appendChild(mail_icon);
            resendButton.appendChild(mail_title);
            resendButton.addEventListener('click', getCode);

            var mailtd = document.createElement('td');
            mailtd._id = _id;
            
            mailtd.appendChild(containerButton);
            mailtd.appendChild(resendButton);
            tr.appendChild(mailtd);

            var enterCode = document.createElement('input');
            //enterCode.id = 'enter_code';
            var enterCodeTd = document.createElement('td');
            enterCodeTd.appendChild(enterCode);
            tr.appendChild(enterCodeTd);

            var unblockButton = document.createElement('div');
            unblockButton.className = 'button_unblock';
            unblockButton.innerHTML = '<div class="icon"><svg width="12" height="17"><use xlink:href="#unlock-svg"></use></svg></div><div class="title">'+global_unblocked+'</div></div>';
            var unblockButTd = document.createElement('td');
            unblockButton._id = _id;
            unblockButton.codeinput = enterCode;
            unblockButton.addEventListener('click', sendCode);
            unblockButTd.appendChild(unblockButton);

            tr.appendChild(unblockButTd);
            tableCount++;

            table.appendChild(tr);
        }
        return table;
    }
    function sendCode(e){
        if(e.currentTarget.sendCode)
            return;
        var curTar = e.currentTarget;
        e.currentTarget.sendCode = true;
        $('.title', e.currentTarget)[0].innerHTML = '<svg width="12" height="12" style="fill:#fff"><use xlink:href="#miniload-svg"></use></svg>';

        if(autoMode){
            ajax('checkpointService/'+e.currentTarget._id, {}, 'get', function(res){
                $('.title', curTar)[0].innerHTML = global_unblocked;
                if(res.data.success){
                    popupInfo('ok', global_ok, global_account_unblock, global_close);
                    curTar.parentElement.parentElement.parentElement.removeChild(curTar.parentElement.parentElement);
                    updateAccount(res.data.account);
                }else{
                    popupInfo('error', global_error, localError(res.data), global_close);
                }
                curTar.sendCode = false;
             });
            return;
        }
        
        if(curTar.codeinput.value == ''){
            popupInfo('error', global_error, global_no_code_unlock, global_close);
            curTar.sendCode = false;
            $('.title', curTar)[0].innerHTML = global_unblocked;
            return;
        }
         ajax('checkpoint/'+e.currentTarget._id, {code:curTar.codeinput.value}, 'post', function(res){
            curTar.sendCode = false;
            $('.title', curTar)[0].innerHTML = global_unblocked;
            if(res.data.success){
                popupInfo('ok', global_ok, global_account_unblock, global_close);
                curTar.parentElement.parentElement.parentElement.removeChild(curTar.parentElement.parentElement);
                updateAccount(res.data.account);
            }else{
                popupInfo('error', global_error, localError(res.data), global_close);
            }
         });
    }
    function getCode(e, id, type){
        console.log(e.currentTarget, id, type);
        var oldName = $('.title', e.currentTarget)[0].innerHTML;
        $('.title', e.currentTarget)[0].innerHTML = '<svg width="12" height="12" style="fill:#517d9c"><use xlink:href="#miniload-svg"></use></svg>';
        if(e.currentTarget.getCode)
            return;
        e.currentTarget.getCode = true;
        
        var curTar = e.currentTarget;
        ajax('checkpoint/'+id, {"type":type}, 'get', function(res){
            console.log(res);
            curTar.getCode = false;
            if(res.data.success){
                console.log(curTar.className);
                popupInfo('ok', global_ok, global_message_send, global_close);
                /*if(curTar.className == 'mail_button'){
                    curTar.style.display = 'none';
                    curTar.resendButton.style.display = 'block';
                }*/
                $('.title', curTar)[0].innerHTML = 'Ещё раз';
            }else{
                $('.title', curTar)[0].innerHTML = oldName;
                popupInfo('error', global_error, localError(res.data), global_close);
            }
        });
    }
    function createTd(text){
        var td = document.createElement('td');
        td.innerHTML = text;
        return td;
    }
}