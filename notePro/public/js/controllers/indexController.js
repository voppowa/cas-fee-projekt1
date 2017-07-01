;(function($) {
    const client = window.services.restClient;

    $(function(){
        let task_id;
        const tasksContainer = $("#task-wrapper");

        const tasksRenderer = Handlebars.compile($("#task").html());
        const finishedTasks = Handlebars.compile($("#finished_task").html());

        renderTasks(sortByCreationDate);

        // Style Changer
        $(document).on('click', '#style_changer', () => changeStyle());

        // Show Finished
        $(document).on('click', '.finished_notes', () => renderfinishedTasks());

        // Task finished
        $(document).on('click', '#finished', function() {
            task_id = $(this).parents(".task").attr("id");
            client.finishTask(task_id);
            renderTasks();
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

        // Edit Task Text
        $(document).on('click', '.descriptionEdit', function() {
            const task_id = $(this).parents(".task").attr("id");
            editTaskDescription(task_id);
        });

        // Edit Task Deadline
        $(document).on('click', '.deadlineIcon', function() {
            const task_id = $(this).parents(".task").attr("id");
            const deadlineInput = $(this).parent().parent().children('#deadline');
            editDeadline(task_id, deadlineInput);
        });

        // Edit Task Importance
        $(document).on('click', '.importance', function() {
            const task_id = $(this).parent().parent().attr('id');
            editImportance(task_id);
        });

        // Remove Task
        $(tasksContainer).on("click", ".remove", function(event) {
            client.deleteTask($(event.currentTarget).data("id")).done(renderTasks);
        });

        function renderTasks(sortAlgo) {
            client.getTasks().done(function(tasks) {
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

        function renderfinishedTasks() {
            client.getTasks().done(function(tasks) {
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
            const editTaskTitle = event.target.parentNode.firstElementChild;

            client.getTask(task_id).done(function(task) {

                let description = task.description;
                let importance = task.importance;
                let deadline = task.deadline;

                $('.titleEdit').hide();
                $(editTaskTitle).attr('contenteditable', 'true').addClass('active');

                $('.task-title > h3 > span').on('keydown', function (e) {
                    if (e.which == 13) {
                        return false;
                    }
                });
                $(".task-title > h3 > span").on('keyup', function (e) {
                    if (e.keyCode == 13) {
                        $(editTaskTitle).attr('contenteditable', 'false').removeClass('active');
                        let newTitle = $(editTaskTitle).text();
                        $('.titleEdit').show();
                        client.editTask(task_id, newTitle, description, importance, deadline);
                    }
                });

            })
        }

        // Edit Task Description by clicking on the icon
        function editTaskDescription(task_id) {
            const editTaskDescription = event.target.parentNode.firstElementChild;

            client.getTask(task_id).done(function(task) {

                let title = task.title;
                let importance = task.importance;
                let deadline = task.deadline;

                $('.descriptionEdit').hide();

                $(editTaskDescription).attr('contenteditable', 'true').addClass('active');
                $('.task-text > span').on('keydown', function (e) {
                    if (e.which == 13) {
                        return false;
                    }
                });
                $(".task-text > span").on('keyup', function (e) {
                    if (e.keyCode == 13) {
                        const newText = $(editTaskDescription).text();
                        $(editTaskDescription).attr('contenteditable', 'false').removeClass('active');
                        $('.descriptionEdit').show();
                        client.editTask(task_id, title, newText, importance, deadline);
                    }
                });
            });
        }

        // Edit Deadline By clicking on the icon
        function editDeadline(task_id, deadlineInput) {
            const oldDeadline = event.target.parentNode;
            const editDeadline = oldDeadline.firstElementChild;

            client.getTask(task_id).done(function(task) {

                let title = task.title;
                let description = task.description;
                let importance = task.importance;

                if (!$(editDeadline).hasClass('index_hide')) {
                    $(deadlineInput).html('').show().siblings('input');
                    $(oldDeadline).hide();
                    $(deadlineInput).val(editDeadline.innerHTML);

                    $(deadlineInput).on('keyup', function (e) {
                        if (e.keyCode == 13 || e.keyCode == 9) {
                            const newDeadline = $(deadlineInput).val();
                            $(deadlineInput).css("display", "none");
                            $(oldDeadline).show();
                            $(editDeadline).show().html(newDeadline);
                            client.editTask(task_id, title, description, importance, newDeadline);
                        }
                    });
                }
            });
        }

        // Edit Importance by clicking on the bolts
        function editImportance(task_id) {
            const importanceWrapper = event.target.parentNode;
            const importanceInput = event.target.parentNode.nextElementSibling;

            client.getTask(task_id).done(function(task) {

                let title = task.title;
                let description = task.description;
                let deadline = task.deadline;

                $('.gold div').addClass('bolt');
                $(importanceWrapper).css('display', 'none');
                $(importanceInput).removeClass('index_hide').addClass('rating');

                if (importanceInput != null) {
                    $(importanceInput.childNodes).click(function () {
                        var starId = $(this).attr('value');
                        const newImportance = Array.from({length: starId}, (v, k) => k);
                        client.editTask(task_id, title, description, newImportance, deadline);
                        renderTasks();
                    });
                }
            });
        }

    });
}(jQuery));