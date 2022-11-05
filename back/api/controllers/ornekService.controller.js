function Read_by_service(Target){return async (req, res) => {

    Target.find({mainService:req.body.mainService,state:true})
    
      .then((target) => {
       
        // if (target.length === 0)
        //   return res.json("empty!")
       
            res.json({
            //   size: target.length,
              data: target
            })
          })
        
      .catch((error) => {
        res.status(400).json({
          err: error.message
        })
      })
  }}

  function Read_by_name(Target){return async (req, res) => {

    Target.find({nameAr:req.body.nameAr,state:true})
    
      .then((target) => {
       
        // if (target.length === 0)
        //   return res.json("empty!")
       
            res.json({
            //   size: target.length,
              data: target
            })
          })
        
      .catch((error) => {
        res.status(400).json({
          err: error.message
        })
      })
  }}

  
  module.exports = {
    Read_by_service,
    Read_by_name
  }