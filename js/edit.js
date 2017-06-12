// Fill out the form
let tasks = localStorage.getItem("tasks");

if( !tasks )
{
    localStorage.setItem("tasks", JSON.stringify([]));
    tasks = localStorage.getItem("tasks");
}
tasks = JSON.parse(tasks);
console.log(tasks);


if (window.location.hash) {

    const taskID = window.location.hash.substr(1);
    const index = tasks.findIndex(x => x.taskID == taskID);

    $('#title').val(tasks[index].title);
    $('#description').val(tasks[index].description);
    $('#deadline').val(tasks[index].deadline);

    renderImportance();
    function renderImportance() {
        const importanceCount = tasks[index].importance;
        console.log(importanceCount);
        const templateScript = $('#importance_template').html(),
            handlebarTpl = Handlebars.compile(templateScript),
            context = {
                importanceCount
            },
            compiled = handlebarTpl(context);
        $('#importance-wrapper').html(compiled);
    }
    tasks.splice(index, 1);
    localStorage.removeItem(tasks[index]);
    console.log(tasks);


    $(document).on('click', '#importance-wrapper', () => editImportance());

    // Edit Importance
    function editImportance() {
        const editImportance = event.target.parentNode;
        const importanceInput = event.target.parentNode.parentNode.nextElementSibling;

        if (!$(editImportance).hasClass('index_hide')) {
            $(importanceInput).removeClass('index_hide').addClass('rating');
            $(editImportance).hide();
            $('.bolt').click(function () {
                var starId = $(this).attr('value');
                const newImportance = Array.from({length: starId}, (v, k) => k);
                tasks[index].importance = newImportance;
                $('.gold div').addClass('bolt');
            });
        }
    }
}

