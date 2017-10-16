'use strict';
(function (popularLib, global, my$) {

    //Calling this function because we want to see current todos when the page is loaded.
    //I know there is a difrrent way to do this, but this way is easier ;)
    //Meow
    my$.displayTodos();

    //Start of event listener(s)
    document.querySelector("#form").addEventListener("submit", function (e) {
        e.preventDefault();
        //stop browser from refreshing on submit
        const todoName = e.target["0"].value;
        if (todoName === "") {
            return my$.showMessage("Please fill out empty field", "danger");
        }
        const todoNameJson = JSON.stringify({
            name: todoName
        });

        my$.addTodo(todoNameJson, "http://localhost:3000/api/todos")
            .then(response => {
                my$.displayTodos();
                my$.showMessage("New todo added!", "success");
                e.target["0"].value = "";
            }).catch(err => {
                my$.showMessage(err.message, "danger");
            })

    });

    //delegate the click event for the delete buttons
    document.querySelector("body").addEventListener("click", function (e) {
        if (e.target.classList[1] === "btn-danger") {
            const id = e.target.dataset.id;
            my$.deleteTodo(id)
                .then(response => {
                    my$.showMessage(response.message, "success");
                    my$.displayTodos()
                })
                .catch(err => {
                    my$.showMessage(err.message, "danger");
                })
        }
    })
    //delegate the click event for the complete buttons
    document.querySelector("body").addEventListener("click", function (e) {
        if (e.target.classList[1] === "btn-success") {
            const id = e.target.dataset.id;
            my$.completeTodo(id)
                .then(response => {
                    my$.showMessage(response.message, "success");
                    my$.displayTodos()
                })
                .catch(err => {
                    my$.showMessage(err.message, "danger");
                })
        }
    })
}(null, window, helpers));