import React, { Component } from "react"
import axios from "axios"
import {  Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from "reactstrap";


import "date-fns";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import staticVariables from '../../statics.json'
import EditIcon from '@mui/icons-material/Edit';

class User extends Component {

  state={
    firstTime:true,
    Users:[],
    Departments:[],
    user:
      {
        id:"", // react-beautiful-dnd unique key
      name:"",
      type:"",
      username:"",
      password:"",
      department:"",
      phoneNumber:null,
      nationalId:null,
      salary:null,
      state:true
    },
    newUser:{
      name:"",
      type:"",
      username:"",
      password:"",
      department:"",
      phoneNumber:null,
      nationalId:null,
      salary:null,
      state:true
    },
    
    editUser:{
      id:"",
      name:"",
      type:"",
      username:"",
      password:"",
      newPassword:"",
      department:"",
      subDepartment:"",
      phoneNumber:null,
      nationalId:null,
      salary:null,
      state:true
    },
    editUserModal: false,
    newUserModal: false
  }
  
  updateUser = async()=>{
   
    let {
      editUser
  } = this.state;
    try{
      if(this.state.editUser.newPassword&&!this.state.editUser.password)
      return alert("ادخل كلمة السر اولا")
       await axios.put(staticVariables.backendUrl+"/users/update/" + this.state.editUser.id, 
       editUser
    ,
    {headers: { authToken : localStorage.getItem("token") }}
    
    )
    .then((response) =>
    {  console.log("sss")
      if(response.data.msg!=="Target updated successfully")
  return alert(response.data)
  
  this.getUsers()
      this.setState({
        editUserModal: false, editUser: { id:"",
        name:"",
        type:"",
        username:"",
        password:"",
        department:"",
        phoneNumber:null,
        nationalId:null,
        salary:null,
        state:true
    }})
    
    })
  }
  catch(error)
  {
  console.log(error)
   alert(   error)
  }
  }
  editUser=async( id )=> {
    
    this.setState({
      editUser: { id }, editUserModal: ! this.state.editUserModal
    });
  }
  toggleNewUserModal() {
    this.setState({
      newUserModal: ! this.state.newUserModal
    });
  }
  toggleEditUserModal() {
    this.setState({
      editUserModal: ! this.state.editUserModal
    });
  }
    getUsers = async  ()=> {

    const res = await axios.get(
      staticVariables.backendUrl+"/users/",{headers: { authToken : localStorage.getItem("token") }}
      );
    this.setState({ Users: res.data.data });

  };

  getDepartments = async  ()=> {

    const res = await axios.get(
      staticVariables.backendUrl+"/department/",{headers: { authToken : localStorage.getItem("token") }}
      );
    this.setState({ Departments: res.data.data });

  };
  deleteUser=async(id)=> {

    await axios.delete(staticVariables.backendUrl+"/users/delete/" + id,{headers: { authToken : localStorage.getItem("token") }})
    .then((response) => {

     this.getUsers()
    })
    .catch(error=>{alert(error.message)})
    ;

  }

  addUser=async()=>{
  await axios
  .post(
    staticVariables.backendUrl+"/users/addUser/",
    this.state.newUser,{headers: { authToken : localStorage.getItem("token") }}
  )
  .then((response) => {
    if(response.data.msg!=="Created successfully")
    alert(response.data)
    else{
    let { Users } = this.state;
    this.getUsers()

    this.setState({ Users, newUserModal: false, newUser: {

       name: "",
      type:"",
      username:"",
      password:"",
      department:"",
      phoneNumber:null,
      nationalId:null,
      salary:null,
      state:true
  }}
    )}
      }
)

  .catch(error => {
    alert(error)
  })

}


     componentDidMount()
     {this.getUsers()
      this.getDepartments()
    }
componentDidUpdate()
{}
render=()=>{
  if(localStorage.getItem("token"))
  {
  let  Users = this.state.Users?this.state.Users.map((user) => {
 return (

         <tr key={user._id}>
          <td style={{color:"#000"}}>{user._id}</td>
           <td style={{color:"#000"}}>{user.name}</td>
           <td style={{color:"#000"}}>{user.username}</td>
           <td style={{color:"#000"}}>{user.type}</td>
           <td style={{color:"#000"}}>{user.department}</td>
           <td style={{color:"#000"}}>{user.phoneNumber}</td>
           <td style={{color:"#000"}}>{user.nationalId}</td>
           <td style={{color:"#000"}}>{user.salary}</td>
           <td style={{color:"#000"}}>{user.state?"فعال":"غير فعال"}</td>
           <td style={{color:"#000"}}><Button color="success" size="sm" className="mr-2" onClick={()=>this.editUser(
         user._id)}>
       <EditIcon ></EditIcon></Button></td>
           {/* <td style={{color:"#000"}}>
       <Button color="danger" size="sm" onClick={()=>this.deleteUser(user["_id"])}><DeleteForeverIcon></DeleteForeverIcon></Button>
     </td> */}



         </tr>
       )
     }):"";

     return (
<div> <div className="App container">

       <h1 style={{color:"#000"}}>المستخدمين</h1>
       <Button className="my-3" color="dark" onClick={this.toggleNewUserModal.bind(this)}>أضافة</Button>
       {/* <Button className="my-3" color="dark" onClick={this.toggleEditUserModal.bind(this)}>تعديل</Button> */}



<Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.toggleNewUserModal.bind(this)}>أضافة</ModalHeader>
<ModalBody>





<FormGroup>
 <Label for="name">الاسم</Label>
 <Input  id="name" value={this.state.newUser.name} onChange={(e) => {
   let { newUser } = this.state;

   newUser.name = e.target.value;

   this.setState({ newUser });
 }} />
</FormGroup>

<FormGroup>
 <Label for="username">اسم المستخدم</Label>
 <Input id="username" value={this.state.newUser.username} onChange={(e) => {
   let { newUser } = this.state;

   newUser.username = e.target.value;

   this.setState({ newUser });
 }} />
</FormGroup>


<FormGroup>
<Label for="userType">النوع</Label>
<RadioGroup aria-label="type" name="type" value={this.state.newUser.type} onChange={(e) => {
   let { newUser } = this.state;

   newUser.type = e.target.value;

   this.setState({ newUser });
 }}>
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel value="user" control={<Radio />} label="User" />

</RadioGroup>
</FormGroup>

<FormGroup>
<Label for="department">القسم</Label>
<RadioGroup aria-label="department" name="department" value={this.state.newUser.department} onChange={(e) => {
   let { newUser } = this.state;

   newUser.department = e.target.value;

   this.setState({ newUser });
 }}>
          {
            this.state.Departments?this.state.Departments.map((department)=>(<FormControlLabel value={department.type} control={<Radio />} label={department.type} />))
            :<></>
          }
          
          

</RadioGroup>
</FormGroup>

<FormGroup>
 <Label for="phoneNumber">رقم الهاتف</Label>
 <Input id="phoneNumber" value={this.state.newUser.phoneNumber} onChange={(e) => {
   let { newUser } = this.state;

   newUser.phoneNumber = e.target.value;

   this.setState({ newUser });
 }} />
</FormGroup>
<FormGroup>
 <Label for="nationalId">الرقم القومى</Label>
 <Input id="nationalId" value={this.state.newUser.nationalId} onChange={(e) => {
   let { newUser } = this.state;

   newUser.nationalId = e.target.value;

   this.setState({ newUser });
 }} />
</FormGroup>
<FormGroup>
 <Label for="salary">المرتب</Label>
 <Input id="salary" value={this.state.newUser.salary} onChange={(e) => {
   let { newUser } = this.state;

   newUser.salary = e.target.value;

   this.setState({ newUser });
 }} />
</FormGroup>

<FormGroup>
 <Label for="password">كلمة المرور</Label>
 <Input id="password" value={this.state.newUser.password} onChange={(e) => {
   let { newUser } = this.state;

   newUser.password = e.target.value;

   this.setState({ newUser });
 }} />
</FormGroup>


</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.addUser()}>اضافة</Button>
<Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>الغاء</Button>
</ModalFooter>

</Modal>

<Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.toggleEditUserModal.bind(this)}>تعديل</ModalHeader>
<ModalBody>





 <FormGroup>
 <Label for="name">الاسم</Label>
 <Input  id="name" value={this.state.editUser.name} onChange={(e) => {
   let { editUser } = this.state;

   editUser.name = e.target.value;

   this.setState({ editUser });
 }} />
</FormGroup>

<FormGroup>
 <Label for="username">اسم المستخدم</Label>
 <Input id="username" value={this.state.editUser.username} onChange={(e) => {
   let { editUser } = this.state;

   editUser.username = e.target.value;

   this.setState({ editUser });
 }} />
</FormGroup>


<FormGroup>
<Label for="userType">النوع</Label>
<RadioGroup aria-label="type" name="type" value={this.state.editUser.type} onChange={(e) => {
   let { editUser } = this.state;

   editUser.type = e.target.value;

   this.setState({ editUser });
 }}>
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel value="user" control={<Radio />} label="User" />

</RadioGroup>
</FormGroup>

<FormGroup>
<Label for="department">القسم</Label>
<RadioGroup aria-label="department" name="department" value={this.state.editUser.department} onChange={(e) => {
   let { editUser } = this.state;

   editUser.department = e.target.value;

   this.setState({ editUser });
 }}>
          {
            this.state.Departments?this.state.Departments.map((department)=>(<FormControlLabel value={department.type} control={<Radio />} label={department.type} />))
            :<></>
          }
          
          

</RadioGroup>
</FormGroup>

<FormGroup>
 <Label for="phoneNumber">رقم الهاتف</Label>
 <Input id="phoneNumber" value={this.state.editUser.phoneNumber} onChange={(e) => {
   let { editUser } = this.state;

   editUser.phoneNumber = e.target.value;

   this.setState({ editUser });
 }} />
</FormGroup>
<FormGroup>
 <Label for="nationalId">الرقم القومى</Label>
 <Input id="nationalId" value={this.state.editUser.nationalId} onChange={(e) => {
   let { editUser } = this.state;

   editUser.nationalId = e.target.value;

   this.setState({ editUser });
 }} />
</FormGroup>
<FormGroup>
 <Label for="salary">المرتب</Label>
 <Input id="salary" value={this.state.editUser.salary} onChange={(e) => {
   let { editUser } = this.state;

   editUser.salary = e.target.value;

   this.setState({ editUser });
 }} />
</FormGroup>
<FormGroup>
 <Label for="password">كلمة السر</Label>
 <Input id="password" value={this.state.editUser.password} onChange={(e) => {
   let { editUser } = this.state;

   editUser.password = e.target.value;

   this.setState({ editUser });
 }} />
</FormGroup>

<FormGroup>
 <Label for="password"> كلمة السر الجديدة</Label>
 <Input id="password" value={this.state.editUser.newPassword} onChange={(e) => {
   let { editUser } = this.state;

   editUser.newPassword = e.target.value;

   this.setState({ editUser });
 }} />
</FormGroup>

<FormGroup>
<Label for="state">الحالة</Label>
<RadioGroup aria-label="state" name="state" value={this.state.editUser.state} onChange={(e) => {
   let { editUser } = this.state;

   editUser.state = e.target.value;

   this.setState({ editUser });
 }}>
          <FormControlLabel value="true" control={<Radio />} label="فعال" />
          <FormControlLabel value="false" control={<Radio />} label="غير فعال" />

</RadioGroup>
</FormGroup>
</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.updateUser()}>تعديل</Button>
<Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>الغاء</Button>
</ModalFooter>

</Modal>

         <Table>
           <thead>
             <tr>
             <th style={{color:"#000"}}>ID</th>
               <th style={{color:"#000"}}>اسم</th>
               <th style={{color:"#000"}}>اسم المستخدم</th>
               <th style={{color:"#000"}}>نوع</th>
               <th style={{color:"#000"}}>قسم</th>

               <th style={{color:"#000"}}>رقم الهاتف</th>
               <th style={{color:"#000"}}>الرقم القومى</th>
               <th style={{color:"#000"}}>المرتب</th>
               <th style={{color:"#000"}}>الحالة</th>
               <th style={{color:"#000"}}>اجراءات</th>
             </tr>
           </thead>
           <tbody>
             {Users}
           </tbody>
         </Table>

         </div>

       </div>
     );
   }
   else {return  (
     <h>Not Authorized</h>
   )
   }
  }

}



export default User
