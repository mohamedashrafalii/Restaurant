import React, { Component } from "react"
import axios from "axios"
import {  Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from "reactstrap";
import staticVariables from "../../statics.json"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Patient.css'
import statics from '../../statics.json'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
class Patient extends Component {

  state={
    length:1,
    page:1,
    limit:10,
    rotbaEdit:"",
    rotabZobat:statics.rotabZobat,
    rotabSaf:statics.rotabSaf,
    patient:[],
    
    name:"",
    nationalNumber:null,
    militaryNumber:null,
    militaryNumberSearch:null,
    type:"",
    subPatient:null,
    subPatientName:"",
    rate:null,
    ticketPrice:null,
    types:[],
    subPatients:[],neededNumber:null,
    username:localStorage.getItem("username"),
    newPatient:{
        name:"",
        rotba:"",
        nationalNumber:null,
        militaryNumber:null,
        type:"",
        subPatient:null,
        subPatientName:"",
        rate:null,
        ticketPrice:null,neededNumber:null,
        typeOfType:"",
        username:localStorage.getItem("username"),
     phoneNumber:null,
     percentageToPay:1
    },
    editPatientData: {
      id:"",
      name:"",
      rotba:"",
      percentageToPay:null,
    // nationalNumber:null,
    // militaryNumber:null,
    // type:"",
    // subPatient:null,
    // subPatientName:"",
    // rate:null,
    // ticketPrice:null,
    neededNumber:null,
    // typeOfType:"",
    // phoneNumber:null
          },
    newPatientModal: false,
    editPatientModal:false,
    typeModal:false,
    militaryModal:false
  }

  toggleNewPatienttModal() {
    this.setState({
      newPatientModal: ! this.state.newPatientModal
    });
  }
  toggleTypeModal() {
    this.setState({
      typeModal: ! this.state.typeModal
    });
  }

  toggleMilitaryModal() {
    this.setState({
      militaryModal: ! this.state.militaryModal
    });
  }

  toggleEditPatientModal() {
    this.setState({
      editPatientModal: ! this.state.editPatientModal
    });
  }
  getPatients = async  ()=> {
    // let {page,limit} = this.state
    // const res = await axios.get(
    //   staticVariables.backendUrl+"/patient?limit="+limit+"&page="+page
    //   ,{headers: { authToken : localStorage.getItem("token") }}
    //   );
    // this.setState({ patient: res.data.data ,length:Math.ceil(res.data.size/limit)});

  };

  getSubPatients = async  ()=> {
    const res = await axios.get(
      staticVariables.backendUrl+"/subPatient"
      ,{headers: { authToken : localStorage.getItem("token") }}
      );
    this.setState({ subPatients: res.data.data });

  };

  getTypes = async  ()=> {
    
    const res = await axios.get(
      staticVariables.backendUrl+"/category"
      ,{headers: { authToken : localStorage.getItem("token") }}
      );
    this.setState({ types: res.data.data});

  };
  deletePatient=async(id)=> {

    await axios.delete(staticVariables.backendUrl+"/patient/delete/" + id
    ,{headers: { authToken : localStorage.getItem("token") }}
    )
    .then(() => {

     this.getPatients()
    })
    .catch(error=>{alert(error.message)});

  }

  addPatient=async()=>{
    console.log(this.state.newPatient.type)
    if((this.state.newPatient.type&&(this.state.newPatient.type==="????????/?????????? ????"||this.state.newPatient.type==="????????/?????????? ????????")))
this.state.newPatient.neededNumber=1
// if(!this.state.newPatient.rotba)
//     return alert("?????? ?????????? ???????????? ")
    if(!this.state.newPatient.name)
    return alert("?????? ?????????? ?????? ???????????? ")
    // if(!this.state.newPatient.nationalNumber)
    // return alert("?????? ?????????? ?????????? ???????????? ")
    // if(this.state.newPatient.nationalNumber&&this.state.newPatient.nationalNumber.length!==14)
    // return alert(" ?????????? ???????????? ?????? ???? ???????? 14 ?????? ")
   
    
    if((localStorage.getItem("department")==="???????? ????????"
    ||localStorage.getItem("department")==="??????")&&!this.state.newPatient.neededNumber)
    return alert("?????? ?????????? ?????? ?????????????? ????????????????")
    if((localStorage.getItem("department")==="???????? ????????"
    ||localStorage.getItem("department")==="??????")&&this.state.newPatient.neededNumber<0)
    return alert(" ?????? ?????????? ?????? ?????????????? ???????????????? ?????????? ??????????")
    // if(!this.state.newPatient.phoneNumber)
    // return alert("?????? ?????????? ?????? ????????????")
    // if(this.state.newPatient.phoneNumber&&this.state.newPatient.phoneNumber.length!==11)
    // return alert(" ?????? ???????????? ?????? ???? ???????? 11 ?????? ")
    if((this.state.newPatient.type==="???????????? ????????"||this.state.newPatient.type==="???????????? ????")&&
    (!this.state.newPatient.typeOfType))
    return alert("?????? ?????????? ????????????")
  await axios
  .post(
    staticVariables.backendUrl+"/patient/add/",
    this.state.newPatient
    ,{headers: { authToken : localStorage.getItem("token") }}
  )
  .then((response) => {
   
    if(response.data.msg!=="Created successfully")
    return alert(response.data)
    let { patient } = this.state;
    this.getPatients()

    this.setState({ patient, newPatientModal: false, newPatient: {
        name:"",
        nationalNumber:null,
        militaryNumber:null,
        type:"",
        subPatient:null,
        subPatientName:"",
        rate:null,
        ticketPrice:null,neededNumber:null,
        typeOfType:"",
        username:localStorage.getItem("username")
      
  }}
    )
    window.location.reload(false)
  })

  .catch(error => {
    alert(error.message)
  })

}

      updatePatient = async()=>{
        console.log(this.state.editPatientData)
      let {rotba,
        name,

      // nationalNumber,
      // militaryNumber,
      // type,
      // subPatient,
      // subPatientName,
      // rate,
      // ticketPrice,
      neededNumber,
      percentageToPay
      // typeOfType
    } = this.state.editPatientData;
      try{
         console.log(this.state.editPatientData)
         await axios.put(staticVariables.backendUrl+"/patient/" + this.state.editPatientData.id, {
          rotba, 
          name,
            // nationalNumber,
            // militaryNumber,
            // type,
            // subPatient,
            // subPatientName,
            // rate,
            // ticketPrice,
            neededNumber,
            percentageToPay
            // typeOfType
      },
      {headers: { authToken : localStorage.getItem("token") }}
      )
      .then((response) =>
      {  
        if(response.data.msg!=="Target updated successfully")
    return alert(response.data)
    
        this.getPatients()
        this.setState({
          editPatientModal: false, editRequestData: { id: "",
          name:"",
          rotba:"",
          // nationalNumber:null,
          // militaryNumber:null,
          // type:"",
          // subPatient:null,
          // subPatientName:"",
          // rate:null,
          // ticketPrice:null,
          neededNumber:null,
          // typeOfType
      }})
      
      })
      window.location.reload(false)
    }


     catch(error)
     {
     console.log(error)
      alert(   error)
     }
     }
    editPatient=async( id ,type)=> {
      console.log(type)
      this.setState({
        editPatientData: { id }, editPatientModal: ! this.state.editPatientModal,
        rotbaEdit:type
      });

     }
     handleMenuItemChange = (e) => {
      
      let {newPatient} = this.state
      newPatient.rotba = e.target.value
      this.setState(newPatient)
      
    }

    handleEditMenuItemChange = (e) => {
      
      let {editPatientData} = this.state
      editPatientData.rotba = e.target.value
      this.setState(editPatientData)
      
      
    }
    handleMiliatryNumberSearch = async() => {
      await axios.get(

        staticVariables.backendUrl+"/patient/militaryIdOnly/"+this.state.militaryNumberSearch
        ,{headers: { authToken : localStorage.getItem("token") }}
        ).then((response)=>{
          console.log(response.data.data)
          if(response.data.msg==="?????? ??????????")
          return alert("?????? ??????????")
          
          this.setState({patient:response.data.data,length:Math.ceil(response.data.data.size/this.state.limit)})
     }
        )
     }

     handlePageChange(e,value)
     {

      let { page } = this.state;

      page = value;
     
      this.setState({ page }
        ,()=>{this.getPatients()
        })
     
     }
     handleTypeModal=()=>
     {
      
      if(!this.state.newPatient.type||this.state.newPatient.type.length===0)
      return alert("?????? ?????????? ??????????")
        this.toggleTypeModal()
        this.toggleMilitaryModal()
        
        
     }
     handleMilitaryModal=async()=>
     {
      if(this.state.newPatient.militaryNumber===null||this.state.newPatient.militaryNumber<0||isNaN(this.state.newPatient.militaryNumber))
        return alert(" ?????? ?????????????? ?????? ???? ???????? ?????????? ??????????")
        if(this.state.newPatient.type==="???????????? ????????"||this.state.newPatient.type==="???????????? ????"
        ||this.state.newPatient.type==="????????/?????????? ????"||this.state.newPatient.type==="????????/?????????? ????????")
       {let typeFam = this.state.newPatient.type==="???????????? ????????"
       ||this.state.newPatient.type==="????????/?????????? ????????"?"????????":"???????? ????"

        await axios.get(

            staticVariables.backendUrl+"/patient/militaryId/"+this.state.newPatient.militaryNumber+"?type="+typeFam
            ,{headers: { authToken : localStorage.getItem("token") }}
            ).then((response)=>{
              if(response.data.msg==="?????? ??????????")
              return alert("?????? ??????????")
                let { newPatient } = this.state;

   newPatient.subPatientName = response.data.data.name;
   newPatient.subPatient = response.data.data.type;
   console.log(newPatient)
   this.setState({ newPatient });
   this.toggleMilitaryModal()
          this.toggleNewPatienttModal()
         }
            )}
            else{
            this.toggleMilitaryModal()
          this.toggleNewPatienttModal()}
     }
     componentDidMount()
     {this.getPatients()
        this.getTypes()
        this.getSubPatients()
        // console.log(localStorage.getItem("token"))
    }
render=()=>{

  // if(localStorage.getItem("token"))
  // {

  let  patient = this.state.patient?this.state.patient.map((target) => {
 return (

         <tr key={target.id}>
          <td style={{color:"#000"}}>
           <Button color="success" size="sm" className="mr-2" onClick={()=>this.editPatient(
         target["_id"],target.type)}>
       <EditIcon ></EditIcon></Button>
          {localStorage.getItem("type")==="admin" &&
          <div> 
       <Button color="danger" size="sm" onClick={()=>this.deletePatient(target["_id"])}><DeleteForeverIcon></DeleteForeverIcon></Button>
       </div>
     
          }
          </td>
          <td style={{color:"#000"}}>{target.username}</td>
          <td style={{color:"#000"}}>{target.subPatientName}</td>
          <td style={{color:"#000"}}>{target.subPatient}</td>
          <td style={{color:"#000"}}>{target.neededNumber}</td>
           <td style={{color:"#000"}}>{target.ticketPrice}</td>
          {localStorage.getItem("type")==="admin"&&<td style={{color:"#000"}}>{target.percentageToPay}</td>}
          <td style={{color:"#000"}}>{target.rate}</td>
          <td style={{color:"#000"}}>{target.typeOfType}</td>
          <td style={{color:"#000"}}>{target.type}</td>
           <td style={{color:"#000"}}>{target.phoneNumber}</td>
          <td style={{color:"#000"}}>{target.nationalNumber}</td>
          <td style={{color:"#000"}}>{target.militaryNumber}</td>
          <td style={{color:"#000"}}>{target.name}</td>
          <td style={{color:"#000"}}>{target.rotba}</td>
             <td style={{color:"#000"}}>{target._id}</td>
             

           


         </tr>
       )
     }):"";

     return (
<div> <div className="App container">

       <h1 style={{color:"#000"}}>????????????</h1>
        <Button className="my-3" style={{width:"30%",height:"50px"}}  color="primary" onClick={this.toggleTypeModal.bind(this)}>?????????? ????????</Button>
<p></p>
<br></br><br></br><br></br><br></br>
        <FormControl className="position" >
{/* <div style={{width:"50%", marginLeft:"50%"}}> */}
<Label for="militaryNumber" className="arabic-text">?????????? ??????????????</Label>
 <Input id="militaryNumber" className="arabic-text" value={this.state.militaryNumberSearch} onChange={(e) => {
   

   this.setState({ militaryNumberSearch:e.target.value });
 }} />
 <Button color="primary" onClick={()=>this.handleMiliatryNumberSearch()}>?????? ?? ??????????</Button>
{/* </div> */}
</FormControl>
<p></p>
        <Modal dialogClassName='custom-dialog' isOpen={this.state.typeModal} toggle={this.toggleTypeModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.toggleTypeModal.bind(this)}>???????? ?????? ????????????</ModalHeader>
<ModalBody>




<FormGroup>
<Label for="type">??????????</Label>
<RadioGroup aria-label="type" name="type" value={this.state.newPatient.type} onChange={(e) => {
   let { newPatient } = this.state;

   newPatient.type = e.target.value;
   console.log(e.target.value)
   
   this.setState({ newPatient });
 }}>
   {this.state.types?this.state.types.map((type) => (
          <FormControlLabel value={type.type} control={<Radio />} label={type.type}/>
   
   )):<FormControlLabel  control={<Radio />} label=""/>
  }
          

</RadioGroup>
</FormGroup>


</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.handleTypeModal()}>????????????</Button>
<Button color="secondary" onClick={this.toggleTypeModal.bind(this)}>??????????</Button>
</ModalFooter>

</Modal>

<Modal isOpen={this.state.militaryModal} toggle={this.toggleMilitaryModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.toggleMilitaryModal.bind(this)}>???????? ?????????? ??????????????</ModalHeader>
<ModalBody>

<FormGroup>
 <Label for="militaryNumber">?????????? ??????????????</Label>
 <Input id="militaryNumber" value={this.state.newPatient.militaryNumber} onChange={(e) => {
   let { newPatient } = this.state;

   newPatient.militaryNumber = e.target.value;

   this.setState({ newPatient });
 }} />
</FormGroup>

</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.handleMilitaryModal()}>????????????</Button>
<Button color="secondary" onClick={this.toggleMilitaryModal.bind(this)}>??????????</Button>
</ModalFooter>

</Modal>


<Modal isOpen={this.state.newPatientModal} toggle={this.toggleNewPatienttModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.toggleNewPatienttModal.bind(this)}>??????????</ModalHeader>
<ModalBody>

{this.state.newPatient.type==="????????"&&
<FormControl  className="position">
<InputLabel className="arabic-text" id="demo-simple-select-label">???????????? ????????????</InputLabel>
<Select className="arabic-text"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={this.state.newPatient.rotba}
  label={this.state.newPatient.rotba}
  onChange={this.handleMenuItemChange}
>
    {this.state.rotabZobat?this.state.rotabZobat.map((rotba) => (
  <MenuItem className="arabic-text" value={rotba} >{rotba}</MenuItem>))
  :<></>
}
</Select>
</FormControl>
}

{this.state.newPatient.type==="???????? ????"&&
<FormControl  className="position">
<InputLabel className="arabic-text" id="demo-simple-select-label">???????????? ????????????</InputLabel>
<Select className="arabic-text"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={this.state.newPatient.rotba}
  label={this.state.newPatient.rotba}
  onChange={this.handleMenuItemChange}
>
    {this.state.rotabSaf?this.state.rotabSaf.map((rotba) => (
  <MenuItem className="arabic-text" value={rotba} >{rotba}</MenuItem>))
  :<></>
}
</Select>
</FormControl>
}
<FormGroup>
 <Label for="name">??????????</Label>
 <Input id="name" value={this.state.newPatient.name} onChange={(e) => {
   let { newPatient } = this.state;

   newPatient.name = e.target.value;

   this.setState({ newPatient });
 }} />
</FormGroup>

<FormGroup>
 <Label for="militaryNumber">?????????? ??????????????</Label>
 <Input id="militaryNumber" value={this.state.newPatient.militaryNumber} readOnly onChange={(e) => {
   let { newPatient } = this.state;

   newPatient.militaryNumber = e.target.value;

   this.setState({ newPatient });
 }} />
</FormGroup>

{/* <FormGroup>
 <Label for="nationalNumber">?????????? ????????????</Label>
 <Input id="nationalNumber" value={this.state.newPatient.nationalNumber} onChange={(e) => {
   let { newPatient } = this.state;

   newPatient.nationalNumber = e.target.value;

   this.setState({ newPatient });
 }} />
</FormGroup> */}

{
  !(this.state.newPatient.type&&(this.state.newPatient.type==="????????/?????????? ????"||this.state.newPatient.type==="????????/?????????? ????????"))&&(localStorage.getItem("department")==="???????? ????????"
  ||localStorage.getItem("department")==="??????")&&
 
  <FormGroup>
 <Label for="neededNumber">?????? ?????????????? ????????????????</Label>
 <Input id="neededNumber" value={this.state.newPatient.neededNumber} onChange={(e) => {
   let { newPatient } = this.state;

   newPatient.neededNumber = e.target.value;

   this.setState({ newPatient });
 }} />
</FormGroup>}

{/* <FormGroup>
 <Label for="phoneNumber">?????? ????????????</Label>
 <Input id="phoneNumber" value={this.state.newPatient.phoneNumber} onChange={(e) => {
   let { newPatient } = this.state;

   newPatient.phoneNumber = e.target.value;

   this.setState({ newPatient });
 }} />
</FormGroup> */}


{this.state.newPatient.type==="???????????? ????????"||this.state.newPatient.type==="???????????? ????"?
<FormGroup>
<Label for="typeOfType">????????????</Label>
<RadioGroup aria-label="typeOfType" name="typeOfType" value={this.state.newPatient.typeOfType} onChange={(e) => {
   let { newPatient } = this.state;

   newPatient.typeOfType = e.target.value;

   this.setState({ newPatient });
 }}>
   {this.state.subPatients?this.state.subPatients.map((type) => (
          <FormControlLabel value={type.type} control={<Radio />} label={type.type}/>
   
   )):<></>
  }
</RadioGroup>
</FormGroup>:<></>}
</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.addPatient()}>??????????</Button>
<Button color="secondary" onClick={this.toggleNewPatienttModal.bind(this)}>??????????</Button>
</ModalFooter>

</Modal>


<Modal isOpen={this.state.editPatientModal} toggle={this.toggleEditPatientModal.bind(this)}>
   <ModalHeader className="modal-header" toggle={this.toggleEditPatientModal.bind(this)}>??????????</ModalHeader>
   <ModalBody>

   {this.state.rotbaEdit==="????????"&&
<FormControl  className="position">
<InputLabel className="arabic-text" id="demo-simple-select-label">???????????? ????????????</InputLabel>
<Select className="arabic-text"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={this.state.editPatientData.rotba}
  label={this.state.editPatientData.rotba}
  onChange={this.handleEditMenuItemChange}
>
    {this.state.rotabZobat?this.state.rotabZobat.map((rotba) => (
  <MenuItem className="arabic-text" value={rotba} >{rotba}</MenuItem>))
  :<></>
}
</Select>
</FormControl>
}

{this.state.rotbaEdit==="???????? ????"&&
<FormControl  className="position">
<InputLabel className="arabic-text" id="demo-simple-select-label">???????????? ????????????</InputLabel>
<Select className="arabic-text"
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={this.state.editPatientData.rotba}
  label={this.state.editPatientData.rotba}
  onChange={this.handleEditMenuItemChange}
>
    {this.state.rotabSaf?this.state.rotabSaf.map((rotba) => (
  <MenuItem className="arabic-text" value={rotba} >{rotba}</MenuItem>))
  :<></>
}
</Select>
</FormControl>
}

   <FormGroup>
    
 <Label for="name">??????????</Label>
 <Input id="name" value={this.state.editPatientData.name} onChange={(e) => {
   let { editPatientData } = this.state;

   editPatientData.name = e.target.value;

   this.setState({ editPatientData });
 }} />
</FormGroup>


{/* <FormGroup>
 <Label for="militaryNumber">?????????? ??????????????</Label>
 <Input id="militaryNumber" value={this.state.editPatientData.militaryNumber} onChange={(e) => {
   let { editPatientData } = this.state;

   editPatientData.militaryNumber = e.target.value;

   this.setState({ editPatientData });
 }} />
</FormGroup>

<FormGroup>
 <Label for="nationalNumber">?????????? ????????????</Label>
 <Input id="nationalNumber" value={this.state.editPatientData.nationalNumber} onChange={(e) => {
   let { editPatientData } = this.state;

   editPatientData.nationalNumber = e.target.value;

   this.setState({ editPatientData });
 }} />
</FormGroup>
*/}

{/* {localStorage.getItem("type")==="admin" && */}
{((this.state.rotbaEdit&&this.state.rotbaEdit!=="????????/?????????? ????")
  &&(this.state.rotbaEdit&&this.state.rotbaEdit!=="????????/?????????? ????????"))&&
<FormGroup>
 <Label for="neededNumber">?????? ?????????????? ????????????????</Label>
 <Input id="neededNumber" value={this.state.editPatientData.neededNumber} onChange={(e) => {
   let { editPatientData } = this.state;

   editPatientData.neededNumber = e.target.value;

   this.setState({ editPatientData });
 }} />
 </FormGroup>}

 {/* {localStorage.getItem("type")==="admin" &&((this.state.rotbaEdit&&this.state.rotbaEdit==="????????/?????????? ????")
  ||(this.state.rotbaEdit&&this.state.rotbaEdit==="????????/?????????? ????????"))&&<FormGroup>
 <Label for="percentageToPay">???????? ??????????</Label>
 <Input id="percentageToPay" value={this.state.editPatientData.percentageToPay} onChange={(e) => {
   let { editPatientData } = this.state;

   editPatientData.percentageToPay = e.target.value;

   this.setState({ editPatientData });
 }} />
 </FormGroup>} */}
 {/*
<FormGroup>
<Label for="type">??????????</Label>
<RadioGroup aria-label="type" name="type" value={this.state.editPatientData.type} onChange={(e) => {
   let { editPatientData } = this.state;

   editPatientData.type = e.target.value;

   this.setState({ editPatientData });
 }}>
   {this.state.types?this.state.types.map((type) => (
          <FormControlLabel value={type.type} control={<Radio />} label={type.type}/>
          
   )):<FormControlLabel  control={<Radio />} label=""/>
   
  }
       <FormGroup>
 <Label for="phoneNumber">?????? ????????????</Label>
 <Input id="phoneNumber" value={this.state.editPatientData.phoneNumber} onChange={(e) => {
   let { editPatientData } = this.state;

   editPatientData.phoneNumber = e.target.value;

   this.setState({ editPatientData });
 }} />
</FormGroup>   
<FormGroup>
<Label for="typeOfType">????????????</Label>
<RadioGroup aria-label="typeOfType" name="typeOfType" value={this.state.editPatientData.typeOfType} onChange={(e) => {
   let { editPatientData } = this.state;

   editPatientData.typeOfType = e.target.value;

   this.setState({ editPatientData });
 }}>
   {this.state.subPatients?this.state.subPatients.map((type) => (
          <FormControlLabel value={type.type} control={<Radio />} label={type.type}/>
   
   )):<FormControlLabel  control={<Radio />} label=""/>
  }
</RadioGroup>
</FormGroup>
</RadioGroup>
</FormGroup> */}


</ModalBody>
<ModalFooter>

    
     <Button color="primary" onClick={()=>this.updatePatient()}>??????????</Button>{" "}
     <Button color="secondary" onClick={this.toggleEditPatientModal.bind(this)}>??????????</Button>
   </ModalFooter>
 </Modal>

         <Table>
           <thead>
             <tr>
             <th style={{color:"#000"}}>??????????????</th>
             <th style={{color:"#000"}}>?????? ????????????????</th>
             <th style={{color:"#000"}}>?????? ????????????</th>
             <th style={{color:"#000"}}>????????????</th>
             <th style={{color:"#000"}}>?????? ?????????????? ????????????????</th>
             <th style={{color:"#000"}}>?????? ??????????????</th>
             {localStorage.getItem("type")==="admin"&&<th style={{color:"#000"}}>???????? ??????????</th>}
             <th style={{color:"#000"}}>?????? ??????????</th>
             <th style={{color:"#000"}}>????????????</th>
             <th style={{color:"#000"}}>??????????</th>
             <th style={{color:"#000"}}>?????? ????????????</th>
             <th style={{color:"#000"}}>?????????? ????????????</th>
             <th style={{color:"#000"}}>?????????? ??????????????</th>
             <th style={{color:"#000"}}>??????????</th>
             <th style={{color:"#000"}}>????????????</th>
               <th style={{color:"#000"}}>?????? ????????????</th>
              

              
               
               
               
               
              
             </tr>
           </thead>
           <tbody>
             {patient}
             <Pagination count={this.state.length} page={this.state.page} value={this.state.page} onChange={(e,value)=>this.handlePageChange(e,value)} />
           </tbody>
         </Table>

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



export default Patient
