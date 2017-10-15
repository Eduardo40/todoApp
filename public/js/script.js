'use strict';
(function(popularLib, global,lib){

    //Calling this function because we want to see current todos when the page is loaded.
    //I know there is a difrrent way to do this, but this way is easier ;)
    //Meow
    lib.displayTodos();

//Start of event listener(s)
document.querySelector("#form").addEventListener("submit",function(e){
    e.preventDefault();
    //stop browser from refreshing on submit
    const todoName = e.target["0"].value;
    if(todoName === ""){
        return lib.showMessage("Please fill out empty field","danger");
    }
    const todoNameJson = JSON.stringify({name: todoName});

    lib.addTodo(todoNameJson,"http://localhost:3000/api/todos")
    .then(response =>{
        lib.displayTodos();
        lib.showMessage("New todo added!","success");
        e.target["0"].value = "";
    }).catch(err=>{
        lib.showMessage(err.message,"danger");
    })

});

//delegate the click event for the delete buttons event
document.querySelector("body").addEventListener("click",function(e){
    if(e.target.classList[1] === "btn-danger"){
        const id = e.target.dataset.id;
        lib.deleteTodo(id)
        .then(message =>{
            lib.showMessage(message,"success");
            lib.displayTodos()
        })
        .catch(err=>{
            lib.showMessage(err.message,"danger");
        })
    }
})

document.querySelector("body").addEventListener("click",function(e){
    if(e.target.classList[1] === "btn-success"){
        const id = e.target.dataset.id;
        lib.completeTodo(id)
        .then(response =>{
            lib.showMessage(response.message,"success");
            lib.displayTodos()
        })
        .catch(err=>{
            lib.showMessage(err.message,"danger");
        })
    }
})
}(null,window,helpers));