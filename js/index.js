// Change Style
function toggle() {
    var a = document.getElementById("pagestyle");
    a.x = 'style_v2' == a.x ? 'style' : 'style_v2';
    a.href = 'css/' + a.x + '.css';
}

// Sort Tasks



// Add new Task
var tasks = localStorage.getItem("tasks");

if( !tasks )
{
    localStorage.setItem("tasks", JSON.stringify([]));
    tasks = localStorage.getItem("tasks");
}
tasks = JSON.parse(tasks);

(function () {

    function renderPage() {

            var templateScript = $('#task').html(),
                handlebarTpl = Handlebars.compile(templateScript),
                context = {
                    tasks
                },
                compiled = handlebarTpl(context);
        console.log(tasks);

        $('#task-wrapper').html(compiled);

    }
    renderPage();

})();



// Amount of Tasks
document.getElementById("numberOfElements").innerText = tasks.length == 0 ? "no" : tasks.length;








