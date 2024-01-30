const User=require("../models/User")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
            message:"User already exists"
            });
        }
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }
        catch(err){
        res.status(400).json({
            success:false,
            data:"Password hashing issues"
        })
        }
        let user=await User.create({
            name,email,password:hashedPassword,role,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`
        })
        const payload={
            email:user.email,
            id:user._id,
            role:user.role
        }
        let token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        });
        // user=user.toObject();
        user.token=token;
        user.password=undefined;
        const options={
            expires: new Date(Date.now()+2*60*60*1000),
            httpOnly:true
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged In"
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
            message:"Details incomplete"
            });
        }
        let user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                success:false,
            message:"User doesn't exists"
            });
        }
        const payload={
            email:user.email,
            id:user._id,
            role:user.role
        }
        if(await bcrypt.compare(password,user.password))
        {
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            user=user.toObject();
            user.token=token;
            user.password=undefined;
            const options={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In"
            })
        }
        else{
            return res.status(400).json({
                success:false,
            message:"Incorrect Password"
            });
        }
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}