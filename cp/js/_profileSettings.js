this.profileSettings = function(){
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

        
        
/*
        var slider = document.createElement("div");
        slider.className = 'range-slider';

        var range = document.createElement("div");
        range.className = 'range';
        range.appendChild(createDelitel(25));
        range.appendChild(createDelitel(50));
        range.appendChild(createDelitel(75));

        var circle = document.createElement("div");
        circle.className = 'circle';
        
        var tip = document.createElement("div");
        tip.className = 'range-tip';
        tip.appendChild(reateTip(0, '3 дня'));
        tip.appendChild(reateTip(25, '1 месяц'));
        tip.appendChild(reateTip(50, '3 месяца'));
        tip.appendChild(reateTip(75, '6 месяцев'));
        tip.appendChild(reateTip(100, '1 год'));
        range.appendChild(circle);
        range.appendChild(tip);
        slider.appendChild(range);
        rangeEngine(range, circle);

        
        payment.appendChild(slider);
*/

      /*  var priceBox = document.createElement("div");
        priceBox.className = 'price_box';

        var titlePrice = document.createElement("div");
        titlePrice.innerHTML = '&nbsp;';//global_noob;
        titlePrice.style['margin-top'] = '9px';
        titlePrice.className = 'title';

        var price = document.createElement("div");
        price.innerHTML = '1 Месяц'
        price.className = 'price';

        var about = document.createElement("div");
        about.innerHTML = '900 рублей';
        about.className = 'about';

        priceBox.appendChild(titlePrice);
        priceBox.appendChild(price);
        priceBox.appendChild(about);

        payment.appendChild(priceBox);
        */
        function paymentBlock(){
            var payment = document.createElement("div");
            payment.className = 'payment';
            payment.appendChild(createTitle(global_title_access_payment));

            var payChoseCont = payment.appendChild(div('','chosedBlocks'));
            var payChose = [];
            payChose[0] = payChoseCont.appendChild(createPayBlock(30, 900));
            payChose[1] = payChoseCont.appendChild(createPayBlock(90, 2500));
            payChose[2] = payChoseCont.appendChild(createPayBlock(180, 4600));
            function createPayBlock(days, price){
                var container = div('','chose');
                if(days == 90){
                    setTimeout(function(){
                        chosePrice(container);
                    }, 16);
                }
                var priceInDay = parseFloat((price/days).toFixed(1));
                container.days = days;
                container.price = price;
                var preview = container.appendChild(div('','preview days'+days));
                preview.appendChild(div('<span>'+days+'</span><br/>дней', 'lable'))
                container.appendChild(div((price)+' руб', 'price'));
                container.appendChild(div(priceInDay+' рублей в день', 'priceDay'));

                container.addEventListener("click", function(e){
                    chosePrice(e.currentTarget);
                });
                return container;
            }
            var descPaymentCont = payment.appendChild(div('', 'paymentDescriprion'));
            var cont1 = descPaymentCont.appendChild(div('','block1'));
            var cont2 = descPaymentCont.appendChild(div('','block2'));
            cont1.appendChild(div('К оплате:', 'lable'));
            var sum = cont1.appendChild(div('0 руб', 'choseprice'));
            cont1.appendChild(div('Без учета скидки по промокоду', 'nopromo'));
            //var warning = cont2.appendChild(div('', 'warCont'));
            //warning.appendChild(div('', 'warning'));
            //warning.appendChild(div('тут какая-то дичь про галакси ноте', 'warningText'));

            function chosePrice(priceBlock){
                if(getClass("chose active")[0])
                    getClass("chose active")[0].classList.remove('active');
                priceBlock.classList.add('active');
                sum.innerHTML = (priceBlock.price)+'руб';
            }

            var payBut = div();
            payBut.className = 'blueButton save_button';
            payBut.innerText = global_pay;
            payBut.id = 'pay';

            payBut.addEventListener("click", function(e){
                ajax('user/bill', {tariff:'T_'+getClass("chose active")[0].days/30+'M'}, 'GET', function(res){
                    if(res.success)
                        if(res.data.url)
                            window.location = res.data.url;
                    else
                        popupInfo('error', global_error, localError(res.data));
                });
            });

            cont2.appendChild(payBut);
            return payment;
        }
        function createPromo(){
            var promoCont = div('', 'payment promocodeCont');
            var lableBlock = promoCont.appendChild(div('', 'lableBlock'));
            lableBlock.appendChild(div('Промокод', 'lable'));
            //lableBlock.appendChild(div('Какая-то дичь про галакси нот', 'desc'));
            var promoBlock = promoCont.appendChild(div('', 'promoBlock'));
            var promoinput = promoBlock.appendChild(document.createElement("input"));
            promoinput.placeholder = 'Введите промокод';
            var promobut = promoBlock.appendChild(div(global_activate, 'blueButton save_button'));
            promobut.addEventListener("click", function(e){
                if(promoinput.value == ''){
                    popupInfo('error', global_error, global_not_promocode);
                    return;
                }
                ajax('user/bill', {code:promoinput.value}, 'GET', function(res){
                    if(res.success){
                        window.location = './?page=payment_success';
                    }else
                        popupInfo('error', global_error, localError(res.data));
                });
            });
            return promoCont;
            /*
            var promoinput = document.createElement("input");
            promoinput.autocomplete="off";
            promoinput.className = 'editTextField';
            promoinput.style.width = '80%';
            promoinput.setAttribute('placeholder', global_write_promocode);
            promo.appendChild(promoinput);

            var promobut = div(global_activate, 'blueButton save_button');
            promobut.style.width = '80%';
            promo.appendChild(promobut);
            promobut.addEventListener("click", function(e){
                if(promoinput.value == ''){
                    popupInfo('error', global_error, global_not_promocode);
                    return;
                }
                ajax('user/bill', {code:promoinput.value}, 'GET', function(res){
                    if(res.success){
                        window.location = '/?page=payment_success';
                    }else
                        popupInfo('error', global_error, localError(res.data));
                });
            });*/
        }
        mainDiv.appendChild(paymentBlock());
        mainDiv.appendChild(profile);
        mainDiv.appendChild(createPromo());
        
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