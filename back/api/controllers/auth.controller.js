const User = require("../../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
Register=async (req, res) => {
    const userExist=await User.findOne({username:req.body.username})
    if(userExist)
    return res.status(400).send("username already taken")

    const salt= await bcrypt.genSalt(10)
    const hachedPassword = await bcrypt.hash(req.body.password,salt)
    req.body.password=hachedPassword
    const user = await User.create(req.body)
    .then(createdUser => {
          res.json({
              msg:"Created successfully",
              id:createdUser._id,
            
            });
           
      },
      
      )
      .catch(error => {
        res.json({
          err: error.message
        });
      })
    }

    get_Allusers= async (req, res) => {
        try{
        const user = await User.find()
      
        if(user.length===0)
        res.json({msg : "empty"})
        else
        res.json({ data: user })
      }
      catch(error){res.json({err:error.message})}
      };
      
      Login=async(req,res)=>{
        try{
        const user=await User.findOne({username:req.body.username})
     
        
        if(!user)
        return res.send("خطأ فى كلمة السر او اسم المستخدم")
        const validPass=await bcrypt.compare(req.body.password,user.password)
        if(!validPass)
        return res.send("خطأ فى كلمة السر او اسم المستخدم")
        if(!user.state)
        return res.send("هذا المستخدم غير فعال")
        const token = jwt.sign({_id:user._id},process.env.TOKEN)
        res.header('authToken',token).json({token:token,id:user._id});
      }  catch(error){res.json({err:error.message})}
    
    }
    Logout=async(req,res)=>{
      jwt.sign({_id:""},process.env.TOKEN)
      res.header('authToken',"").send("Logged out!");
    }
    module.exports = {Register,get_Allusers,Login,Logout}