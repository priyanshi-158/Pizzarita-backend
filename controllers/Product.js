const Product=require("../models/Product")
require("dotenv").config();
const cloudinary=require("cloudinary").v2;
async function uploadToCloudinary(file,folder,quality)
{
    const options={folder};
    options.resource_type="auto";
    if(quality)
    {
        options.quality=quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}
exports.addProduct=async(req,res)=>{
    try{
        const {name,dsc,price,rate}=req.body;
        const file=req.files.imagefile;
        console.log(file);
        const supportedTypes=["jpg","jpeg","png","webp"];
        const fileType=file.name.split('.')[1].toLowerCase();
        if(!supportedTypes.includes(fileType))
        {
            res.status(400).json({
                success:false,
                data:"File not supported"
            })
        }
        console.log('ok');
       const response=await uploadToCloudinary(file,"backend");
       console.log(response)
       const fileData=await Product.create({
        name,
        dsc,
        price,
        rate,
        img:response.secure_url,
       })
        res.json({
            success:true,
            message:"Product Added",
            data:fileData
        })
    }catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}
exports.getAllProducts=async(req,res)=>{
    try{
        const allPizza=await Product.find({})
        return res.status(200).json({
            success: true,
            data: allPizza,
          })
    }
    catch(err)
    {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}
exports.getSinglePizza=async(req,res)=>{
    try{
        const {id}=req.params;
        const SinglePizza=await Product.findById({_id:id})
        return res.status(200).json({
            success: true,
            data: SinglePizza,
          })
    }
    catch(err)
    {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}

exports.addToCart=async(req,res)=>{
    try{
        const {id}=req.body;
        const user_id=req.user.id;
        const cart = await User.findOneAndUpdate(
            { _id: user_id },
            { $push: { cartItems:id } },
            { new: true }
          )
          if(!cart)
          {
            return res
          .status(500)
          .json({ success: false, error: "User not found" })
          }
          return res.status(200).json({
            success: true,
            message:"Added to cart"
          })
    }
    catch(err)
    {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}
exports.deleteFromCart=async(req,res)=>{
    try{
        const {id}=req.body;
        const user_id=req.user.id;
        const cart = await User.findOneAndUpdate(
            { _id: user_id },
            { $pull: { cartItems:id } },
            { new: true }
          )
          if(!cart)
          {
            return res
          .status(500)
          .json({ success: false, error: "User not found" })
          }
          return res.status(200).json({
            success: true,
            message:"Deleted from cart"
          })
    }
    catch(err)
    {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}