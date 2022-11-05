import React, { Component } from "react"
import styles from "./Invoice.module.scss"
import axios from "axios"
import LineItems from "./LineItems"
import staticVariables from "../../statics.json"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {  Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, CardFooter } from "reactstrap";
import "./CSS.css"
import ReactToPrint from 'react-to-print';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Invoice extends Component {


  locale = "en-US"
  currency = "EGP"

  state = {
   
    id: "",
    services:[],
    service:"",
    // subService:"",
    subService:
    {  id: "", // react-beautiful-dnd unique key
    nameAr:"",
    mainService:"String",
    price:0,
    quantity:0
    },
    subArray:[],
    subServiceName:"",
    patientNumberFlag:false,
    serviceFlag:false,
    subServiceObject:
    {
      nameAr:"",
    mainService:"String",
    price:0,
    },
    newOrnek:{
      service:[
       
      ],
      total:null,
      username:localStorage.getItem("username"),
      time:"",
      userId:localStorage.getItem("userId")

     },
     printModal:false,
     patientNameFlag:"none",
    lineItems: [
      {
        id: null, // react-beautiful-dnd unique key
        nameAr:"",
        mainService:"",
        price:0,
        quantity:1
      }
    ]
  }
  togglePrintModal() {
    this.setState({
      printModal: ! this.state.printModal
    });
  }
  // togglePrintModal2() {
  //   this.setState({
  //     printModal: ! this.state.printModal
  //   });
  // }
  handleInvoiceChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLineItemChange = elementIndex => event => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return { ...item, [event.target.name]: event.target.value }
    })
   
    this.setState({ lineItems},
      ()=>
      {
        let {newOrnek} = this.state
        newOrnek.total = this.calcGrandTotal()
        this.setState({newOrnek})
    
      }
      )
    
  }

  handleAddLineItem = event => {
    
    this.setState({
      // use optimistic uuid for drag drop; in a production app this could be a database id
      
      lineItems: this.state.lineItems.concat([
        {
          id: this.state.subServiceObject.id,
          nameAr: this.state.subServiceObject.nameAr,
          mainService: this.state.subServiceObject.mainService,
          price: this.state.subServiceObject.price,
          quantity :1
        }
      ])
    },()=>{this.calcGrandTotal()})
    
    this.forceUpdate()
  }

  handleRemoveLineItem = elementIndex => event => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    },this.calcGrandTotal)
  }

  handleReorderLineItems = newLineItems => {
    this.setState({
      lineItems: newLineItems
    })
  }

  handleFocusSelect = event => {
    event.target.select()
  }

  addOrnek=async()=>{
    let{newOrnek} = this.state

    var curDate = new Date();
                var curDateStr = (curDate.getMonth()+1) +"/"+  curDate.getDate()+ "/" + curDate.getFullYear() +" " + curDate.getHours()+":"+curDate.getMinutes()+":"+curDate.getSeconds()
                newOrnek.time = curDateStr
    newOrnek.userId = localStorage.getItem("userId")
    newOrnek.username = localStorage.getItem("username")
    this.setState({newOrnek},async()=>
   { 
    await axios
    .post(
      staticVariables.backendUrl+"/ornekService/add/",
      this.state.newOrnek
      ,{headers: { authToken : localStorage.getItem("token") }}
    )
    .then((response) => {
     
      if(response.data.msg!=="Created successfully")
      return alert(response.data)
      this.setState({ newOrnekModal: false
        }
      )
      
      // this.getOrneks()
      // this.togglePrintModal()
    })
  })
  
    .catch(error => {
      alert(error.message)
    }
    
    )
  }

  getByService=async(subService)=>
  {
    console.log( {mainService:this.state.service})
    await axios
      .post(
        staticVariables.backendUrl+"/ornekService/mainService",
        {mainService:this.state.service}
        ,{headers: { authToken : localStorage.getItem("token") }}
      )
      .then((res) => {
        // if(res.data.data.state===false)
        // return alert("الخدمة غير فعالة حليا")
        // console.log(res.data.data)
        this.setState({subArray:res.data.data,serviceFlag:true})
        this.forceUpdate()
        // console.log(this.state.lineItems)
        // this.handleAddLineItem()
      })
      .catch(error => {
        alert(error)
      })

  }

  handleScan = async () =>{
    
    this.getByService(this.state.subService);
   

  }


  handlePayButtonClick = async event => {


  //   await axios
  //     .post(
  //       staticVariables.BTRapi+"/receipts/create",
  //       {  storeId:storeId,
  //          receipt:{ vatPercentage:0, items:this.state.lineItems }},{headers: { authToken : token }}
  //     )
  //     .then(res => {
  //       this.setState({ id: res.data.id ,
  //                       qr:res.data.qrCode})
  //                       console.log(res.data.qrCode)
                       
  //     })
  //     .catch(error => {
  //       alert(error.message)
  //     })

  //     //check quantities
  //     let quantitiesChecker=true
  //     let showInv=true;
  //     for(let i=0;i<this.state.lineItems.length;i++)
  //     {

  //     let oldMedicine=""

  //     let quantitytmp=this.state.lineItems[i].quantity;

  //     await axios.get(staticVariables.backendUrl+"/medicines/read/"+ this.state.lineItems[i].id,{headers: { authToken : this.props.value }})
  //     .then((res)=>{oldMedicine=res.data.data})

  //       if(quantitytmp>oldMedicine.quantity)
  //       {alert("no enough "+oldMedicine.name+" there is only "+oldMedicine.quantity+" "+oldMedicine.name)
  //       showInv=false
  //       quantitiesChecker=false
  //       break
  //       }

  // }
  // if(quantitiesChecker)
  // {
  //   let showInv=true;
  // for(let i=0;i<this.state.lineItems.length;i++)
  // {

  // let oldMedicine=""

  // let quantitytmp=this.state.lineItems[i].quantity;

  // await axios.get(staticVariables.backendUrl+"/medicines/read/"+ this.state.lineItems[i].id,{headers: { authToken : this.props.value }})
  // .then((res)=>{oldMedicine=res.data.data})
  //  const body={
  //   quantity:oldMedicine.quantity-quantitytmp}

  //   await axios.put(staticVariables.backendUrl+"/medicines/update/"+ this.state.lineItems[i].id,body,{headers: { authToken : this.props.value }})
  // }

  // if(showInv){
  //     this.setState({
       
  //       show: true,
  //       mailReady:true
  //     })
  //   }
  // }

}


  handleNewReceiptClick = event => {
    event.preventDefault()
    this.setState({ 

      subService:
      {  id: "", // react-beautiful-dnd unique key
      nameAr:"",
      mainService:"",
      price:0,
      quantity:0
      },
    lineItems: [

    ],newOrnek:{}})
    this.forceUpdate()
  }

  formatCurrency = amount => {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

 

  calcLineItemsTotal = () => {
    
    let {newOrnek} = this.state
    newOrnek.service = this.state.lineItems
    newOrnek.total = this.state.lineItems.reduce(
      (prev, cur) => prev + cur.quantity * cur.price,
      0
    )
    var curDate = new Date();
    var curDateStr = (curDate.getMonth()+1) +"/"+  curDate.getDate()+ "/" + curDate.getFullYear() +" " + curDate.getHours()+":"+curDate.getMinutes()+":"+curDate.getSeconds()
    newOrnek.time = curDateStr
    this.setState({newOrnek},()=>{console.log(newOrnek)})
    return this.state.lineItems.reduce(
      (prev, cur) => prev + cur.quantity * cur.price,
      0
    )
  }

 

  calcGrandTotal = () => {
    return this.calcLineItemsTotal()

  }
  getServices = async  ()=> {
    
  
    
    const res = await axios.get(
      staticVariables.backendUrl+"/service/"
      ,{headers: { authToken : localStorage.getItem("token") }}
      );
    this.setState({ services: res.data.data });
    console.log(res)

  };

  

 getBySubService = async()=>{
  await axios
      .post(
        staticVariables.backendUrl+"/ornekService/subServiceName",
        {nameAr:this.state.subServiceName}
        ,{headers: { authToken : localStorage.getItem("token") }}
      )
      .then((res) => {
      
        this.setState({subServiceObject:res.data.data[0]},()=>
        {
          console.log(this.state.subServiceObject)
          this.handleAddLineItem()
        })
        this.forceUpdate()
      })
      .catch(error => {
        alert(error)
      })
}

triggerPrint = () => {
  return <Button  color="primary" ><LocalPrintshopIcon></LocalPrintshopIcon> طباعة</Button>
}
 handleMenuItemChangeSubService = (e) => {
  this.setState({subServiceName:e.target.value},()=>
  {
    this.getBySubService()
  }
  )
 }

 handlePrintModal() {
  console.log(this.state.printCopies)
  if(this.state.printCopies>1)
  {
   
    this.setState({
    printCopies:this.state.printCopies-1,printModal: true
    
  })
}
  else
  {
    this.setState({
      printModal: false,newOrnek:{}
    });
    
  }
  window.location.reload(false)
}
 handlePrint=async()=>{
 
  
  if(!this.state.service)
  return alert("ادخل فئة المنتج")
  if(!this.state.subServiceName)
  return alert("ادخل النتج")
    await axios
    .post(
      staticVariables.backendUrl+"/ornekService/add/",
      this.state.newOrnek
      ,{headers: { authToken : localStorage.getItem("token") }}
    )
    .then((response) => {
     
      if(response.data.msg!=="Created successfully")
      return alert(response.data)
      toast.success("تم انشاء الطلب بنجاح");
      this.setState({printModal:true})
     })}
 
  handleMenuItemChange = (e) => {
    console.log(e)
    this.setState({service:e.target.value},()=>{this.getByService(e.target.value)})
    
  }
 
  
  handleMenuItemNamesChange = (e) => {
    console.log(e)
    let {newOrnek} = this.state
    newOrnek.patientNumber = e.target.value
    this.setState({newOrnek,chosenPatientName:e.target.name},()=>this.handlePatientNumber())
    
  }
  
componentDidMount=()=>{this.setState({lineItems:[]})
this.getServices()

}
  render = () => {

    let  servicesTable = this.state.lineItems?this.state.lineItems.map((target) => {
     
      return (
     
              <tr key={target.id}>
             
               <td style={{width:"10%",color:"#000",fontSize:"13px",textAlign:"right"}}>{target.price*target.quantity}</td>
               <td style={{width:"10%",color:"#000",fontSize:"13px",textAlign:"right"}}>{target.price}</td>
               <td style={{width:"10%",color:"#000",fontSize:"13px",textAlign:"right"}}>{target.quantity}</td>
               <td style={{width:"40%",color:"#000",fontSize:"13px",textAlign:"right"}}>{target.nameAr}</td>

              </tr>
            )
          }):"";
     
   
    if(localStorage.getItem("token")){
   
    return (
<div>
      <div className={styles.invoice}>

        <div>

       
<FormGroup>

<div>
<FormControl  className="position">
<InputLabel className="arabic-text" id="demo-simple-select-label">اختيار فئة المنتج</InputLabel>
<Select className="arabic-text"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={this.state.service}
  label={this.state.service}
  onChange={this.handleMenuItemChange}
  // disabled = {(this.state.serviceFlag)? "disabled" : ""}
>
    {this.state.services?this.state.services.map((serv) => (
  <MenuItem className="arabic-text" value={serv.nameAr} >{serv.nameAr}</MenuItem>))
  :<></>
}
  
</Select>
</FormControl>

<p></p>
<FormControl className="position">
<InputLabel className="arabic-text" id="demo-simple-select-label">اختيار المنتج</InputLabel>
<Select className="arabic-text"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={this.state.subServiceName}
  label={this.state.subServiceName}
  onChange={this.handleMenuItemChangeSubService}
>
    {this.state.subArray?this.state.subArray.map((serv) => (
  <MenuItem  className="arabic-text" value={serv.nameAr} >{serv.nameAr}</MenuItem>))
  :<></>
}
  
</Select>
</FormControl>
</div>

</FormGroup>


 </div>
        


        <LineItems
          items={this.state.lineItems}
          currencyFormatter={this.formatCurrency}
          addHandler={this.handleAddLineItem}
          changeHandler={this.handleLineItemChange}
          focusHandler={this.handleFocusSelect}
          deleteHandler={this.handleRemoveLineItem}
          reorderHandler={this.handleReorderLineItems}
        />

        <div className={styles.totalContainer}>
          
          <form>
            <div className={styles.valueTable}>
            
               
             
              <div className={styles.row}>
                
                <Input id="total" value={this.state.newOrnek.total} readOnly onChange={(e) => {
   let { newOrnek } = this.state;

   newOrnek.total = this.calcGrandTotal();

   this.setState({ newOrnek });
 }} /><div className={styles.label}>الاجمالى</div>
                  
                  
              </div>
            </div>
          </form>
        </div>


        <div className={styles.footer}>
          
          
<Button  color="primary" onClick={this.handlePrint.bind(this)} > انشاء الطلب</Button>

          <Modal isOpen={this.state.printModal} toggle={this.togglePrintModal.bind(this)}>
<ModalHeader  className="modal-header"toggle={this.togglePrintModal.bind(this)}>طباعة</ModalHeader>
<ModalBody>



<ReactToPrint trigger={()=>
    {
      
        return <Button  color="primary" ><LocalPrintshopIcon></LocalPrintshopIcon> طباعة</Button>
    }
    }
    content = {()=>this.componentRef}
    documentTitle = ""
    onBeforePrint={()=>{
      
        }
    }
    onAfterPrint={()=>{
      this.handlePrintModal()
    }}
    />



</ModalBody>
<ModalFooter>

{/* <Button color="secondary" onClick={this.togglePrintModal.bind(this)}>اضافة بدون طباعة</Button> */}
</ModalFooter>

</Modal>
          <p></p>
          
        </div>
       <br />
        <br />
        {/* <div style={{display:'none'}}> */}
        <div ref={el => (this.componentRef = el)}>
       <Card 
       sx={{ width: "100%" , minHeight:"382px"}}
       >
      <CardContent >
     
      <div  class="float-container" >

    <div class="float-child">
    <img src="/logo.jpg" width="40%"
        height="10%"></img>
    </div>
    
    <div  class="float-child">
      
        
    <Typography variant="subtitle2" style = {{direction: "rtl",fontSize:"12px",fontWeight: "bold"}}>   
         اسم المطعم
        </Typography>
        <Typography variant="subtitle2" style = {{direction: "rtl",fontSize:"12px",fontWeight: "bold"}}>
          كلمة عن المطعم
        </Typography>
    </div>
    </div>

        {/* <br></br> <br></br>
        <div style={{paddingLeft:"17%",fontWeight: "bold"}}>
        <div class="p" >
            
        <u  > {this.state.newOrnek&&this.state.newOrnek.service&&this.state.newOrnek.service.length>0?this.state.newOrnek.service[0].mainService:""}  
        <MedicalServicesIcon></MedicalServicesIcon>
        </u>
       
        </div>
        </div> */}
        {/* <div class="p3"> */}
        <br></br><br></br><br></br>
       
        <Table >
           <thead>
             <tr>
             <th style={{width:"10%",fontSize:"11px",fontWeight: "bold",textAlign:"right"}}>المجموع</th>
              <th style={{width:"10%",fontSize:"11px",fontWeight: "bold",textAlign:"right"}}>السعر</th>
              <th style={{width:"10%",fontSize:"11px",fontWeight: "bold",textAlign:"right"}}>الكمية</th>
              <th style={{width:"40%",fontSize:"11px",fontWeight: "bold",textAlign:"right"}}>المنتج</th>
           
              </tr>
           </thead>
           <tbody>
             {servicesTable}
           </tbody>
         </Table>
<br></br>
        <Typography  class="fontOrnek2" variant="body2">
          الاجمالى: {this.state.newOrnek.total}
        </Typography>
       
        <Typography  class="fontOrnek2" variant="body2">
        تاريخ :  {this.state.newOrnek.time}
        </Typography>
        {/* </div> */}
       
      </CardContent>
      {/* <CardFooter > */}
      <div valign="bottom" style={{textAlign:"center",fontWeight: "bold"}}>bonne appétit</div>
      {/* </CardFooter> */}
    </Card>
    
         {/* </div> */}
     
        </div>
        
              </div></div>
    )
  }
  else {return  (
    <h>Not Authorized</h>
  )
  }
}
}

export default Invoice
