this.fillingSettings = function(params){
    setActiveMenu('filling_settings');
    clearBlock();
    var mainDiv = document.createElement("div");
    mainDiv.className = "fil_set_container";

//    $('.topHelpBut').html('<a class="butHelp" href="https://www.youtube.com/watch?v=fLJZLZt5wn4" target="_blank"><div class="blueButton">Обучение</div></a>');

    $('#LVideo').show();
    $('#LVideo').attr('href', 'https://www.youtube.com/watch?v=fLJZLZt5wn4');

    var content = getId("content");
    mainDiv.appendChild(createSettings());
    content.innerHTML = '';
    content.appendChild(createAccountList());
    content.appendChild(mainDiv);
    var tfs = getClass('editTextField');
    for(var i in tfs){
        if(typeof tfs[i] != 'object')
            continue;
        tfs[i].addEventListener("input", function(e){
            noSave = true;
//            console.log('input?');
        });
    }
    var chosedAccount = null;
    fillingAccountsUpdateHeight();
    window.scrollTo(0, 0);
    if(accountsArr.length != 0){
        fillAccountsList();
    }else{
        getAccountList(fillAccountsList);
    }

    if (window.innerWidth < 650) {
        $('.fil_set_container').hide();
        $('.fil_set_container').css('margin-left', 0);
        $('.flex.autoproxy').css('margin-left', 0);
        
//        $('#accListFilling').appendAfter
//        $('<div class="nextbutton" id="nextSettings">Выбрать</div><div class="clearfix"></div>').insertAfter('.fil_title:nth-child(1)');
//        $('<div class="nextbutton left" id="prevSettings">Назад</div><div class="clearfix"></div>').insertAfter('.fil_title:nth-child(2)');
    }
    $(document).ready(function(){
        $(document).on('click','#nextSettings',function(e) {
            $('#accListFilling').hide();
            $('.fil_set_container').show();
        })
        $(document).on('click','#prevSettings',function(e) {
            $('.fil_set_container').hide();
            $('#accListFilling').show();
        })
    });

    
    function fillAccountsList(){
        for(var i in accountsArr){
            addAccountInList(accountsArr[i], openAccount);
        }
        if(params){
            if(params.openacc){
                var buttons = getClass('button');
                for(var i in buttons){
                    if(buttons[i].obj._id == params.openacc){
                        buttons[i].click();
                        break;
                    }
                }
            }
        }
        if (window.innerWidth < 650) {
            //$('#fil_list').append('<div class="nextbutton" id="nextSettings">Выбрать</div><div class="clearfix"></div>');
            $('<div class="nextbutton left" id="prevSettings">Назад</div><div class="clearfix"></div>').insertBefore('.fil_settings .switch.big');
        }
    }
    function hideUnicalInputs(){
        /*getId('login').parentElement.className = 'tf_container hidden';
        getId('pass').parentElement.className = 'tf_container hidden';
        getId('proxy').parentElement.className = 'tf_container hidden';
        getId('phone').parentElement.className = 'tf_container hidden';*/
        //getId('watermark').className = 'tf_container hidden';
        checkUndubles();
    }
    function showUnicalInputs(){
        /*getId('login').parentElement.className = 'tf_container';
        getId('pass').parentElement.className = 'tf_container';
        getId('proxy').parentElement.className = 'tf_container';
        getId('phone').parentElement.className = 'tf_container';*/
        //getId('watermark').className = 'tf_container';
        checkUndubles();
    }
    function cancelChosed(){
        while(getClass('check active').length > 0){
            getClass('check active')[0].className = 'check';
        }
        while(getClass('button active').length > 0){
            getClass('button active')[0].className = 'button';
        }
    }
    function checkUndubles(){
        var buts = getClass('button active');
        getId('donors').placeholder = global_enterDonors;
        getId('stop_words').placeholder = global_enterStopWords;
        getId('tag_list').placeholder = global_enterTags;
        getId('coefficient').placeholder = global_enterNumber;
        getId('post_count').placeholder = global_enterNumber;
        getId('max_tags').placeholder = global_enterNumber;
        getId('watermark').className = 'tf_container';
        getId('watertextcontainer').removeAttribute("style");
        getClass('linkcont')[0].removeAttribute("style");
        if(getId('textwatermark').enabled)
            getId('watermark').style.height = '0px';
        
        for(var i = 0; i < buts.length; i++){
            if(buts[i].obj.watermark == true && buts.length != 1){
                getId('watermark').className = 'tf_container hidden';
                getClass('load_lable')[0].innerHTML = global_watermark_not_upload;
                getId('watertextcontainer').style.display = 'none';
            }
            if(!buts[i+1])
                continue;
            if(buts[i].obj.posting.signature != buts[i+1].obj.posting.signature){
                getId('watertextcontainer').style.display = 'none';
                getId('watermark').className = 'tf_container hidden';
                getClass('load_lable')[0].innerHTML = global_watermark_not_upload;
                getId('watermark').removeAttribute("style");
            }
            if(buts[i].obj.posting.linkFilter != buts[i+1].obj.posting.linkFilter){
                getClass('linkcont')[0].style.display = 'none';
            }
            if(!dublicat(buts[i].obj.posting.donors, buts[i+1].obj.posting.donors)){
                getId('donors').value = '';
                getId('donors').placeholder = global_no_dublicat;
            }
            if(!dublicat(buts[i].obj.posting.stopWords, buts[i+1].obj.posting.stopWords)){
                getId('stop_words').value = '';
                getId('stop_words').placeholder = global_no_dublicat;
            }
            if(!dublicat(buts[i].obj.posting.tags.list, buts[i+1].obj.posting.tags.list)){
                getId('tag_list').value = '';
                getId('tag_list').placeholder = global_no_dublicat;
            }
            if(buts[i].obj.posting.coefficient != buts[i+1].obj.posting.coefficient){
                getId('coefficient').value = '';
                getId('coefficient').placeholder = global_no_dublicat;
            }
            if(buts[i].obj.posting.maximum != buts[i+1].obj.posting.maximum){
                getId('post_count').value = '';
                getId('post_count').placeholder = global_no_dublicat;
            }
            if(buts[i].obj.posting.tags.maximum != buts[i+1].obj.posting.tags.maximum){
                getId('max_tags').value = '';
                getId('max_tags').placeholder = global_no_dublicat;
            }
            if(buts[i].obj.posting.fromTime != buts[i+1].obj.posting.fromTime){
                getClass('time')[0].value = '!';
                getClass('time')[1].value = '!';
            }
            if(buts[i].obj.posting.tillTime != buts[i+1].obj.posting.tillTime){
                getClass('time')[2].value = '!';
                getClass('time')[3].value = '!';
            }
            if(buts[i].obj.posting.fromInterval != buts[i+1].obj.posting.fromInterval){
                getClass('promotionNumber')[0].value = '!';
            }
            if(buts[i].obj.posting.tillInterval != buts[i+1].obj.posting.tillInterval){
                getClass('promotionNumber')[1].value = '!';
            }
        }
    }
    function saveSettings(){
        var saveArray = new Array();
        var butSave = getClass('blueButton add-account-input')[0];
        butSave.innerHTML = '<svg width="14" height="14" style="fill:#fff"><use xlink:href="#miniload-svg"></use></svg>';
        var overlay = getId('fil_overlay');
        overlay.style.display = 'block';
        setTimeout(function(){
            overlay.style.opacity = '0.3';
        }, 25);
        
        if(getClass('load_lable')[0].innerHTML != global_watermark_not_upload && getClass('load_lable')[0].innerHTML != global_delete){
            var butsWatermark = [].slice.call(getClass('button active'));
            var dataUpload = new FormData();
            dataUpload.append("img", getId('upload_watermark').files[0]);
            var ids = JSON.stringify(butsWatermark.map(function(el){return el.obj._id}))
            dataUpload.append("ids", ids);
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: host+'/account/upload',
                data: dataUpload,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                headers: {
                    "x-access-token": token
                },
                success: function (respUpl) {
//                    console.log(respUpl);
                    getWatermark();
                    saving();
                },
                error: function (e) {
                    console.log(e);
                    overlay.style.opacity = '0';
                    setTimeout(function(){
                        overlay.style.display = 'none';
                        butSave.innerHTML = global_save_settings;
                        popupInfo('error', global_error, e, global_close);
                    }, 150);
                }
            });
        }else{
            console.log('!dataUpload');
            saving();
        }
        function saving(){
            var buts = getClass('button active');
            var saveCount = buts.length;
            for(var i = 0; i < buts.length; i++){
                var data = new Object();
                data.postingEnabled = (getId('promotion_enabled').enabled)?'1':'0';
                
                if((getId('donors').placeholder == global_no_dublicat && getId('donors').value != '') || getId('donors').placeholder != global_no_dublicat)
                    data.postingDonors = getId('donors').value.split("\n");
                
                if((getId('stop_words').placeholder == global_no_dublicat && getId('stop_words').value != '') || getId('stop_words').placeholder != global_no_dublicat)
                    data.postingStopWords = getId('stop_words').value.split("\n");
                if((getId('tag_list').placeholder == global_no_dublicat && getId('tag_list').value != '') || getId('tag_list').placeholder != global_no_dublicat)
                    data.tagsList = getId('tag_list').value.split("\n");
                if((getId('coefficient').placeholder == global_no_dublicat && getId('coefficient').value != '') || getId('coefficient').placeholder != global_no_dublicat)
                    data.coefficient = getId('coefficient').value;
                if((getId('post_count').placeholder == global_no_dublicat && getId('post_count').value != '') || getId('post_count').placeholder != global_no_dublicat)
                    data.postingMax = getId('post_count').value;
                if((getId('max_tags').placeholder == global_no_dublicat && getId('max_tags').value != '') || getId('max_tags').placeholder != global_no_dublicat)
                    data.tagsMax = getId('max_tags').value;
                
                if(getClass('promotionNumber')[0].value != '!')
                    data.postingFromInterval = getClass('promotionNumber')[0].value;
                if(getClass('promotionNumber')[1].value != '!')
                    data.postingTillInterval = getClass('promotionNumber')[1].value;
                
                if(getClass('linkcont')[0].style.display != 'none')
                    data.linkFilterEnabled = (getId('linkfilter').enabled)?'1':'0';
                if(getId('watertextcontainer').style.display != 'none')
                    data.signatureEnabled = (getId('textwatermark').enabled)?'1':'0';
                if(getClass('time')[0].value != '!' && getClass('time')[1].value != '!')
                    data.postingFromTime = getClass('time')[0].value+':'+getClass('time')[1].value;
                if(getClass('time')[2].value != '!' && getClass('time')[3].value != '!')
                    data.postingTillTime = getClass('time')[2].value+':'+getClass('time')[3].value;
                save(data, buts[i]);
            }
            function save(data, button){
                ajax('account/'+buts[i].obj._id, data, 'put', function(resp){
                    if(resp.success == false){
                        popupInfo('error', global_error, localError(resp.data), global_close);
                        overlay.style.display = 'none';
                        butSave.innerHTML = global_save_settings;
                        return;
                    }
                    button.obj = resp.data.account;
                    updateAccount(resp.data.account);
                    saveCount--
                    saveArray.push({account: resp.data.account, message:((resp.data.message)?localError(resp.data):'ok')});
                    if(saveCount == 0){
                        
                        overlay.style.opacity = '0';
                        setTimeout(function(){
                            overlay.style.display = 'none';
                            butSave.innerHTML = global_save_settings;
                            popupInfo('question', global_saving, global_see_result, global_look, global_close, openTable);
                            noSave = false;
                        }, 150);
                    }
                });
            }
        }
        function openTable(){
            var div = getId("content");
            div.innerHTML = '';
            var table = div.appendChild(createSendingTable());
            for(var i in saveArray){
                 var tr = table.addTr(saveArray[i].account.id, saveArray[i].account.token, saveArray[i].account.phone, saveArray[i].account.proxyUrl, saveArray[i].message);
            }
        }
    }
    function openAccount(e){
//        console.log(e.currentTarget.obj);
        if(chosedAccount){
            if(e.target.id == 'check' || e.target.parentElement.id == 'check'){
                if(e.shiftKey){
                    cancelChosed();
                    var buttons = getClass('button');
                    var curi = 0;
                    var needi = 0;
                    for(var i = 0; i<buttons.length; i++){
                        if(e.currentTarget == buttons[i]){
                            needi = i;
                        }
                        if(chosedAccount == buttons[i]){
                            curi = i;
                        }
                    }
                    for(var i = 0; i<=buttons.length; i++){
                        if(i.between(needi, curi)){
                            console.log('i between', i, needi, curi);
                            buttons[i].className = 'button active';
                            buttons[i].getElementsByClassName('check')[0].className = 'check active';
                        }
                    }
                }else{
                    if(e.currentTarget.getElementsByClassName('check active')[0] && getClass('check active').length != 1){
                        e.currentTarget.getElementsByClassName('check active')[0].className = 'check';
                        e.currentTarget.className = 'button';
                    }else{
                        e.currentTarget.getElementsByClassName('check')[0].className = 'check active';
                        e.currentTarget.className = 'button active';
                    }
                }
                hideUnicalInputs();
                if(getClass('check active').length == 1){
                    showUnicalInputs();
                    chosedAccount = getClass('button active')[0];
                    fillTFs(chosedAccount.obj);
                }
                return;
            }
        }
        if(noSave){
            var event = {};
            event.currentTarget = e.currentTarget;
            event.target = e.target;
            event.obj = e.obj;
            popupInfo('question', global_warning, global_no_save_data, global_continue, global_close, function(){
                noSave = false;
                cancelChosed();
                openAccount(event);
            });
            return;
        }
        getId('start_info').style.display = 'none';
        getId('save_settings').style.opacity = '1';
        getClass('group_tf')[0].style.opacity = '1';
        getClass('group_tf')[1].style.opacity = '1';
        getId('promotion_enabled').style.opacity = '1';
        getClass('fil_settings')[0].style['pointer-events'] = 'auto';
        if(chosedAccount){
            chosedAccount.className = 'button';
            cancelChosed();
        }
        if(getClass('check active').length == 0){
            showUnicalInputs();
        }
        chosedAccount = e.currentTarget;
        chosedAccount.className = 'button active';
        e.currentTarget.getElementsByClassName('check')[0].className = 'check active';
        fillTFs(chosedAccount.obj);
        function fillTFs(obj){
           // getId('watertextcontainer').style.display = 'block';
           /* getId('login').value = obj.id;
            getId('pass').value = obj.token;
            getId('proxy').value = obj.proxyUrl;
            getId('phone').value = obj.phone;*/
            getId('donors').value = '';
            for(var i = 0; i < obj.posting.donors.length; i++){
                getId('donors').value += obj.posting.donors[i]+((obj.posting.donors[i+1]!=undefined)?'\n':'');
            }
            getId('donors').countupdate();
            getId('coefficient').value = (obj.posting.coefficient)?obj.posting.coefficient:'0';
            getId('post_count').value = (obj.posting.maximum)?obj.posting.maximum:'0';
            
            getId('stop_words').value = '';
            for(var i = 0; i < obj.posting.stopWords.length; i++){
                getId('stop_words').value += obj.posting.stopWords[i]+((obj.posting.stopWords[i+1]!=undefined)?'\n':'');
            }
            getId('max_tags').value = obj.posting.tags.maximum || 0;
            getId('tag_list').value = '';
            for(var i = 0; i < obj.posting.tags.list.length; i++){
                getId('tag_list').value += obj.posting.tags.list[i]+((obj.posting.tags.list[i+1]!=undefined)?'\n':'');
            }
            if(obj.posting.fromTime){
                getClass('time')[0].value = obj.posting.fromTime.split(':')[0];
                getClass('time')[1].value = obj.posting.fromTime.split(':')[1];
            }else{
                getClass('time')[0].value = '00';
                getClass('time')[1].value = '00';
            }
            if(obj.posting.tillTime){
                getClass('time')[2].value = obj.posting.tillTime.split(':')[0];
                getClass('time')[3].value = obj.posting.tillTime.split(':')[1];
            }else{
                getClass('time')[2].value = '00';
                getClass('time')[3].value = '00';
            }
            if(obj.watermark == true){
                getWatermark();
            }else{
                getClass('load_icon')[0].style.background = '#2ca0f7 url(./img/load_icon.png?1) 50% 50% no-repeat';
                getClass('load_icon')[0].style['background-size'] = 'auto';
                getClass('load_lable')[0].innerHTML = global_watermark_not_upload;
            }
            if(obj.posting.fromInterval){
                getClass('promotionNumber')[0].value = obj.posting.fromInterval;
            }
            if(obj.posting.tillInterval){
                getClass('promotionNumber')[1].value = obj.posting.tillInterval;
            }
            if(obj.posting.enabled)
                getId('promotion_enabled').setPos(true);
            else
                getId('promotion_enabled').setPos(false);
            
            if(obj.posting.linkFilter)
                getId('linkfilter').setPos(true);
            else
                getId('linkfilter').setPos(false);
            if(obj.posting.signature)
                getId('textwatermark').setPos(true);
            else
                getId('textwatermark').setPos(false);
        }
        if (window.innerWidth < 650) {
            $('#accListFilling').hide();
            $('.fil_set_container').show();
        }
    }
    function getWatermark(){
        getClass('load_icon')[0].style.background = 'url('+host+'/account/'+chosedAccount.obj._id+'/watermark?token='+token+') 50% 50% / 100% no-repeat';
        
        getClass('load_lable')[0].innerHTML = global_delete;
    }
    function deleteWatermark(){
        if(!chosedAccount){
            popupInfo('error', global_error, global_error_delete_watermark, global_close);
            return;
        }
        ajax('account/'+chosedAccount.obj._id+'/watermark', {}, 'delete', function(resp){
            if(resp.success){
                popupInfo('ok', global_ok, global_deleted_watermark, global_close);
                chosedAccount.obj.watermark = false;
                getClass('load_icon')[0].style.background = '#2ca0f7 url(./img/load_icon.png?1) 50% 50% no-repeat';
                getClass('load_icon')[0].style['background-size'] = 'auto';
                getClass('load_lable')[0].innerHTML = global_watermark_not_upload;
            }else{
                popupInfo('error', global_error, localError(resp.data), global_close);
            }
        });
    }
    function createSettings(){
        var settings = document.createElement("div");
        settings.className = 'fil_settings';
        
        var overlay = document.createElement("div");
        overlay.id = 'fil_overlay';
        overlay.style.display = 'none';
        settings.appendChild(overlay);
        var title = document.createElement("div");
        title.className = 'fil_title';

        title.info = document.createElement("div");
        title.info.innerHTML = global_title_filling_account;
        title.info.className = 'fil_title_text';
        title.appendChild(title.info);
        settings.appendChild(title);
        var startJobInfo = document.createElement("div");
        startJobInfo.id = 'start_info';
        startJobInfo.innerHTML = global_chose_account;
        settings.appendChild(startJobInfo);
        var leftDiv = document.createElement("div");
        leftDiv.className = 'group_tf';
        var promotionEnabled = settings.appendChild(switchButton(true, offPromotion, true));
        promotionEnabled.style.margin = '10px 50px';
        promotionEnabled.style.opacity = '0';
        promotionEnabled.id = 'promotion_enabled';
        var heightR = '0';
        var heightL = '0';
        
        function offPromotion(e){
            if(!e){
                getClass('group_tf')[0].style.height = getClass('group_tf')[0].clientHeight+'px';
                getClass('group_tf')[1].style.height = getClass('group_tf')[1].clientHeight+'px';
                setTimeout(function(){
                    rightDiv.style.opacity = '0';
                    leftDiv.style.opacity = '0';
                    heightR = rightDiv.clientHeight+'px';
                    heightL = leftDiv.clientHeight+'px';
                    rightDiv.style.height = '0px';
                    leftDiv.style.height = '0px';
                }, 25);
            }else{
                rightDiv.style.opacity = '1';
                leftDiv.style.opacity = '1';
                rightDiv.style.height = heightR;
                leftDiv.style.height = heightL;
                setTimeout(function(){
                    rightDiv.style.height = 'auto';
                    leftDiv.style.height = 'auto';
                }, 300);
            }
        }
       /* leftDiv.appendChild(createTextField(global_login, global_enterLogin)).getElementsByTagName('input')[0].id = 'login';
        leftDiv.appendChild(createTextField(global_password, global_enterPassword)).getElementsByTagName('input')[0].id = 'pass';
        leftDiv.appendChild(createTextField(global_phone_number, global_phoneNumber)).getElementsByTagName('input')[0].id = 'phone';
        leftDiv.appendChild(createTextField(global_proxy, global_enterProxy)).getElementsByTagName('input')[0].id = 'proxy';*/
        var donorsDiv = createTextArea(global_donors_list, global_enterDonors);
        var count = document.createElement('div');
        count.className = 'count';
        donorsDiv.getElementsByTagName('textarea')[0].countupdate = counterLines(donorsDiv.getElementsByTagName('textarea')[0], count, 25);
        donorsDiv.appendChild(count);
        leftDiv.appendChild(donorsDiv)
        donorsDiv.getElementsByTagName('textarea')[0].id = 'donors';
        tooltip(donorsDiv.appendChild(div('','warning topright_offset')), global_tip_donors, null, 'left');
        var post_count = leftDiv.appendChild(createTextField(global_posts_count, global_enterNumber))
        tooltip(post_count.appendChild(div('','warning topright')), global_tip_postcount);
        post_count.getElementsByTagName('input')[0].id = 'post_count';
        var coeff = leftDiv.appendChild(createTextField(global_coefficient, global_enterNumber));
        coeff.getElementsByTagName('input')[0].id = 'coefficient';
        coeff.getElementsByTagName('input')[0].value = 0;
        tooltip(coeff.appendChild(div('','warning topright')), global_tip_coeff, null, 'left');
        coeff.addEventListener('input', function(e){
            console.log(e.currentTarget);
            e.currentTarget.getElementsByTagName('input')[0].value = testFloat(e.currentTarget.getElementsByTagName('input')[0].value);
        });
        var delay_div = createDelayPost();
        leftDiv.appendChild(delay_div);
        tooltip(delay_div.titlediv.appendChild(div('','warning')), global_tip_pause);
        leftDiv.appendChild(createPostTime(global_post_time));
        leftDiv.appendChild(createLinkFilter());

        var rightDiv = document.createElement("div");
        rightDiv.className = 'group_tf';
        var stop_words = rightDiv.appendChild(createTextArea(global_stop_words, global_enterStopWords));
        tooltip(stop_words.appendChild(div('','warning topright_offset')), global_tip_stopwords, null, 'left');
        stop_words.getElementsByTagName('textarea')[0].id = 'stop_words';
        var max_tags = rightDiv.appendChild(createTextField(global_max_tags, global_enterNumber));
        tooltip(max_tags.appendChild(div('','warning topright')), global_tip_tagscount);
        max_tags.getElementsByTagName('input')[0].id = 'max_tags';
        var tag_list = rightDiv.appendChild(createTextArea(global_tag_list, global_enterTags));
        tooltip(tag_list.appendChild(div('','warning topright_offset')), global_tip_taglist, null, 'left');
        tag_list.getElementsByTagName('textarea')[0].id = 'tag_list';
       
        rightDiv.appendChild(createWatermarkDefault()).id = 'watertextcontainer';

        var watermark = createWaterMark(global_watermark);
        rightDiv.appendChild(watermark)
        tooltip(watermark.titlediv.appendChild(div('','warning floatnone')), global_tip_watermark);
        watermark.id = 'watermark';
        settings.appendChild(leftDiv);
        settings.appendChild(rightDiv);
        

        var inputFile = document.createElement("input");
        inputFile.type = 'file';
        inputFile.id = 'upload_watermark';
        inputFile.accept="image/png"
        inputFile.style.visibility = 'hidden';
        inputFile.style.position = 'absolute';
        inputFile.multiple = 'false';
        settings.appendChild(inputFile);
        inputFile.addEventListener('change', function(e){
            console.log('inputFile.files',inputFile.files[0].name);
            getClass('load_lable')[0].innerHTML = inputFile.files[0].name;
        });
        watermark.clickArea.addEventListener('click', function(){
            if(getClass('load_lable')[0].innerHTML == global_delete){
                popupInfo('question', global_warning, global_question_delete_watermark, global_delete, global_close, function(){
                    setTimeout(deleteWatermark, 400);
                });
                return;
            }
            inputFile.click();
        });
        var butSend = document.createElement("div");
        
        butSend.className = 'blueButton add-account-input';
        butSend.style['margin'] = '30px auto 50px';
        butSend.style.opacity = '0';
        butSend.style.transition = 'opacity 0.15s linear';
        butSend.innerText = global_save_settings;
        butSend.id = 'save_settings';
        butSend.addEventListener('click', saveSettings);
        settings.appendChild(butSend);
        console.log("getId('coefficient')", getId('coefficient'));

        return settings;
    }
    function createWatermarkDefault(){
        var countBlock = div('', 'containerq fil');
        var title = div(global_text_watermark+':', 'tf_title2');
        countBlock.appendChild(title);
        var but = div('','buttons');
        tooltip(but.appendChild(div('','warning')), global_tip_textwatermark);
        but.appendChild(switchButton(false, function(ev){
            if(!getId('watermark'))
                return;
            if(ev){
                getId('watermark').style.height = '0px';
            }else{
                getId('watermark').removeAttribute("style");
            }
        })).id = 'textwatermark';
        countBlock.appendChild(but);
        return countBlock;
    }
    function createLinkFilter(){
        var countBlock = div('', 'containerq fil linkcont');
        var title = div(global_link_filter+':', 'tf_title2');
        countBlock.appendChild(title);
        var but = div('','buttons');
        tooltip(but.appendChild(div('','warning')), global_link_description);
        but.appendChild(switchButton(true, function(){})).id = 'linkfilter';
        countBlock.appendChild(but);
        return countBlock;
    }
    function createDelayPost(){
        var countBlock = document.createElement("div");
        countBlock.className = 'containerq fil';
        var titleDelay = document.createElement("div");
        titleDelay.innerHTML = global_posting_delay_minutes;
        titleDelay.className = 'tf_title2';
        var contDelay = document.createElement("div");
        contDelay.className = 'container_delays';
        var s = document.createElement("div");
        s.innerHTML = global_from;
        s.className = 'split';
        var tf1 = document.createElement("input");
        tf1.autocomplete="off";
        tf1.className = 'editTextField promotionNumber';
        var po = document.createElement("div");
        po.innerHTML = global_before;
        po.className = 'split';
        var tf2 = document.createElement("input");
        tf2.autocomplete="off";
        tf2.className = 'editTextField promotionNumber';
        countBlock.appendChild(titleDelay);
        countBlock.titlediv = titleDelay;
        contDelay.appendChild(s);
        contDelay.appendChild(tf1);
        contDelay.appendChild(po);
        contDelay.appendChild(tf2);
        countBlock.appendChild(contDelay);
        return countBlock;
    }
    function createWaterMark(_title){
        var tfContainer = document.createElement("div");
        tfContainer.className = 'tf_container';
        var title = document.createElement("div");
        title.innerHTML = _title+':';
        title.className = 'title';
        tfContainer.appendChild(title);
        var iconContainer = document.createElement("div");
        iconContainer.className = 'time_container';
        iconContainer.style.cursor = 'pointer';
        var icon = document.createElement("div");
        icon.className = 'load_icon';
        var lable = document.createElement("div");
        lable.className = 'load_lable';
        lable.innerHTML = global_watermark_not_upload;
        iconContainer.appendChild(icon);
        iconContainer.appendChild(lable);
        tfContainer.appendChild(iconContainer);
        tfContainer.clickArea = iconContainer;
        tfContainer.lablediv = lable;
        tfContainer.titlediv = title;
        return tfContainer;
    }
    function createPostTime(_title){
        var tfContainer = document.createElement("div");
        tfContainer.className = 'tf_container';
        var title = document.createElement("div");
        title.innerHTML = _title+':';
        title.className = 'title';
        var timeContainer = document.createElement("div");
        timeContainer.className = 'time_container';
        var s = document.createElement("div");
        s.innerHTML = 'c';
        s.className = 'split';
        timeContainer.appendChild(s);
        timeContainer.appendChild(createTimeTFs());
        var po = document.createElement("div");
        po.innerHTML = global_before;
        po.className = 'split';
        timeContainer.appendChild(po);
        timeContainer.appendChild(createTimeTFs());
        tooltip(title.appendChild(div('','warning floatnone')), global_tip_postingtime, null, 'left');
        tfContainer.appendChild(title);
        tfContainer.appendChild(timeContainer);
        
        function createTimeTFs(){
            var time = document.createElement("div");
            time.className = 'timeblock';
            var hour = document.createElement("input");
            hour.className = 'time';
            hour.value = '00';
            var split = document.createElement("div");
            split.innerHTML = ':';
            split.className = 'split';
            var minutes = document.createElement("input");
            minutes.className = 'time';
            minutes.value = '00';
            hour.addEventListener("click", function(e){
                hour.select();
            })
            hour.addEventListener("blur", checkNumber);
            hour.addEventListener("input", function(e){
                if(e.currentTarget.value.length == 2){
                    minutes.focus();
                    minutes.select();
                }
                if(parseInt(e.currentTarget.value) > 23)
                    e.currentTarget.value = '23';
                    //e.currentTarget.value = e.currentTarget.value.substr(1);
            });
            minutes.addEventListener("click", function(e){
                minutes.select();
            })
            minutes.addEventListener("blur", checkNumber);
            minutes.addEventListener("input", function(e){
                if(e.currentTarget.value.length == 2){
                    var timeNodes = getClass('time');
                    for(var i = 0; i<timeNodes.length; i++){
                        if(timeNodes[i] == e.currentTarget){
                            console.log(timeNodes[i], e.currentTarget, timeNodes[i] == e.currentTarget, timeNodes[i+1], i);
                            if(typeof timeNodes[i+1] == 'object'){
                                timeNodes[i+1].focus();
                                timeNodes[i+1].select();
                                return;
                            }
                        }
                    }
                }
                if(e.currentTarget.value.length > 2)
                    e.currentTarget.value = e.currentTarget.value.substr(1);
                if(parseInt(e.currentTarget.value) > 59)
                    e.currentTarget.value = '59';
            });
            time.appendChild(hour);
            time.appendChild(split);
            time.appendChild(minutes);
            return time;
        }
        return tfContainer;
    }
    function checkNumber(e){
        if(isNaN(parseInt(e.currentTarget.value)))
            e.currentTarget.value = '00';
        else if(parseInt(e.currentTarget.value) <= 9)
            e.currentTarget.value = '0'+Math.abs(parseInt(e.currentTarget.value));
        else
            e.currentTarget.value = parseInt(e.currentTarget.value);
    }
}
function createTextField(_title, placeholder){
    var tfContainer = document.createElement("div");
    tfContainer.className = 'tf_container';
    var title = document.createElement("div");
    title.innerHTML = _title+':';
    title.className = 'title';
    var tf = document.createElement("input");
    tf.autocomplete="off";
    tf.className = 'editTextField';
    tf.setAttribute('placeholder', placeholder);
    tfContainer.appendChild(title);
    tfContainer.appendChild(tf);
    return tfContainer;
}
function createTextArea(_title, placeholder){
    var tfContainer = document.createElement("div");
    tfContainer.className = 'tf_container textarea';
    var title = document.createElement("div");
    title.innerHTML = _title+':';
    title.style['vertical-align'] = 'top';
    title.className = 'title';
    var tf = document.createElement("textarea");
    tf.autocomplete="off";
    tf.className = 'editTextField';
    tf.setAttribute('placeholder', placeholder);
    tfContainer.appendChild(title);
    tfContainer.appendChild(tf);
    return tfContainer;
}
function fillingAccountsScrollEvent(e){
    var topBlockBottom = 98 - window.pageYOffset;
    if(topBlockBottom <= 20)
        topBlockBottom = 20;
    var div = getId('accListFilling');
    if(!div){
        window.removeEventListener('scroll', fillingAccountsScrollEvent);
        return;
    }
    div.style.top = topBlockBottom+'px';
    fillingAccountsUpdateHeight();
}
function fillingAccountsUpdateHeight(){
    var topBlockBottom = 98 - window.pageYOffset;
    if(topBlockBottom <= 20)
        topBlockBottom = 20;
    var div = getId('accListFilling');
    var list = getId('fil_list');
    if (window.innerWidth < 700) {
//        div.style.height = (window.innerHeight-200+(98-topBlockBottom+35))+'px';
        div.style.height = (window.innerHeight-100+(98-topBlockBottom+30))+'px';
    } else {
//        div.style.height = (window.innerHeight-200+(98-topBlockBottom+35))+'px';
        div.style.height = (window.innerHeight-100+(98-topBlockBottom+30))+'px';
    }
//    list.style.height = (window.innerHeight-200+(98-topBlockBottom))-110+'px';
    list.style.height = (window.innerHeight-100+(98-topBlockBottom))-27+'px';
}
function resizeFillingAccountList(e){
    var div = getId('accListFilling');
    if(!div){
        window.removeEventListener('resize', resizeFillingAccountList);
        return;
    }
    fillingAccountsUpdateHeight();
}
function createAccountList(){
    var accList = document.createElement("div");
    window.removeEventListener('resize', resizeFillingAccountList);
    window.addEventListener('resize', resizeFillingAccountList);
    window.removeEventListener('scroll', fillingAccountsScrollEvent);
    window.addEventListener('scroll', fillingAccountsScrollEvent);
    accList.id = 'accListFilling';
    accList.className = 'fil_account_list';
    var title = document.createElement("div");
    title.className = 'fil_title';

    title.info = document.createElement("div");
    title.info.innerHTML = '<b>'+global_accounts+'</b>';
    title.info.className = 'fil_title_text';

    title.appendChild(title.info);
    accList.appendChild(title);

    var list = document.createElement("div");
    list.id = 'fil_list';
    list.className = 'list';
    list.style.height = (window.innerHeight-130)-110+'px';
    accList.appendChild(list);
    return accList;
}
function addAccountInList(obj, openAccount, multiple){
//    console.log(obj);
    if(multiple == undefined)
        multiple = true;
    var list = getId('fil_list');
    var div = document.createElement("div");
    div.obj = obj;
    div.className = 'button';
    div.id = 'acc_'+obj.id;
    if(obj.challenge == true)
        div.style.border = 'solid 2px #ff8787';
    if(typeof obj.challenge == 'object')
        div.style.border = '2px solid #ffc258';
    if(obj.connectionError)
        div.style.border = '2px solid #917bf1';
    if(!obj.enabled){
        div.style.border = '#e0e0e0 solid 1px';
        div.style.background = '#e0e0e0';
    }
    var ava = document.createElement("div");
    ava.className = 'avatar';
    ajax('account/'+obj._id+'/avatar', {token:token}, 'GET', function(res){
        if(res.success){
            ava.style.background = "url(data:"+res.data.mimetype+";base64,"+res.data.img+")  50% 50% / 100% no-repeat";
        }else{
            ava.style.background = "url(./img/noavatar.png) 50% 50% / 100% no-repeat";
        }
        div.appendChild(ava);
    });
    
    var accName = document.createElement("div");
    accName.innerHTML = obj.id;
    accName.className = 'name';
    div.appendChild(accName)
    if(multiple) {
        var checkBox = document.createElement("div");
        checkBox.className = 'check';
        checkBox.id = 'check';
        var check = document.createElement("div");
        checkBox.appendChild(check)
        div.appendChild(checkBox);

        var clearDiv = document.createElement("div");
        clearDiv.className = 'clearfix';
        div.appendChild(clearDiv);
    }
     
    list.appendChild(div);
    div.addEventListener("click",openAccount);
}