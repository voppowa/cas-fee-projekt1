// Send new Task

function send() {

    let addTask = function (title, description, deadline) {

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let newTask = {
            'title': document.getElementById("title").value,
            'description': document.getElementById("description").value,
            'deadline': document.getElementById("deadline").value,
        };


        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addTask('title', 'description', 'deadline');
    window.location.replace("index.html");
}


// Importance Rating
function StarRating() {
    this.init();
};

StarRating.prototype.init = function() {
    this.stars = document.querySelectorAll('.rating div');
    for (var i = 0; i < this.stars.length; i++) {
        this.stars[i].setAttribute('data-count', i);
        this.stars[i].addEventListener('mouseenter', this.enterStarListener.bind(this));
    }
    document.querySelector('.rating').addEventListener('mouseleave', this.leaveStarListener.bind(this));

};

StarRating.prototype.enterStarListener = function(e) {
    this.fillStarsUpToElement(e.target);
};


StarRating.prototype.leaveStarListener = function() {
    this.fillStarsUpToElement(null);
};


StarRating.prototype.fillStarsUpToElement = function(el) {
    // Remove all hover states:
    for (var i = 0; i < this.stars.length; i++) {
        if (el == null || this.stars[i].getAttribute('data-count') < el.getAttribute('data-count')) {
            this.stars[i].classList.remove('hover');
        } else {
            this.stars[i].classList.add('hover');
        }
    }
};


// Run:
new StarRating();

//
$('.rating div').addClass('bolt');


// When star is clicked
$('.bolt').click(function(){

    // if star doesn't have class selected
    if (this+":not(.selected)"){

        // selected star gets class
        $('.bolt').removeClass('selected');
        $(this).addClass('selected');


        // selected star id
        var starId = $(this).attr('value');
        console.log(starId);
    }
});

