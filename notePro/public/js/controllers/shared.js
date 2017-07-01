;(function ($) {
    "use strict"

    // Load added Style
    let styleClass = JSON.parse(localStorage.getItem('style'));
        if (styleClass == "change_style") {
            $('body').addClass('change_style');
    };

    // Importance Rating
    function StarRating() {
        this.init();
    };

    StarRating.prototype.init = function () {
        this.stars = $('.rating div');
        for (let i = 0; i < this.stars.length; i++) {
            $(this.stars[i]).attr('data-count', i);
            $(this.stars[i]).on('mouseenter', this.enterStarListener.bind(this));
        }
        $('.rating').on('mouseleave', this.leaveStarListener.bind(this));

    };

    StarRating.prototype.enterStarListener = function (e) {
        this.fillStarsUpToElement(e.target);
    };

    StarRating.prototype.leaveStarListener = function () {
        this.fillStarsUpToElement(null);
    };

    StarRating.prototype.fillStarsUpToElement = function (el) {
        for (let i = 0; i < this.stars.length; i++) {
            if (el == null || $(this.stars[i]).attr('data-count') < $(el).attr('data-count')) {
                this.stars[i].classList.remove('hover');
            } else {
                this.stars[i].classList.add('hover');
            }
        }
    };

    new StarRating();

    $('.gold div').addClass('bolt');
    $('.bolt').click(function () {
        if (this + ":not(.selected)") {
            $('.bolt').removeClass('selected');
            $(this).addClass('selected');
            const starId = $(this).attr('value');
            $('#hiddenImportance').val(starId);
        }
    });
})(jQuery);
