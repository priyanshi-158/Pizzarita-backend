const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.auth=(req,res,next)=>{
    try{
        const token=req.headers["authorization"] || req.body.token;
        if(!token)
        {
            return res.status(400).json({
                success:false,
            message:"Login again"
            });
        }
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }
        catch(err){
            return res.status(400).json({
                success:false,
            message:"Token Invalid"
            });
        }
        next();
    }
    catch(err){
        return res.status(400).json({
            success:false,
        message:"Something Went Wrong"
        });
    }
}
exports.isCustomer=(req,res,next)=>{
    try{
        if(req.user.role!="Customer")
        {
            return res.status(400).json({
                success:false,
            message:"Customer Only"
            });
        }
        next();
    }
    catch(err){
        return res.status(400).json({
            success:false,
        message:"Something Went Wrong"
        });
    }
}
exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!="Admin")
        {
            return res.status(400).json({
                success:false,
            message:"Admin Only"
            });
        }
        next();
    }
    catch(err){
        return res.status(400).json({
            success:false,
        message:"Something Went Wrong"
        });
    }
}