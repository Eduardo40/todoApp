const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require('helmet');
const bodyparser = require("body-parser");
const port = 3000;

//set's some nice headers
app.use(helmet());

//Local imports
const Todo = require("./models/todo");
const todoRoutes = require("./routes/todoRoutes");

// app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.static(__dirname + "/public"));
mongoose.Promise = global.Promise;

//Connect to the database
mongoose.connect("mongodb://localhost/jsonapi", {
        useMongoClient: true
    }).then((success) => {})
    .catch((err) => {
        console.log(err.message);
    });

//Root route
app.get("/", (req, res) => {
    res.render("index.html");
})

app.use("/api/todos", todoRoutes);

app.listen(port, () => console.log(`Server Started at port ${port}`));