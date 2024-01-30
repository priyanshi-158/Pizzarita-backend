const express=require("express");
const router=express.Router();
const {login,signup}=require("../controllers/auth");
const {contactUs}=require("../controllers/Contact")
const {addProduct,addToCart,deleteFromCart,getAllProducts,getSinglePizza}=require("../controllers/Product")
const {auth,isCustomer,isAdmin}=require("../middlewares/auth")
router.post("/login",login);
router.post("/signup",signup);
router.post("/addProduct",auth,isAdmin,addProduct)
router.post("/contactus",auth,isCustomer,contactUs);
// router.post("/addcart",auth,isCustomer,addToCart);
// router.post("/delcart",auth,isCustomer,deleteFromCart);
router.get("/getAllProducts",getAllProducts);
router.get("/getSingleProduct/:id",getSinglePizza);
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Admin Protected route reached"
    })
})
module.exports=router;