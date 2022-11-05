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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
class SubService extends Component {

  state={
    length:10,
    page:1,
    limit:10,
    service:[],
    SubService:[],
    nameAr:"",
    nameEn:"",
    price:0,
    mainService:"",
    // subService:"",
    state:true,
    newSubService:{
        nameAr:"",
        nameEn:"",
        mainService:"",
        price:0,
        quantity:0
,        // subService:"",
        state:true,

    },
    editSubServiceData: {
      id:"",
      nameAr:"",
      nameEn:"",
      mainService:"",
      price:0,
      quantity:0,
      // subService:"",
      state:true
    },
    newSubServiceModal: false,
    editSubServiceModal:false
  }

  toggleNewSubServicetModal() {
    this.setState({
      newSubServiceModal: ! this.state.newSubServiceModal
    });
  }

  toggleEditSubServiceModal() {
    this.setState({
      editSubServiceModal: ! this.state.editSubServiceModal
    });
  }

  getService = async  ()=> {
    const res = await axios.get(
      staticVariables.backendUrl+"/service"
      ,{headers: { authToken : localStorage.getItem("token") }}
      );
    this.setState({ service: res.data.data });
    console.log(res.data.data)

  };
  getSubService = async  ()=> {
    let {page,limit} = this.state
    const res = await axios.get(
      staticVariables.backendUrl+"/subService?limit="+limit+"&page="+page
      ,{headers: { authToken : localStorage.getItem("token") }}
      );
    this.setState({ subService: res.data.data ,length:Math.ceil(res.data.size/limit)});

  };
  deleteSubService=async(id)=> {

    await axios.delete(staticVariables.backendUrl+"/subService/delete/" + id
    ,{headers: { authToken : localStorage.getItem("token") }}
    )
    .then(() => {

     this.getSubService()
    })
    .catch(error=>{alert(error.message)});

  }

  addSubService=async()=>{

    if(!this.state.newSubService.nameAr)
    return alert("يجب ادخال الاسم باللغة العربية")

    if(!this.state.newSubService.mainService)
    return alert("يجب ادخال نوع المنتج")

    if(!this.state.newSubService.price)
    return alert("يجب ادخال السعر ")
  
    if(this.state.newSubService.price<1)
    return alert("يجب ادخال السعر موجب")
  await axios
  .post(
    staticVariables.backendUrl+"/subService/add/",
    this.state.newSubService
    ,{headers: { authToken : localStorage.getItem("token") }}
  )
  .then((response) => {
    console.log(response.data.data)
    if(response.data.msg!=="Created successfully")
    return alert(response.data)
    let { subService } = this.state;
    this.getSubService()

    this.setState({ subService, newSubServiceModal: false, newSubService: {
        nameAr:"",
        nameEn:"",
        mainService:"",
        price:0,
        quantity:0,
        // subService:"",
        state:true
  }}
    )
  })

  .catch(error => {
    alert(error.message)
  })

}

      updateSubService = async()=>{
      let {nameAr,
      nameEn,
      mainService,
      price,
      quantity,
      // subService,
      state} = this.state.editSubServiceData;
      try{

         await axios.put(staticVariables.backendUrl+"/subService/" + this.state.editSubServiceData.id, {
            nameAr,
            nameEn,
            mainService,
            price,
            quantity,
            // subService,
            state
      },
      {headers: { authToken : localStorage.getItem("token") }}
      )
      .then((response) =>
      {  
          this.getSubService()
        this.setState({
          editSubServiceModal: false, editRequestData: { id: "",
          nameAr:"",
          nameEn:"",
          mainService:"",
          price:0,
          quantity:0,
          // subService:"",
          state:true}
        })})}


     catch(error)
     {
     
      alert(   error)
     }
     }
    editSubService=async( id )=> {
      this.setState({
        editSubServiceData: { id }, editSubServiceModal: ! this.state.editSubServiceModal
      });

     }

     handlePageChange(e,value)
     {

      let { page } = this.state;

      page = value;
     
      this.setState({ page },()=>{this.getSubService()})
     
     }
     handleMenuItemChange = (e) => {
        let{newSubService}=this.state
        newSubService.mainService=e.target.value
        this.setState({newSubService})
        console.log(newSubService)
      }
      handleMenuItemChangeEdit = (e) => {
        let{editSubServiceData}=this.state
        editSubServiceData.mainService=e.target.value
        this.setState({editSubServiceData})
        console.log(editSubServiceData)
      }
     componentDidMount()
     {
        this.getService()
        this.getSubService()
     }
render=()=>{

  // if(this.props.value)
  // {
  let  subService = this.state.subService?this.state.subService.map((target) => {
 return (

         <tr key={target.id}>
           <td style={{color:"#000"}}>{target.nameAr}</td>
           <td style={{color:"#000"}}>{target.nameEn}</td>
           <td style={{color:"#000"}}>{target.mainService}</td>
           <td style={{color:"#000"}}>{target.price}</td>
           <td style={{color:"#000"}}>{target.quantity}</td>
           <td style={{color:"#000"}}>{target.state?"فعال":"غير فعال"}</td>

           <td style={{color:"#000"}}>
           <Button color="success" size="sm" className="mr-2" onClick={()=>this.editSubService(
         target["_id"])}>
       <EditIcon ></EditIcon></Button>
       <Button color="danger" size="sm" onClick={()=>this.deleteSubService(target["_id"])}><DeleteForeverIcon></DeleteForeverIcon></Button>
     </td>



         </tr>
       )
     }):"";

     return (
<div> <div className="App container">

       <h1 style={{color:"#000"}}>منتج</h1>
        <Button className="my-3" color="dark" onClick={this.toggleNewSubServicetModal.bind(this)}>اضافة منتج</Button>



<Modal isOpen={this.state.newSubServiceModal} toggle={this.toggleNewSubServicetModal.bind(this)}>
<ModalHeader className="modal-header" toggle={this.toggleNewSubServicetModal.bind(this)}>اضافة منتج</ModalHeader>
<ModalBody>


<FormGroup>

<Label for="nameAr">اسم المنتج عربى</Label>
<Input id="nameAr" value={this.state.newSubService.nameAr} onChange={(e) => {
 let { newSubService } = this.state;

 newSubService.nameAr = e.target.value;

 this.setState({ newSubService });
}} />
</FormGroup>

<FormGroup>

<Label for="nameEn">اسم المنتج انجليزى</Label>
<Input id="nameEn" value={this.state.newSubService.nameEn} onChange={(e) => {
 let { newSubService } = this.state;

 newSubService.nameEn = e.target.value;

 this.setState({ newSubService });
}} />
</FormGroup>


<FormGroup>

        {/* <Label for="type">اسم المستخدم</Label> */}
<Box >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">نوع المنتج</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.newSubService.mainService}
          label={this.state.newSubService.mainService}
          onChange={this.handleMenuItemChange}
        >
            {this.state.service?this.state.service.map((service) => (
          <MenuItem value={service.nameAr} >{service.nameAr}</MenuItem>))
          :<></>
        }
          
        </Select>
      </FormControl>
    </Box>
</FormGroup>

<FormGroup>

<Label for="price">سعر</Label>
<Input id="price" value={this.state.newSubService.price} onChange={(e) => {
let { newSubService } = this.state;

newSubService.price = e.target.value;

this.setState({ newSubService });
}} />
</FormGroup>

<FormGroup>

<Label for="quantity">كمية</Label>
<Input id="quantity" value={this.state.newSubService.quantity} onChange={(e) => {
let { newSubService } = this.state;

newSubService.quantity = e.target.value;

this.setState({ newSubService });
}} />
</FormGroup>

<FormGroup>
<Label for="state">حالة</Label>
<RadioGroup
aria-labelledby="demo-radio-buttons-group-label"
defaultValue="true"
name="radio-buttons-group"
value={this.state.newSubService.state}
onChange={(e) => {
  let { newSubService } = this.state;
  
  newSubService.state = e.target.value;
  this.setState({ newSubService });


  }} 
>
<FormControlLabel value="true" control={<Radio />} label="فعالة" />
<FormControlLabel value="false" control={<Radio />} label="غير فعالة" />
</RadioGroup>
</FormGroup>

</ModalBody>
<ModalFooter>

<Button color="primary" onClick={()=>this.addSubService()}>اضافة منتج</Button>
<Button color="secondary" onClick={this.toggleNewSubServicetModal.bind(this)}>الغاء</Button>
</ModalFooter>

</Modal>


<Modal isOpen={this.state.editSubServiceModal} toggle={this.toggleEditSubServiceModal.bind(this)}>
   <ModalHeader className="modal-header" toggle={this.toggleEditSubServiceModal.bind(this)}>تعديل</ModalHeader>
   <ModalBody>

 

     <FormGroup>

        <Label for="nameAr">اسم منتج عربى</Label>
       <Input id="nameAr" value={this.state.editSubServiceData.nameAr} onChange={(e) => {
         let { editSubServiceData } = this.state;

         editSubServiceData.nameAr = e.target.value;

         this.setState({ editSubServiceData });
       }} />
     </FormGroup>

     <FormGroup>

        <Label for="nameEn">اسم منتج انجليزى</Label>
       <Input id="nameEn" value={this.state.editSubServiceData.nameEn} onChange={(e) => {
         let { editSubServiceData } = this.state;

         editSubServiceData.nameEn = e.target.value;

         this.setState({ editSubServiceData });
       }} />
     </FormGroup>

     <FormGroup>

{/* <Label for="type">اسم المستخدم</Label> */}
<Box >
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">نوع المنتج</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={this.state.editSubServiceData.mainService}
  label={this.state.editSubServiceData.mainService}
  onChange={this.handleMenuItemChangeEdit}
>
    {this.state.service?this.state.service.map((service) => (
  <MenuItem value={service.nameAr} >{service.nameAr}</MenuItem>))
  :<></>
}
  
</Select>
</FormControl>
</Box>
</FormGroup>

<FormGroup>
<Label for="price">سعر</Label>
<Input id="price" value={this.state.editSubServiceData.price} onChange={(e) => {
 let { editSubServiceData } = this.state;

 editSubServiceData.price = e.target.value;

 this.setState({ editSubServiceData });
}} />
</FormGroup>


<FormGroup>
<Label for="quantity">كمية</Label>
<Input id="quantity" value={this.state.editSubServiceData.quantity} onChange={(e) => {
 let { editSubServiceData } = this.state;

 editSubServiceData.quantity = e.target.value;

 this.setState({ editSubServiceData });
}} />
</FormGroup>

<FormGroup>
<Label for="state">حالة</Label>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="true"
    name="radio-buttons-group"
    value={this.state.editSubServiceData.state}
    onChange={(e) => {
      let { editSubServiceData } = this.state;
     
      editSubServiceData.state = e.target.value;
      
      this.setState({ editSubServiceData });
     }} 
  >
    <FormControlLabel value="true"  control={<Radio />} label="فعالة" />
    <FormControlLabel value="false" control={<Radio />} label="غير فعالة" />
  </RadioGroup>
</FormGroup>
    
   </ModalBody>
   <ModalFooter>
     <Button color="primary" onClick={()=>this.updateSubService()}>تعديل</Button>{" "}
     <Button color="secondary" onClick={this.toggleEditSubServiceModal.bind(this)}>الغاء</Button>
   </ModalFooter>
 </Modal>

         <Table>
           <thead>
             <tr>
               <th style={{color:"#000"}}>اسم المنتج عربى</th>
               <th style={{color:"#000"}}>اسم المنتج انجليزى</th>
               <th style={{color:"#000"}}>نوع المنتج</th>
               <th style={{color:"#000"}}>السعر</th>
               <th style={{color:"#000"}}>الكمية</th>
               <th style={{color:"#000"}}>الحالة</th>
               <th style={{color:"#000"}}>اجراءات</th>
             </tr>
           </thead>
           <tbody>
             {subService}
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



export default SubService
