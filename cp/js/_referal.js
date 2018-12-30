this.referal = function(){
    setActiveMenu('referal');
    clearBlock();
//    $('.topHelpBut').html('<a href="https://www.youtube.com/watch?v=n2X-xCJ2VoY" target="_blank"><div class="blueButton butHelp">Обучение</div></a>');
    
    $('#LVideo').show();
    $('#LVideo').attr('href', 'https://www.youtube.com/watch?v=n2X-xCJ2VoY');

    var block1 = createNewBlock(global_title_referal);
    var block2 = createNewBlock(global_title_payments);
    block1.classList.add('wrap_block_left40');
    block2.classList.add('wrap_block_right59');
   
    
    ajax('user/invite', {}, 'get', function(res){
        console.log(res);
        if(!res.success){
            noReferal();
            return;
        }
        block1.appendChild(referalSystem('https://'+window.location.host+'/?ref='+res.data.invites.referral, res.data.invites.promo));
        block2.appendChild(paymentSystem(res.data.bonusBalance, res.data.users));
    })
    function noReferal(){
        var text = block1.appendChild(div('Реферальная программа доступна только активным пользователям.'));
        text.style.margin = '20px';
        var activate = block1.appendChild(div('Активировать','blueButton'));
        activate.style.width = '300px';
        activate.style.margin = '20px auto';
        block2.style.display = 'none';
        block1.style.width = '100%';
        activate.addEventListener("click", function(){
            openPageByName('profileSettings');
        });
    }
    function referalSystem(refurl, refcode){
        var container = div('', 'refCode');
        var refCont = container.appendChild(div('', 'refCont'));
        var lable = refCont.appendChild(div(global_refurl+":", 'lable'));
        var refCode = refCont.appendChild(input(refurl));
        refCode.setAttribute('readonly','readonly');
        var copyBut = refCont.appendChild(div('', 'copy'));
        copyBut.innerHTML = '<svg width="20" height="37"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#posts-feed-svg"></use></svg>';
        var warning = container.appendChild(div('', 'warCont'));
        warning.appendChild(div('', 'warning'));
        warning.appendChild(div(global_referal_description, 'warningText'));

        var promocodeCont = container.appendChild(div(''));
        promocodeCont.appendChild(div(global_self_promocode+":", 'lable'));
        console.log('refcode', refcode);
        var promoCode = promocodeCont.appendChild(input(((refcode)?refcode:""), 'promocode'));
        //promoCode.disabled = true;

        var createCode = container.appendChild(div(global_create_promocode,'blueButton'));
        copyBut.addEventListener("click", function(){
            console.log('copy', refCode.copyToClipboard());
            //refCode.copyToClipboard();
        });
        createCode.addEventListener("click", function(){
            ajax('user/invite', {promo:promoCode.value}, 'post', function(res){
                if(res.success){
                    popupInfo('ok', global_enter_ref_code, global_promo_created);
                }else{
                    popupInfo('error', global_error, localError(res.data), global_close);
                }
            });
        });
        return container;
    }
    function paymentSystem(_balance, _partners){
        var container = div('', 'paymentBlock');
        var cont1 = container.appendChild(div('', 'verticalBlock'));
        var cont2 = container.appendChild(div('', 'verticalBlock'));
        
        var balanceCont = cont1.appendChild(div('', 'verticalBlock mar'));
        var paymentMethodCont = cont1.appendChild(div('', 'verticalBlock mar'));

        var requsitesCont = cont2.appendChild(div('', 'verticalBlock mar'));
        var summaCont = cont2.appendChild(div('', 'verticalBlock'));

        var button = cont2.appendChild(div('Вывести', 'blueButton'));

        balanceCont.appendChild(div('Баланс', 'lable'));
        var balancediv = balanceCont.appendChild(div(_balance+' руб', 'balance'));

        paymentMethodCont.appendChild(div('Способ вывода', 'lable'));
        var method = paymentMethodCont.appendChild(input('QIWI', 'method'));
        method.disabled = true;
        requsitesCont.appendChild(div('Реквизиты', 'lable'));
        var requsite = requsitesCont.appendChild(input('', '', 'Реквизиты'));

        summaCont.appendChild(div('Сумма', 'lable'));
        var summa = summaCont.appendChild(input('', 'summa', 'Сумма'));
        
        container.appendChild(div('', 'verLine'));

        container.appendChild(div('Всего партнёров: '+_partners.length, 'partners'));
        
        button.addEventListener("click", function(e){
            ajax('user/withdraw', {wallet:requsite.value, amount:summa.value}, 'post', function(res){
                console.log(res);
                if(res.success){
                    popupInfo('ok', global_payment_title, global_payment_success_qiwi);
                    balancediv.innerHTML = res.data.bonus+' руб';
                }else{
                    popupInfo('error', global_payment_title, localError(res.data), global_close);
                }
            });
        });
        return container;
    }
}