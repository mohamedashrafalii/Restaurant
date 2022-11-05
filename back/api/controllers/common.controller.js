
// const {addTargetValidation,editTargetValidation} = require("../../validations/medicineValidation")


function Create(Target) {return async (req, res) => {
//   const {error} = addTargetValidation(req.body)
//   if(error) return res.send(error.details[0].message) 

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
}}

function Read_by_id(Target){return async (req, res) => {
    Target.findById(req.params.id)
    .then(foundTarget => {
      if(!foundTarget)
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
    });
}}

function Read_by_userId(Target){return async (req, res) => {
  Target.find({userId:req.query.userId})
  
    .then((foundReceipt) => {
     
      if (foundReceipt.length === 0)
        return res.json("empty!")
     
      const { page = 1, limit = 10 } = req.query
      Target.find({userId:req.query.userId}).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit < 0 ? 0 : (page - 1) * limit)
        .then((receipts) => {
          res.json({
            size: foundReceipt.length,
            data: receipts,
          })
        })
        .catch((error) => {
          res.status(400).json({
            err: error.message,
          })
        })
    })
    .catch((error) => {
      res.status(400).json({
        err: error.message,
      })
    })
}}



//read all
function Get_all (Target){return async (req, res) => {
  
  Target.find()
    .then((foundReceipt) => {
     
      if (foundReceipt.length === 0)
        return res.json("empty!")
     
      const { page = 1, limit = 10 } = req.query
      Target.find().sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit < 0 ? 0 : (page - 1) * limit)
        .then((receipts) => {
          res.json({
            size: foundReceipt.length,
            data: receipts,
          })
        })
        .catch((error) => {
          res.status(400).json({
            err: error.message,
          })
        })
    })
    .catch((error) => {
      res.status(400).json({
        err: error.message,
      })
    })

}}


function Update(Target) {return async  (req, res) => {
  try{
    // const {error} = editTargetValidation(req.body)
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

function Delete(Target) {return async (req, res) => {
  try{ 
  const id = req.params.id;
  const deletedTarget = await Target.findByIdAndRemove(id) 
 
  res.json({msg:'Request was deleted successfully', data: deletedTarget });
  }
  catch(error){
    // console.log(error)
  }
}}
module.exports = {
    Create,
    Read_by_id,
    Get_all,
    Update,
    Delete,
    Read_by_userId
  
  };