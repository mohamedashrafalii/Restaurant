import React, { Component } from "react"
import axios from "axios"
import {  Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from "reactstrap";
import staticVariables from "../../statics.json"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Pagination from '@mui/material/Pagination';
import ReactToPrint from 'react-to-print';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './CSS.css'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


class Ornek extends Component {

  state={
    ticketDefault:null,
    chosenPatientName:"",
    month:0,
    length:10,
    page:1,
    limit:10,
    ornek:[],
    patientNumber:null,
    patientName:null,
    needed:null,
    paid:null,
    remainder:null,
    ticketPrice:null,
    rate:null,
    total:null,
    time:null,
    printCopies:1,
    patientType:"",
    militaryNumber:"",
    patientsNames:[],
    newOrnek:{
        patientNumber:null,
        militaryNumber:null,
        rotba:null,
        type:null,
        patientName:null,
        needed:null,
        paid:null,
        priceBeforeDisc:null,
        remainder:null,
        ticketPrice:null,
        rate:null,
        total:null,
        time:null,
        subPatientName:null,
        username:localStorage.getItem("username"),
        ornekType:"جديد",
        percentageToPay:1
     
    },
    editOrnekData: {
        patientNumber:null,
        patientName:null,
        needed:null,
        paid:null,
        remainder:null,
        ticketPrice:null,
        rate:null,
        total:null
          },
    newOrnekModal: false,
    editOrnekModal: false,
    patientNumberModal: false,
    printModal:false

  }

  toggleNewOrnektModal() {
    this.setState({
      newOrnekModal: ! this.state.newOrnekModal
    });
  }
  openPrintModal() {
    this.setState({
      printModal: true
    });
  }
  handlePrintModal() {
    if(this.state.printCopies>1)
    this.setState({
      printCopies:this.state.printCopies-1,printModal: true
    });
    else
    {
      this.setState({
        printModal: false,newOrnek:{}
      });
      window.location.reload(false)
    }
  }

  togglePrintModal() {
   
    this.setState({
      printModal: !this.state.printModal
    });
    
  }
  togglePatientNumberModal() {
    this.setState({
      patientNumberModal: ! this.state.patientNumberModal
    });
  }

  toggleEditOrnekModal() {
    this.setState({
      editOrnekModal: ! this.state.editOrnekModal
    });
  }
  getOrneks = async  ()=> {
    let {page,limit} = this.state
    let url="";
    const userId= localStorage.getItem("userId")
    if(localStorage.getItem("type")==="admin")
    url = staticVariables.backendUrl+"/ornek?limit="+limit+"&page="+page
    else
    url=staticVariables.backendUrl+"/ornek/userId?limit="+limit+"&page="+page+"&userId="+userId
    
    
    const res = await axios.get(
     url
      ,{headers: { authToken : localStorage.getItem("token") }}
      );
    this.setState({ ornek: res.data.data ,length:Math.ceil(res.data.size/limit)});

  };
  deleteOrnek=async(id)=> {

    await axios.delete(staticVariables.backendUrl+"/ornek/delete/" + id
    ,{headers: { authToken : localStorage.getItem("token") }}
    )
    .then(() => {

     this.getOrneks()
    })
    .catch(error=>{alert(error.message)});

  }


  addOrnek=async()=>{
    let{newOrnek} = this.state

    var curDate = new Date();
                var curDateStr =(curDate.getMonth()+1)  +"/"+ curDate.getDate() + "/" + curDate.getFullYear() +" " + curDate.getHours()+":"+curDate.getMinutes()+":"+curDate.getSeconds()
                newOrnek.time = curDateStr
    newOrnek.userId = localStorage.getItem("userId")
    newOrnek.username = localStorage.getItem("username")
    if(this.state.month<1)
    return alert("يجب ادخال عدد الشهور")
    if((!this.state.newOrnek.priceBeforeDisc)&&(isNaN(this.state.newOrnek.paid)||this.state.newOrnek.paid<0))
        return alert(" المدفوع يجب ان يكون ارقام موجبة")
        if((!this.state.newOrnek.paid)&&(isNaN(this.state.newOrnek.priceBeforeDisc)||this.state.newOrnek.priceBeforeDisc<1))
        return alert(" المدفوع يجب ان يكون ارقام موجبة")
    if(this.state.newOrnek.paid>this.state.newOrnek.needed*2)
        return alert("غير مسموح بهذا العدد")
    this.setState({newOrnek},async()=>
   { 
    await axios
    .post(
      staticVariables.backendUrl+"/ornek/add/",
      this.state.newOrnek
      ,{headers: { authToken : localStorage.getItem("token") }}
    )
    .then((response) => {
     
      if(response.data.msg!=="Created successfully")
      return alert(response.data)
      this.setState({ newOrnekModal: false,printModal:true
        }
      )
      toast.success("تم انشاء البون بنجاح");
      this.getOrneks()
      
    })
  })
  
    .catch(error => {
      alert(error.message)
    }
    
    )
  }
  // }
    // )

//   await axios
//   .post(
//     staticVariables.backendUrl+"/ornek/add/",
//     this.state.newPatient
//     ,{headers: { authToken : localStorage.getItem("token") }}
//   )
//   .then((response) => {
//     console.log(response)
//     if(response.data.msg!=="Created successfully")
//     return alert(response.data)
//     let { ornek } = this.state;
//     this.getOrneks()

//     this.setState({ ornek, newPatientModal: false, newOrnek: {
//       patientNumber:null,
//       patientName:null,
//       needed:null,
//       paid:null,
//       remainder:null,
//       ticketPrice:null,
//       rate:null,
//       total:null,
//       time:null,
//       username:localStorage.getItem("username")
        
      
//   }}

//     )
//     this.toggleNewOrnektModal()
//     this.togglePrintModal()
//   })

//   .catch(error => {
//     alert(error.message)
//   })


// }

      updateOrnek = async()=>{
      let {type} = this.state.editOrnekData;
      try{

         await axios.put(staticVariables.backendUrl+"/ornek/" + this.state.editOrnekData.id, 
      {headers: { authToken : localStorage.getItem("token") }}
      )
      .then((response) =>
      {  
        if(response.data.msg!=="Target updated successfully")
    return alert(response.data)
        this.getOrneks()
        this.setState({
          editOrnekModal: false, editRequestData: { id: "",
          patientNumber:null,
          patientName:null,
          needed:null,
          paid:null,
          remainder:null,
          ticketPrice:null,
          rate:null,
          total:null
      }})
      
      })}


     catch(error)
     {
     
      alert(   error)
     }
     }
    editOrnek=async( id )=> {
      this.setState({
        editOrnekData: { id }, editOrnekModal: ! this.state.editOrnekModal
      });

     }

     handlePageChange(e,value)
     {

      let { page } = this.state;

      page = value;
     
      this.setState({ page },()=>{this.getOrneks()})
     
     }

     handlePatientNumber = async()=>{
        let {newOrnek} = this.state
        if(this.state.newOrnek.patientNumber<0||isNaN(this.state.newOrnek.patientNumber))
        return alert("رقم المريض يجب ان يكون ارقام موجبة")
        await axios.get(
            staticVariables.backendUrl+"/patient/"+this.state.newOrnek.patientNumber
            ,{headers: { authToken : localStorage.getItem("token") }}
            ).then((response)=>{
              if(response.data.msg==="غير موجود")
              return alert("غير موجود")
                newOrnek.patientName = response.data.data.name
                newOrnek.ticketPrice = response.data.data.ticketPrice
                newOrnek.rate = response.data.data.rate
                newOrnek.needed = response.data.data.neededNumber
                newOrnek.rotba = response.data.data.rotba
                newOrnek.type = response.data.data.type
                newOrnek.percentageToPay = response.data.data.percentageToPay
                newOrnek.subPatientName =  response.data.data.subPatientName
              
                if(newOrnek.ornekType==="استكمال")
                newOrnek.ticketPrice = 0

              //  console.log(response.data.data)
            this.setState({newOrnek,patientType:response.data.data.type,ticketDefault:newOrnek.ticketPrice})
            // this.togglePatientNumberModal()
            this.toggleNewOrnektModal()
            })
     }
     handleMiliatryNumber = async() => {
      if(!this.state.militaryNumber)
      {
       return alert("برجاء ادخال الرقم العسكرى")
      }
      await axios.get(

        staticVariables.backendUrl+"/patient/militaryIdOnly/"+this.state.militaryNumber
        ,{headers: { authToken : localStorage.getItem("token") }}
        ).then((response)=>{
          console.log(response.data.data)
          if(response.data.msg==="غير موجود")
          return alert("غير موجود")
          
          this.setState({patientsNames:response.data.data},()=>{console.log(this.state.patientsNames)})
     }
        )
     }
     getNumberOfCopies = async()=>{
     
      let {page,limit} = this.state
      const res = await axios.get(
        staticVariables.backendUrl+"/numberOfCopiesOrnek"
        ,{headers: { authToken : localStorage.getItem("token") }}
        );
        console.log(res.data.data[0].numOfCopies)
      this.setState({ printCopies: res.data.data[0].numOfCopies });
     }
     handleMenuItemChange = (e) => {
      console.log(e)
      let {newOrnek} = this.state
      newOrnek.patientNumber = e.target.value
      this.setState({newOrnek,chosenPatientName:e.target.name},()=>this.handlePatientNumber())
      
    }
    handleChange = (event) => {
      let {newOrnek} = this.state
      newOrnek.ornekType = event.target.value
      this.setState(newOrnek);
    }
     componentDidMount()
     {this.getOrneks()
      this.getNumberOfCopies()
    }
   
render=()=>{

  // if(localStorage.getItem("token"))
  // {
  let paidNumber = (this.state.patientType&&this.state.patientType==="والد/والدة صف")
  ||(this.state.patientType&&this.state.patientType==="والد/والدة ضباط")?
  <FormGroup>
<Label for="priceBeforeDisc">السعر قبل الخصم</Label>
<Input id="priceBeforeDisc" value={this.state.newOrnek.priceBeforeDisc} onChange={(e) => {
  let { newOrnek } = this.state;

  newOrnek.priceBeforeDisc = e.target.value;
  if(this.state.patientType==="والد/والدة صف")
  newOrnek.rate =Math.min(e.target.value*0.25,150)
  if(this.state.patientType==="والد/والدة ضباط")
  newOrnek.rate = Math.min(e.target.value*0.25,200)
  newOrnek.total = newOrnek.rate + newOrnek.ticketPrice
  this.setState({ newOrnek ,month:1});
}} />
</FormGroup>:
<div>
<FormGroup>
<Label for="month">عدد الشهور</Label>
<RadioGroup aria-label="month" name="month" value={this.state.month} onChange={(e) => {
   
   
   this.setState({ month:  e.target.value},()=>
{
  let { newOrnek } = this.state;
  
   newOrnek.ticketPrice = this.state.ticketDefault*this.state.month
   newOrnek.total = newOrnek.paid * newOrnek.rate + newOrnek.ticketPrice
   this.setState({ newOrnek });
}
   );
 }}>  <FormControlLabel value="1" control={<Radio />} label="شهر"/>
      <FormControlLabel value="2" control={<Radio />} label="شهرين"/>

</RadioGroup>
</FormGroup>

<FormGroup>
<Label for="paid">عدد الاصناف المدفوعة</Label>
<Input id="paid" value={this.state.newOrnek.paid} onChange={(e) => {
  let { newOrnek } = this.state;

  newOrnek.paid = e.target.value;
  newOrnek.remainder = newOrnek.needed - newOrnek.paid
  
  newOrnek.total = newOrnek.paid * newOrnek.rate + newOrnek.ticketPrice
  
  this.setState({ newOrnek });
}} />
</FormGroup>
</div>
//   let  ornek = this.state.ornek?this.state.ornek.map((target) => {
//  return (

//          <tr key={target.id}>
//           <td style={{color:"#000"}}>{target._id}</td>
//           <td style={{color:"#000"}}>{target.ornekType}</td>
//           <td style={{color:"#000"}}>{target.patientNumber}</td>
//           <td style={{color:"#000"}}>{target.type}</td>
//           <td style={{color:"#000"}}>{target.rotba}</td>
//           <td style={{color:"#000"}}>{target.patientName}</td>
//           <td style={{color:"#000"}}>{target.needed}</td>
//           <td style={{color:"#000"}}>{target.paid}</td>
//           <td style={{color:"#000"}}>{target.priceBeforeDisc}</td>
//           {/* <td style={{color:"#000"}}>{target.remainder}</td> */}
//           <td style={{color:"#000"}}>{target.ticketPrice}</td>
//           <td style={{color:"#000"}}>{target.rate}</td>
//           <td style={{color:"#000"}}>{target.total}</td>
//           <td style={{color:"#000"}}>{target.username}</td>
//           <td style={{color:"#000"}}>{target.time}</td>
//            <td style={{color:"#000"}}>
//             {localStorage.getItem("type") === "admin" &&
//             <div>
//            {/* <Button color="success" size="sm" className="mr-2" onClick={()=>this.editOrnek(
//          target["_id"])}>
//        <EditIcon ></EditIcon></Button> */}
//        <Button color="danger" size="sm" onClick={()=>this.deleteOrnek(target["_id"])}><DeleteForeverIcon></DeleteForeverIcon></Button>
       
//        </div>}

//        </td>



//          </tr>
//        )
//      }):"";

     return (
<div> <div className="App container">

       <h1 style={{color:"#000"}}> بون علاج شهرى </h1>
<p></p><p></p>
       <FormControl component="fieldset">
      <FormLabel component="legend">نوع البون</FormLabel>
      <RadioGroup defaultValue="جديد" aria-label="gender" name="gender1" value={this.state.newOrnek.ornekType} onChange={this.handleChange}>
        <FormControlLabel value="جديد" control={<Radio />} label="جديد" />
        <FormControlLabel value="استكمال" control={<Radio />} label="استكمال" />
      </RadioGroup>
    </FormControl>
    <p></p><p></p>
       <FormControl className="position" >

{/* <div style={{width:"50%", marginLeft:"50%"}}> */}


<Label for="militaryNumber" className="arabic-text">الرقم العسكرى</Label>
 <Input id="militaryNumber" className="arabic-text" value={this.state.militaryNumber} onChange={(e) => {
   
    let{newOrnek}=this.state
    newOrnek.militaryNumber=e.target.value
   this.setState({ militaryNumber:e.target.value ,newOrnek});
 }} />
 <Button color="primary" onClick={()=>this.handleMiliatryNumber()}>بحث</Button>
{/* </div> */}
</FormControl>
<p></p>
{this.state.patientsNames.length>0&&
<FormControl  className="position">
<InputLabel className="arabic-text" id="demo-simple-select-label">اختيار مريض</InputLabel>
<Select className="arabic-text"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={this.state.newOrnek.patientNumber}
  label={this.state.chosenPatientName}
  onChange={this.handleMenuItemChange}
>
    {this.state.patientsNames?this.state.patientsNames.map((patient) => (
  <MenuItem className="arabic-text" name={patient.name}value={patient._id} >{patient.name}</MenuItem>))
  :<></>
}
  
</Select>
</FormControl>
}
<p></p>
{/* <FormControl>
<Button  color="primary" onClick={()=>this.handlePatientNumber()}>انشاء البون</Button>
</FormControl> */}
<Modal dialogClassName='custom-dialog' isOpen={this.state.patientNumberModal} toggle={this.togglePatientNumberModal.bind(this)}>

<ModalHeader className="modal-header" toggle={this.togglePatientNumberModal.bind(this)}>انشاء بون</ModalHeader>
<ModalBody>


<FormGroup>
 <Label for="patientNumber">رقم المريض</Label>
 <Input id="patientNumber" value={this.state.newOrnek.patientNumber} onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.patientNumber = e.target.value;

   this.setState({ newOrnek });
 }} />
</FormGroup>



</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.handlePatientNumber()}>التالى</Button>
<Button color="secondary" onClick={this.togglePatientNumberModal.bind(this)}>الغاء</Button>
</ModalFooter>

</Modal>

<Modal isOpen={this.state.newOrnekModal} toggle={this.toggleNewOrnektModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.toggleNewOrnektModal.bind(this)}>أضافة بون</ModalHeader>
<ModalBody>


{/* <FormGroup>
 <Label for="patientNumber">رقم المريض</Label>
 <Input id="patientNumber" value={this.state.newOrnek.patientNumber} readOnly onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.patientNumber = e.target.value;

   this.setState({ newOrnek });
 }} />
</FormGroup>

<FormGroup>
 <Label for="type">الفئة</Label>
 <Input id="type" value={this.state.newOrnek.type} readOnly onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.type = e.target.value;

   this.setState({ newOrnek });
 }} />
</FormGroup>

<FormGroup>
 <Label for="rotba">الرتبة</Label>
 <Input id="rotba" value={this.state.newOrnek.rotba} readOnly onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.rotba = e.target.value;

   this.setState({ newOrnek });
 }} />
</FormGroup>

<FormGroup>
 <Label for="patientName">اسم المريض</Label>
 <Input id="patientName" value={this.state.newOrnek.patientName} readOnly onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.patientName = e.target.value;

   this.setState({ newOrnek });
 }} />
</FormGroup> */}


 {/* {
  !(this.state.patientType&&(this.state.patientType==="والد/والدة صف"||this.state.patientType==="والد/والدة ضباط"))&&
 <div> 
 <FormGroup>
 <Label for="needed">عدد الاصناف المطلوبة</Label>
 <Input id="needed" value={this.state.newOrnek.needed} readOnly onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.needed = e.target.value;

   this.setState({ newOrnek });
 }} />
</FormGroup>
</div>
} */}
{/* <FormGroup>
 <Label for="remainder">المتبقى</Label>
 <Input id="remainder" value={this.state.newOrnek.remainder} readOnly onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.remainder = e.target.value;

   this.setState({ newOrnek });
 }} />
</FormGroup> */}


{paidNumber}
{/* <FormGroup>
<Label for="paid">عدد الاصناف المدفوعة</Label>
<Input id="paid" value={this.state.newOrnek.paid} onChange={(e) => {
  let { newOrnek } = this.state;

  newOrnek.paid = e.target.value;
  newOrnek.remainder = newOrnek.needed - newOrnek.paid
  newOrnek.total = newOrnek.paid * newOrnek.rate + newOrnek.ticketPrice
  this.setState({ newOrnek });
}} />
</FormGroup> */}





<FormGroup>
 <Label for="ticketPrice">سعر التذكرة</Label>
 <Input id="ticketPrice" value={this.state.newOrnek.ticketPrice} readOnly onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.ticketPrice = e.target.value;

   this.setState({ newOrnek });
 }} />
</FormGroup>
{!(this.state.patientType==="والد/والدة ضباط"||this.state.patientType==="والد/والدة صف")&&
<FormGroup>
 <Label for="rate">سعر الصنف</Label>
 <Input id="rate" value={this.state.newOrnek.rate} readOnly onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.rate = e.target.value;

   this.setState({ newOrnek });
 }} />
</FormGroup>}

<FormGroup>
 <Label for="total">المجموع الكلى</Label>
 <Input id="total" value={this.state.newOrnek.total} readOnly onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.total = e.target.value;

   this.setState({ newOrnek });
 }} />
</FormGroup>

</ModalBody>
<ModalFooter>


{/* <Button color="secondary" onClick={this.addOrnek()}>انشاء</Button> */}
{/* <Button color="secondary" onClick={this.toggleNewOrnektModal.bind(this)}>الغاء</Button> */}
<Button color="secondary" onClick={this.addOrnek.bind(this)}>انشاء</Button>
</ModalFooter>

</Modal>

<Modal isOpen={this.state.printModal} toggle={this.togglePrintModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.togglePrintModal.bind(this)}>طباعة</ModalHeader>
<ModalBody>


<ReactToPrint trigger={()=>
    {
        return <Button  color="primary" ><LocalPrintshopIcon></LocalPrintshopIcon> طباعة</Button>
    }
    }
    content = {()=>this.componentRef}
    documentTitle = ""
    onBeforePrint={()=>{
      // this.togglePrintModal()
        }
    }
    onAfterPrint={()=>{this.handlePrintModal()}}
    />



</ModalBody>
<ModalFooter>

{/* <Button color="secondary" onClick={this.togglePrintModal.bind(this)}>انشاء بدون طباعة</Button> */}
</ModalFooter>

</Modal>



<Modal isOpen={this.state.editOrnekModal} toggle={this.toggleEditOrnekModal.bind(this)}>
   <ModalHeader className="modal-header" toggle={this.toggleEditOrnekModal.bind(this)}>تعديل</ModalHeader>
   <ModalBody>

 

     <FormGroup>

        <Label for="type">النوع</Label>
       <Input id="type" value={this.state.editOrnekData.type} onChange={(e) => {
         let { editOrnekData } = this.state;

         editOrnekData.type = e.target.value;

         this.setState({ editOrnekData });
       }} />
     </FormGroup>


    
   </ModalBody>
   <ModalFooter>
     <Button color="primary" onClick={()=>this.updateOrnek()}>تعديل</Button>{" "}
     <Button color="secondary" onClick={this.toggleEditOrnekModal.bind(this)}>الغاء</Button>
   </ModalFooter>
 </Modal>
       

        
         <div style={{display:'none'}}>
         <div ref={el => (this.componentRef = el)}>
       <Card
       sx={{ width: "100%" , maxHeight:"382px"}}
       >
      <CardContent >
      
      <div class="float-container">

    <div class="float-child">
    <img src="/logo.jpg" width="60%"
        height="10%"></img>
    </div>
    
    <div class="float-child">
        
    <Typography variant="subtitle2" style = {{direction: "rtl",fontSize:"8x",fontWeight:"bold"}}>   
         المستشفى الجوى العام
        </Typography>
        <Typography variant="subtitle2" style = {{direction: "rtl",fontSize:"8x",fontWeight:"bold"}}>
          فرع النظم و المعلومات
        </Typography>
    </div>
    </div>

        <br></br>
        <br></br><br></br>
        <div style={{paddingLeft:"17%",fontWeight:"bold"}}>
        <div class="p" >
            
        <u  > بون علاج شهرى  
        <MedicalServicesIcon></MedicalServicesIcon>
        </u>

        
       
        </div>
        {/* <br></br> */}
        </div>

        <div style={{paddingLeft:"17%",fontWeight:"bold"}}>
        <div class="p" >
            
        نوع البون: {this.state.newOrnek.ornekType}
           
            </div>
            {/* <br></br> */}
            </div>
        <div class="p2">

          
        {/* <Typography style = {{direction: "rtl",fontSize:"10px"}} >
         نوع البون: {this.state.newOrnek.ornekType}
        </Typography> */}
        <br></br>
        <Typography class="fontOrnek" >
          رقم المريض: {this.state.newOrnek.patientNumber}
        </Typography>
        <Typography class="fontOrnek" >
      الرقم العسكرى: {this.state.newOrnek.militaryNumber}
        </Typography>
        {
       this.state.newOrnek.type&&
       <Typography  class="fontOrnek" >
            
         الفئة: {this.state.newOrnek.type}
        </Typography>}
       {
       this.state.newOrnek.rotba&&
       <Typography  class="fontOrnek" >
            
         الرتبة: {this.state.newOrnek.rotba}
        </Typography>}
        <Typography  class="fontOrnek" >
            
         اسم المريض: {this.state.newOrnek.patientName}
        </Typography>

        {this.state.newOrnek.subPatientName&&<Typography  class="fontOrnek" >
            
            اسم العائل: {this.state.newOrnek.subPatientName}
           </Typography>}
        {
          !(this.state.patientType&&(this.state.patientType==="والد/والدة صف"||this.state.patientType==="والد/والدة ضباط"))&&
 
        <Typography  class="fontOrnek" >
          عدد الاصناف المدفوعة: {this.state.newOrnek.paid}
        </Typography>
        }
        {
          (this.state.patientType&&(this.state.patientType==="والد/والدة صف"||this.state.patientType==="والد/والدة ضباط"))&&
 
        <Typography  class="fontOrnek" >
          سعر قبل الخصم: {this.state.newOrnek.priceBeforeDisc}
        </Typography>
        }
         {
          !(this.state.patientType&&(this.state.patientType==="والد/والدة صف"||this.state.patientType==="والد/والدة ضباط"))&&
 
        <Typography    class="fontOrnek">
          سعر الصنف: {this.state.newOrnek.rate}
        </Typography>
}
{
          (this.state.patientType&&(this.state.patientType==="والد/والدة صف"||this.state.patientType==="والد/والدة ضباط"))&&
 
        <Typography    class="fontOrnek">
          سعر بعد الخصم: {this.state.newOrnek.rate}
        </Typography>
}
        <Typography  class="fontOrnek">
          سعر التذكرة: {this.state.newOrnek.ticketPrice}
        </Typography>
        <Typography  class="fontOrnek" >
          الاجمالى: {this.state.newOrnek.total}
        </Typography>
        <Typography  class="fontOrnek" >
           كاشير: {localStorage.getItem("username")}
        </Typography>
        <Typography  class="fontOrnek" >
        تاريخ :  {this.state.newOrnek.time}
        </Typography>
        </div>
       {/* <br></br> */}
        <div style={{textAlign:"center",fontSize:"14px",fontWeight:"bold"}}>مع تمنياتنا بالشفاء العاجل</div>
      </CardContent>
      
    </Card>
    
         </div>
         </div></div>

        </div>
     );
   }
  //  else {return  (
  //    <h>Not Authorized</h>
  //  )
  //  }
  }

// }



export default Ornek
