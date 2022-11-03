const amenitiesModel = require('../Models/amenitiesModel');
const userModel = require('../Models/userModel');

const createUser = async (req, res) =>{
    try{
        //check required fields to create user
        if (!req.body.password || !req.body.email){
            return res.status(400).json({ 'message': 'Fill required entries' });

        }
        //create user
        const user = new userModel({
            email : req.body.email,
            password : req.body.password

        })
        //save user into database and send 200 response
        await user.save().then(res.status(200).json({ "message": `User ${user.id} saved successfully` }));;
        

    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const verifyEmail = async (req, res) =>{
    try{
        //find user with the request email
        const user = await userModel.findOne({email:req.body.email});

        //generate random 6 letter code 
        const code = Math.floor(Math.random() * (999999 - 123456 + 1)) + 123456;

        //save the generated code to the assigned user
        user.verificationCode = code;
        await user.save();

        //simplicity in this task we only console log the code to verify
        res.status(200).json({"message":"verification code sent successfully to your mail"});


    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const userSignUp = async (req, res) =>{
    try{
        const code = req.body.verificationCode;
        let user = await userModel.findOne({email:req.body.email});
        if(user){
            //request code must match user code to signup 
            if(user.code==code){
                 user = await userModel.findOneAndUpdate({email:req.body.email},{isVerified:true});
                res.json({'mess':'Verified succeffully'})

            }
            res.json({'mess':'Incorrect verification code'})

        }
        else{
            res.json({'mess':'No user found'})
        }



    }

    catch(err){
        return res.status(500).json({error:err.message});
    }
}


module.exports = {
    getAmenity,
    updateAmenity,
    deleteAmenity,
    createAmenity
}