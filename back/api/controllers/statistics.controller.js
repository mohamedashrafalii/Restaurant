const Ornek = require("../../models/ornek.model")
const OrnekService = require("../../models/ornekService.model")
const TotalSpendings = async (req, res) => {
    try {
      // console.log(new Date((req.query.startDate)),req.query.endDate,req.query.startDate,new Date((req.query.endDate)))
      const startDate = new Date((req.query.startDate+"").replace("%"," "))
      const endDate = new Date((req.query.endDate+"").replace("%"," "))
     
      if(startDate>endDate)
      return res.status(400).json("رجاء ادخال تاريخ البدأ اقل من تاريخ الانتهاء")
      const userId = req.query.userId
      let orneks = null
      if(userId)
       {orneks = await Ornek.find({ userId })
       if(!orneks||orneks.length===0) return res.status(400).json("لا يوجد تقارير لهذا المستخدم")
    }
       else
       orneks = await Ornek.find()
      //  console.log(orneks)
      
      //get receipts of that store in the range between start date and end date both inclusive ignorng seconds
      let orneks2 = orneks.filter(ornek => new Date(ornek.time) - startDate >= 0 
                                  &&  new Date(ornek.time)-(new Date(ornek.time).getSeconds()*1000) - endDate <=0)
      
      if(orneks2.length===0)
      return res.status(400).json("لا يوجد تقارير خلال هذه التواريخ")
      let totalSum = 0
          //get the total prices of the filtered orneks then sum them
          // console.log(orneks2)
      orneks3 = orneks2.map(ornek => ornek.total)
      for (var i = 0; i < orneks3.length; i++) { totalSum += orneks3[i] }

      let totalPaid = 0
      orneks4 = orneks2.map(ornek => ornek.paid)
      for (var i = 0; i < orneks4.length; i++) { totalPaid += orneks4[i] }

      let totalRemaining = 0
      orneks5 = orneks2.map(ornek => ornek.remainder)
      for (var i = 0; i < orneks5.length; i++) { totalRemaining += orneks5[i] }
     
      res.status(200).json({ orneks2,totalSum,totalPaid,totalRemaining })
    }
    catch (error) {
      return res.status(400).json({
        err: error.message
      });
    }
  }

  const TotalSpendings2 = async (req, res) => {
    try {
      const startDate = new Date((req.query.startDate+"").replace("%"," "))
      const endDate = new Date((req.query.endDate+"").replace("%"," "))
      // console.log(startDate,endDate)
      if(startDate>endDate)
      return res.status(400).json("رجاء ادخال تاريخ البدأ اقل من تاريخ الانتهاء")
      const userId = req.query.userId
      let orneks = null
      if(userId)
       {orneks = await OrnekService.find({ userId })
       if(!orneks||orneks.length==0) return res.status(400).json("لا يوجد تقارير لهذا المستخدم")
    }
       else
       orneks = await OrnekService.find()
      
      if(req.query.subDepartment)
      {let subDepartment = req.query.subDepartment
      let users = await User.find({subDepartment})
      // console.log(users)
      var userSet = new Set()

      users.map(user=>userSet.add(user.username))
      // console.log(userSet)

      orneks  = orneks.filter(ornek => userSet.has(ornek.username)
      
      )
      // console.log(orneks)
      }//get receipts of that store in the range between start date and end date both inclusive ignorng seconds
      let orneks2 = orneks.filter(ornek => new Date(ornek.time) - startDate >= 0 
                                  &&  new Date(ornek.time)-(new Date(ornek.time).getSeconds()*1000) - endDate <=0)
                                  if(orneks2.length===0)
                                  return res.status(400).json("لا يوجد تقارير خلال هذه التواريخ")
                                  let totalSum = 0
          //get the total prices of the filtered orneks then sum them
    
      orneks3 = orneks2.map(ornek => ornek.total)
      for (var i = 0; i < orneks3.length; i++) { totalSum += orneks3[i] }

      let totalPaid = 0
      orneks4 = orneks2.map(ornek => ornek.paid)
      for (var i = 0; i < orneks4.length; i++) { totalPaid += orneks4[i] }

      //  console.log(orneks,orneks2,totalSum,totalPaid)
      res.status(200).json({ orneks2,totalSum,totalPaid })
    }
    catch (error) {
      return res.status(400).json({
        err: error.message
      });
    }
  }
  function addDays(currentDate,days) {
    var date = new Date(currentDate);
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = addDays(currentDate,1);
    }
    return dateArray;
}

const TotalSpendings3 = async (req, res) => {
  try {
    const startDate = new Date((req.query.startDate+"").replace("%"," "))
    const endDate = new Date((req.query.endDate+"").replace("%"," "))
    
    if(startDate>endDate)
    return res.status(400).json("رجاء ادخال تاريخ البدأ اقل من تاريخ الانتهاء")
    const userId = req.query.userId
    let orneks = null
    if(userId)
     {orneks = await OrnekService.find({ userId })
     if(!orneks||orneks.length==0) return res.status(400).json("لا يوجد تقارير لهذا المستخدم")
  }
     else
     orneks = await OrnekService.find()
    
    if(req.query.subDepartment)
    {let subDepartment = req.query.subDepartment
    let users = await User.find({subDepartment})
    // console.log(users)
    var userSet = new Set()

    users.map(user=>userSet.add(user.username))
    // console.log(userSet)

    orneks  = orneks.filter(ornek => userSet.has(ornek.username)
    
    )
    // console.log(orneks)
    }
console.log(new Date(new Date(new Date(startDate.setHours(0)).setMinutes(0)).setSeconds(0)),endDate)
    let startArray = getDates(
      new Date(new Date(new Date(startDate.setHours(0)).setMinutes(0)).setSeconds(0)),
      new Date(new Date(new Date(endDate.setHours(0)).setMinutes(0)).setSeconds(0)))
    
    let endArray = getDates(
      new Date(new Date(new Date(startDate.setHours(23)).setMinutes(59)).setSeconds(59)),
      new Date(new Date(new Date(endDate.setHours(23)).setMinutes(59)).setSeconds(59))
    )
    
    console.log(startArray)
    console.log(endArray)
    let totals = new Array()
    let dates = new Array()
    for(var i = 0  ; i <startArray.length;i++)
    {
        totals.push(getTotal(orneks,startArray[i],endArray[i]))
        dates.push(startArray[i].getDate())
    }
    console.log(totals)
    console.log(dates)

    var sums = dates.map(function(e, i) {
      return [e, totals[i]];
    });


    //  console.log(orneks,orneks2,totalSum,totalPaid)
    res.status(200).json({ sums})
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({
      err: error.message
    });
  }
}

function getTotal(orneks,startDate,endDate)
{
  let orneks2 = orneks.filter(ornek => new Date(ornek.time) - startDate >= 0 
                                &&  new Date(ornek.time)-(new Date(ornek.time).getSeconds()*1000) - endDate <=0)
                                if(orneks2.length===0)
                                return 0
                                let totalSum = 0
        //get the total prices of the filtered orneks then sum them
  
    orneks3 = orneks2.map(ornek => ornek.total)
    for (var i = 0; i < orneks3.length; i++) { totalSum += orneks3[i] }
    return totalSum
}
  module.exports = 
  {
    TotalSpendings,TotalSpendings2,TotalSpendings3
  }