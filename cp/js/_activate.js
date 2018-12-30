this.activate = function(url){
    setCookie("auth_token", "");
    ajax('user/activate/'+getParameterByName('user', url), {authorization:getParameterByName('key', url)}, 'get', function(res){
        loginWidget(true);
        window.history.replaceState(pages[0].state, pages[0].page, '?page='+pages[0].page);
    });
}
this.reset = function(url){
    setCookie("auth_token", "");
    ajax('user/reset/'+getParameterByName('user', url), {authorization:getParameterByName('key', url)}, 'get', function(res){
        loginWidget(true);
        window.history.replaceState(pages[0].state, pages[0].page, '?page='+pages[0].page);
        if(res.data.success){
            setTimeout(function(){
                popupInfo('ok', global_pass_reset, global_pass_reset_ok, 'Ok');
            }, 1000);
        }else{
            setTimeout(function(){
                popupInfo('error', global_pass_reset, localError(res.data), 'Ok');
            }, 1000);
        }
    });
}