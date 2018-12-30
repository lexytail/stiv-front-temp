var host = 'https://api.insaev.ru';
if(window.location.host == "teststiv.insaev.ru")
    host = 'https://testapi.insaev.ru';
document.addEventListener("DOMContentLoaded", ready);
var redirect = null;
function ready(){
    if(getParameterByName('ref')){
        setCookie('ref', getParameterByName('ref'));
        window.location = 'https://'+window.location.host;
    }
    if(getParameterByName('r')){
        redirect = getParameterByName('r');
        setTimeout(function(){openPopUp('loginPanel')},300);
       // window.location = 'https://'+window.location.host;
    }
    ajax('tariff', {}, 'GET', function(res){
        var count = 3;
        for(var i in res.data.tariffs){
            var tarif = res.data.tariffs[i];
            var description = (tarif.accounts>=0)?('<p>Поддерживается до '+tarif.accounts+' аккаунтов</p>'):('<p>Количество аккаунтов не ограничено</p>');
            $('.poster-list').append('<li class="price poster-item">\
                <div class="title">'+tarif.name+'</div>\
                <div class="circle">\
                    <div class="amount">'+tarif.sum+'</div>\
                    <div class="description">рублей</div>\
                </div>\
                <div class="amount_in_day">'+description+'</div>\
                <div class="but regopen">Купить</div>\
        </li>');
        $(".regopen").on("click", function (event) {
            openPopUp('regPanel');
        });
    }
	    Carousel.init($(".pictureSlider"));
        
        /*$('.poster-list').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            adaptiveHeight: true,
            arrows: true,
            centerPadding: '400px',
            responsive: [
                  {
                    breakpoint: 680,
                        settings: {
                            slidesToShow: 1,
                            centerMode: true,
                            centerPadding: '40px',
                            infinite: true,
                            arrows: true,
                        }
                      }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
          }); */
    });

    $('.cubes').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        adaptiveHeight: true,
        arrows: false,
        
        responsive: [
            {
              breakpoint: 1030,
              settings: {
                slidesToShow: 3,
                centerMode: true,
                centerPadding: '40px',
                infinite: true,
                arrows: true,
              }
            },
            {
              breakpoint: 730,
              settings: {
                slidesToShow: 2,
                centerMode: true,
                centerPadding: '40px',
                infinite: true,
                arrows: true,
              }
            },
            {
            breakpoint: 490,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '40px',
                    infinite: true,
                    arrows: true,
                }
              }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
      });
      
      $('.feedback_list').slick({
        vertical: true,
        verticalSwiping: true,
        adaptiveHeight: true,
        infinite: false,
        slidesToShow: 1,
        prevArrow: $('.arrow.up')[0],
        nextArrow: $('.arrow.down')[0],
        centerMode: true,
        centerPadding: '100px',
        responsive: [
            {
            breakpoint: 495,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '20px',
                    infinite: false,
                    verticalSwiping: false,
                    vertical: false,
                    arrows: true,
                }
              }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
      });
    $(".form").submit(function(e){
        return false;
    });
    var clickCounter = 0;
    var clickCounter2 = 0;
    updateStatistic();
    function updateStatistic(){
        if(!$('#totalSubscribers')[0])
            return;
        ajax('statistics', {}, 'get', function(res){
            if(res.success){
                /*
                activeAccounts:447
                todayFollowed:0
                todayLiked:0
                todayPosted: 60
                todayUnfollowed:47896
                totalFollowed:63430
                totalLiked:22383
                totalPosted:290
                totalUnfollowed:21904
                */
                console.log('statistics',res.data.stats.totalFollowings);
                $('#totalSubscribers')[0].innerHTML = res.data.stats.totalSubscribers;
                $('#todayUsers')[0].innerHTML = res.data.stats.todayUsers;
                $('#totalUsers')[0].innerHTML = res.data.stats.totalUsers;
                $('#todaySubscribers')[0].innerHTML = res.data.stats.todaySubscribers;
                $('#totalPosted')[0].innerHTML = res.data.stats.totalPosted;
                $('#totalLiked')[0].innerHTML = res.data.stats.totalLiked;
            }
        });
    }
    if(document.getElementsByClassName('earth')[0]){
        document.getElementsByClassName('earth')[0].addEventListener('click', function(e){
            clickCounter++;
            if(clickCounter==20){
                var boom = document.getElementsByClassName('earth')[0].appendChild(document.createElement('div'));
                boom.className = 'boom';
                setTimeout(function(){
                    boom.style.transform = 'scale(0.3) rotate(-120deg) translateX(-2px) translateY(-70px)';
                }, 16);
            }
        });
        document.getElementsByClassName('insaev')[0].addEventListener('click', function(e){
            clickCounter2++;
            if(clickCounter2==20 && clickCounter == 5){
                document.getElementsByClassName('insaev')[0].style.animation = 'spin 3s infinite ease-in-out';
                document.getElementsByClassName('earth')[0].style.animation = 'spin2 3s linear infinite';
                document.getElementsByClassName('moon')[0].style.animation = 'spin2 10s linear infinite';
                document.getElementsByClassName('header')[0].style.animation = 'backgroundColor 1s linear infinite';
            }
        });
    }
    //feedbackController();
    setInterval(function(){
        var overlay = getClass('overlay')[0];
        if(!overlay.visible)
            return;
        if(overlay.clientHeight + (getStyleNum(overlay.style.top) - window.pageYOffset) < window.innerHeight)
            overlay.style.top = window.pageYOffset-(overlay.clientHeight - window.innerHeight)+'px';
        if(window.pageYOffset < getStyleNum(overlay.style.top))
            overlay.style.top = window.pageYOffset+'px';
        //интересно, можно это было сделать проще? Над было погуглить наверн...
    },16);
    /*var regButtons = getClass('regopen');
    for(var i in regButtons){
        if(typeof getClass('regopen')[i] == 'object')
        getClass('regopen')[i].addEventListener("click", function(e){
            openPopUp('regPanel');
        });
    }
    а да, можно же через это говно сделать...
    */
    feedpanel();
    function feedpanel(){
        if(!getId('capcha_feed'))
            return;
        var _capcha;
        /*setTimeout(function(){
            _capcha = grecaptcha.render(getId('capcha_feed'), {
                'sitekey' : '6LfoPjAUAAAAAEDSJqVAXiIBzBZNl2WO3OvR--Y3'
            });
        }, 1000);*/
        loadcapcha();
        function loadcapcha(){
            setTimeout(function(){
                if(typeof grecaptcha === 'undefined' || typeof grecaptcha.render === 'undefined'){
                    loadcapcha();
                    return;
                }
                _capcha = grecaptcha.render(getId('capcha_feed'), {
                    'sitekey' : '6LfoPjAUAAAAAEDSJqVAXiIBzBZNl2WO3OvR--Y3'
                });
            }, 16);
        }
        function err(errtext){
            $('.feed_error')[0].style.opacity = '1';
            $('.feed_error')[0].innerHTML = errtext;
            $('.feed_error')[0].delayStyle('opacity', '0', 2000);
        }
        var sending = false;
        $('#sendfeed').on("click", function(e){
            if(sending)
                return;
            if(!validateEmail($('#feedemail')[0].value)){
                err('email указан неверно');
                return;
            }
            if($('#feedtext')[0].value == ''){
                err('Введите текст');
                return;
            }
            if(grecaptcha.getResponse(_capcha) == ''){
                err('Подтвердите, что Вы не робот!');
                hideFeedButton();
                return;
            }
            
            ajax('feedback', {"from":$('#feedemail')[0].value, "subject":"stiv feedback", "text":$('#feedtext')[0].value, "g-recaptcha-response":grecaptcha.getResponse(_capcha)}, 'post', function(res){
                if(res.success){
                    $('#feedtext')[0].value = '';
                    err('Сообщение отправлено');
                }else{
                    err('Ошибка :(');
                }
                sending = false;
                hideFeedButton();
                grecaptcha.reset(_capcha);
            });
            sending = true;
        });
    }
    regPanel();
    function regPanel(){
        $('#promocode_but').on('click', function(e){
            $('#promocode_but')[0].style.display = 'none';
            $('#promo')[0].style.opacity = '1';
        });
        $('.go_to_auth').on('click', function(e){
            closePopUp('regPanel');
            setTimeout(function(){
                openPopUp('loginPanel');
            }, 400);
        });
        $('#closereg')[0].style.display = 'none';
        $('#closereg').on("click", function(event){
            closePopUp('regPanel');
        });
        var _capcha;
        /*setTimeout(function(){
            _capcha = grecaptcha.render(getId('capcha_reg'), {
                'sitekey' : '6LfoPjAUAAAAAEDSJqVAXiIBzBZNl2WO3OvR--Y3'
            });
        }, 1000);*/
        loadcapcha();
        function loadcapcha(){
            setTimeout(function(){
                if(typeof grecaptcha === 'undefined' || typeof grecaptcha.render === 'undefined'){
                    loadcapcha();
                    return;
                }
                _capcha = grecaptcha.render(getId('capcha_reg'), {
                    'sitekey' : '6LfoPjAUAAAAAEDSJqVAXiIBzBZNl2WO3OvR--Y3'
                });
            }, 16);
        }
        function err(errtext){
            getId('reg_error').style.opacity = '1';
            getId('reg_error').innerHTML = errtext;
            getId('reg_error').delayStyle('opacity', '0', 2000);
        }
        var sended = false;
        getId('regbut').addEventListener("click", function(e){
            if(sended)
                return;
            if(getId('username').value == ''){
                err('Вы не ввели имя');
                return;
            }
            if(!validateEmail(getId('email').value)){
                err('Email указан неверно');
                return;
            }
            if(getId('pass').value == ''){
                err('Вы не ввели пароль');
                return;
            }
            if(getId('pass2').value == ''){
                err('Вы не ввели пароль');
                return;
            }
            if(getId('pass').value != getId('pass2').value){
                err('Пароли не совпадают');
                return;
            }
            if(grecaptcha.getResponse(_capcha) == ''){
                err('Подтвердите, что Вы не робот!');
                hideRegButton();
                return;
            }
            ajax('user', {"username":getId('username').value, "email":getId('email').value, "password":getId('pass').value, "promoCode":getId('promo').value, "inviteCode":(getCookie('ref'))?getCookie('ref'):"", "g-recaptcha-response":grecaptcha.getResponse(_capcha)}, 'post', function(res){
                if(res.success){
                    if(res.data.success){
                        getId('regTitle').innerHTML = "<span>Спасибо</span> за регистрацию";
                        $('.regPanel #description')[0].style.display = 'block';
                        $('.regPanel #description')[0].innerHTML = 'Мы отправили Вам письмо. Перейдите по ссылке в нем, чтобы активировать аккаунт.';
                        $('#closereg')[0].style.display = 'block';
                        getId('regInputs').style.display = 'none';
                    }else{
                        err(res.data.message);
                        grecaptcha.reset(_capcha);
                    }
                }else{
                    err(res.data.message);
                    grecaptcha.reset(_capcha);
                }
                sended = false;
            })
            sended = true;
        });
    }
    var lostpass = 0;
    function backToLogin(){
        lostpass = 0;
        getId('logemail').style.display = 'block';
        getId('logpass').style.display = 'block';
        getId('noacc').style.display = 'block';
        getId('lostPass').style.display = 'block';
        getId('backLogin').style.display = 'none';
        getId('loginTitle').innerHTML = '<span>Вход</span><br/>в личный кабинет';
        getId('enterbut').innerHTML = 'Войти';
        $('.loginPanel #description')[0].innerHTML = '';
    }
    loginPanel();
    function loginPanel(){
        $('#noacc').on('click', function(e){
            closePopUp('loginPanel');
            setTimeout(function(){
                openPopUp('regPanel');
            }, 400);
        });
        
        $('#lostPass').on('click', function(e){
            lostpass = 1;
            getId('logemail').style.display = 'block';
            getId('logpass').style.display = 'none';
            getId('noacc').style.display = 'none';
            getId('lostPass').style.display = 'none';
            getId('backLogin').style.display = 'block';
            getId('loginTitle').innerHTML = '<span>Восстановление</span><br/>забытого пароля';
            getId('enterbut').innerHTML = 'Восстановить';
            $('.loginPanel #description')[0].innerHTML = 'Введите адрес электронной почты, который был указан при регистрации.';
        });
        $('#backLogin').on('click', function(e){
            backToLogin();
        });
        
        var _capcha;
        loadcapcha();
        function loadcapcha(){
            setTimeout(function(){
                if(typeof grecaptcha === 'undefined' || typeof grecaptcha.render === 'undefined'){
                    loadcapcha();
                    return;
                }
                _capcha = grecaptcha.render(getId('capcha_login'), {
                    'sitekey' : '6LfoPjAUAAAAAEDSJqVAXiIBzBZNl2WO3OvR--Y3'
                });
            }, 16);
        }
        function loginerr(errtext){
            getId('login_error').style.opacity = '1';
            getId('login_error').innerHTML = errtext;
            getId('login_error').delayStyle('opacity', '0', 2000);
        }
        getId('enterbut').addEventListener("click", function(e){
            if(lostpass == 0){
                if(getId('logpass').value == '' || !validateEmail(getId('logemail').value)){
                    loginerr("Неверные email или пароль");
                    lostpass = 0;
                    return;
                }
                if(grecaptcha.getResponse(_capcha) == ''){
                    lostpass = 0;
                    loginerr('Подтвердите, что Вы не робот!');
                    hideEnterButton();
                    return;
                }
                ajax('login', {"email":getId('logemail').value, "password":getId('logpass').value, "g-recaptcha-response":grecaptcha.getResponse(_capcha)}, 'post', function(res){
                    getId('logpass').value = '';
                    if(res.success){
                        if(res.data.token){
                            setCookie("_auth_token", res.data.token, {expires:5184000, domain:'insaev.ru'});
                            token = res.data.token;
                            if(redirect){
                                window.location = redirect;
                                return;
                            }
                            window.location = "./cp/";
                        }
                    }else{
                        loginerr("Неверные email или пароль");
                        hideEnterButton();
                        grecaptcha.reset(_capcha);
                    }
                    lostpass = 0;
                });
            }else if(lostpass == 1){
                if(!validateEmail(getId('logemail').value)){
                    loginerr("Неверный email");
                    lostpass = 1;
                    return;
                }
                ajax("user/reset", {"user":getId('logemail').value, "g-recaptcha-response":grecaptcha.getResponse(_capcha)}, "POST", function(res){
                    if(res.data.success){
                        $('.loginPanel #description')[0].innerHTML = 'Письмо с ссылкой для восстановления отправлено на указанный адрес.';
                        getId('logemail').style.display = 'none';
                        getId('enterbut').innerHTML = 'Хорошо';
                        lostpass = 2;
                    }else{
                        loginerr("Неверный email");
                        lostpass = 1;
                    }
                    grecaptcha.reset(_capcha);
                });
            }else if(lostpass == 2){
                closePopUp('loginPanel');
                setTimeout(backToLogin, 400);
            }
            lostpass = 3;
        });
    }
    $(".logo").on("click", function(event) {
        window.location="./index.php";
    });
    $(".friends_but").on("click", function(event) {
        window.location="./friends.php";
    });
    $(".enter").on("click", function (event) {
        if(getCookie("_auth_token")){
            ajax('user', {}, 'get', function(resp){
                if(resp.success){
                    if(redirect){
                        window.location = redirect;
                        return;
                    }
                    window.location = "./cp/";
                }else{
                    openPopUp('loginPanel');
                }
            });
            return;
        }
        openPopUp('loginPanel');
    });
    getId('closeRegPanel').addEventListener("click", function(e){
        closePopUp('regPanel');
    });
    getId('closeLoginPanel').addEventListener("click", function(e){
        closePopUp('loginPanel');
    });
    var hernya = window.location.pathname.split('/');
    if(hernya[hernya.length-1] == 'index.php' || hernya[hernya.length-1] == ''){
        $(".top_menu").on("click","a", function (event) {
            event.preventDefault();
            var id  = $(this).attr("href"),
                top = $(id).offset().top-30;
            $("body,html").animate({scrollTop: top}, 500);
        });
    }
    var menu = getClass('mobile_button')[0];
    menu.addEventListener("click", function(e){
        document.getElementsByClassName("wrapper")[0].className = 'wrapper offset';
        document.getElementsByClassName("mobile_menu")[0].className = 'mobile_menu';
        document.getElementById("overlay").className = 'show';
        document.getElementById("overlay").addEventListener("click", closeMobile);
    });
    $(".menu_list").on("click","div", function (event) {
        closeMobile();
    });
    function closeMobile(e){
        document.getElementById("overlay").removeEventListener("click", closeMobile);
        document.getElementsByClassName("wrapper")[0].className = 'wrapper';
        document.getElementsByClassName("mobile_menu")[0].className = 'mobile_menu close';
        document.getElementById("overlay").className = 'hide';
    }
    function openPopUp(popup){
        /*if(popup == 'regPanel'){
            return;
        }*/
        getClass('overlay')[0].style.display = 'table';
        getClass(popup)[0].style.display = 'block';
        getClass('overlay')[0].visible = true;
        getClass('overlay')[0].delayStyle('opacity', '1', 16);
        getClass(popup)[0].delayStyle('transform', 'scale(1)', 16);
        if(popup == 'regPanel'){
            getId('regTitle').innerHTML = '<span>Регистрация</span><br/>нового пользователя';
        }else{
            backToLogin();
        }
    }
    function closePopUp(popup){
        getClass('overlay')[0].visible = false;
        getClass('overlay')[0].style.opacity = '0';
        getClass(popup)[0].style.transform = 'scale(0.5)';
        getClass('overlay')[0].delayStyle('display', 'none', 300);
        getClass(popup)[0].delayStyle('display', 'none', 300);
        if(popup == 'regPanel'){
            $('#closereg')[0].delayStyle('display', 'none', 300);
            $('.regPanel #description')[0].delayStyle('display', 'none', 300);
            getId('regInputs').delayStyle('display', 'block', 300);
        }
    }
}
function getStyleNum(style){
    return Number(style.replace('px', ''));
}
function openReg(){

}
function getClass(classname){
    return document.getElementsByClassName(classname);
}
function getId(id){
    return document.getElementById(id);
}
function feedbackController(){
    var curDiv = 0;
    var arrup = document.getElementsByClassName('arrow down')[0];
    var arrdown = document.getElementsByClassName('arrow down')[0];
    var feedlist = document.getElementsByClassName('feedblock');
    var container = document.getElementsByClassName('feedback_container')[0];
    var interval;
    document.getElementsByClassName('arrow up')[0].addEventListener('click', function(e){
        curDiv--;
        if(curDiv <= 0)
            curDiv = 0;
        if(typeof feedlist[curDiv] == 'object')
            scrollToPos(feedlist[curDiv].offsetTop);
    });
    document.getElementsByClassName('arrow down')[0].addEventListener('click', function(e){
        curDiv++;
        if(typeof feedlist[curDiv] == 'object')
            scrollToPos(feedlist[curDiv].offsetTop);
        else
            curDiv--;
    });
    function scrollToPos(scrollPosition) {
        //clearInterval(interval);
        var element = document.getElementsByClassName('feedback_container')[0];
        //когда заебался и скачал jquery...
        console.log($('.feedback_container')[0].scrollHeight - $('.feedback_container')[0].clientHeight);
        if(scrollPosition > $('.feedback_container')[0].scrollHeight - $('.feedback_container')[0].clientHeight){
            scrollPosition = $('.feedback_container')[0].scrollHeight - $('.feedback_container')[0].clientHeight;
        }
        $('.feedback_container').animate({ scrollTop: scrollPosition }, 300);   

        /* не ну я пытался :D
        //console.log(element.scrollHeight-element.clientHeight);
        var scrollNeed = Math.abs(element.scrollTop - scrollPosition);
       // if(scrollNeed > element.scrollHeight-element.clientHeight)
        //    scrollNeed = element.scrollHeight-element.clientHeight;
        console.log('scrollNeed',scrollNeed);
        var scrollSpeed = 10;
        var plus = (element.scrollTop > scrollPosition)?false:true;
        interval = setInterval(function(){
            if(scrollNeed <= 0)
                clearInterval(interval);
            scrollNeed-=scrollSpeed;
            if(plus)
                element.scrollTop+=scrollSpeed;
            else
                element.scrollTop-=scrollSpeed;
            scrollSpeed=scrollSpeed;
        }, 16);*/
    }
}
function enterStiv(login, pass){

}
function ajax(type, data, method, cb){
    $.ajax({
        url: host+'/'+type,
        type: method,
        data: data,
        headers: {
            "x-access-token": getCookie("_auth_token")
        },
        dataType: 'json',
        success: function (resp) {
            var obj = new Object();
            obj.success = true;
            obj.data = resp;
            cb(obj);
        },
        error: function (jqXHR, exception) {
            //console.log('error,',type, jqXHR, exception);
            var obj = new Object();
            obj.success = false;
            obj.exception = exception;
            try{
                obj.data = JSON.parse(jqXHR.responseText);
            }catch(e){
                obj.data = jqXHR.responseJSON;
            }
            cb(obj);
        },
    });
}
Element.prototype.delayStyle = function(style, value, delay){//сам ты ебанутый
    if(!delay)
        delay = 16;
    var _self = this;
    setTimeout(function(){
        _self.style[style] = value;
    }, delay);
}
function div(inner, classname){
    var elem = document.createElement('div');
    if(inner)
        elem.innerHTML = inner;
    if(classname)
        elem.className = classname;
    return elem;
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
    var expires = options.expires;
  
    /*if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }*/
    /*if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }*/
    options.secure = "true";
   // options.session = "false";
    value = encodeURIComponent(value);
  
    var updatedCookie = name + "=" + value;
  
    for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }
    console.log(updatedCookie);
    document.cookie = updatedCookie;
}
function showEnterButton(){
    getId('enterbut').style.display = 'block';
    getId('capcha_login').style.display = 'none';
}
function hideEnterButton(){
    getId('enterbut').style.display = 'none';
    getId('capcha_login').style.display = 'block';
}
function showRegButton(){
    getId('regbut').style.display = 'block';
    getId('capcha_reg').style.display = 'none';
}
function hideRegButton(){
    getId('regbut').style.display = 'none';
    getId('capcha_reg').style.display = 'block';
}
function showFeedButton(){
    getId('sendfeed').style.display = 'block';
    getId('capcha_feed').style.display = 'none';
}
function hideFeedButton(){
    getId('sendfeed').style.display = 'none';
    getId('capcha_feed').style.display = 'block';
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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