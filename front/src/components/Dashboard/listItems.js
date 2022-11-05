import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
const ActiveItemColor = '#353A40'
const DefaultItemColor = 'white'


export function MainListItems(props) {
  const sendDataToParentComponent = (data) => {
    props.parentCallback(data)
  }
  
  const financeList = [
  
    {
      name: 'تقارير الخدمات الاخرى',
        icon:(style,toolTipID)=> {
        return(
        <AttachMoneyIcon
          data-tip
          data-for={toolTipID}
          style={style}
        />)
        },
      toolTipID: 'تقارير الخدمات الاخرى'
    } 
]

  const serviceList = [
    {
      name: 'انشاء طلب',
        icon:(style,toolTipID)=> {
        return(
        <MedicalServicesIcon
          data-tip
          data-for={toolTipID}
          style={style}
        />)
        },
      toolTipID: 'انشاء طلب'
    } ,
    {
      name: 'مريض',
        icon:(style,toolTipID)=> {
        return(
        <AccessibleForwardIcon
          data-tip
          data-for={toolTipID}
          style={style}
        />)
        },
      toolTipID: 'مريض'
    } 
  
]


  const adminList = [
    
    
    
    {
      name: 'انشاء طلب',
        icon:(style,toolTipID)=> {
        return(
        <ReceiptIcon
          data-tip
          data-for={toolTipID}
          style={style}
        />)
        },
      toolTipID: 'انشاء طلب'
    } ,
    {
      name: "فئة المنتج",
        icon:(style,toolTipID)=> {
        return(
        <ProductionQuantityLimitsIcon
          data-tip
          data-for={toolTipID}
          style={style}
        />)
        },
      toolTipID: "فئة المنتج"
    } ,
    {
      name: "منتجات",
        icon:(style,toolTipID)=> {
        return(
        <ProductionQuantityLimitsIcon
          data-tip
          data-for={toolTipID}
          style={style}
        />)
        },
      toolTipID: "منتجات"
    } ,
    
    {
      name: 'المستخدمين',
        icon:(style,toolTipID)=> {
        return(
        <AccountCircleIcon
          data-tip
          data-for={toolTipID}
          style={style}
        />)
        },
      toolTipID: 'المستخدمين'
    } ,
    {
      name: "فئة المستخدم",
        icon:(style,toolTipID)=> {
        return(
        <AccountBalanceIcon
          data-tip
          data-for={toolTipID}
          style={style}
        />)
        },
      toolTipID: "فئة المستخدم"
    } ,
   
   
    
    
    // {
    //   name: 'بحث و طباعة بون خدمات',
    //     icon:(style,toolTipID)=> {
    //     return(
    //     <ContentPasteSearchIcon
    //       data-tip
    //       data-for={toolTipID}
    //       style={style}
    //     />)
    //     },
    //   toolTipID: 'بحث و طباعة بون خدمات'
    // } ,
    
   
   
   
   
    {
      name: 'تقارير',
        icon:(style,toolTipID)=> {
        return(
        <AttachMoneyIcon
          data-tip
          data-for={toolTipID}
          style={style}
        />)
        },
      toolTipID: 'تقارير'
    } ,
   
  
]
let list = localStorage.getItem("type")==="admin"?adminList:localStorage.getItem("department")==="ماليات"?financeList:serviceList
  const [activeItem, setActiveItem] = React.useState()
  return (
    <div>
      { list.map((item) => (
         <Tooltip title={item.name}>
        <ListItem
          button
          onClick={() => {
            setActiveItem(item.name)
            sendDataToParentComponent(item.name)
          }}
          style={activeItem === item.name
            ? { backgroundColor: ActiveItemColor,color: DefaultItemColor }
            : {}}
        >
          <ListItemIcon>
         
            {item.icon( activeItem === item.name
              ? { color: DefaultItemColor }
              : {},item.toolTipID)}
            
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
        </Tooltip>
      ))}
    </div>
  )
}


// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// )



