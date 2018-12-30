this.profileSettingsNew = function(){
    setActiveMenu(null);
    clearBlock();
    var content = document.getElementById("content");
    content.innerHTML = '';
    content.appendChild(createProfile());  


    function createProfile(){
        var mainDiv = document.createElement("div");
        mainDiv.className = "p_container";

        var profile = document.createElement("div");
        profile.className = 'settings';
        profile.appendChild(createTitle(global_title_profile_settings));

        var avatarCont = document.createElement("div");
        avatarCont.className = 'avatar_cont';

        var avatar = document.createElement("div");
        avatar.className = 'avatar profile';
        updateProfileAvatars();
        var changeAvatar = document.createElement("div");
        changeAvatar.className = 'blueButton ava_button';
        changeAvatar.innerText = global_load_avatar;
        changeAvatar.id = 'load_avatar';

        avatarCont.appendChild(avatar);
        avatarCont.appendChild(changeAvatar);

        var inputFile = document.createElement("input");
        inputFile.type = 'file';
        inputFile.id = 'upload_file';
        inputFile.accept="image/jpeg, image/png";
        inputFile.style.visibility = 'hidden';
        inputFile.style.position = 'absolute';
        inputFile.multiple = 'false';
        profile.appendChild(inputFile);
        
        inputFile.addEventListener('change', function(e){
            readURL(inputFile);
            getClass('load_lable')[0].innerHTML = inputFile.files[0].name;
        });
        changeAvatar.addEventListener('click', function(){
            inputFile.click();
        });
        function readURL(input) {
            if(input.files && input.files[0]){
                var reader = new FileReader();
                reader.onload = function (e) {
                    avatar.style.background = 'url("'+e.target.result+'")  50% 50% / 100% no-repeat';
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        profile.appendChild(avatarCont);
        profile.appendChild(createTextField(global_old_password, ''));
        profile.appendChild(createTextField(global_new_password, ''));
        profile.appendChild(createTextField(global_repeat_password, ''));
        var apiKey = profile.appendChild(createTextField(global_api_key_sms_reg_ru, ''));
        if(apiKeys && apiKeys.smsreg)
            apiKey.tf.value = apiKeys.smsreg;
        var saveSettings = document.createElement("div");
        saveSettings.className = 'blueButton save_button';
        saveSettings.innerText = global_save;
        saveSettings.id = 'save_settings';
        profile.appendChild(saveSettings);

        saveSettings.addEventListener("click", function(){
            if(inputFile.files && inputFile.files[0]){
                var dataUpload = new FormData();
                dataUpload.append('img', inputFile.files[0]);

                $.ajax({
                    type: "POST",
                    enctype: 'multipart/form-data',
                    url: host+'/user/upload',
                    data: dataUpload,
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 600000,
                    headers: {
                        "x-access-token": token
                    },
                    success: function (respUpl) {
                        if(respUpl.success)
                            savePasswords();
                        else
                            popupInfo('error', global_profile_settings, localError(respUpl), global_close);
                    },
                    error: function (e) {
                        popupInfo('error', global_profile_settings, e, global_close);
                    }
                });
            }else{
                savePasswords();
            }
        });
        function savePasswords(){
            updateProfileAvatars();
            if(getClass("editTextField")[0].value == "" && getClass("editTextField")[1].value == "" && getClass("editTextField")[2].value == "" && getClass("editTextField")[3].value == ""){
                popupInfo('ok', global_profile_settings, global_settings_updated, global_close);
                return;
            }
            if(getClass("editTextField")[1].value == getClass("editTextField")[2].value){
                ajax("user", {password:getClass("editTextField")[0].value, newPassword:getClass("editTextField")[1].value, smsregKey:getClass("editTextField")[3].value}, "PUT", function(res){
                    if(res.success){
                        popupInfo('ok', global_profile_settings, global_settings_updated, global_close);
                    }else{
                        popupInfo('error', global_profile_settings, localError(res.data), global_close);
                    }
                });
            }else{
                popupInfo('error', global_profile_settings, global_passwords_do_not_match, global_close);
            }
        }
        function paymentBlock(){
            var payment = document.createElement("div");
            payment.className = 'payment';
            payment.appendChild(createTitle('<b>Тарифная</b> сетка'));

            var payChoseCont = payment.appendChild(div('','tarifsContainer'));
            
            ajax('user/tariff', {}, 'get', function(res){
                console.log(res);
                if(!res.success)
                    return;
                    createTarifs(res.data.tariffs);
            });
            function createTarifs(tariffs){
                var payChose = [];
                $('.tarifsContainer').html('');
                for(var i in tariffs){
                    var description = (tariffs[i].accounts>=0)?('<p> до '+tariffs[i].accounts+' аккаунтов</p>'):('<p>Количество аккаунтов не ограничено</p>');
                    //description += '<p>Можно запустить до '+tariffs[i].tasks+' задач</p>';
                    description += '<b>Действует '+tariffs[i].period+' дней</b>';
                    
                    payChose.push($('.tarifsContainer').append(createPayBlock(tariffs[i].name+((tariffs[i].special)?"*":""), description, ((tariffs[i].discount)?('<div class="price discount">'+tariffs[i].sum+' руб</div><div class="price">'+tariffs[i].sum*tariffs[i].discount+' руб</div>'):'<div class="price">'+tariffs[i].sum+' руб</div>'), tariffs[i].index, tariffs[i].selected)));
                }
                var predBut = null;
                $('.tarif .button').on('click', function(e){
                    if($(e.currentTarget).parent().parent().hasClass('selected'))
                        return;
                    popupInfo('question', 'Смена тарифа', 'Вы уверены, что хотите перейти на новый тарифный план?', 'Перейти', 'Отмена', function(){
                        if(predBut)
                            return;
                        predBut = $(e.currentTarget).html()
                        $(e.currentTarget).html('<svg width="12" height="12" style="fill:#fff"><use xlink:href="#miniload-svg"></use></svg>');
                        $(e.currentTarget).css('background', '#2ca0f7');
                        ajax('user/tariff', {"tariff":e.target.id}, 'post', function(res){
                            console.log(res);
                            if(res.success){
                                user.subscription = res.data.user.subscription;
                                user.balance = res.data.user.balance;
                                user.secondsUntilSubscriptionEnded = (new Date(res.data.user.subscription.nextBilling).getTime() - new Date().getTime())/1000;
                                $('.infos .nextBilling').text(new Date(user.subscription.nextBilling).toLocaleString("ru", dateOptions));
                                createTarifs(res.data.tariffs);
                                $('.balance').text(user.balance+' руб.');
                                for(var i in res.data.tariffs)
                                    if(res.data.tariffs[i].selected){
                                        tariff = res.data.tariffs[i];
                                        $('.infos .tarifname').text(tariff.name);
                                        $('.tarif .name span').text(tariff.name);
                                        $('.infos .accounts').text('0/'+tariff.accounts);
                                        $('.tarif .days').html('Осталось <span>'+getSubscriptionTime()+'</span>');
                                        break;
                                    }
                                predBut = null;
                            }else{
                                popupInfo('error', global_error, localError(res.data), global_close);
                                $(e.currentTarget).html(predBut);
                                $(e.currentTarget).css('background', "");
                                predBut = null;
                            }
                        });
                    });
                });
            }
            /*payChose.push(payChoseCont.appendChild(createPayBlock('Trial', '<p>Поддерживается до 3 аккаунтов</p><p>Можно создать до 3 задач</p><p>Можно запустить до 3 задач</p><p><b>Действует 7 дней</b></p>', 0, true)));
            payChose.push(payChoseCont.appendChild(createPayBlock('Simple', '<p>Поддерживается до 2 аккаунтов</p><p>Можно запустить до 3 задач</p>', 490)));
            payChose.push(payChoseCont.appendChild(createPayBlock('Basic', '<p>Количество аккаунтов не ограничено</p><p>Можно запустить до 7 задач</p>', 690)));
            payChose.push(payChoseCont.appendChild(createPayBlock('Trial', '<p>Поддерживается до 3 аккаунтов</p><p>Можно создать до 3 задач</p><p>Можно запустить до 3 задач</p><p><b>Действует 7 дней</b></p>', 0, true)));
            payChose.push(payChoseCont.appendChild(createPayBlock('Simple', '<p>Поддерживается до 2 аккаунтов</p><p>Можно запустить до 3 задач</p>', 490)));
            payChose.push(payChoseCont.appendChild(createPayBlock('Basic', '<p>Количество аккаунтов не ограничено</p><p>Можно запустить до 7 задач</p>', 690)));
            */
            function createPayBlock(title, description, price, index, selected = false){
                var container = div('','tarif'+((selected|" selected")?" selected":""));
                $(container).html('<div class="inblock"><div class="title">'+title+'</div><div class="description">'+description+'</div></div><div class="botblock">'+price+'<div class="button" id="'+index+'">'+((selected)?'Текущий тарифный план':'Перейти на тарифный план')+'</div></div>');
                return container;
            }
            
            return payment;
        }
        function profileInfo(){
            console.log(user);
            $(mainDiv).append('<div class="settings"><div class="fil_title"><div class="fil_title_text"><b>Информация</b> о профиле</div></div><div class="info"></div><div class="payblock"></div></div>');
            $('.settings .info', mainDiv).html('<div class="infos">Баланс: <span class="balance">'+user.balance+' руб.</span><br>Аккаунты: <span class="accounts">'+0+'/'+tariff.accounts+'</span></div>\
            <div class="infos">Дата списания: <span class="nextBilling">'+new Date(user.subscription.nextBilling).toLocaleString("ru", dateOptions)+'</span><br>Текущий тариф: <span class="tarifname">'+tariff.name+'</span></div>');
            $('.settings .payblock', mainDiv).html('<div class="containerq">\
                <div class="sliderLine">\
                    <div class="point"></div>\
                    <div class="linesContainer"></div>\
                </div>\
                <div class="sumBlock"><lable for="sum">Сумма: </lable><input type="text" id="sum"></input></div>\
                <div class="blueButton save_button addBalance">Пополнить</div>\
            </div>');
            var circle = $('.point',mainDiv)[0];
            var range = $('.sliderLine',mainDiv)[0];
            circle.addEventListener('mousedown', mouseDown);
            range.addEventListener('click', click);
            window.addEventListener('mouseup', mouseUp);
            var offsetX = 0;
            function click(e){
                if($(e.target).attr('sum')){
                    setSum($(e.target).attr('sum'));
                }else{
                    moveDiv(e);
                }
            }
            function mouseUp(e) {
                removeNoSelect(document.body);
                window.removeEventListener('mousemove', moveDiv);
            }
            function mouseDown(e){
                setNoSelect(document.body);
                var coords = circle.getBoundingClientRect();
                offsetX = e.clientX - coords.left;
                window.addEventListener('mousemove', moveDiv);
            }
            function moveDiv(e){
                var coords = range.getBoundingClientRect();
                var x = (100/(range.clientWidth-20))*(e.clientX - coords.left - offsetX);
                
                var sum = parseInt(((25000/100)*x), 10);
                
                sum = String(sum).substring(0, String(sum).length - 1)+'0';
                if(sum < 10)
                    sum = 10;
                if(sum > 25000)
                    sum = 25000;
                
                $('.sumBlock #sum',mainDiv).val(sum);
                setSum(sum);
            }
            function setX(perc){
                if(perc<0)
                    perc = 0;
                if(perc>100)
                    perc = 100;
                circle.style.left = 'calc( '+perc+'% - 10px )';
            }
            function timeoutSet(){
                var val = parseInt($('.sumBlock #sum',mainDiv).val());
                setSum(val)
            }
            function setSum(sum){
                if(isNaN(sum))
                    sum = 10;
                if(sum > 25000)
                    sum = 25000;
                if(sum < 10)
                    sum = 10;
                $('.sumBlock #sum',mainDiv).val(sum + ' руб.');
                setX((100/25000)*sum);
            }
            var timeout;
            $('.sumBlock #sum',mainDiv).on('input', function(ev){
                clearTimeout(timeout);
                timeout = setTimeout(timeoutSet, 1000);
            });
            setSum(3000);
            var lineSum = [{"sum":100, "lable":"100р"}, {"sum":5000, "lable":"5 000р"}, {"sum":10000, "lable":"10 000р"}, {"sum":15000, "lable":"15 000р"}, {"sum":20000, "lable":"20 000р"}, {"sum":25000, "lable":"25 000р"}];
            for(var i=0; i<lineSum.length; i++){
                $('.linesContainer',mainDiv).append('<div class="line" style="left: '+(100/25000)*lineSum[i].sum+'%">\
                    <div class="lable" sum="'+lineSum[i].sum+'">'+lineSum[i].lable+'</div>\
                </div>');
            }
            $('.addBalance', mainDiv).on("click", function(e){
                ajax('user/pay', {"sum":parseInt($('#sum').val(), 10)}, 'get', function(res){
                    if(res.success)
                        if(res.data.url)
                            window.location = res.data.url;
                    else
                        popupInfo('error', global_error, localError(res.data));
                });
            });
        }
        profileInfo();
        mainDiv.appendChild(paymentBlock());
        mainDiv.appendChild(profile);
        
        return mainDiv;
    }
    function reateTip(left, text){
        var tip = document.createElement("div");
        tip.className = 'tip';
        tip.innerHTML = text;
        tip.style.left = 'calc('+left+'% - (40px))';
        return tip;
    }
    function createDelitel(perc){
        var delitel = document.createElement("div");
        delitel.style.left = perc+'%';
        delitel.className = 'delitel';
        return delitel;
    }
    function createTextField(_title, placeholder){
        var tfContainer = document.createElement("div");
        tfContainer.className = 'tf_container p_settings';
        var title = document.createElement("div");
        title.innerHTML = _title+':';
        title.className = 'title';
        var tf = document.createElement("input");
        tf.autocomplete="off";
        tf.className = 'editTextField';
        tf.style.width = '300px';
        tf.setAttribute('placeholder', placeholder);
        tfContainer.appendChild(title);
        tfContainer.appendChild(tf);
        tfContainer.tf = tf;
        return tfContainer;
    }
    function createTitle(title_text){
        var title = document.createElement("div");
        title.className = 'fil_title';
        title.info = document.createElement("div");
        title.info.innerHTML = title_text;
        title.info.className = 'fil_title_text';
        title.appendChild(title.info);
        return title;
    }
    function rangeEngine(range, circle){
        circle.addEventListener('mousedown', mouseDown);
        range.addEventListener('click', click);
        window.addEventListener('mouseup', mouseUp);
        var offsetX = 0;
        function click(e){
            moveDiv(e);
        }
        function mouseUp(e) {
            removeNoSelect(document.body);
            window.removeEventListener('mousemove', moveDiv);
            circle.className = 'circle';
        }
        function mouseDown(e){
            setNoSelect(document.body);
            var coords = circle.getBoundingClientRect();
            offsetX = e.clientX - coords.left;
            window.addEventListener('mousemove', moveDiv);
            circle.className = 'circle active';
        }
        function moveDiv(e){
            var coords = range.getBoundingClientRect();
            var x = e.clientX - coords.left - offsetX;
            if(x<0)
                x = 0;
            if(x>range.clientWidth-10)
                x = range.clientWidth-10;
            
            var perc = (range.clientWidth/4)/2;
            var curPerc = 0;
            while(curPerc < range.clientWidth){
                if(curPerc + range.clientWidth/4 < x){
                    curPerc+=range.clientWidth/4;
                    continue;
                }
                if(curPerc + perc > x){
                    x = (100/range.clientWidth)*(curPerc);
                }else{
                    x = (100/range.clientWidth)*(curPerc + range.clientWidth/4);
                }
                break;
            }
            circle.style.left = x+'%';
        }
    }
}