this.accountList = function () {
    $(document).ready(function () {
        /*
        $('.gx-main-content').css('height', 'auto');
        $('body').css('height', 'auto');
        $('html').css('height', 'auto');
        $('body').css('overflow', 'auto');
        */
        $('.accList').css('width', 'auto');
    })
    var accountObject = null;
    setActiveMenu('account_list');
    clearBlock();
    var mainDiv = document.createElement("div");
    mainDiv.className = "wrap_block";
    //$('.topHelpBut').html('<a class="butHelp" href="https://www.youtube.com/watch?v=8cmDdik3Fww" target="_blank"><div class="blueButton">Обучение</div></a>');

    $('#LVideo').show();
    $('#LVideo').attr('href', 'https://www.youtube.com/watch?v=8cmDdik3Fww');


    var title = document.createElement("div");
    title.className = 'fil_title';

    title.info = document.createElement("div");
    title.info.innerHTML = global_accountListTitle;
    title.info.className = 'fil_title_text';
    title.appendChild(title.info);

    mainDiv.appendChild(title);

    var chartContainer = document.createElement("div");
    chartContainer.id = 'chartContainer';
    var chart = document.createElement("canvas");
    chart.id = 'chart';
    chartContainer.appendChild(chart);
    mainDiv.appendChild(chartContainer);
    var accList = mainDiv.appendChild(createList());
    var div = document.getElementById("content");
    div.innerHTML = '';
    div.appendChild(mainDiv);
    //var load = div.appendChild(loadAnim);
    if (accountsArr.length != 0) {
        fillAccountsList();
    } else {
        getAccountList(fillAccountsList);
    }
    function fillAccountsList(resp) {
        for (var i in accountsArr) {
            accList.table.addTr(accountsArr[i].challenge, accountsArr[i], accountsArr[i].followers, accountsArr[i].followings, accountsArr[i]._id);
        }
    }
    function createList() {
        var accList = document.createElement("div");
        accList.className = "accList";

        var table = accList.appendChild(createTable());
        accList.table = table;
        return accList;
    }

    function createTable() {
        var table = document.createElement('table');
        var tableCount = 1;
        table.className = 'accList_table responsive'
        var titletr = table.appendChild(document.createElement('tr'));
        titletr.className = 'title';
        titletr.appendChild(createTd(global_table_num));
        titletr.appendChild(createTd(global_table_ava));
        titletr.appendChild(createTd(global_table_status));
        titletr.appendChild(createTd(global_table_account));
        titletr.appendChild(createTd(global_table_followers));
        titletr.appendChild(createTd(global_table_followings));
        titletr.appendChild(createTd('Подписки'));
        titletr.appendChild(createTd('Лайки'));
        titletr.appendChild(createTd('Прирост'));
        titletr.appendChild(createTd(global_table_actions));
        table.addTr = addTr;

        function addTr(status, account, followers, followings, _id) {
            var tr = document.createElement('tr');
            tr.id = _id;
            tr.addEventListener("click", openStatGraph);
            //tr.appendChild(createTd(tableCount));
            var noavatar = document.createElement('div');
            noavatar.className = 'avatar';
            noavatar.style.background = 'url("./img/noavatar.png") 0% 0% / 48px';
            var avatar = document.createElement('div');
            avatar.className = 'avatar';

            ajax('account/' + _id + '/avatar', { token: token }, 'GET', function (res) {
                if (res.success) {
                    avatar.style.background = "url(data:" + res.data.mimetype + ";base64," + res.data.img + ")  50% 50% / 100% no-repeat";
                    noavatar.appendChild(avatar);
                }
            });
            var avatd = document.createElement('td');
            avatd.appendChild(noavatar);
            tr.appendChild(avatd);
            var stattr = tr.appendChild(createTd(''));
            tr.stattr = stattr;
            setStatus(status, stattr, account.connectionError, account.enabled);
            tr.appendChild(createTd(account.id));
            tr.appendChild(createTd(followers));
            tr.appendChild(createTd(followings));
            tr.appendChild(createTd(account.promotion.mf.current + "/" + account.promotion.mf.maximum));
            tr.appendChild(createTd(account.promotion.ml.current + "/" + account.promotion.ml.maximum));
            if (account.statistics && account.statistics.midnight && account.statistics.day)
                tr.appendChild(createTd(account.statistics.midnight.followers + " " + ((account.statistics.day.followers >= 0) ? ("<span style='color:#00ff00'>(+" + account.statistics.day.followers) : ("<span style='color:#ff0000'>(-" + account.statistics.day.followers)) + ")</span>"));
            else
                tr.appendChild(createTd("-"));
            var actions = document.createElement('div');
            actions.className = 'actions_button';
            var icon = document.createElement('div');
            icon.className = 'icon';
            var actions_title = document.createElement('div');
            actions_title.className = 'title';
            actions_title.innerHTML = global_table_actions;
            actions.appendChild(icon);
            actions.appendChild(actions_title);
            actions._id = _id;
            actions.accname = account.id;
            actions.addEventListener('mouseover', actionsMenu);
            var actionstd = document.createElement('td');
            actionstd.appendChild(actions);

            tr.appendChild(actionstd);

            tableCount++;

            table.appendChild(tr);
        }
        return table;
    }
    function createTd(text) {
        var td = document.createElement('td');
        td.innerHTML = text;
        return td;
    }
    function openStatGraph(e) {
        if (e.target.className == 'actions_button active')
            return;
        if (e.target.className == 'icon')
            return;
        var parent = e.currentTarget;
        var _id = e.currentTarget.id;
        var x = e.clientX - 250;
        ajax('account/' + _id + '/statistic', {}, 'get', function (res) {
            if (res.success) {
                drawNew(res.data.data, createContainer().canvas);
            }
        });
        function createContainer() {
            var container = document.createElement('div');
            var canvas = document.createElement('canvas');
            container.canvas = canvas;
            container.appendChild(canvas);
            container.className = 'chart_up c_arrow_up';

            setTimeout(function () {
                document.body.addEventListener('click', closeGraph);
            }, 20);
            function closeGraph(e) {
                document.body.removeEventListener('click', closeGraph);
                close();
            }
            function close() {
                container.style.transform = 'scale(0.5)';
                container.style.opacity = '0';
                setTimeout(function () {
                    document.body.removeChild(container);
                }, 350);
            }
            if (window.innerWidth < x + 500)
                x = window.innerWidth - 520;

            if (x < 0)
                x = 0;

            container.style.left = x + 'px';//((window.innerWidth/2)-250)+'px';

            document.body.appendChild(container);


            //            var top = getOffset(parent).top + parent.offsetHeight;
            var windowpageYOffset = parseInt($('.gx-main-container .ps__rail-y').css('top'));
            var top = getOffset(parent).top - windowpageYOffset + parent.offsetHeight;

            if (
                (
                    //window.pageYOffset - 
                    top
                    /*                    - 
                                        windowpageYOffset - 
                                        parent.offsetHeight */
                    +
                    container.offsetHeight
                )
                >
                window.innerHeight
            ) {
                top = getOffset(parent).top - container.offsetHeight - windowpageYOffset;
                container.className = 'chart_up c_arrow_down';
            }

            container.style.top = top + 'px';
            setTimeout(function () {
                container.style.transform = 'scale(1)';
                container.style.opacity = '1';
            }, 15);
            return container;
        }
    }
    loadData();
    function loadData() {
        ajax('user/statistic', {}, 'get', function (res) {
            if (res.success) {
                drawNew(res.data.data, document.getElementById("chart"));
            }
        });
    }
    function drawNew(_data, container) {
        var optionsDate = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
        _data.reverse();
        var lables = [];
        var data1 = [];
        var data2 = [];
        for (var i in _data) {
            lables.push(new Date(_data[i].timestamp).toLocaleString("ru", optionsDate));
            data1.push(_data[i].followers);
            data2.push(_data[i].followings);
        }
        var ctx = container.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: lables,
                datasets: [{
                    label: global_table_followers,
                    data: data1,
                    backgroundColor: 'rgba(151, 210, 255, 0.2)',
                    borderColor: 'rgba(151, 210, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: global_table_followings,
                    data: data2,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'index',
                    intersect: false
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                    line: {
                        tension: 0,
                    }
                },
                maintainAspectRatio: false
            }
        });
    }
}
function setStatus(status, stattr, connerr, enabled = false) {
    if (status == false && !connerr) {
        stattr.innerHTML = 'OK';
        stattr.style.color = '#24bf2a';
    } else if (typeof status == 'object') {
        stattr.innerHTML = 'BLOCK';
        stattr.style.color = '#d2bf30';
    } else if (connerr) {
        stattr.innerHTML = 'PROXY ERROR';
        stattr.style.color = '#917bf1';
    } else {
        stattr.innerHTML = 'BAN';
        stattr.style.color = '#e80e0e';
    }
    if (!enabled) {
        stattr.innerHTML = 'OFF';
        stattr.style.color = '#e80e0e';
    }
}
var oldMenu = null;
function actionsMenu(e) {
    var parent = e.currentTarget;
    var closeTimeout;

    var _id = parent._id;
    if (!parent.container) {
        if (oldMenu)
            fastClose();
        parent.className = 'actions_button active';
        var container = document.createElement('div');
        container.className = 'action_menu';
        var bEdit = createButton(global_settings);
        bEdit.addEventListener('click', function () {
            oldMenu = container;
            fastClose();
            openPageByName('account_settings', true, false, { accounts: null, openacc: _id });
        });
        var bFilling = createButton(global_filling);
        bFilling.addEventListener('click', function () {
            oldMenu = container;
            fastClose();
            openPageByName('filling_settings', true, false, { accounts: null, openacc: _id });
        });
        var bPromotion = createButton(global_promotion);
        bPromotion.addEventListener('click', function () {
            oldMenu = container;
            fastClose();
            openPageByName('promotionAccount', true, false, { accounts: null, openacc: _id });
        });
        var bTest = createButton(global_test);
        bTest.addEventListener('click', function () {
            popupInfo('ok', global_checking_account, global_checking_account_wait + ' ' + parent.accname, global_close);
            ajax('account/' + _id + '/relogin', {}, 'post', function (resp) {
                if (resp.data.success) {
                    if (resp.data.account) {
                        updateAccount(resp.data.account);
                        var tr = document.getElementById(resp.data.account._id);
                        if (tr)
                            if (tr.stattr)
                                setStatus(resp.data.account.challenge, tr.stattr, resp.data.account.connectionError, resp.data.account.enabled);
                    }
                    popupInfo('ok', global_checking_account, global_checking_account_ok + ' (' + parent.accname + ')', global_close);
                } else {
                    popupInfo('error', global_checking_account, localError(resp.data) + ' (' + parent.accname + ')', global_close);
                }
            });
        });
        var bBrowser = createButton(global_open_in_browser);
        bBrowser.addEventListener('click', function (e) {
            window.open('https://instagram.com/' + parent.accname);
        });
        var bLogs = createButton(global_logs);
        bLogs.addEventListener('click', function (e) {
            ajax('account/' + _id + '/logs', {}, 'get', function (res) {
                if (res.success)
                    createLogsWindow(parent.accname, _id, res.data);
            });
        });
        var bDelete = createButton(global_Delete);
        bDelete.addEventListener('click', function () {
            popupInfo('question', global_account_detele, global_account_detele_full + ' "' + parent.accname + '"?', global_delete, global_close, function () {
                ajax('account/' + _id, {}, 'delete', function (resp) {
                    if (resp.data.success) {
                        popupInfo('ok', global_account_detele, global_account_detele_full_ok, global_close);
                        parent.parentElement.parentElement.parentElement.removeChild(parent.parentElement.parentElement);
                        for (var i in accountsArr) {
                            if (accountsArr[i]._id == _id) {
                                accountsArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                });
            });
        });

        sizes = window.screen;

        container.style.left = (getOffset(parent).left + 115 + 145) + 'px';

        container.style.left = (getOffset(parent).left - 135) + 'px';

        if (document.documentElement.clientWidth < getOffset(parent).left - 150)
            container.style.left = (document.documentElement.clientWidth - 250) + 'px';

        var windowpageYOffset = parseInt($('.gx-main-container .ps__rail-y').css('top'));
        var top = getOffset(parent).top - windowpageYOffset;

        document.body.appendChild(container);

        if (getOffset(parent).top - windowpageYOffset + container.offsetHeight > window.innerHeight) {
            top = window.innerHeight - container.offsetHeight;
        }

        container.style.top = top + 'px';

        parent.addEventListener('mouseout', startClose);
        parent.addEventListener('mouseover', cancelClose);

        container.addEventListener('mouseover', cancelClose);
        container.addEventListener('mouseout', startClose);
        parent.container = container;
        oldMenu = container;
        setTimeout(function () {
            parent.container.style.transform = 'scale(1)';
            parent.container.style.opacity = '1';
        }, 15);
    }
    var animTimeout = null;
    function createButton(_title) {
        var but = document.createElement('div');
        but.className = 'button';
        var title = document.createElement('div');
        title.innerHTML = _title;
        but.appendChild(title)
        container.appendChild(but);
        return but;
    }
    function cancelClose() {
        parent.className = 'actions_button active';
        clearTimeout(closeTimeout);
        clearTimeout(animTimeout);
        parent.container.style.transform = 'scale(1)';
        parent.container.style.opacity = '1';
    }
    function startClose() {
        parent.className = 'actions_button';
        closeTimeout = setTimeout(close, 500);
        /*parent.container.style.width = '0px';
        parent.container.style.height = '0px';*/
        clearTimeout(animTimeout);
        animTimeout = setTimeout(function () {
            parent.container.style.transform = 'scale(0.5)';
            parent.container.style.opacity = '0';
        }, 350);
    }
    function fastClose() {
        oldMenu.style.transform = 'scale(0.5)';
        oldMenu.style.opacity = '0';
        oldMenu.removeEventListener('mouseover', cancelClose);
    }
    function close() {
        clearTimeout(closeTimeout);
        parent.removeEventListener('mouseout', startClose);
        parent.removeEventListener('mouseover', cancelClose);
        container.removeEventListener('mouseover', cancelClose);
        container.removeEventListener('mouseout', startClose);
        document.body.removeChild(container);
        parent.container = null;
        if (oldMenu != container)
            oldMenu = null;
    }
    var openLogs = false;
    function createLogsWindow(accname, _id, logsList) {
        if (openLogs)
            return;
        openLogs = true;
        var overlay = document.getElementById("overlay3");
        overlay.style.display = 'table';
        var logWindow = document.createElement('div');
        logWindow.className = 'log_window';
        var midPos = document.createElement("div");
        midPos.style.display = 'table-cell';
        midPos.style['vertical-align'] = 'middle';

        var title = document.createElement('div');
        title.className = 'title';
        var titleText = document.createElement('div');
        titleText.className = 'fil_title_text';
        titleText.innerHTML = global_account_logs + ' <b>' + accname + '</b>';
        title.appendChild(titleText);
        logWindow.appendChild(title);
        var container = document.createElement('div');
        container.className = 'log_container';
        var choseFileContainer = document.createElement('div');
        choseFileContainer.className = 'choseFileContainer';//    padding: 20px;
        var choseFileTitle = document.createElement('div');
        choseFileTitle.innerHTML = global_chose_log_file;

        choseFileContainer.appendChild(choseFileTitle);
        var combobox = document.createElement('select');
        var option = document.createElement('option');
        option.innerHTML = global_chose;
        combobox.appendChild(option);
        for (var i in logsList.logs) {
            var option = document.createElement('option');
            option.innerHTML = logsList.logs[i].date;
            option.value = logsList.logs[i]._id;
            combobox.appendChild(option);
        }
        choseFileContainer.appendChild(combobox);
        container.appendChild(choseFileContainer);
        var textfield = document.createElement('div');
        textfield.className = 'textfield';
        container.appendChild(textfield);
        combobox.addEventListener("change", function (e) {
            ajax('log/' + e.currentTarget.value, {}, 'get', function (res) {
                textfield.innerHTML = (res.data.log).replaceAll('\r\n', '<br/>');
            });
        });
        var butcancel = document.createElement("div");
        butcancel.className = 'blueButton';
        butcancel.innerHTML = global_close;
        butcancel.addEventListener('click', function (e) {
            midPos.removeChild(logWindow);
            overlay.style.opacity = '0';
            overlay.style.display = 'none';
            openLogs = false;
        });
        container.appendChild(butcancel)
        logWindow.appendChild(container);
        midPos.appendChild(logWindow);
        overlay.appendChild(midPos);

        setTimeout(function () {
            overlay.style.opacity = '1';
            logWindow.style.transform = 'scale(1)';

        }, 20);
    }
}