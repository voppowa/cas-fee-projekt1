// Send new Task
;(function ($) {
    const client = window.services.restClient

    // Set Today as Default Value for Deadline
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;

    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    today = yyyy+'-'+mm+'-'+dd;
    $("#deadline").attr("value", today);

    // Create new Task
    $('.new_task').submit(function (event) {
        event.preventDefault();

        let title = $("#title").val();
        let description = $("#description").val() || "Nothing";
        let importance = Array.from({length: $("#hiddenImportance").val() || 1}, (v, k) => k);
        let deadline = $("#deadline").val();

        client.createTask(title, description, importance, deadline).then(x => {
            window.location.replace("index.html");
        });
    });

})(jQuery);



