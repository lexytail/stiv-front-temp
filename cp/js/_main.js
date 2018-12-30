this.mainClass = function(fromLogin){

    var maindiv;

    $(document).ready(function() {
    
        maindiv = $("#main");

        getAccountList();
        createSvgIcons();

        $('#userAccount').html(user_email);
        $('.tarif').html(
            '<div style="white-space: nowrap;" class="containerq"><div class="head"><div class="name">Тариф: <span>'+tariff.name+'</span></div>'
            + '<div style="white-space: nowrap;" class="days">'+getSubscriptionTime()+'</div></div></div>'
        );

        $('.balance_sidebar .balance').html(user.balance+' руб.');

        //var secSubAll = tariff.period*24*60*60;
        //$('.tarif .blue').css('width', (310/100*(100/secSubAll*user.secondsUntilSubscriptionEnded))+'px');

        $(document).on('click','.logout', function() {
            logout();
        })
        
        $(document).on('click', '.user-profile,.balance_sidebar', function() {
            openPageByName('profileSettings', true, false);
            if(typeof drawers.states._menu_toggle !== 'undefined') 
                drawers.states._menu_toggle.bigSlideAPI.view.toggleClose();
        });

        $(document).on('click', '.logo', function() {
            openPageByName('account_list', true, false);
            if(typeof drawers.states._menu_toggle !== 'undefined') 
                drawers.states._menu_toggle.bigSlideAPI.view.toggleClose();
        });

        updateProfileAvatars();

        popupCreate();
    });


    function popupCreate(){
        var effects = new Array();
        effects['opacity'] = {speed:0.15};
        effects['transform'] = {speed:0.3, animType:'cubic-bezier(0.17, 0.54, 0.27, 1.55)'};
        var overlay2 = document.createElement("div");
        setCssEffect(overlay2, effects);
        overlay2.id = 'overlay2';
        var overlay3 = document.createElement("div");
        setCssEffect(overlay3, effects);
        overlay3.id = 'overlay3';
        var midPos = document.createElement("div");
        midPos.style.display = 'table-cell';
        midPos.style['vertical-align'] = 'middle';
        overlay2.appendChild(midPos);
        var popup = document.createElement("div");
        popup.id = 'popup_info';
        setCssEffect(popup, effects);
        var iconpopup = document.createElement("div");
        iconpopup.className = 'popup_icon';
        var title = document.createElement("div");
        title.id = 'popup_title';
        var text = document.createElement("div");
        text.id = 'popup_text';
        var butSend = document.createElement("div");
        butSend.className = 'blueButton';
        butSend.id = 'popup_butok';
        butSend.innerText = global_excellent;

        var butcancel = document.createElement("div");
        butcancel.id = 'popup_butcancel';
        butcancel.innerHTML = global_cancel;
        butcancel.style.display = 'none';
        popup.appendChild(iconpopup);
        popup.appendChild(title);
        popup.appendChild(text);
        popup.appendChild(butSend);
        popup.appendChild(butcancel);
        midPos.appendChild(popup);

        maindiv.append(overlay2);
        maindiv.append(overlay3);
    }
}

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

function logout() {
            setCookie("_auth_token", "");
            accountsArr = new Array();
            window.location = 'https://stiv.insaev.ru';
            document.body.innerHTML = "";
            return;
}

function setActiveMenu(page){
    //var menu = document.getElementsByClassName("menu_sidebar")[0];
    var menu = document.getElementById("main-menu");
    var li = menu.getElementsByTagName("li");
    for(var i in li){
        if(typeof li[i] == "object") {
            if(li[i].attributes.rel.value == page){
                li[i].classList.add("selected");
                li[i].classList.add("active");

                parEl = findAncestor(li[i],'menu');
                if(null !== parEl) {
                    parEl.classList.add("selected");
                    parEl.classList.add("active");
                    parEl.classList.add("open");
                }
                return;
            }
        }
    }
}
