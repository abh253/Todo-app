const express= require("express")
const app=express();
const cors = require("cors");
app.use(cors());

const {createTodoFormat,getTodoFormat,updateTodoFormat,deleteTodoFormat} = require("./types");
const todo=require("./db.js");
app.use(express.json());

app.post('/todo',async (req,res)=>{
    // check if it's correct type of data
    const createPayload=req.body;
    const parsedPayload=createTodoFormat.safeParse(createPayload);
    
    if(!parsedPayload.success){
        res.status(411).res({
            "msg":"wrong input"
        });
        return;
    }
    // get the todo from req. and add it in the database.
    const newTodo = new todo({
        title: createPayload.title,
        description: createPayload.description,
        status: createPayload.status? createPayload.status : false
    });
    await newTodo.save();
    res.status(201).json({
        "msg":"todo created successfully",
        "todo": newTodo
    });
});

app.get("/todos",async (req,res)=>{
    // first check if req has correct type of data
    // const createPayload=req.body;
    // const parsedPayload=getTodoFormat.safeParse(createPayload);
    
    // if(!parsedPayload.success){
    //     res.status(411).res({
    //         "msg":"wrong input"
    //     });
    //     return;
    // }
    // it will retrieve all the todos
    const reqTodo = await todo.find({});
    console.log(reqTodo);
    res.status(200).json({
        "msg":"todos retrieved successfully",
        "todos": reqTodo
    });
});


app.put('/todo-update',async (req,res)=>{
    const createPayload=req.body;
    const parsedPayload=updateTodoFormat.safeParse(createPayload);
    
    if(!parsedPayload.success){
        res.status(411).res({
            "msg":"wrong input"
        });
        return;
    }
    // get the id from req. and update it in the database.
    await todo.updateOne({_id:createPayload.id}, {...createPayload});
    res.status(200).json({
        "msg":"todo updated successfully"
    });
});           
app.put('/todo-status',async (req,res)=>{
    const createPayload=req.body;
    const parsedPayload=getTodoFormat.safeParse(updateTodoFormat);
    
    if(!parsedPayload.success){
        res.status(411).res({
            "msg":"wrong input"
        });
        return;
    }
    // get the id from req. and update it in the database.
    const updateResponse=await todo.updateOne({_id:createPayload.id}, {status:createPayload.status});
    res.status(200).json({
        "msg":"req send successfully",
        "updateRes": updateResponse
    });

});
app.delete('/todo-delete',async (req,res)=>{
    // first check if req has correct type of data
    const createPayload=req.body;
    const parsedPayload=deleteTodoFormat.safeParse(createPayload);
    
    if(!parsedPayload.success){
        res.status(411).json({
            "msg":"wrong input"
        });
        return;
    }
    // it will retrieve all the todos
    const responseTodo = await todo.deleteOne({_id:createPayload.id});
    console.log(responseTodo);
    res.status(200).json({
        "msg":"todos deleted successfully",
        "todos": responseTodo
    });

});

app.listen(3000);