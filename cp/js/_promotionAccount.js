this.promotionAccount = function(params){
    setActiveMenu('promotionAccount');
    clearBlock();
    var chosedAccount = null;
    var mainDiv = document.createElement("div");
    mainDiv.className = "fil_set_container";
//    $('.topHelpBut').html('<a class="butHelp" href="https://www.youtube.com/watch?v=WvPEUKB0DpA" target="_blank"><div class="blueButton">Обучение</div></a>');
    
    $('#LVideo').show();
    $('#LVideo').attr('href', 'https://www.youtube.com/watch?v=WvPEUKB0DpA');

    var content = document.getElementById("content");
    mainDiv.appendChild(createSettings());
    content.innerHTML = '';
    content.appendChild(createAccountList());
    content.appendChild(mainDiv);
    var tfs = document.getElementsByClassName('editTextField');
    for(var i in tfs){
        if(typeof tfs[i] != 'object')
            continue;
        tfs[i].addEventListener("input", function(e){
            noSave = true;
            console.log('input?');
        });
    }
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
        
//        $('#accListFilling').appendAfter
//        $('<div class="nextbutton" id="nextSettings">Выбрать</div><div class="clearfix"></div>').insertAfter('.fil_title:nth-child(1)');
//        $('<div class="nextbutton left" id="prevSettings">Назад</div><div class="clearfix"></div>').insertAfter('.fil_title:nth-child(2)');
    }
    $(document).ready(function(){
        $(document).on('click','#nextSettings',function(e) {
            $('.fil_set_container').show();
            $('#accListFilling').hide();
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
                var buttons = document.getElementsByClassName('button');
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
        title.info.innerHTML = global_title_promotion_settings;
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
                rightDiv.style.opacity = '0';
                leftDiv.style.opacity = '0';
                heightR = rightDiv.clientHeight+'px';
                heightL = leftDiv.clientHeight+'px';
                setTimeout(function(){
                    rightDiv.style.height = heightR;
                    leftDiv.style.height = heightL;
                    setTimeout(function(){
                        rightDiv.style.height = '0px';
                        leftDiv.style.height = '0px';
                    },16);
                }, 16);
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
        var donorsDiv = createTextArea(global_donors_list, global_enterDonors);
        tooltip(donorsDiv.appendChild(div('','warning topright_offset')), global_tip_donors_promo, null, 'left');
        var count = document.createElement('div');
        count.className = 'count';
        donorsDiv.getElementsByTagName('textarea')[0].countupdate = counterLines(donorsDiv.getElementsByTagName('textarea')[0], count, 25);
        donorsDiv.appendChild(count);
        
        leftDiv.appendChild(donorsDiv)
        donorsDiv.getElementsByTagName('textarea')[0].id = 'donors';

        leftDiv.appendChild(createDefaultStopWords());
        var stop_words = leftDiv.appendChild(createTextArea(global_stop_words, global_enterStopWords))
        stop_words.getElementsByTagName('textarea')[0].id = 'stop_words';
        tooltip(stop_words.appendChild(div('','warning topright_offset')), global_tip_stop_promo, null, 'left');

        var exclude = leftDiv.appendChild(createTextArea(global_exclude, global_exclude_place))
        exclude.getElementsByTagName('textarea')[0].id = 'exclude';
        tooltip(exclude.appendChild(div('','warning topright_offset')), global_tip_exclude, null, 'left');

        leftDiv.appendChild(followsFilter()).id = 'follow_filter';
        
        var rightDiv = document.createElement("div");
        rightDiv.className = 'group_tf';
        rightDiv.appendChild(promotionBlock('<b>'+global_subscriptions+'</b>', global_count_sub_in_day+':', global_delay_between_sub+':', 960, 42, 52)).id = 'mf';
        rightDiv.appendChild(promotionBlock('<b>'+global_likes+'</b>', global_count_likes_in_day+':', global_delay_between_likes+':', 300, 19, 35)).id = 'ml';
        rightDiv.appendChild(promotionBlock('<b>'+global_unsubscriptions+'</b>', global_count_unsub_in_day+':', global_delay_between_unsub+':', 980, 21, 29)).id = 'muf';
        setTimeout(function(){
            tooltip(getClass('title')[3].appendChild(div('','warning floatnone')), global_tip_follows_filter);
            tooltip(getClass('title')[4].appendChild(div('','warning floatnone')), global_tip_follows);
            tooltip(getClass('title')[5].appendChild(div('','warning floatnone')), global_tip_likes);
            tooltip(getClass('title')[6].appendChild(div('','warning floatnone')), global_tip_unfollow);
        }, 20);
        settings.appendChild(leftDiv);
        settings.appendChild(rightDiv);
        var butSend = document.createElement("div");
        
        butSend.className = 'blueButton add-account-input';
        butSend.style['margin'] = '30px auto 50px';
        butSend.style.opacity = '0';
        butSend.style.transition = 'opacity 0.15s linear';
        butSend.innerText = global_save_settings;
        butSend.id = 'save_settings';
        butSend.addEventListener('click', saving);
        settings.appendChild(butSend);
        setTimeout(function(){
            document.getElementsByClassName('group_tf')[0].style.height = 'auto';//document.getElementsByClassName('group_tf')[0].clientHeight+'px';
            document.getElementsByClassName('group_tf')[1].style.height = 'auto';//document.getElementsByClassName('group_tf')[1].clientHeight+'px';
        }, 25);
        return settings;
    }
    function createDefaultStopWords(){
        var countBlock = div('', 'containerq fil stopdefault');
        var title = div(global_stop_words_default+':', 'tf_title2');
        countBlock.appendChild(title);
        var but = div('','buttons');
        tooltip(but.appendChild(div('','warning')), global_stop_description);
        
        setTimeout(function(){
            //$('#stop_words').parent().css('height', '0px');//[0].parentElement.style.height = '0px';
        }, 100);
        but.appendChild(switchButton(true, function(res){
            if(res){
                $('#stop_words')[0].parentElement.style.height = '0px';
             } else{
                $('#stop_words')[0].parentElement.style.height = null;
        }
        })).id = 'defaultStopWords';
        countBlock.appendChild(but);
        return countBlock;
    }
    function followsFilter(){
        var prevVal1 = '';
        var block = document.createElement("div");
        block.className = 'promotion_block';
        var title = document.createElement("div");
        title.innerHTML = '<b>Фильтр подписок</b>';
        title.className = 'title';
        block.appendChild(title);
        var defaultContainer = document.createElement("div");
        defaultContainer.className = 'default_container';
        var defaultTitle = document.createElement("div");
        defaultTitle.innerHTML = global_set_default;
        defaultTitle.className = 'default';
        
        
        defaultContainer.appendChild(defaultTitle);
        var checkbox = createCheckBox(false, defaultSettings);
        defaultContainer.appendChild(checkbox);
        
        block.appendChild(switchButton(true, open));
        block.appendChild(defaultContainer);

        var countBlock = document.createElement("div");
        countBlock.className = 'containerq';
        countBlock.style.height = 'auto';
        var title_tf = document.createElement("div");
        title_tf.className = 'tf_title';
        title_tf.innerHTML = global_max_following;
        var tf = document.createElement("input");
        tf.autocomplete="off";
        tf.className = 'editTextField followingsNumber';
        countBlock.appendChild(title_tf);
        countBlock.appendChild(tf);
        block.appendChild(countBlock);
        setTimeout(function(){
            countBlock.height = countBlock.clientHeight;
            countBlock.style.height = countBlock.height+'px';
        }, 20);
        /*function open(bool){
            if(bool){
                countBlock.className = 'container';
                defaultContainer.style.opacity = '1';
                countBlock.style.height = countBlock.height+'px';
            }else{
                countBlock.className = 'container disabled';
                countBlock.style.height = '0px';
                defaultContainer.style.opacity = '0';
            }
        }*/
        function open(bool){
            if(bool){
                countBlock.className = 'containerq';
                defaultContainer.style.opacity = '1';
                countBlock.style.height = countBlock.height+'px';
                setTimeout(function(){
                    countBlock.style.height = 'auto';
                    setTimeout(function(){
                        countBlock.height = countBlock.clientHeight;
                    }, 16);
                }, 300);
            }else{
                countBlock.className = 'containerq disabled';
                countBlock.style.height = countBlock.clientHeight+'px';
                setTimeout(function(){
                    countBlock.style.height = '0px';
                }, 16);
                defaultContainer.style.opacity = '0';
            }
        }
        tf.addEventListener('input', checkDefault);
        function checkDefault(){
            if(tf.value == '700'){
                if(checkbox.enabled == false)
                    checkbox.change();
            }else{
                if(checkbox.enabled != false)
                    checkbox.change();
            }
        }
        function defaultSettings(bool){
            if(!tf)
                return;
            if(bool){
                prevVal1 = tf.value;
                tf.value = '700';
            }else{
                tf.value = prevVal1;
            }
        }
        block.checkDefault = checkDefault;
        return block;
    }
    function promotionBlock(_title, _titleTF, delayName, def1, def2, def3, small){
        var prevVal1 = '';
        var prevVal2 = '';
        var prevVal3 = '';
        var block = document.createElement("div");
        block.className = 'promotion_block';
        var title = document.createElement("div");
        title.innerHTML = _title;
        title.className = 'title';
        block.appendChild(title);
        var defaultContainer = document.createElement("div");
        defaultContainer.className = 'default_container';
        var defaultTitle = document.createElement("div");
        defaultTitle.innerHTML = global_set_default;
        defaultTitle.className = 'default';
        
        
        defaultContainer.appendChild(defaultTitle);
        var checkbox = createCheckBox(false, defaultSettings);
        defaultContainer.appendChild(checkbox);
        
        block.appendChild(switchButton(true, open));
        block.appendChild(defaultContainer);

        var countBlock = document.createElement("div");
        countBlock.className = 'containerq';
        countBlock.style.height = 'auto';
        var title_tf = document.createElement("div");
        title_tf.className = 'tf_title';
        title_tf.innerHTML = _titleTF;
        var tf = document.createElement("input");
        tf.autocomplete="off";
        tf.className = 'editTextField promotionNumber';
        countBlock.appendChild(title_tf);
        countBlock.appendChild(tf);

        var titleDelay = document.createElement("div");
        titleDelay.innerHTML = delayName;
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
        setTimeout(function(){
            countBlock.height = countBlock.clientHeight;
            countBlock.style.height = countBlock.height+'px';
        }, 20);
        countBlock.appendChild(titleDelay);
        contDelay.appendChild(s);
        contDelay.appendChild(tf1);
        contDelay.appendChild(po);
        contDelay.appendChild(tf2);
        countBlock.appendChild(contDelay);

        block.appendChild(countBlock);
        tf.addEventListener('input', changeValue);
        tf1.addEventListener('input', changeValue);
        tf2.addEventListener('input', changeValue);
        block.setSettings = setSettings;
        block.getSettings = getSettings;
        block.setPlaceholder = setPlaceholder;
        block.delPlaceholder = delPlaceholder;
        function changeValue(e){
            checkDefault();
        }
        function checkDefault(){
            if(tf.value == def1 && tf1.value == def2 && tf2.value == def3){
                if(checkbox.enabled == false)
                    checkbox.change();
            }else{
                if(checkbox.enabled != false)
                    checkbox.change();
            }
        }
        function open(bool){
            if(bool){
                countBlock.className = 'containerq';
                defaultContainer.style.opacity = '1';
                countBlock.style.height = countBlock.height+'px';
                setTimeout(function(){
                    countBlock.style.height = 'auto';
                    setTimeout(function(){
                        countBlock.height = countBlock.clientHeight;
                    }, 16);
                }, 300);
            }else{
                countBlock.className = 'containerq disabled';
                countBlock.style.height = countBlock.clientHeight+'px';
                setTimeout(function(){
                    countBlock.style.height = '0px';
                }, 16);
                defaultContainer.style.opacity = '0';
            }
        }
        function setSettings(val1, val2, val3){
            console.log('set',val1, val2, val3)
            tf.value = val1;
            tf1.value = val2;
            tf2.value = val3;
            checkDefault();
        }
        function getSettings(){
            var data = new Object();
            data.val1 = tf.value;
            data.val2 = tf1.value;
            data.val3 = tf2.value;
            return data;
        }
        function setPlaceholder(){
            tf.placeholder = '!';
            tf1.placeholder = '!';
            tf2.placeholder = '!';
        }
        function delPlaceholder(){
            tf.placeholder = '';
            tf1.placeholder = '';
            tf2.placeholder = '';
        }
        function defaultSettings(bool){
            if(!tf)
                return;
            if(bool){
                prevVal1 = tf.value;
                prevVal2 = tf1.value;
                prevVal3 = tf2.value;
                tf.value = def1;
                tf1.value = def2;
                tf2.value = def3;
            }else{
                tf.value = prevVal1;
                tf1.value = prevVal2;
                tf2.value = prevVal3;
            }
        }
        return block;
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
        return tfContainer;
    }
    /*function addAccountInList(obj){
        console.log(obj);
        var list = document.getElementById('fil_list');
        var div = document.createElement("div");
        div.obj = obj;
        div.className = 'button';
        var ava = document.createElement("div");
        ava.className = 'avatar';
        ava.style.background = 'url('+host+'/account/avatar/'+obj._id+'?token='+token+')';
        ava.style['background-size'] = '44px';
        div.appendChild(ava);
        var accName = document.createElement("div");
        accName.innerHTML = obj.id;
        accName.className = 'name';
        div.appendChild(accName)
        var checkBox = document.createElement("div");
        checkBox.className = 'check';
        checkBox.id = 'check';
            var check = document.createElement("div");
            checkBox.appendChild(check)
        div.appendChild(checkBox);
        list.appendChild(div);
        div.addEventListener("click",openAccount);
    }*/
    
    function cancelChosed(){
        while(document.getElementsByClassName('check active').length > 0){
            document.getElementsByClassName('check active')[0].className = 'check';
        }
        while(document.getElementsByClassName('button active').length > 0){
            document.getElementsByClassName('button active')[0].className = 'button';
        }
    }
    function checkUndubles(){
        var buts = document.getElementsByClassName('button active');
        document.getElementById('donors').placeholder = global_enterDonors;
        document.getElementById('stop_words').placeholder = global_enterStopWords;
        document.getElementById('exclude').placeholder = global_exclude_place;
        $('#stop_words')[0].parentElement.style.display = null;
        $('.stopdefault')[0].style.display = null;
        document.getElementById('mf').delPlaceholder();
        document.getElementById('ml').delPlaceholder();
        document.getElementById('muf').delPlaceholder();
        for(var i = 0; i < buts.length; i++){
            if(!buts[i+1])
                continue;
            if(!dublicat(buts[i].obj.promotion.donors, buts[i+1].obj.promotion.donors)){
                document.getElementById('donors').value = '';
                document.getElementById('donors').placeholder = global_no_dublicat;
            }
            if(buts[i].obj.promotion.stopWordsDefault != buts[i+1].obj.promotion.stopWordsDefault){
                $('#stop_words')[0].parentElement.style.display = 'none';
                $('.stopdefault')[0].style.display = 'none';
            }
            if(!dublicat(buts[i].obj.promotion.stopWords, buts[i+1].obj.promotion.stopWords)){
                document.getElementById('stop_words').value = '';
                document.getElementById('stop_words').placeholder = global_no_dublicat;
            }
            if(!dublicat(buts[i].obj.promotion.muf.exclude, buts[i+1].obj.promotion.muf.exclude)){
                document.getElementById('exclude').value = '';
                document.getElementById('exclude').placeholder = global_no_dublicat;
            }
            if(buts[i].obj.promotion.mf.maximum != buts[i+1].obj.promotion.mf.maximum){
                document.getElementsByClassName('promotionNumber')[0].value = '';
                document.getElementsByClassName('promotionNumber')[0].placeholder = '!';
            }
            if(buts[i].obj.promotion.mf.pause.min != buts[i+1].obj.promotion.mf.pause.min){
                document.getElementsByClassName('promotionNumber')[1].value = '';
                document.getElementsByClassName('promotionNumber')[1].placeholder = '!';
            }
            if(buts[i].obj.promotion.mf.pause.max != buts[i+1].obj.promotion.mf.pause.max){
                document.getElementsByClassName('promotionNumber')[2].value = '';
                document.getElementsByClassName('promotionNumber')[2].placeholder = '!';
            }
            if(buts[i].obj.promotion.ml.maximum != buts[i+1].obj.promotion.ml.maximum){
                document.getElementsByClassName('promotionNumber')[3].value = '';
                document.getElementsByClassName('promotionNumber')[3].placeholder = '!';
            }
            if(buts[i].obj.promotion.ml.pause.min != buts[i+1].obj.promotion.ml.pause.min){
                document.getElementsByClassName('promotionNumber')[4].value = '';
                document.getElementsByClassName('promotionNumber')[4].placeholder = '!';
            }
            if(buts[i].obj.promotion.ml.pause.max != buts[i+1].obj.promotion.ml.pause.max){
                document.getElementsByClassName('promotionNumber')[5].value = '';
                document.getElementsByClassName('promotionNumber')[5].placeholder = '!';
            }
            if(buts[i].obj.promotion.muf.maximum != buts[i+1].obj.promotion.muf.maximum){
                document.getElementsByClassName('promotionNumber')[6].value = '';
                document.getElementsByClassName('promotionNumber')[6].placeholder = '!';
            }
            if(buts[i].obj.promotion.muf.pause.min != buts[i+1].obj.promotion.muf.pause.min){
                document.getElementsByClassName('promotionNumber')[7].value = '';
                document.getElementsByClassName('promotionNumber')[7].placeholder = '!';
            }
            if(buts[i].obj.promotion.muf.pause.max != buts[i+1].obj.promotion.muf.pause.max){
                document.getElementsByClassName('promotionNumber')[8].value = '';
                document.getElementsByClassName('promotionNumber')[8].placeholder = '!';
            }
            if(buts[i].obj.promotion.maxFollowing != buts[i+1].obj.promotion.maxFollowing){
                getClass('switch')[2].setPos(true);
                getClass('followingsNumber')[0].placeholder = '!';
                getClass('followingsNumber')[0].value = '';
            }
        }
    }
    function saving(){
        var saveArray = new Array();
        var butSave = document.getElementsByClassName('blueButton add-account-input')[0];
        butSave.innerHTML = '<svg width="14" height="14" style="fill:#fff"><use xlink:href="#miniload-svg"></use></svg>';
        var overlay = document.getElementById('fil_overlay');
        overlay.style.display = 'block';
        setTimeout(function(){
            overlay.style.opacity = '0.3';
        }, 25);
        
        var buts = document.getElementsByClassName('button active');
        var saveCount = buts.length;
        for(var i = 0; i < buts.length; i++){
            var data = new Object();
            if(!document.getElementById('promotion_enabled').enabled){
                data.mfEnabled = '0';
                data.mlEnabled = '0';
                data.mufEnabled = '0';
            }else{
                if(document.getElementsByClassName('switch')[3].enabled){
                    data.mfEnabled = '1';
                    if(document.getElementById('mf').getSettings().val1 != '')
                        data.mfMax = document.getElementById('mf').getSettings().val1;
                    if(document.getElementById('mf').getSettings().val2 != '')
                        data.mfPauseMin = document.getElementById('mf').getSettings().val2*1000;
                    if(document.getElementById('mf').getSettings().val3 != '')
                        data.mfPauseMax = document.getElementById('mf').getSettings().val3*1000;
                }else
                    data.mfEnabled = '0';

                if(document.getElementsByClassName('switch')[4].enabled){
                    data.mlEnabled = '1';
                    if(document.getElementById('ml').getSettings().val1 != '')
                        data.mlMax = document.getElementById('ml').getSettings().val1;
                    if(document.getElementById('ml').getSettings().val2 != '')
                        data.mlPauseMin = document.getElementById('ml').getSettings().val2*1000;
                    if(document.getElementById('ml').getSettings().val3 != '')
                        data.mlPauseMax = document.getElementById('ml').getSettings().val3*1000;
                }else
                    data.mlEnabled = '0';

                if(document.getElementsByClassName('switch')[5].enabled){
                    data.mufEnabled = '1';
                    if(document.getElementById('muf').getSettings().val1 != '')
                        data.mufMax = document.getElementById('muf').getSettings().val1;
                    if(document.getElementById('muf').getSettings().val2 != '')
                        data.mufPauseMin = document.getElementById('muf').getSettings().val2*1000;
                    if(document.getElementById('muf').getSettings().val3 != '')
                        data.mufPauseMax = document.getElementById('muf').getSettings().val3*1000;
                }else
                    data.mufEnabled = '0';
                if(getClass('followingsNumber')[0].value != '')
                    data.maxFollowing = (getClass('followingsNumber')[0].value>=0)?getClass('followingsNumber')[0].value:'0';
                if(!getClass('switch')[2].enabled){
                    data.maxFollowing = '0';
                }
            }
            if((getId('donors').placeholder == global_no_dublicat && getId('donors').value != '') || getId('donors').placeholder != global_no_dublicat)
                data.promotionDonors = document.getElementById('donors').value.split("\n");
            if((getId('stop_words').placeholder == global_no_dublicat && getId('stop_words').value != '') || getId('stop_words').placeholder != global_no_dublicat)
                data.promotionStopWords = document.getElementById('stop_words').value.split("\n");
            if((getId('exclude').placeholder == global_no_dublicat && getId('exclude').value != '') || getId('exclude').placeholder != global_no_dublicat)
                data.mufExclude = document.getElementById('exclude').value.split("\n");
            if($('.stopdefault')[0].style.display != 'none')
                data.promotionStopWordsDefault = (getId('defaultStopWords').enabled)?'1':'0';
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
        function openTable(){
            var div = document.getElementById("content");
            div.innerHTML = '';
            var table = div.appendChild(createSendingTable());
            for(var i in saveArray){
                 var tr = table.addTr(saveArray[i].account.id, saveArray[i].account.token, saveArray[i].account.phone, saveArray[i].account.proxyUrl, saveArray[i].message);
            }
        }
    }
    function openAccount(e){
        console.log(e.currentTarget.obj);
        if(chosedAccount){
            if(e.target.id == 'check' || e.target.parentElement.id == 'check'){
                if(e.shiftKey){
                    cancelChosed();
                    var buttons = document.getElementsByClassName('button');
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
                    if(e.currentTarget.getElementsByClassName('check active')[0] && document.getElementsByClassName('check active').length != 1){
                        e.currentTarget.getElementsByClassName('check active')[0].className = 'check';
                        e.currentTarget.className = 'button';
                    }else{
                        e.currentTarget.getElementsByClassName('check')[0].className = 'check active';
                        e.currentTarget.className = 'button active';
                    }
                }
                if(document.getElementsByClassName('check active').length == 1){
                    chosedAccount = document.getElementsByClassName('button active')[0];
                    fillTFs(chosedAccount.obj);
                }
                checkUndubles();
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
        document.getElementById('start_info').style.display = 'none';
        document.getElementById('save_settings').style.opacity = '1';
        document.getElementsByClassName('group_tf')[0].style.opacity = '1';
        document.getElementsByClassName('group_tf')[1].style.opacity = '1';
        document.getElementById('promotion_enabled').style.opacity = '1';
        document.getElementsByClassName('fil_settings')[0].style['pointer-events'] = 'auto';
        if(chosedAccount){
            chosedAccount.className = 'button';
            cancelChosed();
        }
        if(document.getElementsByClassName('check active').length == 0){
            checkUndubles();
        }
        chosedAccount = e.currentTarget;
        chosedAccount.className = 'button active';
        e.currentTarget.getElementsByClassName('check')[0].className = 'check active';
        fillTFs(chosedAccount.obj);
        function fillTFs(obj){
            document.getElementById('donors').value = '';
            for(var i = 0; i < obj.promotion.donors.length; i++){
                document.getElementById('donors').value += obj.promotion.donors[i]+((obj.promotion.donors[i+1]!=undefined)?'\n':'');
            }
            document.getElementById('donors').countupdate();
            document.getElementById('stop_words').value = '';
            document.getElementById('exclude').value = '';
            console.log('obj.promotion.stopWordsDefault',obj.promotion.stopWordsDefault);
            if(obj.promotion.stopWordsDefault){
                $('#stop_words').parent().css('height', '0px');
                getId('defaultStopWords').setPos(true);
            }else{
                getId('defaultStopWords').setPos(false);
            }
            for(var i = 0; i < obj.promotion.stopWords.length; i++){
                document.getElementById('stop_words').value += obj.promotion.stopWords[i]+((obj.promotion.stopWords[i+1]!=undefined)?'\n':'');
            }
            for(var i = 0; i < obj.promotion.muf.exclude.length; i++){
                document.getElementById('exclude').value += obj.promotion.muf.exclude[i]+((obj.promotion.muf.exclude[i+1]!=undefined)?'\n':'');
            }
            console.log(document.getElementById('mf').setSettings);
            document.getElementById('mf').setSettings(obj.promotion.mf.maximum, obj.promotion.mf.pause.min/1000, obj.promotion.mf.pause.max/1000);
            document.getElementById('ml').setSettings(obj.promotion.ml.maximum, obj.promotion.ml.pause.min/1000, obj.promotion.ml.pause.max/1000);
            document.getElementById('muf').setSettings(obj.promotion.muf.maximum, obj.promotion.muf.pause.min/1000, obj.promotion.muf.pause.max/1000);
            getClass('followingsNumber')[0].value = obj.promotion.maxFollowing;
            getId('follow_filter').checkDefault();
            if(obj.promotion.maxFollowing > 0)
                document.getElementsByClassName('switch')[2].setPos(true);
            else
                document.getElementsByClassName('switch')[2].setPos(false);
                
            if(obj.promotion.mf.enabled)
                document.getElementsByClassName('switch')[3].setPos(true);
            else
                document.getElementsByClassName('switch')[3].setPos(false);

            if(obj.promotion.ml.enabled)
                document.getElementsByClassName('switch')[4].setPos(true);
            else
                document.getElementsByClassName('switch')[4].setPos(false);

            if(obj.promotion.muf.enabled)
                document.getElementsByClassName('switch')[5].setPos(true);
            else
                document.getElementsByClassName('switch')[5].setPos(false);

            if(obj.promotion.mf.enabled || obj.promotion.ml.enabled || obj.promotion.muf.enabled)
                document.getElementById('promotion_enabled').setPos(true);
            else if(!obj.promotion.mf.enabled && !obj.promotion.ml.enabled && !obj.promotion.muf.enabled)
                document.getElementById('promotion_enabled').setPos(false);
        }
        if (window.innerWidth < 650) {
            $('.fil_set_container').show();
            $('#accListFilling').hide();
        }
    }
}