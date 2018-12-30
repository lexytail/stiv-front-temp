function chat_list_height() {
    var body_height = window.innerHeight;
    var main_header_height = jQuery('.main-header').outerHeight();
    //var main_footer_height = jQuery('.gx-footer').outerHeight();
    var main_footer_height = 0;
    var main_content_padding = parseInt(jQuery('.gx-main-content').css('padding-top'));
    var gxwrapper_margin = parseInt(jQuery('.gx-wrapper').css('margin-bottom'));
    var chat_module_margin = parseInt(jQuery('.chat-module').css('margin-top')) + parseInt(jQuery('.chat-module').css('margin-bottom'));
    var chatMain_header_height = jQuery('.chat-main-header').outerHeight();
    var chatMain_footer_height = jQuery('.chat-main-footer').outerHeight();
    var fil_title = jQuery('.title_text').outerHeight();

    var scrollbar_height = body_height - (main_header_height + main_content_padding + gxwrapper_margin + fil_title + chat_module_margin + chatMain_header_height + chatMain_footer_height + main_footer_height);

    jQuery('.chat-list-scroll').height(scrollbar_height);
}

function chat_module_sidebar_height() {
    //var body_height = jQuery('body').height();
    var body_height = window.innerHeight;
    var main_header_height = jQuery('.main-header').outerHeight();
    var main_footer_height = jQuery('.gx-footer').outerHeight();
    var main_content_padding = parseInt(jQuery('.gx-main-content').css('padding-top'));
    var gxwrapper_margin = parseInt(jQuery('.gx-wrapper').css('margin-bottom'));
    var chat_module_margin = parseInt(jQuery('.chat-module').css('margin-top')) + parseInt(jQuery('.chat-module').css('margin-bottom'));
    var module_sideheader_height = jQuery('.chat-sidenav-content').outerHeight();
    var fil_title = jQuery('.title_text').outerHeight();

    module_sideheader_height = 0;

    var scrollbar_height = body_height - (main_header_height + main_content_padding + gxwrapper_margin + chat_module_margin + module_sideheader_height + main_footer_height + fil_title);
    jQuery('.ps-custom-scrollbar').height(scrollbar_height);

    return scrollbar_height;
}
