//auth , isStudent, isAdmin , isVisitor
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req,res,next) =>{
    try{
        //Fetch Token [We can Fetch Token in Various Way]
        //Type : 1 [Directly From Req's Body]
        const token = req.body.token;
        //Type : 2 [From Cookie]
        // const token = req.cookies.token 
        //Type : 2 [From Header File]
        //const token = req.header('Authorization).replace('Bearer ','');
        
        //Token Validation
        if(!token){
            return res.status(400).json({
                success : false,
                message : 'Token is Missing'
            })
        }

        //Verify / Decode the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            //Print
            console.log(decode);

            //Set this token into the req.user for future Uses
            req.user = decode;
        }
        catch(err){
            return res.status(500).json({
                success : false,
                message : 'Something Went Wrong while decoding the Token'
            })
        }

        next(); //Go to next Stage / Middleware
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Something Went Wrong in auth Middleware'
        })
    }
};

exports.isStudent = (req,res,next) => {
    try{
        //Check whether the role is matching with Student  or not
        if(req.user.role !== 'Student'){
            return res.status(401).json({
                success : false,
                message : 'This Route is Only For Students'
            })
        }
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Something Went wrong in student Route'
        })
    }
};

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== 'Admin'){
            return res.status(401).json({
                success : false,
                message : 'This Route is Only For Admins'
            })
        }
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Something Went wrong in Admin Route'
        })
    }
};

exports.isVisitor = (req,res,next) => {
    try{
        if(req.user.role !== 'Visitor'){
            return res.status(401).json({
                success : false,
                message : 'This Route is Only For Visitor'
            })
        }
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Something Went wrong in Visitor Route'
        })
    }
};