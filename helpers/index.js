const Todos = require("../models/todo");

exports.getAllTodos = (req, res) => {
    //Find all todos
    Todos.find().then((todos)=>{
        res.json(todos.reverse());
    }).catch((err)=>{
        err.message = "An error has ocurred. please try again, if is not working again, please check your actions."
        res.send(err.message);        
        throw err;
    });
}

exports.createNewTodo = (req,res)=>{
    let newTodo = {
        name:req.body.name,
    }
    Todos.create(newTodo).then((newTodo)=>{
        res.send(
            {
                success:true,
                message:"Successfuly created new todo",
                todo: newTodo
            }
        );
    }).catch((err)=>{
        err.message = "An error has ocurred. please try again, if is not working again, please check your actions."
        res.send(err.message); 
    });
}

exports.getTodo = (req, res) => {
        Todos.findById(req.params.id)
        .then((todo) =>{
            res.json(todo);
        })
        .catch((err)=>{
            err.message = "An error has ocurred. please try again, if is not working again, please check your actions."
            res.send(err.message); 
            throw err;
        });
    };

exports.changeTodo = (req, res)=>{
    Todos.findById(req.params.id).then((todo)=>{
        return Todos.findByIdAndUpdate(todo._id,{$set:{completed:!todo.completed}},{new:true});
     }).then((todo)=>{
         const responseMessage =  todo.completed ? "completed!" : "not completed!";
        return res.json({success:true,message:"Todo is " + responseMessage});
     }).catch((err)=>{
         res.json({success:false,message:err.message});
         throw err;
     });
}

exports.deleteTodo = (req, res)=>{
    Todos.findByIdAndRemove(req.params.id).then((todo)=>{
        return res.json({success:true,message:"Succesfuly deleted a todo"});
    }).catch((err)=>{
        res.json({success:false,message:err.message});
        throw err;
    });
};


module.exports = exports;