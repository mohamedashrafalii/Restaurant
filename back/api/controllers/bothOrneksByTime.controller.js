const Ornek = require("../../models/ornek.model")
const OrnekService = require("../../models/ornekService.model")
const Read_Orneks = async (req, res) => {
  try {
    const startDate = new Date((req.query.startDate+"").replace("%"," "))
    const endDate = new Date((req.query.endDate+"").replace("%"," "))
    // console.log(startDate,endDate)
    if(startDate>endDate)
    return res.status(400).json("رجاء ادخال تاريخ البدأ اقل من تاريخ الانتهاء")
    const userId = req.query.userId
    let orneks = null
    if(userId&&userId>=0)
     {orneks = await Ornek.find({ userId })
     if(!orneks||orneks.length==0) return res.status(400).json(" لا يوجد فواتير خلال التواريخ المختارة")
  }
     else
     orneks = await Ornek.find()
    
    // console.log(startDate,endDate)
    //get receipts of that store in the range between start date and end date both inclusive ignorng seconds
    let orneks2 = orneks.filter(ornek => new Date(ornek.time) - startDate >= 0 
                                &&  new Date(ornek.time)-(new Date(ornek.time).getSeconds()*1000) - endDate <=0)
                                let orneksSize = orneks2.length
                                
                                if(!orneks2||orneks2.length==0) return res.status(400).json(" لا يوجد فواتير خلال التواريخ المختارة")
                              
                                const { page = 1, limit = 10 } = req.query
                                // console.log(orneks2)
                                // orneks2.sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit < 0 ? 0 : (page - 1) * limit)
                                //   .then((receipts) => {
                                //     res.json({
                                //       size: orneksSize,
                                //       data: receipts,
                                //     })})
    res.json({data:orneks2})
  }
  catch (error) {
      // console.log(error)
    return res.status(400).json({
      err: error.message
    });
  }
  }

  const Read_Service_Orneks = async (req, res) => {
    try {
      const startDate = new Date((req.query.startDate+"").replace("%"," "))
      const endDate = new Date((req.query.endDate+"").replace("%"," "))
      // console.log(startDate,endDate)
      if(startDate>endDate)
      return res.status(400).json("رجاء ادخال تاريخ البدأ اقل من تاريخ الانتهاء")
      const userId = req.query.userId
      let orneks = null
      
      if(userId&&userId>=0)
       {
        
        orneks = await OrnekService.find({ userId })
       if(!orneks||orneks.length==0) return res.status(400).json(" لا يوجد فواتير خلال التواريخ المختارة")
    }
       else
       orneks = await OrnekService.find()
      
      // console.log(startDate,endDate)
      //get receipts of that store in the range between start date and end date both inclusive ignorng seconds
      let orneks2 = orneks.filter(ornek => new Date(ornek.time) - startDate >= 0 
                                  &&  new Date(ornek.time)-(new Date(ornek.time).getSeconds()*1000) - endDate <=0)
                                  let orneksSize = orneks2.length
                                  
                                  if(!orneks2||orneks2.length==0) return res.status(400).json(" لا يوجد فواتير خلال التواريخ المختارة")
                                
                                  const { page = 1, limit = 10 } = req.query
                                  // console.log(orneks2)
                                  // orneks2.sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit < 0 ? 0 : (page - 1) * limit)
                                  //   .then((receipts) => {
                                  //     res.json({
                                  //       size: orneksSize,
                                  //       data: receipts,
                                  //     })})
      res.json({data:orneks2})
    }
    catch (error) {
        console.log(error)
      return res.status(400).json({
        err: error.message
      });
    }
  }

  module.exports = 
  {
    Read_Orneks,Read_Service_Orneks
  }