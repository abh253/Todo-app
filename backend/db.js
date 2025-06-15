const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://admin:RTj2Jp2mCQWAkY6Q@cluster0.ktsjk8w.mongodb.net/todo-app");

const todoSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:{type:Boolean,default:false}
})

const todo= mongoose.model('Todo',todoSchema);

module.exports=todo;