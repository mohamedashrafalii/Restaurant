import React, { Component } from "react"
import axios from "axios"
import { Label , Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, FormGroup } from "reactstrap";
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
import ReactToPrint from 'react-to-print';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
class ServiceStatistics extends Component {

  state={
    ornek:[],
    startTime:null,
    endTime:null,
    totalSpendings:0,
    username:"",
    userId:"",
    subDepartment:"",
    newOrnek:{
        
        username:localStorage.getItem("username")
     
    },
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
      allModal: ! this.state.allModal
    });
  }

 
  totalSpendings = async  ()=> {
   
     await axios.get(
      staticVariables.backendUrl+"/stats/totalSpendings2?startDate="+this.state.newOrnek.startDate+"&endDate="
      +this.state.newOrnek.endDate+"&userId="+this.state.userId+"&subDepartment="+this.state.subDepartment
      ,{headers: { authToken : localStorage.getItem("token") }}
      ) .then((res) =>
      {  
        //console.log(res.data.orneks2 , res.data.totalSum)
    this.setState({ ornek: res.data.orneks2 ,totalSpendings:res.data.totalSum,totalPaid:res.data.totalPaid,
        newOrnekModal:false,allModal:false});
      })
      .catch((e)=>
      {
        // console.log(e)
        alert(e.response.data)
      })
  };
 
  handleMenuItemChange = (e) => {
  //  console.log(e)
    this.setState({userId:e.target.value,username:e.target.name})
  }

  getUsers = async  ()=> {

    const res = await axios.get(
      staticVariables.backendUrl+"/users/",{headers: { authToken : localStorage.getItem("token") }}
      );
    this.setState({ Users: res.data.data });

  };

     componentDidMount()
     {
        this.getUsers()

    }
render=()=>{

  // if(this.props.value)
  // {
    let  ornek = this.state.ornek?this.state.ornek.map((target) => {
        return (
       
                <tr key={target.id}>
                 
                 
                 
                 
                 
                 
                 
                 
                 <td style={{color:"#000"}}>{target.time}</td>
                 <td style={{color:"#000"}}>{target.username}</td>
                 <td style={{color:"#000"}}>{target.total}</td>
                 
                 <td style={{color:"#000"}}>{target._id}</td>
                  <td style={{color:"#000"}}>
                   
              </td>
       
       
       
                </tr>
              )
            }):"";

     return (
<div> <div className="App container">

       <h1 style={{color:"#000"}}> تقرير خدمات</h1>
        {/* <Button className="my-3" color="dark" onClick={this.toggleNewOrnekModal.bind(this)}>انشاء تقرير باسم المستخد</Button> */}
        <br></br>
        <Button className="my-3" color="dark" onClick={this.toggleAllModal.bind(this)}>  انشاء تقرير </Button>
        <br></br>
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
    onAfterPrint={()=>{}}
    />
       <div>
        <div class="float-container">

            


<div class="float-child">
        <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="162"
        image="/money2.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          الاجمالى
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {this.state.totalSpendings} جنيه مصرى
        </Typography>
      </CardContent>
      
    </Card>
</div>
<div class="float-child">
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="162"
        image="/receipt.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         عدد الايصالات
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {this.state.ornek.length} ايصال
        </Typography>
      </CardContent>
      
    </Card>
    </div>
    </div>

    
   

    
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
            let {newOrnek} = this.state
                var curDate = new Date(""+e.target.value);
                var curDateStr =  (curDate.getMonth()+1) +"/"+ curDate.getDate()+ "/" + curDate.getFullYear() +" " + "0"+":"+"0"+":"+"0"
                newOrnek.startDate = curDateStr
              //  console.log(curDateStr)
                const startDate = e.target.value
                this.setState({newOrnek,startDate})
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
            let {newOrnek} = this.state
                var curDate = new Date(""+e.target.value);
                var curDateStr = (curDate.getMonth()+1) +"/"+ curDate.getDate() + "/" + curDate.getFullYear()+" " + "23"+":"+"59"+":"+"59"
                newOrnek.endDate = curDateStr
               // console.log(curDateStr)
                const endDate = e.target.value
                this.setState({newOrnek,endDate})
          }}
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </FormGroup>

</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.totalSpendings()}>تم</Button>
<Button color="secondary" onClick={this.toggleNewOrnekModal.bind(this)}>الغاء</Button>
</ModalFooter>

</Modal>

<Modal isOpen={this.state.allModal} toggle={this.toggleAllModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.toggleAllModal.bind(this)}>الكل</ModalHeader>
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
            let {newOrnek} = this.state
                var curDate = new Date(""+e.target.value);
                var curDateStr =  (curDate.getMonth()+1) +"/"+ curDate.getDate()+ "/" + curDate.getFullYear() +" " + "0"+":"+"0"+":"+"0"
                newOrnek.startDate = curDateStr
                //console.log(curDateStr)
                const startDate = e.target.value
                this.setState({newOrnek,startDate})
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
            let {newOrnek} = this.state
                var curDate = new Date(""+e.target.value);
                var curDateStr = (curDate.getMonth()+1) +"/"+ curDate.getDate() + "/" + curDate.getFullYear()+" " + "23"+":"+"59"+":"+"59"
                newOrnek.endDate = curDateStr
                //console.log(curDateStr)
                const endDate = e.target.value
                this.setState({newOrnek,endDate})
          }}
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </FormGroup>

</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.totalSpendings()}>تم</Button>
<Button color="secondary" onClick={this.toggleAllModal.bind(this)}>الغاء</Button>
</ModalFooter>

</Modal>



<div ref={el => (this.componentRef = el)}>

<Table>
           <thead>
             <tr>
             
               
               
               
               
               
               
               
             <th style={{color:"#000"}}>التاريخ</th>
               <th style={{color:"#000"}}>اسم المستخدم</th>
               <th style={{color:"#000"}}>المجموع</th>
               
               
               <th style={{color:"#000"}}>رقم الايصال</th>
             </tr>
           </thead>
           <tbody>
             {ornek}
             {/* <Pagination count={this.state.length} page={this.state.page} value={this.state.page} onChange={(e,value)=>this.handlePageChange(e,value)} /> */}
           </tbody>
         </Table>
         </div>
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



export default ServiceStatistics
