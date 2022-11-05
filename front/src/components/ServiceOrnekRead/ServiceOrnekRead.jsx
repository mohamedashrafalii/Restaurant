import React, { Component } from "react"
import axios from "axios"
import { Label , Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, FormGroup, CardFooter } from "reactstrap";
import staticVariables from "../../statics.json"
import TextField from '@material-ui/core/TextField'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Pagination from '@mui/material/Pagination';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactToPrint from 'react-to-print';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import "./CSS.css"
class ServiceOrnekRead extends Component {

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
      staticVariables.backendUrl+"/ornekService/time?startDate="+this.state.startDateStr+"&endDate="
      +this.state.endDateStr+"&limit="+this.state.limit+"&page="+this.state.page+"&userId="+this.state.userId
      ,{headers: { authToken : localStorage.getItem("token") }}
      ) .then((res) =>
      {  
       
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
    await axios.delete(staticVariables.backendUrl+"/ornekService/delete/" + id
    ,{headers: { authToken : localStorage.getItem("token") }}
    )
    .then((res) => {
      console.log(res.data.data)
      toast("تم المسح بنجاح")
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
        let  servicesTable = target.service?target.service.map((target2) => {
            return (
           
                    <tr key={target2.id}>
                   
                     <td style={{color:"#000",fontSize:"13px"}}>{target2.price*target2.quantity}</td>
                     <td style={{color:"#000",fontSize:"13px"}}>{target2.price}</td>
                     <td style={{color:"#000",fontSize:"13px"}}>{target2.quantity}</td>
                     <td style={{color:"#000",fontSize:"13px"}}>{target2.nameAr}</td>
      
                    </tr>
                  )
                }):"";
        return (
            
            <div >
            <Card ref={el => (target["_id"] = el)}
            sx={{ width: "100%" , maxHeight:"382px"}}
            >
           <CardContent >
           
           <div class="float-container">
     
         <div class="float-child">
         <img src="/logo.jpg" width="40%"
             height="10%"></img>
         </div>
         
         <div class="float-child">
             
         <Typography variant="subtitle2" style = {{direction: "rtl",fontSize:"14px",textAlign:"center",fontWeight: "bold"}}>   
              المستشفى الجوى العام
             </Typography>
             <Typography variant="subtitle2" style = {{direction: "rtl",fontSize:"14px",textAlign:"center",fontWeight: "bold"}}>
               فرع النظم و المعلومات
             </Typography>
         </div>
         </div>
     
             <br></br> <br></br>
             <div style={{paddingLeft:"17%"}}>
             <div class="p" >
                 
             <u  > {target&&target.service&&target.service.length>0?target.service[0].mainService:""}  
             <MedicalServicesIcon></MedicalServicesIcon>
             </u>
            
             </div>
             
             </div>
             <div class="p3" >
             <Typography style = {{direction: "rtl",fontSize:"14px",textAlign:"center"}} variant="body2">
               رقم المريض: {target.patientNumber}
             </Typography>
             <Typography style = {{direction: "rtl",fontSize:"14px",textAlign:"center"}} variant="body2">
               رقم العسكرى: {target.militaryNumber}
             </Typography>
             <Typography  style = {{direction: "rtl",fontSize:"14px",textAlign:"center"}} variant="body2">
             {target.type&&<Typography  style = {{direction: "rtl",fontSize:"14px",textAlign:"center"}} variant="body2">
            
            الفئة: {target.type}
           </Typography>}
           {target.rotba&&<Typography  style = {{direction: "rtl",fontSize:"14px",textAlign:"center"}} variant="body2">
               
            الرتبة: {target.rotba}
           </Typography>}
              اسم المريض: {target.patientName}
             </Typography>
             <Table>
                <thead>
                  <tr>
                  <th style={{width:"10%",fontSize:"11px",fontWeight: "bold"}}>المجوع</th>
              <th style={{width:"10%",fontSize:"11px",fontWeight: "bold"}}>السعر</th>
              <th style={{width:"10%",fontSize:"11px",fontWeight: "bold"}}>الكمية</th>
              <th style={{width:"70%",fontSize:"11px",fontWeight: "bold"}}>نوع الخدمة</th>
                
                   </tr>
                </thead>
                <tbody>
                  {servicesTable}
                </tbody>
              </Table>
     
             <Typography  style = {{direction: "rtl",fontSize:"14px",textAlign:"center"}} variant="body2">
               الاجمالى: {target.total}
             </Typography>
             <Typography  style = {{direction: "rtl",fontSize:"14px",textAlign:"center"}} variant="body2">
                كاشير: {target.username}
             </Typography>
             <Typography  style = {{direction: "rtl",fontSize:"14px",textAlign:"center"}} variant="body2">
             تاريخ :  {target.time}
             </Typography>
             </div>
            <br></br>
             <div style={{textAlign:"center"}}>مع تمنياتنا بالشفاء العاجل</div>
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

       <h1 style={{color:"#000"}}>بحث و طباعة اورنيك خدمات</h1>
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



export default ServiceOrnekRead
