const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//SignUP
exports.signUp = async(req,res) => {
    try{
        //Fetch Information
        const {name,email,phoneNumber,password,confirmPassword,role} = req.body;

        //Validation
        if(!name || !email ||!phoneNumber || !password || !confirmPassword || !role){
            return res.status(400).json({
                success : false,
                message : "Enter the Details Carefully",
            })
        }

        //Check Whether the email is Present or Not in Database
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : 'User is Already Exist',
            })
        }

        //Match Password and ConfirmPassword
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : 'Password Does not Matched'
            })
        }

        //Hash The Password
        let hashPass;
        try{
            hashPass = await bcrypt.hash(password,10);
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success : false,
                message : 'Something went wrong while Hashing the Password'
            })
        }

        //Create an Entry in Database
        const newUser = await User.create({name,email,phoneNumber,password : hashPass,role});

        //Return response
        res.status(200).json({
            success : true,
            message : 'Entry Created',
            data : newUser,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong while User Sigining Up'
        })
    }
};

//Login
exports.logIn = async(req,res) =>{
    try{
        //Fetch Information
        const {email,password} = req.body;
        //Check whether the email is Present in the database or Not
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success : false,
                message : 'User Not exist so Please Signup First'
            })
        }
        //If user is Present in DB
        //Now check whether the Password is matching or not
        //If Matched
        if(await bcrypt.compare(password,user.password)){
            const abhishek = {
                email : user.email,
                id : user._id,
                role : user.role
            }
            //create Token
            const token = jwt.sign(abhishek,process.env.JWT_SECRET,{
                expiresIn : '2h'
            })
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 2 * 60 * 60 * 1000),
                httpOnly : true
            }
            //Create Cookie and attach Token into the Cookie
            res.cookie('Token',token,options).status(200).json({
                success : true,
                user,
                message : 'You are Successfully Logged In'
            })
        }   
        else{ //Not Matched
            return res.status(400).json({
                success : false,
                message : "Incorrect Password"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong while User Logging'
        })
    }
};