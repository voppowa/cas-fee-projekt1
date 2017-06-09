// Send new Task

$(document).on('click', '#save', () => send());

function send() {

    let addTask = function (title, description, deadline) {

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let creationDate = new Date();
        let newTask = {
            'creationDate': creationDate,
            'title': $("#title").val(),
            'description': $("#description").val(),
            'importance': $("#hiddenImportance").val(),
            'deadline': $("#deadline").val(),
            'isFinished': false
    };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addTask('creationDate', 'title', 'description', 'importance', 'deadline', 'isFinished');
    window.location.replace("index.html");
}


// Importance Rating
function StarRating() {
    this.init();
}

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
    // Remove all hover states:
    for (let i = 0; i < this.stars.length; i++) {
        if (el == null || $(this.stars[i]).attr('data-count') < $(el).attr('data-count')) {
            this.stars[i].classList.remove('hover');
        } else {
            this.stars[i].classList.add('hover');
        }
    }
};

// Run:
new StarRating();

$('.rating div').addClass('bolt');

// When star is clicked
$('.bolt').click(function () {

    // if star doesn't have class selected
    if (this + ":not(.selected)") {

        // selected star gets class
        $('.bolt').removeClass('selected');
        $(this).addClass('selected');


        // selected star id
        const starId = $(this).attr('value');
        console.log(starId);
        $('#hiddenImportance').val(starId);
    }
});
