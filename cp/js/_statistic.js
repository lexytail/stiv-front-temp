this.statistic = function(){
    setActiveMenu('statistic');
    clearBlock();
    var mainDiv = document.createElement("div");
    mainDiv.className = "wrap_block";

    var title = document.createElement("div");
        title.className = 'fil_title';

        title.info = document.createElement("div");
        title.info.innerHTML = global_statistic;
        title.info.className = 'fil_title_text';
        title.appendChild(title.info);

        mainDiv.appendChild(title);

    var div = document.getElementById("content");
    div.innerHTML = '';
    var chartContainer = document.createElement("div");
    chartContainer.id = 'chartContainer';
    var chartdiv = document.createElement("canvas");
    chartdiv.id = 'chart';
    chartContainer.appendChild(chartdiv);
    mainDiv.appendChild(chartContainer);

    div.appendChild(mainDiv);
    var accList = mainDiv.appendChild(createList());

    if(accountsArr.length != 0){
        fillAccountsList();
    }else{
        getAccountList(fillAccountsList);
    }
    function fillAccountsList(resp){
        for(var i in accountsArr){
            accList.table.addTr(host+'/account/'+accountsArr[i]._id+'/avatar/?token='+token, accountsArr[i].challenge, accountsArr[i].id, accountsArr[i].followers, accountsArr[i].followings, accountsArr[i]._id);
        }
    }
    function createList(){
        var accList = document.createElement("div");
        accList.className = "accList";
        accList.style['max-width'] = '100%';
        var table = accList.appendChild(createTable());
        accList.table = table;
        return accList;
    }
    function setStatus(status, stattr){
        if(status == false){
            stattr.innerHTML = 'OK';
            stattr.style.color = '#24bf2a';
        }else if(typeof status == 'object'){
            stattr.innerHTML = 'BLOCK';
            stattr.style.color = '#d2bf30';
        }else{
            stattr.innerHTML = 'BAN';
            stattr.style.color = '#e80e0e';
        }
    }
    function createTable(){
        var table = document.createElement('table');
        var tableCount = 1;
        table.className = 'accList_table'
        var titletr = table.appendChild(document.createElement('tr'));
        titletr.className = 'title';
        titletr.appendChild(createTd(global_table_num));
        titletr.appendChild(createTd(global_table_ava));
        titletr.appendChild(createTd(global_table_status));
        titletr.appendChild(createTd(global_table_account));
        titletr.appendChild(createTd(global_table_followers));
        titletr.appendChild(createTd(global_table_followings));
        titletr.appendChild(createTd(global_table_actions));
        table.addTr = addTr;

        function addTr(ava, status, account, followers, followings, _id){
            var tr = document.createElement('tr');
            tr.id = _id;

            //tr.appendChild(createTd(tableCount));
            var noavatar = document.createElement('div');
            noavatar.className = 'avatar';
            noavatar.style.background = 'url("./img/noavatar.png") 0% 0% / 48px';
            var avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.style.background = 'url("'+ava+'") 0% 0% / 48px';
            noavatar.appendChild(avatar);
            var avatd = document.createElement('td');
            avatd.appendChild(noavatar);
            tr.appendChild(avatd);
            var stattr = tr.appendChild(createTd(''));
            tr.stattr = stattr;
            setStatus(status, stattr);
            tr.appendChild(createTd(account));
            tr.appendChild(createTd(followers));
            tr.appendChild(createTd(followings));

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
            actions.accname = account;
            actions.addEventListener('mouseover', actionsMenu);
            var actionstd = document.createElement('td');
            actionstd.appendChild(actions);

            tr.appendChild(actionstd);
            
            tableCount++;

            table.appendChild(tr);
        }
        return table;
    }
    function createTd(text){
        var td = document.createElement('td');
        td.innerHTML = text;
        return td;
    }
    loadData();
    function loadData(){
        ajax('user/statistic', {}, 'get', function(res){
            if(res.success){
                drawNew(res.data.data);
            }
        });
    }
    function drawNew(_data){
        var optionsDate = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
        var lables = [];
        var data1 = [];
        var data2 = [];
        for(var i in _data){
            lables.push(new Date(_data[i].timestamp).toLocaleString("ru", optionsDate));
            data1.push(_data[i].followers);
            data2.push(_data[i].followings);
        }
        var ctx = document.getElementById("chart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: lables,
                datasets: [{
                    label: 'Подписчиков',
                    data: data1,
                    backgroundColor: 'rgba(151, 210, 255, 0.2)',
                    borderColor: 'rgba(151, 210, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Подписок',
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