const userModel = require('../Models/userModel');
const bcrypt = require ('bcrypt');
const bcryptjs=require("bcryptjs");
const todoModel = require('../Models/todoModel');

const createUser = async (req, res) =>{
    try{
        //check required fields to create user
        if (!req.body.password || !req.body.name){
            return res.status(400).json({ 'message': 'Fill required entries' });

        }
        password = await bcrypt.hash(req.body.password, 10)
        //create user
        const user = new userModel({
            name : req.body.name,
            password : password

        })
        //save user into database and send 200 response
        await user.save().then(res.status(200).json({ "message": `User ${req.body.name} saved successfully` }));;
        

    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const deleteUser = async (req, res) =>{
    try{
        if(!req.body.id){
            res.json({'mess':'Enter user ID'})
        }
        const user = await userModel.findOne({id:req.body.id})
        if(user){
            await userModel.deleteOne({id:user.id})
            res.json({'mess':'User deleted successfully'})
        }
        else{
            res.json({'mess':"No user found with this ID"})
        }
        
    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const getUserInfo = async (req, res) =>{
    try{
     if(!req.body.id){
        res.json({'mess':'Please enter user ID'})
     }
     const user = await userModel.findOne({id:req.body.id})
     if(user){
        const todos = await todoModel.find({userID:user.id})
        res.json({user:user,userToDo:todos})
     }
     else{
        res.json({'mess':'No user found with this ID'})
     }

    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
}

module.exports = {
    createUser,
    deleteUser,
    getUserInfo

}