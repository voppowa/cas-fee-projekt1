// Change Style
function toggle() {
    const a = document.getElementById("pagestyle");
    a.x = 'style_v2' == a.x ? 'style' : 'style_v2';
    a.href = 'css/' + a.x + '.css';
}


// Add new Task
let tasks = localStorage.getItem("tasks");

if( !tasks )
{
    localStorage.setItem("tasks", JSON.stringify([]));
    tasks = localStorage.getItem("tasks");
}
tasks = JSON.parse(tasks);

(function () {

    function renderPage() {

            const templateScript = $('#task').html(),
                handlebarTpl = Handlebars.compile(templateScript),
                context = {
                    tasks
                },
                compiled = handlebarTpl(context);
        console.log(tasks);
        $('#task-wrapper').html(compiled);

    }
    renderPage();


    // Amount of Tasks
    document.getElementById("numberOfElements").innerText = tasks.length == 0 ? "no" : tasks.length;

    // Sort Tasks By Creation Date
    $(document).on('click', '.creationDate', function() {
        tasks.sort(function(a,b){
            return new Date(b.creationDate) - new Date(a.creationDate);
        });
        renderPage();
    })

    // Sort Tasks By Deadline
    $(document).on('click', '.deadlineDate', function() {
        tasks.sort(function(a,b){
            return new Date(a.deadline) - new Date(b.deadline);
        });
        renderPage();
    })

    // Sort Tasks By Importance
    $(document).on('click', '.taskImportance', function() {
        tasks.sort(function(a,b){
            return b.importance - a.importance;
        });
        renderPage();
    })

    // Show finished Tasks


    // Click on Finished


})();

// Delete Task
const main = document.querySelector('main');
const listUl = main.querySelector('ul');
listUl.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        if (event.target.className == 'remove') {
            const li = event.target.parentNode.parentNode.parentNode;
            const ul = li.parentNode;
            console.log(li);
            ul.removeChild(li);
            document.getElementById("numberOfElements").innerText = tasks.length == 0 ? "no" : tasks.length;
        }
    }
});












