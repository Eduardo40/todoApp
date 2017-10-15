const mongoose = require("mongoose");
const {
    Schema
} = require("mongoose");

const todoSchema = new Schema({
    name: {
        type: String,
        required: "Name can't be blank!"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: String,
        default: Date.now().toString()
    }
});

module.exports = mongoose.model("Todo", todoSchema);