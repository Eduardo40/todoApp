'use strict';
(function(popularLib, global,lib){

    //Calling this function because we want to see current todos when the page is loaded.
    //I know there is a difrrent way to do this, but this way is easier ;)
    //Meow
    lib.displayTodos();

//Start of event listener(s)
document.querySelector("#form").addEventListener("submit",function(e){
    //stop browser from refreshing on submit
    e.preventDefault();
    const todoNameJson = JSON.stringify({name: e.target["0"].value});

    lib.addTodo(todoNameJson,"http://localhost:3000/api/todos")
    .then(response =>{
        lib.displayTodos();
        lib.showMessage("Succesfuly added new todo","success");
        e.target["0"].value = "";
    }).catch(err=>{
        alert(err.message);
        console.log(err);
    })

});

//delegate the click event for the delete buttons event
document.querySelector("body").addEventListener("click",function(e){
    if(e.target.classList[1] === "btn-danger"){
        const id = e.target.dataset.id;
        lib.deleteTodo(id)
        .then(response =>{
            lib.displayTodos()
        })
    }
})

}(null,window,helpers));