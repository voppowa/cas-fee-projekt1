;(function ($) {
    "use strict"

    // Load added Style
    let styleClass = JSON.parse(localStorage.getItem('style'));
    if (styleClass == "change_style") {
        $('body').addClass('change_style');
    }

})(jQuery);
