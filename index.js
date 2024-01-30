const express=require("express");
const app=express();
require('dotenv').config();
const PORT=process.env.PORT || 4000;
const cloudinary=require("./config/cloudinary");
const fileupload=require("express-fileupload");
const user=require("./routes/user");
const dbConnect=require("./config/database");
const cookieParser = require("cookie-parser");
const cors=require("cors");

app.use(fileupload(
    {
        useTempFiles:true,
        tempFileDir:'/tmp/'
    }
));

cloudinary.cloudinaryConnect();

app.use(express.json());//middleware
app.use(cookieParser());
app.use(
	cors({
		origin:"https://pizza-ordersite.vercel.app",
		credentials:true,
	})
)
app.use("/api/v1",user);
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT} successfully`);
})
//connect to db
dbConnect();
//default route
// Default route
app.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.send('<h1>HOMEPAGE</h1>');
});
