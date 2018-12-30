this.posting = function(params){
    setActiveMenu('posting');
    clearBlock();
    var mainDiv = div();
    mainDiv.className = "fil_set_container";
    var content = document.getElementById("content");
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
            console.log('input?');
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
                var buttons = getClass('button');
                for(var i in buttons){
                    if(buttons[i].obj._id == params.openacc){
                        buttons[i].click();
                        break;
                    }
                }
            }
        }
        if (window.innerWidth < 700) {
            //$('#fil_list').append('<div class="nextbutton" id="nextSettings">Выбрать</div><div class="clearfix"></div>');
            $('<div class="nextbutton left" id="prevSettings">Назад</div><div class="clearfix"></div>').insertAfter('.fil_settings #start_info');
        }
    }
    var date_post;
    var pauseTime = 0;
    var randomError = false;
    function createSettings(){
        var settings = div('', 'fil_settings');
        var overlay = div();
        overlay.id = 'fil_overlay';
        overlay.style.display = 'none';
        settings.appendChild(overlay);
        var title = div('', 'fil_title');

        title.info = div(global_title_add_new_post, 'fil_title_text');
        title.appendChild(title.info);
        settings.appendChild(title);

        var startJobInfo = div(global_chose_account);
        startJobInfo.id = 'start_info';
        settings.appendChild(startJobInfo);
        
        var previewdiv = div('', 'preview_post_container');
        var media = div('', 'media');
        var video = div('', 'video');
        video.style.opacity = '0';
        var videoContainer = div('', 'video_container');
        var player = document.createElement("video");
        player.className = 'player';
        video.addEventListener("mouseover", function(e){
            if(video.style.opacity == '0')
                return;
            video.style.opacity = '0.9';
        });
        video.addEventListener("mouseout", function(e){
            if(video.style.opacity == '0')
                return
            video.style.opacity = '0.5';
        });
        video.addEventListener("click", function(e){
            if(player.buffered.length == 0)
                return;
            if(player.paused){
                player.play();
                video.style.opacity = '0';
            }else{
                player.pause();
                video.style.opacity = '0.9';
            }
        });
        videoContainer.appendChild(player);
        media.appendChild(videoContainer);
        media.appendChild(video);
        media.appendChild(img('./img/post_preview.png', 'preview_image'));
        previewdiv.appendChild(media);
        var description = previewdiv.appendChild(div('', 'description'));
        var posttime_desc = previewdiv.appendChild(div('', 'posttime'));
        var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        date_post = new Date();
        var settingsdiv = div('', 'settings_post_container');
        var watermark = settingsdiv.appendChild(createWaterMark(global_load_photo_or_video))
        watermark.id = 'media_input';
        var desc_textarea = settingsdiv.appendChild(textarea('', 'description_text', global_write_description_post));
        $(settingsdiv).append('<div style="display:flex;"><div id="ruen" class="blueButton" style="width: 50px;">{ru|en}</div><div id="ruende" class="blueButton" style="margin-left: 10px;width: 75px;">{ru|en+de}</div></div>');
        $(settingsdiv).append('');
        desc_textarea.setAttribute('maxlength', '2200');
        settingsdiv.appendChild(div(global_date_and_time_publication, 'lable'));
        var calendarContainer = div('', 'calendar');
        var calendar = document.createElement('input');
        calendar.value = new Date().toLocaleString("ru", options);
        posttime_desc.innerHTML = global_date_publication+': '+calendar.value;
        calendar.addEventListener("input", function(event){
            posttime_desc.innerHTML = global_date_publication+': '+calendar.value;
        });
        calendar.type = 'text';
        calendar.className = 'calendar-input';
        calendar.setAttribute('data-position', 'right top');
        calendar.setAttribute('data-timepicker', 'true');
        calendar.setAttribute('data-time-format', 'hh:ii');
        calendar.setAttribute('data-date-format', "dd mm yyyy,");
        calendarContainer.appendChild(calendar);
        settingsdiv.appendChild(calendarContainer);
        desc_textarea.addEventListener('input', function(e){
            descrTextOut();
        });
        $('#ruen',settingsdiv).on('click',function(){
            $('.description_text').val($('.description_text').val().replace(/(?!\{})а(?!\|)/g,'{а|a}')
            .replace(/(?!\{})е(?!\|)/g,'{е|e}')
            .replace(/(?!\{})ё(?!\|)/g,'{ё|ë}')
            .replace(/(?!\{})о(?!\|)/g,'{о|o}')
            .replace(/(?!\{})р(?!\|)/g,'{р|p}')
            .replace(/(?!\{})с(?!\|)/g,'{с|c}')
            .replace(/(?!\{})у(?!\|)/g,'{у|y}')
            .replace(/(?!\{})х(?!\|)/g,'{х|x}')
            .replace(/(?!\{})Ь(?!\|)/g,'{Ь|b}')
            .replace(/(?!\{})А(?!\|)/g,'{А|A}')
            .replace(/(?!\{})В(?!\|)/g,'{В|B}')
            .replace(/(?!\{})Е(?!\|)/g,'{Е|E}')
            .replace(/(?!\{})К(?!\|)/g,'{К|K}')
            .replace(/(?!\{})М(?!\|)/g,'{М|M}')
            .replace(/(?!\{})Н(?!\|)/g,'{Н|H}')
            .replace(/(?!\{})О(?!\|)/g,'{О|O}')
            .replace(/(?!\{})Р(?!\|)/g,'{Р|P}')
            .replace(/(?!\{})С(?!\|)/g,'{С|C}')
            .replace(/(?!\{})З(?!\|)/g,'{З|3}')
            .replace(/(?!\{})Т(?!\|)/g,'{Т|T}')
            .replace(/(?!\{})Х(?!\|)/g,'{Х|X}'));
        });
        $('#ruende',settingsdiv).on('click',function(){
            $('.description_text').val($('.description_text').val()
            .replace(/(?!\{})а(?!\|)/g,'{а|a|ä}')
            .replace(/(?!\{})з(?!\|)/g,'{з|ʒ}')
            .replace(/(?!\{})е(?!\|)/g,'{е|e}')
            .replace(/(?!\{})ё(?!\|)/g,'{ё|ë}')
            .replace(/(?!\{})о(?!\|)/g,'{о|o|ö}')
            .replace(/(?!\{})р(?!\|)/g,'{р|p}')
            .replace(/(?!\{})с(?!\|)/g,'{с|c}')
            .replace(/(?!\{})у(?!\|)/g,'{у|y}')
            .replace(/(?!\{})х(?!\|)/g,'{х|x}')
            .replace(/(?!\{})к(?!\|)/g,'{к|k}')
            .replace(/(?!\{})м(?!\|)/g,'{м|m}')
            .replace(/(?!\{})и(?!\|)/g,'{и|u|ü}')
            .replace(/(?!\{})Ь(?!\|)/g,'{Ь|b}')
            .replace(/(?!\{})А(?!\|)/g,'{А|A|Ä}')
            .replace(/(?!\{})В(?!\|)/g,'{В|B}')
            .replace(/(?!\{})Е(?!\|)/g,'{Е|E}')
            .replace(/(?!\{})К(?!\|)/g,'{К|K}')
            .replace(/(?!\{})М(?!\|)/g,'{М|M}')
            .replace(/(?!\{})Н(?!\|)/g,'{Н|H}')
            .replace(/(?!\{})О(?!\|)/g,'{О|O|Ö}')
            .replace(/(?!\{})Р(?!\|)/g,'{Р|P}')
            .replace(/(?!\{})С(?!\|)/g,'{С|C}')
            .replace(/(?!\{})З(?!\|)/g,'{З|3}')
            .replace(/(?!\{})Т(?!\|)/g,'{Т|T}')
            .replace(/(?!\{})Х(?!\|)/g,'{Х|X}')
            .replace(/(?!\{})И(?!\|)/g,'{И|Ü|U}')
        );
        });
        function descrTextOut(){
            templateText(desc_textarea.value)
            .then(function(text){
                if(desc_textarea.value.search('{') != -1 && desc_textarea.value.search('}') > desc_textarea.value.search('{'))
                    description.style.color = '#2ca0f7';
                else
                    description.style.color = '#262626';
                description.innerHTML = text;
                randomError = false;
            })
            .catch(function(text){
                description.innerHTML = desc_textarea.value;
                description.style.color = '#ff1f1f';
                randomError = true;
            });
        }
        description.addEventListener("click", function(){
            descrTextOut();
        });
        settingsdiv.appendChild(div(global_timeout_after_post, 'lable'));
        var offsetTime = settingsdiv.appendChild(div('', 'offsetTime'));
        setTimeout(function(){
            $('.calendar-input').datepicker({minDate: new Date(), 
                onSelect: function onSelect(fd, date) {
                    fd = fd.replace(' ', '.').replace(' ', '.');
                    posttime_desc.innerHTML = global_date_publication+': '+fd;
                    date_post = date;
                    calendar.value = fd;
                    console.log('fd',fd);
                }
            });
            $('.offsetTime').datepicker({
                dateFormat: ' ',
                startDate: new Date(0,0,0,0,0,0,0),
                timepicker: true,
                classes: 'only-timepicker',
                onSelect: function onSelect(fd, date) {
                    pauseTime = (fd.split(':')[0]*60*60+fd.split(':')[1]*60);
                }
            });
        }, 20);
        var butSend = document.createElement("div");
        
        butSend.className = 'blueButton add-account-input';
        butSend.style['margin'] = '30px 0px';
        butSend.style.opacity = '0';
        butSend.style.transition = 'opacity 0.15s linear';
        butSend.innerText = global_add_post_mini;
        butSend.id = 'save_settings';
        butSend.addEventListener('click', sendPost);
        settingsdiv.appendChild(butSend); 

        settings.appendChild(previewdiv);
        settings.appendChild(circleLine());
        settings.appendChild(settingsdiv);

        function circleLine(){
            var container = div('', 'numbers_post_container');
            container.appendChild(div('<div>1</div>', 'number'));
            container.appendChild(div('', 'line'));
            container.appendChild(div('<div>2</div>', 'number'));
            container.appendChild(div('', 'line')).style.height = "70px";
            container.appendChild(div('<div>3</div>', 'number'));
            container.appendChild(div('', 'line')).style.height = "55px";
            container.appendChild(div('<div>4</div>', 'number'));
            container.appendChild(div('', 'line')).style.height = "43px";
            container.appendChild(div('<div>5</div>', 'number'));
            return container;
        }

        var inputFile = document.createElement("input");
        inputFile.type = 'file';
        inputFile.id = 'upload_file';
        inputFile.accept="video/mp4, image/jpeg"
        inputFile.style.visibility = 'hidden';
        inputFile.style.display = 'none';
        inputFile.style.position = 'absolute';
        inputFile.multiple = 'false';
        settings.appendChild(inputFile);
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
        
                reader.onload = function (e) {
                    if(input.files[0].type == "image/jpeg"){
                        getClass('video')[0].style.opacity = '0';
                        getClass('player')[0].style.opacity = '0';
                        getClass('player')[0].pause();
                        media.style.background = 'url("'+e.target.result+'")  50% 50% / 100% no-repeat';
                        getClass('preview_image')[0].style.opacity = '0';
                    }
                    if(input.files[0].type == "video/mp4"){
                        media.style.background = 'none';
                        getClass('preview_image')[0].style.opacity = '1';
                        getClass('video')[0].style.opacity = '0.5';
                        getClass('player')[0].style.opacity = '1';
                        var player = getClass('player')[0];
                        player.innerHTML = '<source src="'+e.target.result+'" type="video/mp4" />';
                        player.load();
                    }
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        inputFile.addEventListener('change', function(e){
            console.log('inputFile.files',inputFile.files[0],  URL.createObjectURL(inputFile.files[0]));
            
            readURL(inputFile);
           
            getClass('load_lable')[0].innerHTML = inputFile.files[0].name;
        });
        watermark.addEventListener('click', function(){
            inputFile.click();
        });
        return settings;
    }
    function sendPost(e){

        if(randomError){
            popupInfo('error', global_error, 'Неправильно введён рандомизированный текст. Проверьте правильность рандомизации.', global_close);
            return;
        }

        if(!getId('upload_file').files[0]){
            popupInfo('error', global_error, global_dont_chose_media, global_close);
            return;
        }
        var dateTemp = getClass('calendar-input')[0].value.split('.');
        if(dateTemp.length != 3){
            popupInfo('error', global_error, 'Дата указана неверно', global_close);
            return;
        }
        
        var butSave = document.getElementsByClassName('blueButton add-account-input')[0];
        butSave.innerHTML = '<svg width="14" height="14" style="fill:#fff"><use xlink:href="#miniload-svg"></use></svg>';
        var overlay = document.getElementById('fil_overlay');
        overlay.style.display = 'block';
        setTimeout(function(){
            overlay.style.opacity = '0.3';
        }, 25);
        /*var ids = [];
        for(var i in document.getElementsByClassName('button active')){
            if(typeof document.getElementsByClassName('button active')[i]=='object')
                ids.push(document.getElementsByClassName('button active')[i].obj._id);
        }*/
        var buts = [].slice.call(document.getElementsByClassName('button active'));
        var ids = JSON.stringify(buts.map(function(el){return el.obj._id}))
        console.log(new Date(dateTemp[1]+'.'+dateTemp[0]+'.'+dateTemp[2]), date_post);
        var data = new FormData();
        data.append('accountIds', ids);
        data.append('caption', getClass("description_text")[0].value);
        //data.append('postTime', new Date(date_post).toISOString());//Math.floor(new Date(date_post).getTime() / 1000))

        data.append('pause', pauseTime);


        (() => {

            const day = dateTemp[0]
            const month = dateTemp[1]
            const dateTemp2 = dateTemp[2].split(', ')
            const year = dateTemp2[0]
            const time = dateTemp2[1].split(':')
            const hour = time[0]
            const minute = time[1]

            const date = new Date(year, month, day, hour, minute)

            data.append('postTime', +date);

        })()

        if(getId('upload_file').files[0].type == "image/jpeg"){
            data.append('image', getId('upload_file').files[0]);
        }
        if(getId('upload_file').files[0].type == "video/mp4"){
            data.append('video', getId('upload_file').files[0]);
        }
        $.ajax({
            type: "PUT",
            enctype: 'multipart/form-data',
            url: host+'/post',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            headers: {
                "x-access-token": token
            },
            success: function (respUpl) {
                popupInfo('ok', global_publication_post, global_publicate_post, global_close, null, function(){
                    posting();
                });
                endOverlay();
            },
            error: function (e) {
                console.log(e);
                popupInfo('error', global_error, localError(e.responseJSON), global_close);
                endOverlay();
            }
        });
        function endOverlay(){
            overlay.style.opacity = '0';
            setTimeout(function(){
                overlay.style.display = 'none';
                butSave.innerHTML = global_add_post_mini;
                noSave = false;
            }, 150);
        }
/*
        ajax('post', {accountIds:ids, caption:getClass("description_text")[0].value, postTime:Math.floor(new Date(date_post).getTime() / 1000), pause:pauseTime}, 'put', function(res){
            overlay.style.opacity = '0';
            setTimeout(function(){
                overlay.style.display = 'none';
                butSave.innerHTML = global_add_post_mini;
                noSave = false;
            }, 150);
            if(!res.success){
                popupInfo('error', global_error, res.data.message.message, global_close);
                return;
            }
            if(getId('upload_file').files[0]){
                if(getId('upload_file').files[0].type == 'image/jpeg'){
                    uploadFile(res.data.uploadUrl.photo);
                }else{
                    uploadFile(res.data.uploadUrl.video);
                }
            }
            //res.data.uploadUrl
            console.log(res);
        });*/
    }
    function uploadFile(url){
        var data = new FormData();
        data.append('file', getId('upload_file').files[0]);
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: host+url,
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            headers: {
                "x-access-token": token
            },
            success: function (respUpl) {
                console.log(respUpl);
               
            },
            error: function (e) {
                console.log(e);
                popupInfo('error', global_error, e, global_close);
            }
        });
    }
    function createWaterMark(_lable){
        var iconContainer = div('', 'iconContainer');
        var icon = div('', 'load_icon');
        var lable = div(_lable, 'load_lable');
        iconContainer.appendChild(icon);
        iconContainer.appendChild(lable);
        return iconContainer;
    }
    function cancelChosed(){
        while(getClass('check active').length > 0){
            getClass('check active')[0].className = 'check';
        }
        while(getClass('button active').length > 0){
            getClass('button active')[0].className = 'button';
        }
    }
    var chosedAccount = null;
    function openAccount(e){
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
                //hideUnicalInputs();
                if(getClass('check active').length == 1){
                    //showUnicalInputs();
                    chosedAccount = getClass('button active')[0];
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
        document.getElementById('start_info').style.display = 'none';
        getClass('preview_post_container')[0].style.opacity = '1';
        getClass('numbers_post_container')[0].style.opacity = '1';
        getClass('settings_post_container')[0].style.opacity = '1';
        document.getElementById('save_settings').style.opacity = '1';
        getClass('fil_settings')[0].style['pointer-events'] = 'auto';
        if(chosedAccount){
            chosedAccount.className = 'button';
            cancelChosed();
        }
        if(getClass('check active').length == 0){
           // showUnicalInputs();
        }
        chosedAccount = e.currentTarget;
        chosedAccount.className = 'button active';
        e.currentTarget.getElementsByClassName('check')[0].className = 'check active';
       //loadPosts(chosedAccount.obj);
        if (window.innerWidth < 650) {
            $('.fil_set_container').show();
            $('#accListFilling').hide();
        }
    }
    
}