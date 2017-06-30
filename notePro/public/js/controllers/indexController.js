;(function($) {
    //let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const client = window.services.restClient;


    $(function(){
        let task_id;

        renderTasks();

        // Style Changer
        $(document).on('click', '#style_changer', () => changeStyle());

        // Show Finished
        $(document).on('click', '.finished_notes', () => showFinished());

        // Task finished
        $(document).on('click', '#finished', function() {
            task_id = $(this).parents(".task").attr("id");
            finishTask(task_id);
        });

        // Sort Functions
        $(document).on('click', '.deadlineDate', function() {
            $('button.deadlineDate').toggleClass('active');
            renderTasks(sortByDeadline);
        });
        $(document).on('click', '.creationDate', function() {
            $('button.creationDate').toggleClass('active');
            renderTasks(sortByCreationDate);
        });
        $(document).on('click', '.taskImportance', function() {
            $('button.taskImportance').toggleClass('active');
            renderTasks(sortByImportance);
        });

        // Edit Task Title
        $(document).on('click', '.titleEdit', function() {
            const task_id = $(this).parents(".task").attr("id");
            editTaskTitle(task_id);
        });

        const tasksContainer = $("#task-wrapper");

        const tasksRenderer = Handlebars.compile($("#task").html());
        const finishedTasks = Handlebars.compile($("#finished_task").html());

        function renderTasks(sortAlgo)
        {
            client.getTasks().done(function(tasks){
                tasks.sort(sortAlgo);
                tasksContainer.html(tasksRenderer({tasks : tasks}));

                let numberTasks = 0;
                for (let i = 0; i < tasks.length; i++) {
                    if (!tasks[i].isFinished) {
                        numberTasks++;
                    }
                }
                $("#numberOfElements").text(numberTasks);

            })
        }


        function renderfinishedTasks()
        {
            client.getTasks().done(function(tasks){
                tasksContainer.html(finishedTasks({tasks : tasks}));

                let numberTasks = 0;
                for (let i = 0; i < tasks.length; i++) {
                    if (!tasks[i].isFinished) {
                        numberTasks++;
                    }
                }

                $("#numberOfElements").text(numberTasks);

            })
        }

        function changeStyle() {
            if ($('body').hasClass("change_style")) {
                $('body').removeClass('change_style');
                localStorage.setItem("style", JSON.stringify("other_style"));
            } else {
                $('body').addClass('change_style');
                localStorage.setItem("style", JSON.stringify("change_style"));
            }
        }

        function showFinished() {
            renderfinishedTasks()
        }


        function finishTask() {
            client.finishTask(task_id);
            renderTasks();
        }

        function sortByDeadline(a, b) {
            if ($('button.deadlineDate').hasClass('active')) {
                return (new Date(b.deadline) - new Date(a.deadline))
            } else {
                return (new Date(a.deadline) - new Date(b.deadline));
            }
        }

        function sortByCreationDate(a, b) {
            if ($('button.creationDate').hasClass('active')) {
                return (new Date(a.creationDate) - new Date(b.creationDate));
            } else {
                return (new Date(b.creationDate) - new Date(a.creationDate));
            }
        }

        function sortByImportance(a, b) {
            if ($('button.taskImportance').hasClass('active')) {
                return (b.importance.length - a.importance.length);
            } else {
                return (a.importance.length - b.importance.length);
            }
        }


        // Edit Task Title by clicking on the icon
        function editTaskTitle(task_id) {
            let editTaskTitle = event.target.parentNode.firstElementChild;
            let description;
            let importance;
            let deadline;



            $('.titleEdit').hide();
            $(editTaskTitle).attr('contenteditable', 'true').addClass('active');

            $('.task-title > h3 > span').on('keydown', function (e) {
                if (e.which == 13) {
                    return false;
                }
            });

            $(".task-title > h3 > span").on('keyup', function (e) {
                if (e.keyCode == 13 || e.keyCode == 9 && newText != null) {
                    $(editTaskTitle).attr('contenteditable', 'false').removeClass('active');
                    let newTitle = $(editTaskTitle).text();
                    $('.titleEdit').show();
                    console.log(task_id)
                    client.editTask(task_id, newTitle, description, importance, deadline);
                }
            });
        }


        // Remove Task

       // $(document).on('click', '.remove', function() {
        //    const id = $(this).parent().parent().parent().attr('id');
          //  removeTask(id);
       // });

        $(tasksContainer).on("click", ".remove", function(event){
            client.deleteTask($(event.currentTarget).data("id")).done(renderTasks);
        });


        // Edit Task Text
        $(document).on('click', '.descriptionEdit', function() {
            const id = $(this).parent().parent().parent().attr('id');
            editTaskDescription(id);
        });

        // Edit Task Deadline
        $(document).on('click', '.deadlineIcon', function() {//
            const id = $(this).parent().parent().parent().attr('id');
            const deadlineInput = $(this).parent().parent().children('#deadline');
            editDeadline(id, deadlineInput);
        });

        // Edit Task Importance
        $(document).on('click', '.importance', function() {
            const id = $(this).parent().parent().attr('id');
            editImportance(id);
        });


        //function removeTask(id) {
        //   const index = tasks.findIndex(x => x.taskID == id);
        //   tasks.splice(index, 1);
        //   updateStorage();
        //   renderPage();
        //}




// Edit Deadline By clicking on the icon
        function editDeadline(id, deadlineInput) {
            const oldDeadline = event.target.parentNode;
            const editDeadline = oldDeadline.firstElementChild;
            const index = tasks.findIndex(x => x.taskID == id);

            if (!tasks[index].isFinished) {
                if (!$(editDeadline).hasClass('index_hide')) {
                    $(deadlineInput).html('').show().siblings('input');
                    $(oldDeadline).hide();
                    $(deadlineInput).val(editDeadline.innerHTML);

                    $(deadlineInput).on('keyup', function (e) {
                        if (e.keyCode == 13 || e.keyCode == 9) {
                            const newDeadline = $(deadlineInput).val();
                            tasks[index].deadline = newDeadline;
                            $(deadlineInput).css("display", "none");
                            $(oldDeadline).show();
                            $(editDeadline).show().html(newDeadline);
                            updateStorage();                    }
                    });
                }
            }
        }



// Edit Task Description by clicking on the icon
        function editTaskDescription(id) {
            const editTaskDescription = event.target.parentNode.firstElementChild;
            const index = tasks.findIndex(x => x.taskID == id);
            $('.descriptionEdit').hide();


            if (!tasks[index].isFinished) {
                $(editTaskDescription).attr('contenteditable', 'true').addClass('active');
                $('.task-text > span').on('keydown', function (e) {
                    if (e.which == 13) {
                        return false;
                    }
                });
                $(".task-text > span").on('keyup', function (e) {
                    if (e.keyCode == 13 || e.keyCode == 9 && (newText != null)) {
                        const newText = $(editTaskDescription).text();
                        tasks[index].description = newText;
                        updateStorage();
                        $(editTaskDescription).attr('contenteditable', 'false').removeClass('active');
                        $('.descriptionEdit').show();
                    }
                });
            }
        }


// Edit Importance by clicking on the bolts
        function editImportance(id) {
            const index = tasks.findIndex(x => x.taskID == id);
            const importanceWrapper = event.target.parentNode;
            const importanceInput = event.target.parentNode.nextElementSibling;
            if (!tasks[index].isFinished) {
                $('.gold div').addClass('bolt');
                $(importanceWrapper).css('display', 'none');
                $(importanceInput).removeClass('index_hide').addClass('rating');

                if (importanceInput != null) {
                    $(importanceInput.childNodes).click(function () {
                        var starId = $(this).attr('value');
                        const newImportance = Array.from({length: starId}, (v, k) => k);
                        tasks[index].importance = newImportance;
                        updateStorage();
                        renderPage();
                    });
                }
            }
        }


    });
}(jQuery));