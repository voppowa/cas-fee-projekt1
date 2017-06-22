;(function ($) {
    "use strict"

    // Added Style
    let styleClass = JSON.parse(localStorage.getItem('style'));
    console.log(styleClass === 'change_style');
    if (styleClass == "change_style") {
        $('body').addClass('change_style');
    }

})(jQuery);