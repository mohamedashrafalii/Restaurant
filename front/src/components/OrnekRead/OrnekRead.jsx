import React, { Component } from "react"
import axios from "axios"
import {  Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, CardFooter } from "reactstrap";
import staticVariables from "../../statics.json"
import TextField from '@material-ui/core/TextField'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactToPrint from 'react-to-print';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import './../Ornek/CSS.css'
class OrnekRead extends Component {

  state={
    limit:10,
    page:1,
    length:10,
    ornek:[],
    startDate:null,
    endDate:null,
    startDateStr:"",
    endDateStr:"",
    username:"",
    userId:"",
    ornekToPrint:"",
    Users:[],
    newOrnekModal: false,
    allModal:false,
  }

  toggleNewOrnekModal() {
    this.setState({
      newOrnekModal: ! this.state.newOrnekModal
    });
  }

  toggleAllModal() {
    this.setState({
      allModal: ! this.state.allModal,userId:null,username:null
    });
  }

 
  searchByUserId = async  ()=> {
   
     await axios.get(
      staticVariables.backendUrl+"/ornek/time?startDate="+this.state.startDateStr+"&endDate="
      +this.state.endDateStr+"&limit="+this.state.limit+"&page="+this.state.page+"&userId="+this.state.userId
      ,{headers: { authToken : localStorage.getItem("token") }}
      ) .then((res) =>
      {  
        console.log(res.data.data)
    this.setState({ ornek: res.data.data,length:Math.ceil(res.data.size/this.state.limit),
    allModal:false,newOrnekModal:false,userId:"",endDate:"",startDate:"",endDateStr:"",startDateStr:"",username:""});
      })
      .catch((e)=>
      {
        console.log(e)
        alert(e.response.data)
      })
  };
 
  handleMenuItemChange = (e) => {
    console.log(e)
    this.setState({userId:e.target.value,username:e.target.name})
  }

  getUsers = async  ()=> {

    const res = await axios.get(
      staticVariables.backendUrl+"/users/",{headers: { authToken : localStorage.getItem("token") }}
      );
    this.setState({ Users: res.data.data });

  };
  handlePageChange(e,value)
  {

   let { page } = this.state;

   page = value;
  
   this.setState({ page },()=>{this.getOrneks()})
  
  }
  deleteOrnek=async(id)=> {
    console.log(id)
    await axios.delete(staticVariables.backendUrl+"/ornek/delete/" + id
    ,{headers: { authToken : localStorage.getItem("token") }}
    )
    .then((res) => {
      console.log(res.data.data)
      toast.error("تم المسح بنجاح")
      this.forceUpdate()
        // this.searchByUserId()
    })
    .catch(error=>{alert(error.message)});

  }
     componentDidMount()
     {
        this.getUsers()

    }
render=()=>{

  // if(this.props.value)
  // {
    
    let  ornek = this.state.ornek?this.state.ornek.map((target) => {
        
        return (
            
            <div >
            <Card ref={el => (target["_id"] = el)}
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
            
        <u  > اورنيك علاج شهرى  
        <MedicalServicesIcon></MedicalServicesIcon>
        </u>

        
       
        </div>
        {/* <br></br> */}
        </div>

        <div style={{paddingLeft:"17%",fontWeight:"bold"}}>
        <div class="p" >
            
        نوع الارنيك: {target.ornekType}
           
            </div>
            {/* <br></br> */}
            </div>
        <div class="p2">

          
        {/* <Typography style = {{direction: "rtl",fontSize:"10px"}} variant="body2">
         نوع الارنيك: {target.ornekType}
        </Typography> */}
        <Typography style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
          رقم المريض: {target.patientNumber}
        </Typography>
        <Typography style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
          الرقم العسكرى: {target.militaryNumber}
        </Typography>
        {
       target.type&&
       <Typography  style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
            
         الفئة: {target.type}
        </Typography>}
       {
       target.rotba&&
       <Typography  style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
            
         الرتبة: {target.rotba}
        </Typography>}
        <Typography  style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
            
         اسم المريض: {target.patientName}
        </Typography>
        {target.subPatientName&&<Typography  style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
            
            اسم العائل: {target.subPatientName}
           </Typography>}
        {
          !(target.type&&(target.type==="والد/والدة صف"||target.type==="والد/والدة ضباط"))&&
 
        <Typography  style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
          عدد الاصناف المدفوعة: {target.paid}
        </Typography>
        }
        {
          (target.type&&(target.type==="والد/والدة صف"||target.type==="والد/والدة ضباط"))&&
 
        <Typography  style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
          سعر قبل الخصم: {target.priceBeforeDisc}
        </Typography>
        }
         {
          !(target.type&&(target.type==="والد/والدة صف"||target.type==="والد/والدة ضباط"))&&
 
        <Typography   variant="body2" style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}}>
          سعر الصنف: {target.rate}
        </Typography>
}
{
          (target.type&&(target.type==="والد/والدة صف"||target.type==="والد/والدة ضباط"))&&
 
        <Typography   variant="body2" style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}}>
          سعر بعد الخصم: {target.rate}
        </Typography>
}
        <Typography  style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}}>
          سعر التذكرة: {target.ticketPrice}
        </Typography>
        <Typography  style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
          الاجمالى: {target.total}
        </Typography>
        <Typography  style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
           كاشير: {localStorage.getItem("username")}
        </Typography>
        <Typography  style = {{direction: "rtl",fontSize:"14px",fontWeight:"bold",textAlign:"center"}} variant="body2">
        تاريخ :  {target.time}
        </Typography>
        </div>
       {/* <br></br> */}
        <div style={{fontSize:"14px",fontWeight:"bold",textAlign:"center"}}>مع تمنياتنا بالشفاء العاجل</div>
      </CardContent>
      
    
           {/* <CardFooter>

           {localStorage.getItem("type") === "admin" &&
            <div>
        
      
       </div>}
           </CardFooter> */}
         </Card>
         <div style={{  marginLeft: "auto",
              marginRight: "auto"}}>
         {/* <Button color="danger" size="sm" onClick={()=>this.deleteOrnek(target._id)}><DeleteForeverIcon></DeleteForeverIcon></Button> */}
       <ReactToPrint trigger={()=>
    {
        return <Button  color="primary" ><LocalPrintshopIcon></LocalPrintshopIcon>طباعة</Button>
    }
    }
    content = {()=>target["_id"]}
    documentTitle = ""
    onBeforePrint={
      ()=> this.componentRef
      
        
    }
    onAfterPrint={()=>{
      // this.togglePrintModal()
    }}
    /></div>
         <p></p>
              </div>             
              )
            }):"";

     return (
<div> <div className="App container">

       <h1 style={{color:"#000"}}>بحث و طباعة اورنيك </h1>
        <Button className="my-3" color="dark" onClick={this.toggleNewOrnekModal.bind(this)}>بحث باسم المستخدم</Button>
        <br></br>
        <Button className="my-3" color="dark" onClick={this.toggleAllModal.bind(this)}>  بحث مجمع</Button>
      
       
            




    
   

    
    </div>
<Modal isOpen={this.state.newOrnekModal} toggle={this.toggleNewOrnekModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.toggleNewOrnekModal.bind(this)}>مستخدم</ModalHeader>
<ModalBody>

<FormGroup>

        {/* <Label for="type">اسم المستخدم</Label> */}
<Box >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">اسم المستخدم</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.userId}
          label={this.state.username}
          onChange={this.handleMenuItemChange}
        >
            {this.state.Users?this.state.Users.map((user) => (
          <MenuItem value={user._id} name={user.username}>{user.username}</MenuItem>))
          :<></>
        }
          
        </Select>
      </FormControl>
    </Box>
</FormGroup>

<FormGroup>
<TextField
                  id="datetime-local"
                  label="من"
                  type="datetime-local"
                  value={this.state.startDate}
          onChange={ (e)=> {
            // let {newOrnek} = this.state
                var curDate = new Date(""+e.target.value);
                var curDateStr = (curDate.getMonth()+1) +"/"+  curDate.getDate()+ "/" + curDate.getFullYear() +" " + curDate.getHours()+":"+curDate.getMinutes()+":"+curDate.getSeconds()
                var startDateStr = curDateStr
                // console.log(curDateStr)
                const startDate = e.target.value
                this.setState({startDateStr,startDate})
          }}
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </FormGroup>
                <FormGroup>
<TextField
                  id="datetime-local"
                  label="الى"
                  type="datetime-local"
                  value={this.state.endDate}
          onChange={ (e)=> {
            // let {newOrnek} = this.state
                var curDate = new Date(""+e.target.value);
                var curDateStr =(curDate.getMonth()+1) +"/"+   curDate.getDate()+ "/" + curDate.getFullYear() +" " + curDate.getHours()+":"+curDate.getMinutes()+":"+curDate.getSeconds()
                var endDateStr = curDateStr
                // console.log(curDateStr)
                const endDate = e.target.value
                this.setState({endDateStr,endDate})
          }}
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </FormGroup>

</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.searchByUserId()}>تم</Button>
<Button color="secondary" onClick={this.toggleNewOrnekModal.bind(this)}>الغاء</Button>
</ModalFooter>

</Modal>

<Modal isOpen={this.state.allModal} toggle={this.toggleAllModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.toggleAllModal.bind(this)}>الكل</ModalHeader>
<ModalBody>


<FormGroup>
<TextField
                  id="datetime-local"
                  label="من"
                  type="datetime-local"
                  value={this.state.startDate}
          onChange={ (e)=> {
            // let {newOrnek} = this.state
                var curDate = new Date(""+e.target.value);
                var curDateStr =  (curDate.getMonth()+1) +"/"+ curDate.getDate()+ "/" + curDate.getFullYear() +" " + curDate.getHours()+":"+curDate.getMinutes()+":"+curDate.getSeconds()
                var startDateStr = curDateStr
                // console.log(curDateStr)
                const startDate = e.target.value
                this.setState({startDateStr,startDate})
          }}
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </FormGroup>
                <FormGroup>
<TextField
                  id="datetime-local"
                  label="الى"
                  type="datetime-local"
                  value={this.state.endDate}
          onChange={ (e)=> {
            // let {newOrnek} = this.state
                var curDate = new Date(""+e.target.value);
                var curDateStr = (curDate.getMonth()+1) +"/"+ curDate.getDate() + "/" + curDate.getFullYear() +" " + curDate.getHours()+":"+curDate.getMinutes()+":"+curDate.getSeconds()
                var endDateStr = curDateStr
                // console.log(curDateStr)
                const endDate = e.target.value
                this.setState({endDateStr,endDate})
          }}
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </FormGroup>

</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.searchByUserId()}>تم</Button>
<Button color="secondary" onClick={this.toggleAllModal.bind(this)}>الغاء</Button>
</ModalFooter>

</Modal>



                  <div>
             {ornek}
             {/* <Pagination count={this.state.length} page={this.state.page} value={this.state.page} onChange={(e,value)=>this.handlePageChange(e,value)} /> */}
             </div>
            </div>

     );
   }
  //  else {return  (
  //    <h>Not Authorized</h>
  //  )
  //  }
  }

// }



export default OrnekRead
