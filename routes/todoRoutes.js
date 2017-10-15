const router = require("express").Router();
const Todos = require("../models/todo");
const helper  = require("..//helpers/index");


router.route("/")
    .get(helper.getAllTodos)
    .post(helper.createNewTodo);


router.route("/:id")
    .get(helper.getTodo)
    .put(helper.changeTodo)
    .delete(helper.deleteTodo);

module.exports = router;