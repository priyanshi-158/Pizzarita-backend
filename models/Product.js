const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    dsc:{
        type:String,
        trim:true,
        required:true,
    },
    img:{
        type:String
    },
    price:{
        type:Number,
        required:true,
    },
    rate:{
        type:Number,
        required:true,
        default:5
    }
})
module.exports=mongoose.model("Product",productSchema);