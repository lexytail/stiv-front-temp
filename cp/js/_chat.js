var chosedAccount = null;
var activeThread = null;
var pendingOpen = 0;
var newchatOpen = 0;

var threads = [];                       //threads array
var pthreads = [];                      //pendings threads array
var messages = [];                      //messages array
var pendings = [];
var cursors = { thread: '', messages: '' }; //current cursors

this.direct = function () {

    var ps_custom_scrollbar = [];
    var newchatName = '';
    var scOptions = { wheelSpeed: 1 };

    var chatList;
    var main_menu;
    var gx_main_content;
    var chat_list_scroll;
    var listElmM;
    var listElm;

    setActiveMenu('direct');
    clearBlock();

    var mainDiv = document.createElement("div");
    mainDiv.className = "fil_set_container";
    mainDiv.appendChild(createSettings());

    var divcontent = document.getElementById("content");
    divcontent.innerHTML = '';
    divcontent.appendChild(createAccountList());
    divcontent.appendChild(mainDiv);

    fillingAccountsUpdateHeight();

    window.scrollTo(0, 0);

    getAccountList(fillAccountsList);

    //if (window.innerWidth < 700) 
    {
        $('.chat-sidenav').hide();
        $('.chat-module-box').hide();

        $('.fil_set_container').hide();
        $('.fil_set_container').css('margin-left', 0);
        $('.flex.autoproxy').css('margin-left', 0);
    }

    function createSettings() {
        var settings = document.createElement("div");
        settings.className = 'fil_settings';

        var title = document.createElement("div");
        title.className = 'fil_title';

        title.info = document.createElement("div");
        title.info.className = 'title_text';
        title.appendChild(title.info);

        title.info.pendins = document.createElement("div");
        title.info.pendins.innerHTML = 'Входящие запросы';
        title.info.pendins.className = 'pendings';

        title.info.appendChild(title.info.pendins);

        title.info.newchat = document.createElement("div");
        title.info.newchat.innerHTML = 'Новый чат';
        title.info.newchat.className = 'newmessage';

        title.info.appendChild(title.info.newchat);

        settings.appendChild(title);

        var startJobInfo = document.createElement("div");
        startJobInfo.id = 'start_info';
        startJobInfo.innerHTML = global_chose_account;

        var leftDiv = document.createElement("div");
        leftDiv.className = 'group_tf one';
        leftDiv.style.overflow = 'unset';

        leftDiv.appendChild(startJobInfo);

        settings.appendChild(leftDiv);

        $('.gx-wrapper').addClass('direct');

        return settings;
    }

    function getThreads(acc, func, cursorT = '') {
        var link = (pendingOpen == 1) ? 'pending/' + acc._id : 'direct/' + acc._id;
        var data = '';
        if (cursorT !== '') data = { cursor: cursorT };

        ajax(link, data, 'GET',
            function (res) {
                func(acc, res);
            }
        );
    }

    function getMessages(acc, threadid, func, cursorM = '') {
        var link = 'direct/' + acc._id + '/' + threadid;
        var data = '';
        if (cursorM !== '') var data = { cursor: cursorM };

        ajax(link, data, 'GET',
            function (res) {
                func(acc, threadid, res);
            }
        );
    }

    function sendMessage(acc, threadid, data, func) {
        var link = (newchatOpen == 1) ? 'direct/' + acc._id + '/' + newchatName : 'direct/' + acc._id + '/' + threadid.thread_id;
        var tid = (newchatOpen == 1) ? newchatName : threadid.thread_id;

        ajax(link, data, 'POST',
            function (res) {
                func(acc, tid, res);
            }
        );
    }

    function approveClient(acc, threadid, func) {
        var link = 'pending/' + acc._id + '/' + threadid + '/approve';
        var data = 'action=approve';

        ajax(link, data, 'POST',
            function (res) {
                func(acc, threadid, res);
            }
        );
    }

    function declineClient(acc, threadid, func) {
        var link = 'pending/' + acc._id + '/' + threadid + '/decline';
        var data = 'action=decline';

        ajax(link, data, 'POST',
            function (res) {
                func(acc, threadid, res);
            }
        );
    }

    function refreshChat() {
        $('.ps__rail-x').remove();
        $('.ps__rail-y').remove();

        var chatMessages;
        if (typeof (messages[0]) !== 'undefined') chatMessages = messages;

        ReactDOM.render(
            React.createElement(Chat, { threads: threads, pendingOpen: pendingOpen, newchatOpen: newchatOpen, newchatName: newchatName, messages: chatMessages, activeThread: activeThread, user: chosedAccount }, null),
            document.getElementsByClassName('group_tf')[0]
        );

        setTimeout(perfected(), 500);
        setTimeout(setupCursors(), 500);
    }

    function stopThreads() {
        listElm = document.getElementById('chatList');
        if (typeof listElm !== 'undefined' && listElm !== null) listElm.removeEventListener('ps-y-reach-end', getThreadsWithCursor, false);
    }

    function stopMessages() {
        listElm = document.getElementById('chatList');
        if (typeof listElmM !== 'undefined' && listElmM !== null) listElmM.removeEventListener('ps-y-reach-end', getMessagesWithCursor, false);
    }

    function setupCursors() {
        if ($('.chat-sidenav').css('display') == 'block' || $('.chat-sidenav').css('display') == 'flex') {
            listElm = document.getElementById('chatList');
            listElm.removeEventListener('ps-y-reach-end', getThreadsWithCursor, false);
            if (typeof listElm !== 'undefined' && listElm !== null) {
                if ($('.chat-user').outerHeight() > 0) {
                    if ($(listElm).outerHeight() >= $('.chat-user').outerHeight()) getThreadsWithCursor();
                }
                listElm.addEventListener('ps-y-reach-end', getThreadsWithCursor);
            }
        }

        if ($('.chat-module-box').css('display') == 'block') {
            listElmM = document.getElementById('chatListScroll');
            stopMessages();
            if (typeof listElmM !== 'undefined' && listElmM !== null) {
                if (
                    $('.chat-main-content').outerHeight() < $('.chat-list-scroll').outerHeight()
                ) {
                    getMessagesWithCursor();
                }
                if (cursors['messages'] !== '' && cursors['messages'] !== null && typeof cursors['messages'] !== 'undefined' && cursors['messages'] !== 'stop') {
                    listElmM.addEventListener('ps-y-reach-end', getMessagesWithCursor);
                }
            }
        }
    }

    var cntReq = 0;
    function fillAccountsList() {
        $(".loader-backdrop").show();
        console.log('SHOW 1')

        for (var i in accountsArr) {
            if (accountsArr[i].enabled == false) continue;
            addAccountInList(accountsArr[i], openAccount, false);

            cntReq++;
            getThreads(
                accountsArr[i],
                function (acc, res) {
                    if (res.success) {
                        pendings[acc.id] = res.data.pendingRequestsTotal;

                        cursors['threads'] = res.data.cursor;
                        cursors['messages'] = '';

                        if (res.data.pendingRequestsTotal > 0) {
                            var checkBox = document.createElement("div");
                            checkBox.className = 'pending';
                            checkBox.title = "Входящие сообщения";

                            var check = document.createElement("div");
                            check.innerHTML = '+' + res.data.pendingRequestsTotal;
                            checkBox.appendChild(check)
                            divcheckBox = document.getElementById("acc_" + acc.id);
                            divcheckBox.appendChild(checkBox);
                        }

                        $(".loader-backdrop").hide();

                        cntReq--;

                    }
                }
            );
        }
        //        $('#fil_list').append('<div class="nextbutton" id="nextSettings">Выбрать</div><div class="clearfix"></div>');
        $('.fil_settings .title_text').prepend('<div class="nextbutton left" style="margin-left:5px;" id="prevSettings">Назад</div>');
    }

    $(window).on('resize', function () {
        perfected();
    });

    //one height for all utilite
    function perfected() {
        console.log('perfected');
        if ($.isFunction(PerfectScrollbar)) {


            if ($('.chat-list-scroll').length > 0) {
                chat_list_height();
                $(window).on('resize', function () {
                    chat_list_height();
                });
            }

            if ($('.ps-custom-scrollbar').length > 0) {
                chat_module_sidebar_height();
                $(window).on('resize', function () {
                    chat_module_sidebar_height();
                });
            }


            if ($('#chatList').length > 0) {
                if (typeof chat_list_scroll !== 'undefined') {
                    chatList.update();
                } else {
                    chatList = new PerfectScrollbar('#chatList', scOptions);
                }
            }

            if ($('.chat-list-scroll').length > 0) {
                if (typeof chat_list_scroll !== 'undefined') {
                    chat_list_scroll.update();
                } else {
                    chat_list_scroll = new PerfectScrollbar('.chat-list-scroll', scOptions);
                }
            }
        }
    }


    function loadNewChat(resq) {
        /*
                    closeNewChat();
        
                    $(".loader-backdrop").show();
                    getThreads(
                        chosedAccount.obj,
                        function(acc, res){
                            if(res.success){
                                if(res.data.threads){
                                    threads = res.data.threads;
                                    cursors['threads'] = res.data.cursor;
                                    cursors['messages'] = '';
                                    refreshChat();
        
                                    if(
                                        resq == null 
                                        || resq.data == null 
                                        || resq.data.result == null 
                                        || resq.data.result.thread_id == null 
                                        || typeof resq == 'undefined' 
                                        || typeof resq.data  == 'undefined'
                                        || typeof resq.data.result  == 'undefined'
                                        || typeof resq.data.result.thread_id  == 'undefined'
                                    ) {
                                        $('.chat-sidenav').show();
                                        $('.chat-module-box').hide();
                                        $('#accListFilling').hide();
                                        $('.fil_set_container').show();
                                        $('.newmessage').show();
                                        return;
                                    } else {
                                        $('.chat-sidenav').hide();
                                        $('.chat-module-box').show();
                                        
                                        $('#accListFilling').hide();
                                        $('.fil_set_container').show();
                                        $('.newmessage').hide();
        
                                        for (let item of threads) {
                                            if(item.thread_id == resq.data.result.thread_id) {
                                                activeThread = item;
                                                break;
                                            }
                                        };
        
                                        reloadMessages();
                                    }
                                } else {
                                    popupInfo('error', global_checking_account, localError(res.data)+' ('+parent.accname+')', global_close);
                                }
                            }
                            $(".loader-backdrop").hide();
                        }
                    );
        */
    }

    /*
        stopMessages();
        if(newchatOpen == 1)
        { 
            loadNewChat(resq);
            return;
        } 
    */
    function reloadMessages(resq) {
        $(".loader-backdrop").show();
        getMessages(
            chosedAccount.obj,
            activeThread.thread_id,
            function (acc, threadid, res) {
                if (res.success) {
                    if (res.data.messages) {
                        cursors['messages'] = res.data.cursor;
                        messages = [];
                        messages.push(res.data.messages);
                        console.log('Сообщения из чата', messages);
                        refreshChat();
                    } else {
                        cursors['messages'] = 'stop';
                    }
                } else {
                    popupInfo('error', global_checking_account, localError(res.data) + ' (' + parent.accname + ')', global_close);
                }
                $(".loader-backdrop").hide();
            }
        );
    }

    function reLoadThreads(erfunc) {
        $(".loader-backdrop").show();
        getThreads(
            chosedAccount.obj,
            function (acc, res) {
                console.log('reLoadThreads', res);
                if (res.success && res.data.success) {
                    if (res.data.threads) {
                        threads = res.data.threads;
                        cursors['threads'] = res.data.cursor;
                        cursors['messages'] = '';
                        refreshChat();
                    } else {
                    }
                } else {
                    popupInfo('error', global_checking_account, localError(res.data) + ' (' + parent.accname + ')', global_close);
                    erfunc();
                }
                $(".loader-backdrop").hide();
            }
        );
    }

    function getThreadsWithCursor() {
        //return false;
        if
            (
            (cursors['threads'] == '' || cursors['threads'] == null)
            || ($('.chat-sidenav').css('display') == 'none')
            || ($('.chat-user').outerHeight() == 0)
        ) {
            return false;
        }
        console.log('getThreadsWithCursor1', cursors['threads']);

        $(".loader-backdrop").show();
        getThreads(
            chosedAccount.obj,
            function (acc, res) {
                if (res.success) {
                    if (res.data.threads) {
                        threads = threads.concat(res.data.threads);
                        cursors['threads'] = res.data.cursor;

                        refreshChat();
                    }
                } else {
                    popupInfo('error', global_checking_account, localError(res.data) + ' (' + parent.accname + ')', global_close);
                }
                $(".loader-backdrop").hide();
            },
            cursors['threads']
        );
    }

    function getMessagesWithCursor() {
        console.log('get cursors[messages]', cursors['messages'])
        if (cursors['messages'] == 'stop') return false;

        $(".loader-backdrop").show();
        console.log('getMessages0');

        getMessages(
            chosedAccount.obj,
            activeThread.thread_id,
            function (acc, threadid, res) {
                if (res.success) {
                    if (res.data.messages) {
                        cursors['messages'] = res.data.cursor;

                        if (messages[0]) messages[0] = messages[0].concat(res.data.messages);

                        else messages[0] = []

                        console.log('refreshChat2');

                        refreshChat();
                    } else {
                        cursors['messages'] = 'stop';
                    }
                } else {
                    popupInfo('error', global_checking_account, localError(res.data) + ' (' + parent.accname + ')', global_close);
                }
                console.log('Новые сообщения', res.data.messages)
                $(".loader-backdrop").hide();
            },
            cursors['messages']
        );
    }

    /*
    function closeNewChat() {
        if(newchatOpen == 1) {
            $(".loader-backdrop").hide();
            newchatOpen = 0;
            refreshChat();
        }
    }

    function closePendings() {
        if(pendingOpen == 1) {
            pendingOpen = 0;
            refreshChat();
        }
    }


    */



    /*
                $('.chat-sidenav').hide();
                $('.chat-module-box').show();
                $('.fil_set_container').show();
                $('#accListFilling').hide();
    
    */

    function displayAccountBox(display) {
        if (display == false) {
            $('.fil_set_container').show();
            $('#accListFilling').hide();
        } else {
            $('.fil_set_container').hide();
            $('#accListFilling').show();
        }
    }

    function displayChatBox(display) {
        if (display == false) {
            $('.chat-module-box').hide();
            $('.chat-sidenav').show();
        } else {
            $('.chat-module-box').show();
            $('.chat-sidenav').hide();
        }
    }



    //$('.chat-user-item').removeClass('active');
    function showButtons() {
        stopThreads();
        stopMessages();

        $('.pendings').removeClass('active');
        $('.newmessage').removeClass('active');
        $('.pendings').hide(); //выключаем pendings
        $('.newmessage').hide(); //выключаем newmessage

        $('#accListFilling').hide();
        $('.fil_set_container').show();

        if (pendingOpen == 1) {
            $('.pendings').addClass('active');
            $('.pendings').show();
        } else if (newchatOpen == 1) {
            $('.newmessage').addClass('active');
            $('.newmessage').show();
        } else if (activeThread == null) {
            $('.newmessage').show();
            if (pendings[chosedAccount.obj.id] > 0) {
                $('.pendings').show();
            }
        }

        if (activeThread !== null || newchatOpen == 1) {
            displayChatBox();
        } else {
            displayChatBox(false);
        }
    }

    /* 
     */

    function openAccount(e) {
        $('.button').removeClass('active');

        chosedAccount = e.currentTarget;
        $(chosedAccount).addClass('active');
        chosedAccount.obj.avatarDiv = $(chosedAccount).find('.avatar')[0];

        messages = [];
        threads = [];

        cursors['threads'] = '';
        cursors['messages'] = '';

        showButtons();

        reLoadThreads(
            function () {
                chosedAccount = null;
                displayAccountBox();
            }
        );
    }

    $(document).ready(function () {

        $(document).on('click', '#prevSettings', function (e) {
            //Действия при назад
            stopThreads();
            stopMessages();

            if (newchatOpen == 1) {
                //NEWCHAT
                newchatOpen = 0

                activeThread = null;
                messages = [];

                displayChatBox(false);
                reLoadThreads();
            } else if (pendingOpen == 1) {
                //PENDINGS
                if (activeThread != null) {
                    activeThread = null;
                    messages = [];

                    displayChatBox(false);
                    reLoadThreads();

                } else {
                    pendingOpen = 0;

                    activeThread = null;
                    threads = [];

                    displayChatBox(false);
                    reLoadThreads();
                }
            } else {
                //CHATS
                if (activeThread != null) {
                    activeThread = null;
                    messages = [];

                    displayChatBox(false);
                    reLoadThreads();
                } else {
                    chosedAccount = null;
                    threads = [];
                    displayAccountBox();
                }
            }
        });



        $(document).on('click', '.chat-user-item', function () {
            var activeThreadId = $(this).attr('rel');
            activeThread = null;

            $(this).addClass('active');

            for (let item of threads) {
                if (item.thread_id == activeThreadId) {
                    activeThread = item;
                    break;
                }
            };

            showButtons();

            reloadMessages();
        });



        $(document).on('click', '.newmessage', function () {

            stopThreads();
            stopMessages();

            newchatOpen = 1;

            showButtons();

            swal({
                text: 'Введите логин',
                content: "input",
                button: {
                    text: "Отправить",
                    closeModal: false,
                },
            })
                .then(function (login) {
                    if (!login) {
                    }

                    newchatName = login;

                    refreshChat();

                    swal.stopLoading();
                    swal.close();
                });
        })


        $(document).on('click', '.pendings', function () {

            stopThreads();
            stopMessages();

            pendingOpen = 1;
            threads = [];
            refreshChat();

            showButtons();

            reLoadThreads();
        });



        //==================================================================================================================================================================================================================================


        $(document).on('click', '.approveClient', function () {
            $(".loader-backdrop").show();
            approveClient(
                chosedAccount.obj,
                activeThread.thread_id,
                function (acc, threadid, res) {
                    $('.pendings').trigger('click');
                    $(".loader-backdrop").hide();
                }
            )
        });

        $(document).on('click', '.declineClient', function () {

            $(".loader-backdrop").show();
            declineClient(
                chosedAccount.obj,
                activeThread.thread_id,
                function (acc, threadid, res) {
                    $('.pendings').trigger('click');
                    $(".loader-backdrop").hide();
                }
            )
        });


        //==================================================================================================================================================================================================================================





        //OPEN LINK
        $(document).on('click', '.openLink', function () {
            window.open($(this).attr('rel'), '_blank')
        });

        //KEYBOARD
        $(document).on('keydown', '.chat-textarea', function (e) {
            obj = e.currentTarget;

            if (e.ctrlKey) {
                if (e.keyCode == 13) {
                    var val = obj.value;

                    if (typeof obj.selectionStart == "number" && typeof obj.selectionEnd == "number") {
                        var start = obj.selectionStart;
                        obj.value = val.slice(0, start) + "\n" + val.slice(obj.selectionEnd);
                        obj.selectionStart = obj.selectionEnd = start + 1;
                    } else if (document.selection && document.selection.createRange) {
                        obj.focus();
                        var range = document.selection.createRange();
                        range.text = "\r\n";
                        range.collapse(false);
                        range.select();
                    }
                }
            } else {
                if (e.keyCode == 13 || e.keyCode == 10) {
                    $('.chat-sent').trigger('click');
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
        });

        $(document).on('keyup', '.chat-textarea', function (e) {
            if (!e.ctrlKey) {
                if (e.keyCode == 13 || e.keyCode == 10) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
        });

    });

    //SENDING

    $(document).on('click', '.profile-sent', function () {
        swal({
            text: 'Введите логин профиля',
            content: "input",
            button: {
                text: "Отправить",
                closeModal: false,
            },
        })
            .then(function (profile) {
                if (!profile) throw null;


                data = { type: 'profile', params: profile };

                $(".loader-backdrop").show();
                sendMessage(
                    chosedAccount.obj,
                    activeThread,
                    data,
                    function (acc, threadid, res) {
                        console.log('.profile-sent', res);
                        if (res.success) {
                            $('.chat-textarea').val('');
                            reloadMessages(res);
                        } else {
                            popupInfo('error', global_checking_account, localError(res.data) + ' (' + parent.accname + ')', global_close);
                        }
                        $(".loader-backdrop").hide();
                    }
                );

                swal.stopLoading();
                swal.close();
            });

    })

    $(document).on('click', '.post-sent', function () {
        swal({
            text: 'Введите ID поста',
            content: "input",
            button: {
                text: "Отправить",
                closeModal: false,
            },
        })
            .then(function (id) {
                if (!id) throw null;

                data = { type: 'media_share', params: { id: id, type: 'photo' } };


                $(".loader-backdrop").show();
                sendMessage(
                    chosedAccount.obj,
                    activeThread,
                    data,
                    function (acc, threadid, res) {
                        console.log('.post-sent', res);
                        if (res.success) {
                            $('.chat-textarea').val('');
                            reloadMessages(res);
                        } else {
                            popupInfo('error', global_checking_account, localError(res.data) + ' (' + parent.accname + ')', global_close);
                        }
                        $(".loader-backdrop").hide();
                    }
                );

                swal.stopLoading();
                swal.close();
            });
    })

    $(document).on('click', '.hashtag-sent', function () {
        swal({
            text: 'Введите хештег',
            content: "input",
            button: {
                text: "Отправить",
                closeModal: false,
            },
        })
            .then(function (hashtag) {
                if (!hashtag) throw null;

                data = { type: 'hashtag', params: hashtag };


                $(".loader-backdrop").show();
                sendMessage(
                    chosedAccount.obj,
                    activeThread,
                    data,
                    function (acc, threadid, res) {
                        console.log('.hashtag-sent', res);
                        if (res.success) {
                            $('.chat-textarea').val('');
                            reloadMessages(res);
                        } else {
                            popupInfo('error', global_checking_account, localError(res.data) + ' (' + parent.accname + ')', global_close);
                        }
                        $(".loader-backdrop").hide();
                    }
                );

                swal.stopLoading();
                swal.close();
            });
    })

    $(document).on('click', '.chat-sent', function () {

        var text = $('.chat-textarea').val();

        if (
            text.toLowerCase().indexOf('https') !== -1
            || text.toLowerCase().indexOf('http') !== -1
        ) {
            type = 'link';

            urls = text.match(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi);

            data = { type: "link", params: { url: urls[0], text: text } };
        } else {
            type = 'text';
            data = { type: type, params: text };
        }


        $(".loader-backdrop").show();
        sendMessage(
            chosedAccount.obj,
            activeThread,
            data,
            function (acc, threadid, res) {
                console.log('.chat-sent', res);
                if (res.success) {
                    $('.chat-textarea').val('');
                    reloadMessages(res);
                } else {
                    popupInfo('error', global_checking_account, localError(res.data) + ' (' + parent.accname + ')', global_close);
                }
                $(".loader-backdrop").hide();
            }
        );
    })


    $(document).on('click', '.file-sent', function () {
        var filesent = document.getElementById("gxChatModuleSidebar");
        var inputFile = document.createElement("input");
        inputFile.type = 'file';
        inputFile.id = 'upload_file';
        inputFile.accept = "image/jpeg";
        inputFile.style.visibility = 'hidden';
        inputFile.style.position = 'absolute';
        inputFile.multiple = 'false';

        filesent.appendChild(inputFile);

        inputFile.addEventListener('change', function (e) {
            readURL(inputFile);
        });

        inputFile.click();

        function readURL(input) {
            if (input.files && input.files[0]) {
                var dataUpload = new FormData();
                dataUpload.append('photo', input.files[0]);



                if (newchatOpen == 1) {
                    fileurl = host + '/direct/' + chosedAccount.obj._id + '/' + newchatName + '/photo';
                } else {
                    fileurl = host + '/direct/' + chosedAccount.obj._id + '/' + activeThread.thread_id + '/photo';
                }


                $(".loader-backdrop").show();
                $.ajax({
                    type: "POST",
                    enctype: 'multipart/form-data',
                    url: fileurl,
                    data: dataUpload,
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 600000,
                    headers: {
                        "x-access-token": token
                    },
                    success: function (respUpl) {
                        reloadMessages();
                        $(".loader-backdrop").hide();
                    },
                    error: function (e) {
                        reloadMessages();
                        $(".loader-backdrop").hide();
                    }
                });
            }
        }
    });


    $(document).on('click', '.like-sent', function () {

        $(".loader-backdrop").show();
        sendMessage(
            chosedAccount.obj,
            activeThread,
            { type: 'like' },
            function (acc, threadid, res) {

                console.log('.like-sent', res);
                if (res.success) {
                    $('.chat-textarea').val('');
                    reloadMessages(res);
                } else {
                    popupInfo('error', global_checking_account, localError(res.data) + ' (' + parent.accname + ')', global_close);
                }
                $(".loader-backdrop").hide();
            }
        )
    });
}
