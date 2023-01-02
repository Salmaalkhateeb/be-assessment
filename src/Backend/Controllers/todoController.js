const userModel = require('../Models/userModel');
const todoModel = require('../Models/todoModel')

const createTodo = async (req, res) =>{
    try{
        //check required fields to create user
        if (!req.body.userID || !req.body.info){
            return res.status(400).json({ 'message': 'Fill required entries' });

        }
        const user = await userModel.findOne({id:req.body.userID})
        if(!user){
            res.json({'mess':'No user found with this ID'})
        }
        //create toDo
        const todo = new todoModel({
            userID : req.body.userID,
            info : req.body.info,

        })
        //save todo into database and send 200 response
        await todo.save().then(res.status(200).json({ "message": `ToDo saved successfully` }));;
        

    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const updateTodo = async (req, res) =>{
    try{
        if(!req.body.id && !req.body.info){
            res.josn({'mess':'Enter todo ID'})
        }
        const todo = await todoModel.findOne({id:req.body.id})
        if(todo){
            await todoModel.findOneAndUpdate({id:req.body.id},{info:req.body.info})
            const todo = await todoModel.findOne({id:req.body.id})
            res.json(todo)

        }
        else{
            res.json({'mess':'No todo found with this ID'})
        }

        
    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const deleteTodo = async (req, res) =>{
    try{
        if(!req.body.id){
            res.json({'mess':'Enter todo ID'})
        }
        const todo = await todoModel.findOne({id:req.body.id})
        if(todo){
            await todoModel.deleteOne({id:todo.id})
            res.json({'mess':'Todo deleted successfully'})
        }
        else{
            res.json({'mess':"No todo found with this ID"})
        }

        
    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const getTodo = async (req, res) =>{
    try{
        if(!req.body.id){
            res.json({'mess':'Enter todo ID'})
        }
        const todo = await todoModel.findOne({id:req.body.id})
        if(!todo){
            res.json({'mess':'No todo found with this ID'})
        }
        res.json(todo)


    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
}


 

module.exports = {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodo,

}