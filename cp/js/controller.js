var host = 'https://api.insaev.ru';
if(window.location.host == "teststiv.insaev.ru")
    host = 'https://testapi.insaev.ru';
document.addEventListener("DOMContentLoaded", ready);

$(document).ready(function(){
    $(document).on('click','.menuLink',function(e) {
        
        e.preventDefault();
        e.stopPropagation();

        $('.menu.open').removeClass('open');
        $('.sub-menu .active').removeClass('active');
        $('.menu.selected').removeClass('selected');

        if($(this).attr('target') == '_blank') {
            window.open($(this).attr('href'), '_blank');
            return false;
        }

        if($(this).parent().find('.sub-menu li').length > 0) {
            $(this).parent().addClass('open');
            return false;
        }

        openPageByName($(this).parent().attr('rel'));
        if(typeof drawers.states._menu_toggle !== 'undefined') 
            drawers.states._menu_toggle.bigSlideAPI.view.toggleClose();
         return false;
    })
});


var loadAnim = document.createElement("div");
loadAnim.id = 'loadanim';
loadAnim.style.cssText='background: url(./img/load.svg); width:32px; height:32px; position: absolute; top: 50%; left: 50%; z-index:100; background-size: cover;';
var token = "";
var regEnable = false;
var user;
var tariff;
//var user_balance = 0;
//var endSubscriptionSeconds = 0;
var user_name = "";
var user_email = "";
var pages = new Array();
var noSave = false;
var accountsArr = new Array();
var apiKeys = new Object();
window.onpopstate = function(event) {
//    console.log(event.state);
    openPageByName(event.state.page, false);
};
var dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

function dn(number, type) {
  var verbs = [];
  verbs['day'] = ['день', 'дня', 'дней'];
  verbs['hour'] = ['час', 'часа', 'часов'];
  verbs['minute'] = ['минута', 'минуты', 'минут'];

  verbs['left'] = ['Остался', 'Осталось', 'Осталось'];
  verbs['left2'] = ['Осталась', 'Осталось', 'Осталось'];

  console.log(type, verbs[type]);

  var number = number;
  var b = number%10; var a = (number%100-b)/10; 
  if(a==0 || a>=2) {
    if(b==0 || (b>4 && b<=9)) {
        return verbs[type][2];
    } 
    else {
        if(b!=1) {
            return verbs[type][1];
        } 
        else {
            return verbs[type][0];
        }
    }
  }
  else {
    return verbs[type][2];
    }
}

function ready(){
    /*страницы*/
    pages[0] = {state:{page:'add_account'},page:'add_account', title:global_addAccount, func:addAccount};
    pages[1] = {state:{page:'account_list'},page:'account_list', title:global_accountList, func:accountList};
    pages[2] = {state:{page:'filling_settings'},page:'filling_settings', title:global_settings, func:fillingSettings};
    pages[3] = {state:{page:'profileSettings'},page:'profileSettings', title:global_profile_settings, func:profileSettingsNew};
    pages[4] = {state:{page:'promotionAccount'},page:'promotionAccount', title:global_promotion_settings, func:promotionAccount};
    pages[5] = {state:{page:'unblock'},page:'unblock', title:global_unblock, func:unblock};
    pages[6] = {state:{page:'postsFeed'},page:'postsFeed', title:global_feed_posts, func:postsFeed};
    pages[7] = {state:{page:'statistic'},page:'statistic', title:global_statistic, func:statistic};
    pages[8] = {state:{page:'account_settings'},page:'account_settings', title:global_account_settings, func:accountSettings};
    pages[9] = {state:{page:'payment_fail'},page:'payment_fail', title:global_payment_status, func:paymentFail};
    pages[10] = {state:{page:'payment_success'},page:'payment_success', title:global_payment_status, func:paymentSuccess};
    pages[11] = {state:{page:'posting'},page:'posting', title:global_posting, func:posting};
    pages[12] = {state:{page:'activate'},page:'activate', title:global_activate, func:activate};
    pages[13] = {state:{page:'proxySale'},page:'proxySale', title:global_proxy_sale_title, func:proxysale};
    pages[14] = {state:{page:'buyAccounts'},page:'buyAccounts', title:global_proxy_sale_title, func:buyaccounts};
    pages[15] = {state:{page:'faq'},page:'faq', title:'FAQ', func:faqopen};
    pages[16] = {state:{page:'recommend'},page:'recommend', title:'Рекомендации', func:recommendOpen};
    pages[17] = {state:{page:'reset'},page:'reset', title:global_pass_reset, func:reset};
    pages[18] = {state:{page:'referal'},page:'referal', title:global_referal_system, func:referal};
    pages[19] = {state:{page:'errors'},page:'errors', title:'Расшифровка логов', func:errorsPage};
    pages[20] = {state:{page:'profileSettingsNew'},page:'profileSettingsNew', title:global_profile_settings, func:profileSettingsNew};
    pages[21] = {state:{page:'direct'},page:'direct', title:global_direct, func:direct};

    if(getParameterByName('ref')){
        setCookie('ref', getParameterByName('ref'));
        window.location = 'http://'+window.location.host;
    }

    if(getCookie("_auth_token")) {
        token = getCookie("_auth_token");
        checkAutorize();
    } else {
        if(getParameterByName('page') == 'activate' || getParameterByName('page') == 'reset'){
            openPageByName(getParameterByName('page'), true, true);
        } else {
            loginWidget();
        }
    }
}
Number.prototype.between = function(a, b) {
    var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
    return this >= min && this <= max;
};
function updateAccount(newAccount){
    for(var i in accountsArr){
        if(accountsArr[i]._id == newAccount._id){
            accountsArr[i] = newAccount;
            return;
        }
    }
    accountsArr.push(newAccount);
}
function getOffset(el) {
    var _x = 0;
    var _y = 0;
//    console.log(el.offsetTop);
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft;
        _y += el.offsetTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
function getAccountList(cb){
    ajax('account', {}, 'get', function(resp){
        if(!resp.data.accounts){
//            console.log('!resp.accounts', resp);
            if(cb)
                cb(false);
            return;
        }

        accountsArr = resp.data.accounts;
        if(cb)
            cb(accountsArr);
    });
}
function localError(obj){
    console.log('localError',obj);
    if(!obj || !obj.code){
        console.log('err 1');
        return global_error;
    }
    if(global_errors[obj.code]){
        console.log('err 2');
        if(global_errors[obj.code].full)
            return global_errors[obj.code].message+" "+obj.message;
        else
            return global_errors[obj.code].message
    }
    if(obj.message){
        console.log('err 3');
        return obj.message
    }
    console.log('err 4');
    return global_error;
}
function popupInfo(type, title, text, butOkText, butCancelText, funcOk, funcCancel){ //type = ok, question, error
    document.getElementById("overlay2").style.display = 'table';
    var popup = document.getElementById("popup_info");
    popup.style.display = 'table';
    setTimeout(function(){
        popup.opened = true;
        document.getElementById("overlay2").style.opacity = '1';
        popup.style.transform = 'scale(1)';
    }, 20);
    switch(type){
        case 'ok':
            popup.className = 'ok';
            document.getElementById("popup_butcancel").style.display = 'none';
        break;
        case 'question':
            popup.className = 'question';
            document.getElementById("popup_butcancel").style.display = 'block';
            document.getElementById("popup_butcancel").addEventListener("click", butCancel);
            if(butCancelText)
                document.getElementById("popup_butcancel").innerHTML = butCancelText;
        break;
        case 'error':
            popup.className = 'error';
            document.getElementById("popup_butcancel").style.display = 'none';
        break;
    }
    document.getElementById("popup_title").innerHTML = title;
    document.getElementById("popup_text").innerHTML = text;
    if(butOkText)
        document.getElementById("popup_butok").innerHTML = butOkText;
    document.getElementById("popup_butok").addEventListener("click", butOk);
    function butOk(_ev){
        if(funcOk)
            funcOk();
        close();
    }
    function butCancel(_ev){
        if(funcCancel)
            funcCancel();
        close();
    }
    function close(){
        popup.opened = false;
        document.getElementById("popup_butcancel").removeEventListener("click", butCancel);
        document.getElementById("popup_butok").removeEventListener("click", butOk);
        document.getElementById("overlay2").style.opacity = '0';
        popup.style.transform = 'scale(0.5)';
        setTimeout(function(){
            if(!popup.opened){
                document.getElementById("overlay2").style.display = 'none';
                popup.style.display = 'none';
            }
        }, 400);
    }
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function tooltip(parent, text, width, textalign){
    if(!width)width='300px';
    if(!textalign)textalign='center';
    var effects = new Array();
    effects['opacity'] = {speed:0.15};
    effects['transform'] = {speed:0.3, animType:'ease-out'};
    parent.addEventListener('mouseover', opentt);
    function opentt(e){
        var tt = div(text, 'tooltip');
        tt.style['text-align'] = textalign;
        var arrow = tt.appendChild(div('','tarrow'));
        tt.style.opacity = '0';
        tt.style.transform = 'translateY(-40px)';
        tt.style.width = width;
        setCssEffect(tt, effects);

        parent.addEventListener('mouseout', closeTooltip);
        document.body.appendChild(tt);
        tt.style.left = (getOffset(parent).left-14)+'px';
        
        if(getOffset(tt).left+tt.offsetWidth>window.innerWidth){
            tt.style.left = ((getOffset(parent).left+32)-tt.offsetWidth)+'px';
            arrow.className = 'tarrow right';
        }
        var interval = setTimeout(function(){
            var top = getOffset(parent).top-tt.offsetHeight-12;//parent.offsetTop-tt.offsetHeight-12;
            tt.style.top = top+'px';
            tt.style.opacity = '1';
            tt.style.transform = 'translateY(0px)';
        }, 20);
        function closeTooltip(){
            clearInterval(interval);
            parent.removeEventListener('mouseout', closeTooltip);
            tt.style.opacity = '0';
            tt.style.transform = 'translateY(-40px)';
            setTimeout(function(){
                document.body.removeChild(tt);
            }, 500);
        }
    }
}
function cloudComment(text, left, top, width){
    if(!width)width='300px';
    var effects = new Array();
    effects['opacity'] = {speed:0.15};
    effects['transform'] = {speed:0.3, animType:'ease-out'};
    var comment = document.createElement("div");
    comment.className = 'cloud';
    comment.innerHTML = text;
    comment.style.left = left;
    comment.style.top = top;
    comment.style.width = width;
    comment.style.opacity = '0';
    comment.style.transform += 'translateY(-40px)';
    setCssEffect(comment, effects);
    setTimeout(function(){
        comment.style.opacity = '1';
        comment.style.transform = 'translateY(0px)';
        document.body.addEventListener("click", delCloud);
    }, 20);
    var timeout = setTimeout(function(){
        delCloud();
    }, 5000);
    function delCloud(){
        comment.style.opacity = '0';
        comment.style.transform = 'translateY(-40px)';
        setTimeout(function(){
             comment.parentElement.removeChild(comment);
        }, 500);
        document.body.removeEventListener("click", delCloud);
        clearTimeout(timeout);
    }
    
    return comment;
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function setNoSelect(div){
    div.style["-webkit-user-select"] = "none";
    div.style["-khtml-user-select"] = "none";
    div.style["-moz-user-select"] = "none";
    div.style["-ms-user-select"] = "none";
    div.style["-o-user-select"] = "none";
    div.style["user-select"] = "none";
}
function removeNoSelect(div){
    div.style["-webkit-user-select"] = "auto";
    div.style["-khtml-user-select"] = "auto";
    div.style["-moz-user-select"] = "auto";
    div.style["-ms-user-select"] = "auto";
    div.style["-o-user-select"] = "auto";
    div.style["user-select"] = "auto";
}
function updateProfileAvatars(){
    var avatars = getClass('user-avatar');
    ajax("user/avatar", {token:token}, 'GET', function(res){
//        console.log(res);
        if(res.success){
            for(var i in avatars)
                if(typeof avatars[i] == 'object')
                    avatars[i].style.background = "url(data:"+res.data.mimetype+";base64,"+res.data.img+") 50% 50% / 100% no-repeat";
        }
    });
}
function testFloat(str){
    return str.replace(/\.(?=.*\.)|[^\d\.-]/g, '');
}
function createSvgIcons(){
    var svgContainer = document.createElement("div");
    var svgIcons = document.createElement("svg");
    svgIcons.style.display = 'none';
    svgIcons.id = "svg-container";
    svgContainer.appendChild(svgIcons);
    document.body.appendChild(svgContainer);

    $(function(){
        $('#svg-container').load('./img/svgIcons.svg?40');
    });
}
function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}
function getSubscriptionTime(){
    if(user.secondsUntilSubscriptionEnded<0)
        user.secondsUntilSubscriptionEnded = 0;
    
    var endSubscriptionSeconds = user.secondsUntilSubscriptionEnded;
    var days = Math.floor(endSubscriptionSeconds/60/60/24);
    console.log(days);


    if(days > 0){
        return dn(days, 'left') + ' <span>' + days + ' ' + dn(days, 'day') + '</span>';
    }else if(endSubscriptionSeconds/60/60 >= 1){
        hours = Math.floor(endSubscriptionSeconds/60/60);
        return dn(hours, 'left') + ' <span>' + hours +' '+ dn(hours, 'hour') + '</span>';
    }else if(endSubscriptionSeconds > 0){
        minutes = Math.floor(endSubscriptionSeconds/60);
        return dn(minutes, 'left2') + ' <span>' + minutes +' '+ dn(minutes, 'minute') + '</span>'; 
    }else if(endSubscriptionSeconds == 0){
        return '';
    }
}
function checkAutorize(fromLogin){
    ajax('user', {}, 'get', function(resp){
        if(resp.success){
            //user_balance = Number(resp.data.user.balance);
            //endSubscriptionSeconds = Number(resp.data.user.secondsUntilSubscriptionEnded);
            user_email = resp.data.user.email;
            apiKeys = resp.data.user.apiKeys;
            user = resp.data.user;
            tariff = resp.data.tariff
            /*var addacc = document.createElement('script');
            addacc.type='text/javascript';
            addacc.src='./js/addacc.js?'+new Date().getTime();
            document.head.appendChild(addacc);
            return;*/
            //getAccountList();
            mainClass(fromLogin);
            if(!getParameterByName("page"))
                openPageByName('add_account', true, true);
            else
                openPageByName(getParameterByName("page"), true, true);
        }else{
            //setCookie("_auth_token", "");
            accountsArr = new Array();
            loginClass();
        }
    });
}

function declension(digit,expr) {
    var num = digit;
    digit = digit + '';
    var res = '';
    
    var expr_list = expr.split('|');
    
    var reg = /[^0-9]+/
    var i = digit.replace(reg, '');

    digit = '';
    
    if(i>=5 && i<=20) res = digit + ' ' + expr_list[2];

    else {
        i %= 10;
        if(i==1) res = digit + ' ' + expr_list[0];
        else if(i>=2 && i<=4) res = digit + ' ' + expr_list[1];
        else  res = digit + ' ' + expr_list[2];
    }

    return '<span>'+num+'</span> '+res;     
}
function counterLines(textarea, counterField, maxLines){
    var _textarea = textarea;
    var _counterField = counterField;
    var _maxLines = maxLines;
    _textarea.removeEventListener('input', onchangeCount);
    _textarea.addEventListener('input', onchangeCount);
    onchangeCount();
    function onchangeCount(){
        if(!_textarea || !_counterField){
            clearInterval(interval);
            console.log('clear counterLines');
        }
        if(_textarea.value.split('\n').length > maxLines){
            var str = '';
            for(var i = 0; i < maxLines-1; i++){
                str += _textarea.value.split('\n')[i]+'\n';
            }
            str += _textarea.value.split('\n')[maxLines-1];
            _textarea.value = str;
        }
        _counterField.innerHTML = '['+((_textarea.value.split('\n').length==1)?((_textarea.value.split('\n')[0]=='')?'0':'1'):_textarea.value.split('\n').length)+'/25]';
    }
    return onchangeCount;
}
function openPageByName(pageName, history, replace, params){
    if(history===undefined)history=true;
    if(replace===undefined)replace=true;
    console.log("load page", pageName);
    const container = document.querySelector('#wrap');
    container.scrollTop = 0;
    for(var i in pages){
        if(pages[i].page == pageName){
            if(noSave){
                popupInfo('question', global_warning, global_no_save_data, global_continue, global_close, function(){
                    noSave = false;
                    openPageByName(pageName, history, replace, params);
                });
                return;
            }
            var url = window.location.href;
            if(history){
                if(!replace)
                    window.history.pushState(pages[i].state, pages[i].page, '?page='+pages[i].page);
                else{
                    if(pages[i].page == 'errors')
                        window.history.replaceState(pages[i].state, pages[i].page, '?page='+pages[i].page+window.location.hash);
                    else
                        window.history.replaceState(pages[i].state, pages[i].page, '?page='+pages[i].page);
                }
            }

            $('#LVideo').hide();
            
            if(params)
                pages[i].func(params);
            else
                pages[i].func(url);
            
           document.title = pages[i].title;
        }
    }
}
function checkURL(textval) {
    return true;
    var urlregex = /^([a-zA-Z0-9.-_]+(:[a-zA-Z0-9.&%$-_]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    if(!urlregex.test(textval)){
        urlregex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;
        return urlregex.test(textval);
    }
    return true;
}
function switchButton(enabled, cb, big){
    var cont = document.createElement("div");
    setNoSelect(cont);
    if(big)
        cont.className = 'switch big';
    else
        cont.className = 'switch';
    var text = document.createElement("div");
    text.innerHTML = global_switch_on;
    text.className = 'info';
    cont.appendChild(text);
    var circle = document.createElement("div");
    circle.className = 'circle';
    cont.appendChild(circle);
    cont.enabled = true;
    if(!enabled)
        onSwitch();
    cont.setPos = function(on){
        if(on && !cont.enabled){
            onSwitch();
        }
        if(!on && cont.enabled){
            onSwitch();
        }
    }
    cont.addEventListener("mousedown", onSwitch);
    function onSwitch(e){
        if(cont.enabled){
            if(big)
                cont.className = 'switch big disabled';
            else
                cont.className = 'switch disabled';
            cont.enabled = false;
            text.innerHTML = global_switch_off;
            cb(false);
            return;
        }
        if(big)
            cont.className = 'switch big';
        else
            cont.className = 'switch';
        text.innerHTML = global_switch_on;
        cont.enabled = true;
        cb(true);
    }
    return cont;
}
function dublicat(b, c) {
    for (var d = [], e = {},a = 0; a < b.length; a++) e[b[a]]? e[b[a]]++:e[b[a]]=1 ;
    for (a = 0; a < c.length; a++) e[c[a]] && d.push(c[a]) && e[c[a]]--;
    return d.length == b.length && c.length == b.length
};
function ajax(type, data, method, cb){
     $.ajax({
            url: host+'/'+type,
            type: method,
            data: data,
            headers: {
                "x-access-token": token
            },
            dataType: 'json',
            success: function (resp) {
                var obj = new Object();
                obj.success = true;
                obj.data = resp;
                if(resp.token){
                    console.log('refresh token');
                    setCookie("_auth_token", resp.token);
                }
                cb(obj);
            },
            error: function (jqXHR, exception) {
                console.log('error,',type, jqXHR, exception);
                var obj = new Object();
                obj.success = false;
                obj.exception = exception;
                try{
                    obj.data = JSON.parse(jqXHR.responseText);
                }catch(e){
                    obj.data = jqXHR.responseText;
                }
                cb(obj);
            },
        });
}
function loginWidget(force){
    loginWidgetInit(force);
}
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options) {
  options = options || {};
  options.path = '/';
  options.domain = 'insaev.ru';
  var expires = 5184000;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  options.secure = "true";
  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  console.log('cookie:', updatedCookie);
  document.cookie = updatedCookie;
}
var animarr = new Array("-webkit-transition", "-moz-transition", "-o-transition", "transition");
function setCssEffect(div, effects){
    var style = "";
    for(var i in effects){
        style += createEffect(i, effects[i])+",";
    }
    style = style.substring(0, style.length-1);
    for(var j in animarr){
        div.style.cssText += animarr[j] + ": " + style + ";"; 
    }
    function createEffect(type, data){
        if(!data.animType)
            data.animType = "linear"//"ease-out";
        return (type+" "+data.speed+"s "+data.animType);
    }
}

function removeCssEffect(div, effects){
    for(var i in animarr){
        div.style[animarr[i]] = null;
    }
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function div(inner, classname){
    var elem = document.createElement('div');
    if(inner)
        elem.innerHTML = inner;
    if(classname)
        elem.className = classname;
    return elem;
}
function img(src, classname){
    var elem = document.createElement('img');
    if(src)
        elem.src = src;
    if(classname)
        elem.className = classname;
    return elem;
}
function textarea(value, className, placeholder){
    var elem = document.createElement('textarea');
    if(value)
        elem.value = value;
    if(className)
        elem.className = className;
    if(placeholder)
        elem.placeholder = placeholder;
    return elem;
}
function input(value, className, placeholder){
    var elem = document.createElement('input');
    if(value)
        elem.value = value;
    elem.className = 'editTextField input';
    if(className)
        elem.classList.add(className);
    if(placeholder)
        elem.placeholder = placeholder;
    return elem;
}
function getClass(classname){
    return document.getElementsByClassName(classname);
}
function getId(id){
    return document.getElementById(id);
}
function createTitle(name){
    var title = document.createElement("div");
    title.className = 'fil_title';

    title.info = document.createElement("div");
    title.info.innerHTML = name;
    title.info.className = 'fil_title_text';
    title.appendChild(title.info);
    return title;
}
function createCheckBox(bool, cb, id=''){
    var box = document.createElement("div");
    box.className = 'check_box';
    if(id !== '') box.id = id;
    var check = document.createElement("div");
    check.className = 'check';
    box.appendChild(check);
    box.enabled = true;
    box.addEventListener('click', change);
    box.change = change;
    if(!bool)
        change();
    function change(e){
        if(box.enabled){
            box.enabled = false;
            check.className = 'check disable';
            if(e)
                cb(false);
            return;
        }
        check.className = 'check';
        box.enabled = true;
        if(e)
            cb(true);
    }

    return box;
}
function clearBlock(){
    var content = document.getElementById("content");
    content.innerHTML = '';
    $('.topHelpBut').html('');
}
function createNewBlock(title){
    var mainDiv = document.createElement("div");
    mainDiv.className = "wrap_block";
    mainDiv.appendChild(createTitle(title));
    var content = document.getElementById("content");
    content.appendChild(mainDiv);
    return mainDiv;
}
Element.prototype.copyToClipboard = function() {
    // create hidden text element, if it doesn't already exist
    var elem = this;
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    /*if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }*/
    return succeed;
}
function templateText(string){
    return new Promise((res,rej)=>{
        if(!string || !string.length) return res(string);
        let matches = string.match(/{(.*?)}/g);
        if(!matches || !matches.length) return res(string);
        let s = replaceEvaluatiableString(string);
        return res(s);
    });
}
function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.placeholder.html(this.opts[0].innerHTML);
    this.data = $(this.opts[0]).attr("data");
    this.val = '';
    this.index = 0;
    this.initEvents();
}
DropDown.prototype = {
    initEvents : function() {
        var obj = this;
        var opened = false;
        obj.dd.on('click', open);
        function open(){
            obj.dd.addClass('active');
            obj.dd.off('click', open);
            setTimeout(function(){
                $(window).on('click', close);
            }, 16);
        }
        obj.opts.on('click',function(){
            var opt = $(this);
            obj.val = opt.html();
            obj.data = $(this).attr("data");
            obj.index = opt.index();
            obj.placeholder.html(obj.val);
        });
        function close(){
            obj.dd.removeClass('active');
            $(window).off('click', close);
            obj.dd.on('click', open);
        }
    },
    getValue : function() {
        return this.val;
    },
    setIndex : function(index){
        var opt = $(this.opts[index]);
        this.val = opt.html();
        this.data = opt.attr("data");
        this.index = opt.index();
        this.placeholder.html(this.val);
    },
    getIndex : function() {
        return this.index;
    },
    getData : function() {
        return this.data;
    }
}
function replaceEvaluatiableString(string){
    let start=false;
    let evaluatableStrings = [];
    for(let pos=0;pos<=string.length;pos++){
        if(string[pos]==='{'){
            start=pos;
        }
        if(start!==false && string[pos]==='}'){
            evaluatableStrings.push({eval:string.slice(start+1,pos),start:start,end:pos+1});
            start = false;
        }
    }
    evaluatableStrings.forEach((evaluatable,index)=>{
        let elements = evaluatable.eval.split('|');
        evaluatableStrings[index].selected=elements[Math.floor(Math.random()*elements.length)];
    });
    evaluatableStrings.reverse();

    //Заменять строку с конца
    evaluatableStrings.forEach(evaluatable=>{
        string = replaceStringPart(string, evaluatable.selected,evaluatable.start,evaluatable.end)
    });
    if(string.indexOf('{')>=0)
        return replaceEvaluatiableString(string);
    else
        return string;
}
function replaceStringPart(string,replacer,start,end){
    return string.substring(0, start) + replacer +string.substring(end, string.length);
}

Element.prototype.delayStyle = function(style, value, delay){//сам ты ебанутый
    if(!delay)
        delay = 16;
    var _self = this;
    setTimeout(function(){
        _self.style[style] = value;
    }, delay);
}