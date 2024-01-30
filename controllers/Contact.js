const mailSender=require('../utils/mailSender');
const {contactUsEmail}=require('../mail/templates/ContactUsEmail');
const {contactTeamEmail}=require('../mail/templates/ContactTeamEmail');

require("dotenv").config();


exports.contactUs=async(req,res)=>{

    try{
        const {name,email,concern}=req.body;
  
           try{
            const mailToContactTeam=await mailSender(
                process.env.TEAM_USER,
                "Message By User",
                contactTeamEmail(name,email,concern)
                );
           
           }catch(err){
              console.log(err);
           }
    
        const emailRes = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(name,email,concern)
          )
          console.log("Email Res ", emailRes);


          return res.json({
            success: true,
            message: "Email send successfully",
          })

           

 
    }catch(err){
       
     console.error(err);
 
     return res.status(500).json({
         success:false,
         message:'user not created try again',
     })
    
    
    }
 
 }