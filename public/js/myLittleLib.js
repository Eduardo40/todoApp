'use strict';
(function(global){
    let lib = {};
    lib.sendRequest = function(method,url,toSend) {
        return new Promise((res,rej)=>{
            let xhr = new XMLHttpRequest();
            xhr.open(method,url,true);
            if(toSend){
                xhr.setRequestHeader("Content-type", "application/json");
            }
                xhr.onload = function(data){
                    if(data.target.status === 200){
                        res(JSON.parse(data.target.response));
                    }
                    rej({status: data.target.status, message:"Something went wrong, please try again"});
                }
            toSend ? xhr.send(toSend) : xhr.send();
        });
    }
    lib.displayTodos =  function() {
        this.sendRequest("GET","http://localhost:3000/api/todos")
        .then((data)=>{
            let html = "";
            data.forEach(function(todo) {
                html += `<li class="list-group-item">${todo.name} <button class="btn btn-danger btn-sm float-right" data-id="${todo._id}">Delete</button> </li>`;
            });
            document.querySelector("#todoDisplay").innerHTML = html;
        }).catch((err)=>{
            throw err;
        })
    }

    lib.addTodo = function (todoName,url){
        return new Promise((resolve,reject)=>{
            this.sendRequest("POST",url,todoName)
            .then(response =>{
                resolve(response);
            }).catch(err =>{
                reject(err);
            })
        })
    }

    lib.deleteTodo = function(todo_id){
        return new Promise((resolve,reject)=>{
            this.sendRequest("DELETE",`http://localhost:3000/api/todos/${todo_id}`)
            .then(successMessage => {
                resolve(successMessage.message);
            }).catch(err=> {
                console.log(err.message);
            })
        });
    }

    global.helpers = lib;
}(this));