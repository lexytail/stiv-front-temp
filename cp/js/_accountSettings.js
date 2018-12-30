this.accountSettings = function (params) {
    setActiveMenu('account_settings');
    clearBlock();
    var defaultProxy = false;
    var checkbox;
    var cbCountry;
    var mainDiv = document.createElement("div");
    mainDiv.className = "fil_set_container";
    var divcontent = document.getElementById("content");
    mainDiv.appendChild(createSettings());
    divcontent.innerHTML = '';
    divcontent.appendChild(createAccountList());
    divcontent.appendChild(mainDiv);
    var tfs = document.getElementsByClassName('editTextField');
    for (var i in tfs) {
        if (typeof tfs[i] != 'object')
            continue;
        tfs[i].addEventListener("input", function (e) {
            noSave = true;
        });
    }
    var chosedAccount = null;
    fillingAccountsUpdateHeight();
    window.scrollTo(0, 0);
    if (accountsArr.length != 0) {
        fillAccountsList();
    } else {
        getAccountList(fillAccountsList);
    }

    if (window.innerWidth < 650) {
        $('.fil_set_container').hide();
        $('.fil_set_container').css('margin-left', 0);
        $('.flex.autoproxy').css('margin-left', 20);
        $('.price').css('padding-left', 20);
        $('.fil_settings .autoproxy').css('margin-left', 20);

        //        $('#accListFilling').appendAfter
        //        $('<div class="nextbutton" id="nextSettings">Выбрать</div><div class="clearfix"></div>').insertAfter('.fil_title:nth-child(1)');
        //        $('<div class="nextbutton left" id="prevSettings">Назад</div><div class="clearfix"></div>').insertAfter('.fil_title:nth-child(2)');
    }
    $(document).ready(function () {
        $(document).on('click', '#nextSettings', function (e) {
            $('#accListFilling').hide();
            $('.fil_set_container').show();
        })
        $(document).on('click', '#prevSettings', function (e) {
            $('.fil_set_container').hide();
            $('#accListFilling').show();
        })
    });

    function fillAccountsList() {
        for (var i in accountsArr) {
            addAccountInList(accountsArr[i], openAccount, false);
        }
        if (params) {
            if (params.openacc) {
                var buttons = document.getElementsByClassName('button');
                for (var i in buttons) {
                    if (buttons[i].obj._id == params.openacc) {
                        buttons[i].click();
                        break;
                    }
                }
            }
        }
        if (window.innerWidth < 650) {
            //$('#fil_list').append('<div class="nextbutton" id="nextSettings">Выбрать</div><div class="clearfix"></div>');
            $('.group_tf.one').prepend('<div class="nextbutton left" id="prevSettings">Назад</div><div class="clearfix"></div>');
        }
    }
    function saveSettings() {
        var butSave = document.getElementsByClassName('blueButton add-account-input')[0];
        butSave.innerHTML = '<svg width="14" height="14" style="fill:#fff"><use xlink:href="#miniload-svg"></use></svg>';
        var overlay = document.getElementById('fil_overlay');
        overlay.style.display = 'block';
        setTimeout(function () {
            overlay.style.opacity = '0.3';
        }, 25);
        saving();
        function saving() {
            var data = new Object();
            data.id = document.getElementById('login').value;
            data.password = document.getElementById('pass').value;
            data.proxyUrl = document.getElementById('proxy').value;
            data.phone = document.getElementById('phone').value;
            data.totalEnabled = ($('#enabled')[0].enabled) ? "1" : "0";
            data.systemProxy = (checkbox.enabled) ? "1" : "0";
            if (checkbox.enabled)
                data.systemProxyCountry = cbCountry.getData();
            save(data);
            function save(data) {
                var button = document.getElementsByClassName('button active')[0];
                ajax('account/' + button.obj._id, data, 'put', function (resp) {
                    if (!resp.success) {
                        //var errors = '';
                        /*for(var i in resp.data.errors)
                            errors += localError(resp.data.errors[i]) + '<br/>';*/
                        popupInfo('error', global_saving, localError(resp.data), global_close);
                    } else {
                        button.obj = resp.data.account;
                        updateAccount(resp.data.account);
                        var obj = {};
                        obj.currentTarget = $('.button.active')[0];
                        openAccount(obj);
                        if (button.obj.enabled) {
                            $('.button.active').css('border', '');
                            $('.button.active').css('background', '');
                        } else {
                            $('.button.active').css('border', '#e0e0e0 solid 1px');
                            $('.button.active').css('background', '#e0e0e0');
                        }
                        popupInfo('ok', global_saving, global_settings_updated, global_close);
                    }
                    overlay.style.opacity = '0';
                    setTimeout(function () {
                        overlay.style.display = 'none';
                        butSave.innerHTML = global_save_settings;
                        noSave = false;
                    }, 150);
                });
            }
        }
        function openTable() {
            var div = document.getElementById("content");
            div.innerHTML = '';
            var table = div.appendChild(createSendingTable());
            for (var i in saveArray) {
                var tr = table.addTr(saveArray[i].account.id, saveArray[i].account.token, saveArray[i].account.phone, saveArray[i].account.proxyUrl, saveArray[i].message);
            }
        }
    }
    function cancelChosed() {
        while (document.getElementsByClassName('button active').length > 0) {
            document.getElementsByClassName('button active')[0].className = 'button';
        }
    }
    function openAccount(e) {
        cancelChosed();
        if (noSave) {
            var event = {};
            event.currentTarget = e.currentTarget;
            event.target = e.target;
            event.obj = e.obj;
            popupInfo('question', global_warning, global_no_save_data, global_continue, global_close, function () {
                noSave = false;
                cancelChosed();
                openAccount(event);
            });
            return;
        }
        document.getElementById('start_info').style.display = 'none';
        document.getElementById('save_settings').style.opacity = '1';
        document.getElementsByClassName('group_tf')[0].style.opacity = '1';
        document.getElementsByClassName('fil_settings')[0].style['pointer-events'] = 'auto';

        chosedAccount = e.currentTarget;
        chosedAccount.className = 'button active';

        fillTFs(chosedAccount.obj);
        function fillTFs(obj) {
            $('#enabled')[0].setPos(obj.enabled);
            document.getElementById('login').value = obj.id;
            document.getElementById('pass').value = obj.token;
            document.getElementById('proxy').value = (obj.proxyUrl || "");
            document.getElementById('phone').value = obj.phone;
            if (obj.systemProxy != null) {
                if (!checkbox.enabled)
                    checkbox.change();
                $('#proxy').prop('disabled', true);
                defaultProxy = true;
            } else {
                if (checkbox.enabled)
                    checkbox.change();
                $('#proxy').prop('disabled', false);
                defaultProxy = false;
            }
            $('#country').fadeOut(150);
        }
        if (window.innerWidth < 650) {
            $('#accListFilling').hide();
            $('.fil_set_container').show();
        }
    }
    function createSettings() {
        var settings = document.createElement("div");
        settings.className = 'fil_settings';
        var overlay = document.createElement("div");
        overlay.id = 'fil_overlay';
        overlay.style.display = 'none';
        settings.appendChild(overlay);
        var title = document.createElement("div");
        title.className = 'fil_title';

        title.info = document.createElement("div");
        title.info.innerHTML = global_title_settings_account;
        title.info.className = 'fil_title_text';
        title.appendChild(title.info);
        settings.appendChild(title);
        var startJobInfo = document.createElement("div");
        startJobInfo.id = 'start_info';
        startJobInfo.innerHTML = global_chose_account;
        settings.appendChild(startJobInfo);
        var leftDiv = document.createElement("div");
        leftDiv.className = 'group_tf one';
        leftDiv.style.overflow = 'unset';
        var countBlock = div('', 'containerq fil');
        var title = div('Аккаунт активен:', 'tf_title2');
        countBlock.appendChild(title);
        var but = div('', 'buttons');
        tooltip(but.appendChild(div('', 'warning')), 'Отключить все действия с этим аккаунтом');
        but.appendChild(switchButton(true, function () { })).id = 'enabled';
        countBlock.appendChild(but);

        leftDiv.appendChild(countBlock);
        leftDiv.appendChild(createTextField(global_login, global_enterLogin)).getElementsByTagName('input')[0].id = 'login';
        leftDiv.appendChild(createTextField(global_password, global_enterPassword)).getElementsByTagName('input')[0].id = 'pass';
        leftDiv.appendChild(createTextField(global_phone_number, global_phoneNumber)).getElementsByTagName('input')[0].id = 'phone';
        leftDiv.appendChild(createTextField(global_proxy, global_enterProxy)).getElementsByTagName('input')[0].id = 'proxy';
        var proxyold = '';
        checkbox = createCheckBox(false, function (toggle) {
            if (toggle) {
                $('#proxy').prop('disabled', true);
                if (defaultProxy) {
                    $('#proxy').val(proxyold);
                } else {
                    $('#country', leftDiv).fadeIn(150);
                }
                $('.price').fadeIn(150);
            } else {
                if (defaultProxy) {
                    popupInfo('question', global_warning, 'Прокси будет безвозвратно удалён и его использование будет невозможно. Денежные средства за остаток периода не компенсируются.', 'Продолжить', global_close, function () {
                        proxyold = $('#proxy').val();
                        $('#proxy').val('');
                        $('.price').fadeOut(150);
                        $('#proxy').prop('disabled', false);
                    }, function () {
                        checkbox.change();
                    });
                } else {
                    $('#proxy').prop('disabled', false);
                    $('.price').fadeOut(150);
                    $('#country', leftDiv).fadeOut(150);
                }
            }
        });
        var autoProxyCheck = div('', 'flex autoproxy');
        autoProxyCheck.appendChild(checkbox);
        $(autoProxyCheck).append('<span class="lable_r proxy_lable">Подключить прокси автоматически</span>');
        leftDiv.appendChild(autoProxyCheck);
        leftDiv.appendChild(div('Ежемесячное списание 30 руб.', 'price'));
        $(leftDiv).append('\
        <div id="country" class="wrapper-dropdown autoproxy" tabindex="1"><span></span>\
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
        //$('#country', leftDiv).hide();
        $('.regulations', leftDiv).on("click", function () {
            popupInfo('ok', global_warning, 'STIV не берет на себя ответственность за работоспособность прокси,так как он предоставляется сторонним сервисом.', global_close);
        });
        cbCountry = new DropDown($('#country', leftDiv));

        settings.appendChild(leftDiv);

        var butSend = document.createElement("div");

        butSend.className = 'blueButton add-account-input';
        butSend.style['margin'] = '30px auto 50px';
        butSend.style.opacity = '0';
        butSend.style.transition = 'opacity 0.15s linear';
        butSend.innerText = global_save_settings;
        butSend.id = 'save_settings';
        butSend.addEventListener('click', saveSettings);
        settings.appendChild(butSend);
        return settings;
    }
}