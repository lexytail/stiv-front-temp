this.postsFeed = function(params){
    setActiveMenu('postsFeed');
    clearBlock();
    var mainDiv = document.createElement("div");
    mainDiv.className = "fil_set_container";
//    $('.topHelpBut').html('<a class="butHelp" href="https://www.youtube.com/watch?v=n2r_RGQSorE" target="_blank"><div class="blueButton">Обучение</div></a>');
    $('#LVideo').show();
    $('#LVideo').attr('href', 'https://www.youtube.com/watch?v=n2r_RGQSorE');

    
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
            $('<div class="nextbutton left" id="prevSettings">Назад</div><div class="clearfix"></div>').insertBefore('.fil_settings .user_posts');
        }
    }
    function cancelChosed(){
        while(document.getElementsByClassName('check active').length > 0){
            document.getElementsByClassName('check active')[0].className = 'check';
        }
        while(document.getElementsByClassName('button active').length > 0){
            delPostFromFeed(document.getElementsByClassName('button active')[0].obj);
            document.getElementsByClassName('button active')[0].className = 'button';
        }
    }
    var chosedAccount = null;
    function openAccount(e){
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
                            loadPosts(buttons[i].obj);
                        }
                    }
                }else{
                    if(e.currentTarget.getElementsByClassName('check active')[0] && document.getElementsByClassName('check active').length != 1){
                        e.currentTarget.getElementsByClassName('check active')[0].className = 'check';
                        e.currentTarget.className = 'button';
                        delPostFromFeed(e.currentTarget.obj);
                    }else{
                        e.currentTarget.getElementsByClassName('check')[0].className = 'check active';
                        e.currentTarget.className = 'button active';
                        loadPosts(e.currentTarget.obj);
                    }
                }
                //hideUnicalInputs();
                if(document.getElementsByClassName('check active').length == 1){
                    //showUnicalInputs();
                    chosedAccount = document.getElementsByClassName('button active')[0];
                    loadPosts(chosedAccount.obj);
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
        getClass("user_posts")[0].style.opacity = 1;
        document.getElementById('start_feed_info').style.display = 'none';
        document.getElementsByClassName('fil_settings')[0].style['pointer-events'] = 'auto';
        if(chosedAccount){
            chosedAccount.className = 'button';
            delPostFromFeed(chosedAccount.obj);
            cancelChosed();
        }
        if(document.getElementsByClassName('check active').length == 0){
           // showUnicalInputs();
        }
        chosedAccount = e.currentTarget;
        chosedAccount.className = 'button active';
        e.currentTarget.getElementsByClassName('check')[0].className = 'check active';
        loadPosts(chosedAccount.obj);
        if (window.innerWidth < 650) {
            $('#accListFilling').hide();
            $('.fil_set_container').show();
        }
    }
    
    function postContainer(post){
        if(!post.postId)
            return null;

        var container = document.createElement("div");
        container.post = post;
        container.className = 'postContainer';
        var photo = document.createElement("div");
        photo.className = 'photo';
        if(!getClass('check_box')[0].enabled)
            photo.style.background = 'url("'+post.postId.image+'") 50% 50% / 470px no-repeat';
        else{
           // if(post.postId.imageBuffer){
            /*ajax('post/'+post.postId+'/image', {}, 'get', function(res){
                console.log(res.data);
                if(res.success){
                    var base64 = _arrayBufferToBase64(res.data);//post.postId.imageBuffer.data;//_arrayBufferToBase64(post.postId.imageBuffer.data.data);
                    var image = 'data:'+post.postId.imageBuffer.mimetype+';base64,'+base64;
                    //photo.style.background = 'url("'+image+'") 50% 50% / 470px no-repeat';
                    photo.style.background = 'url("'+host+'/post/'+post.postId+'/image") 50% 50% / 470px no-repeat';
                }
            });*/
            photo.style.background = 'url("'+host+'/post/'+post.postId._id+'/image?token='+token+'") 50% 50% / 470px no-repeat';
                
            //}
            if(post.postId.videoBuffer){

            }
        }
        if(post.postId.type == "video"){
            var video = document.createElement("div");
            video.className = 'video';
            photo.appendChild(video);
            photo.addEventListener("click", function(e){
                if(e.currentTarget.player){
                    if(e.currentTarget.player.paused){
                        e.currentTarget.player.play();
                    }else{
                        e.currentTarget.player.pause();
                    }
                    return;
                }
                var player = document.createElement("video");
                if(!getClass('check_box')[0].enabled){
                    player.innerHTML = '<source src="'+e.currentTarget.parentElement.post.postId.video+'" type="video/mp4" />';
                }else{
                    player.innerHTML = '<source src="'+host+'/post/'+post.postId._id+'/video?token='+token+'" type="video/mp4" />';
                    ajax("post/"+post.postId._id+"/video", {}, "GET", function(res){
                        console.log(res);
                        if(res.success)
                            player.innerHTML = '<source src="'+res.data.buffer+'" type="video/mp4" />';
                    });
                }
                e.currentTarget.appendChild(player);
                e.currentTarget.player = player;
                player.play();
            });
        }
        function addBrs(text){
            console.log('text',text);
            return text.replaceAll('\n', '<br>');
        }
        container.appendChild(photo);
        container.appendChild(div(getAccountForId(post.accountId).id, 'username'));
        var description = div((post.caption!=undefined)?addBrs(post.caption):'', 'description')
        description.contentEditable = "true";
        var edit = container.appendChild(div('', 'iconEditable'));
        edit.addEventListener('click', function(e){
            description.focus();
        });
        description.addEventListener('blur', function(e){
            var post = e.currentTarget.parentElement.post;
            ajax('post/'+post._id, {caption:e.currentTarget.innerText}, 'put', function(res){
                console.log(res);
            });
        });
        container.appendChild(description);
        var deletePost = container.appendChild(div('', 'iconDelete'));
        var sendPost = container.appendChild(div('', 'iconSend'));
        tooltip(deletePost, global_delete_post);
        tooltip(sendPost, global_send_post);
        sendPost.addEventListener('click', function(e){
            var post = e.currentTarget.parentElement.post;
            popupInfo('question', global_send_post, global_send_post_question, global_publicate, null, function(){
                //публикуем
                ajax('post/'+post._id, {}, 'post', function(res){
                    if(res.success){
                        delOnePost(post._id);
                        popupInfo('ok', global_send_post, global_publicate_post, 'Ok');
                    }else
                        popupInfo('error', global_send_post, localError(res.data), 'Ok');
                });
            });
        });
        deletePost.addEventListener('click', function(e){
            var post = e.currentTarget.parentElement.post;
            popupInfo('question', global_delete_post, global_delete_post_question, global_Delete, null, function(){
                ajax('post/'+post._id, {}, 'delete', function(res){
                    if(res.success){
                        delOnePost(post._id);
                        popupInfo('ok', global_delete_post, global_post_deleted, 'Ok');
                    }else
                        popupInfo('error', global_error, localError(res.data), 'Ok');
                });
            });
        });
        var line = document.createElement("div");
        line.className = 'line';
        container.appendChild(line);
        var time = document.createElement("div");
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
        time.className = 'description';
        //new Date(post.timestamp).toLocaleString("ru", options)
        if(post.engagement && post.postId.name){
            time.innerHTML = global_engagement+': <b>'+post.engagement+'</b><br/>'+global_took_from+': <span class="donor_link" style="cursor:pointer;"><b>'+post.postId.name+'</b></span>';
            time.getElementsByClassName('donor_link')[0].addEventListener('click', function(e){
                window.open('https://instagram.com/'+post.postId.name);
            });
        }else{
            time.innerHTML = '<b>'+global_date_publication+'</b>: '+new Date(post.postTime).toLocaleString("ru", options)+'<br/>&nbsp';
        }
        container.appendChild(time);
        var blueLine = document.createElement("div");
        blueLine.className = 'blueLine';
        container.appendChild(blueLine);
        return container;
    }
    function getAccountForId(_id){
        for(var i in accountsArr){
            if(accountsArr[i]._id == _id){
                return accountsArr[i];
            }
        }
        return {};
    }
    function addPostInFeed(obj){
        //console.log('obj.postsFeed', obj.postsFeed);
        for(var i in obj.postsFeed){
            if(checkDublePost(obj.postsFeed[i]._id))
                continue;
            var post = postContainer(obj.postsFeed[i]);
            var postObj = obj.postsFeed[i];
           // console.log('addPost',post);
            if(post){
                sortPost(post, postObj)
                //cont.appendChild(post);
            }
        }
    }
    function sortPost(post, postObj){
        var cont = document.getElementById('postsFeedContainer');
        var posts = document.getElementsByClassName("postContainer");
        for(var i = 0; i < posts.length; i++){
            if(typeof posts[i+1] != 'object'){
                if(Number(posts[i].post.engagement) <= Number(postObj.engagement)){
                   // console.log('1', posts[i].post.engagement, postObj.engagement, post, posts[i]);
                    cont.insertBefore(post, posts[0]);
                }else{
                  //  console.log('2', posts[i].post.engagement, postObj.engagement);
                    cont.appendChild(post);
                }
                return;
            }
            if(Number(posts[i].post.engagement) >= Number(postObj.engagement) && Number(posts[i+1].post.engagement) <= Number(postObj.engagement)){
              //  console.log('3', posts[i].post.engagement, postObj.engagement, posts[i+1].post.engagement);
                cont.insertBefore(post, posts[i+1]);
                return;
            }
        }
        cont.appendChild(post);
    }
    function checkDublePost(_id){
        var posts = document.getElementsByClassName("postContainer");
        for(var i in posts){
            if(typeof posts[i] != 'object')
                continue;
            if(_id == posts[i].post._id)
                return posts[i];
        }
        return false;
    }
    function delPostFromFeed(obj){
        var post = obj.postsFeed;
        for(var i in post){
            if(_post = checkDublePost(post[i]._id)){
                _post.parentElement.removeChild(_post);
            }
        }
    }
    function delOnePost(id){
        var post = checkDublePost(id);
        if(post)
            post.parentElement.removeChild(post);
    }
    function loadPosts(obj){
       var user = (getClass('check_box')[0].enabled)?1:0;
       console.log('user',user);
       /*if(obj.postsFeed && !force){ //требуется оптимизация
            addPostInFeed(obj);
            return;
        }*/
        ajax('account/'+obj._id+'/posts', {user:user}, 'get', function(resp){
            console.log(resp);
            if(resp.success){
                obj.postsFeed = resp.data.posts;
                addPostInFeed(obj);
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
        title.info.innerHTML = global_title_posts_feed;
        title.info.className = 'fil_title_text';
        settings.style['pointer-events'] = 'auto';
        
        title.appendChild(title.info);
        settings.appendChild(title);

        var startJobInfo = div('<span>'+global_chose_account+'</span><br/><br/>'+global_tip_posting);
        startJobInfo.id = 'start_feed_info';
        //tooltip(startJobInfo.appendChild(div('','warning floatnone')), global_tip_posting, '700px');
        settings.appendChild(startJobInfo);

        var userPosts = div('', 'user_posts');
        userPosts.appendChild(div(global_user_posts));
        userPosts.appendChild(createCheckBox(false, changeFeed));
        var posts = document.createElement("div");
        posts.id = 'postsFeedContainer';

        settings.appendChild(userPosts);
        settings.appendChild(posts);
        return settings;
    }
    function changeFeed(bool){
        var buts = getClass("button active");
        for(var i in buts){
            if(typeof buts[i] != 'object')
                continue;
            delPostFromFeed(buts[i].obj);
            loadPosts(buts[i].obj, bool);
        }
    }
}