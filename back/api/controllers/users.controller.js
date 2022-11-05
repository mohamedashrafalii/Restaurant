const User = require("../../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userValidation} = require('../../validations/userValidation')
getTheType=async (id)=>
{
  const user = await User.findOne({_id:id})
  //console.log(user)
  return user.type
}
addUser=async (req, res) => {
 // console.log( req.user._id)
  const userType= await getTheType(req.user._id)
  if(userType!=='admin')
  return  res.status(401).send("Not Authorized")
    const userExist=await User.findOne({username:req.body.username})
    if(userExist)
    return res.send("username already taken")
    // const {error} = userValidation(req.body)
    // if(error) return res.send(error.details[0].message) 
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
     getByUsername =async (req, res) => {
      const username = req.params.username
      User.find({username:username})
      .then(foundUSer => {
        res.json({
          msg: "This USer information",
          data: foundUSer
        });
      })
      .catch(error => {
        res.json({
          err: error.message
        });
      });
    };
     Update=async  (req, res) => {
      try{
        // const {error} = editTargetValidation(req.body)
        // if(error) return res.send(error.details[0].message) 
        // console.log(req.params)
      const targetId = req.params.id;
      
      
      const target =  await User.findById(targetId)
      if(!target) return res.status(422).send({error:  'Id does not exist'})
      
      //const isValidated = validator.requestUpdateValidation(req.body)
     // if (isValidated.error) return   res.status(400).send({ error: isValidated.error.details[0].message })
      if(req.body.newPassword)
      {
        if(req.body.password)
       { let validPass= await bcrypt.compare(req.body.password,target.password)
        if(!validPass)
        return res.send("كلمة السر خطأ")
      }
      // console.log("سسسس")
      const salt= await bcrypt.genSalt(10)
      //  console.log(req.body.password,req.body.newPassword)
      const hachedPassword = await bcrypt.hash(req.body.newPassword,salt)
      // console.log(hachedPassword)
      req.body.password=hachedPassword
      // console.log(hachedPassword)
      }
     
      
      const updateUser = await User.updateOne({'_id':targetId},req.body)
      // console.log(updateUser)
      res.json({msg: 'Target updated successfully' , data: target });
      }
      catch(error)
      {
        // console.log(error)
      }
    }
    get_Allusers= async (req, res) => {
        try{
          // const userType= await getTheType(req.user._id)
          // if(userType!=='admin')
          // return  res.status(401).send("Not Authorized")
        const user = await User.find()
      
        if(user.length===0)
        res.json({msg : "empty"})
        else
        res.json({ data: user })
      }
      catch(error){res.json({err:error.message})}
      };
      delete_user =  async (req, res) => {
        try{ 
          const userType= await getTheType(req.user._id)
          if(userType!=='admin')
          return  res.status(401).send("Not Authorized")
        const id = req.params.id;
        const deletedUser = await User.findByIdAndRemove(id) 
       
        res.json({msg:'Request was deleted successfully', data: deletedUser });
        }
        catch(error){
          res.json({err:error.message})
        }
      }
      module.exports = {addUser,get_Allusers,delete_user,getByUsername,Update}