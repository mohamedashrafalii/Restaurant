const {addTargetValidation,updateTargetValidation} = require("../../validations/patientValidation")

function CreatePatient(Target){

  return async(req,res)=>{
  //   const {error} = addTargetValidation(req.body)
  // if(error) return res.send(error.details[0].message) 
      if(req.body.type ==="ضباط")
      {
          req.body.rate=3
          req.body.ticketPrice=0
      }
      else if(req.body.type === "عائلات ضباط")
      {
        req.body.rate=3
        req.body.ticketPrice=5

      }
    else if(req.body.type ==="ضباط صف")
      {
          req.body.rate=2
          req.body.ticketPrice=0
      }
      else if(req.body.type === "عائلات صف")
      {
        req.body.rate=2
        req.body.ticketPrice=3
      }
      else if(req.body.type === "والد/والدة صف")
      {
        req.body.rate=1
        req.body.ticketPrice=5
      }
      else if(req.body.type === "والد/والدة ضباط")
      {
        req.body.rate=1
        req.body.ticketPrice=10
      }
      else
      {
        req.body.rate=0
          req.body.ticketPrice=0
      }
      req.body.percentageToPay=1
      const target = await Target.create(req.body)

.then(createdTarget => {
      res.json({
          msg:"Created successfully",
          id:createdTarget._id,
          data:createdTarget
        });
       
  },
  
  )
  .catch(error => {
    res.json({
      err: error.message
    });
  });
  }
} 

function Update(Target) {return async  (req, res) => {
try{
  // const {error} = updateTargetValidation(req.body)
  // if(error) return res.send(error.details[0].message) 
  // console.log(req.params)
const targetId = req.params.id;


const target =  await Target.findById(targetId)
if(!target) return res.status(422).send({error:  'Id does not exist'})

//const isValidated = validator.requestUpdateValidation(req.body)
// if (isValidated.error) return   res.status(400).send({ error: isValidated.error.details[0].message })
const updateTarget = await Target.updateOne({'_id':targetId},req.body)
res.json({msg: 'Target updated successfully' , data: target });
}
catch(error)
{
  // console.log(error)
}
}}
function GetByMilitaryId(Target){
    return async(req,res)=>{
      // console.log(req.query.type)
      
        Target.find({militaryNumber:req.params.id,type:req.query.type}
        // &&({militaryNumber:req.params.id})
            )
        .then(foundTarget => {
          if(!foundTarget||foundTarget.length==0)
          res.json({
            msg:"غير موجود"})
            else
          res.json({
            data: foundTarget[0]
          });
        })
        .catch(error => {
          res.json({
            err: error.message
          });
        });}



}

function GetByMilitaryIdOnly(Target){
  return async(req,res)=>{
    // console.log(req.query.type)
    
      Target.find({militaryNumber:req.params.id}
      // &&({militaryNumber:req.params.id})
          )
      .then(foundTarget => {
        if(!foundTarget||foundTarget.length==0)
        res.json({
          msg:"غير موجود"})
          else
        res.json({
          data: foundTarget
        });
      })
      .catch(error => {
        res.json({
          err: error.message
        });
      });}



}
module.exports = {
    CreatePatient,GetByMilitaryId,Update,GetByMilitaryIdOnly
}