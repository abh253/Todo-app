const zod = require("zod");


const createTodoFormat= zod.object({
    title:zod.string(),
    description:zod.string()
})
const updateTodoFormat =zod.object({
    id:zod.string(),
    title:zod.string().optional(),
    description:zod.string().optional(),
    status:zod.boolean().optional()
})
const getTodoFormat=zod.object({
    id:zod.string().optional()
})
const deleteTodoFormat=zod.object({
    id:zod.string().optional()
})
module.exports={createTodoFormat,updateTodoFormat,getTodoFormat,deleteTodoFormat};

