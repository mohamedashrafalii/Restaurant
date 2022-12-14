import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { MainListItems} from './listItems'
import { ToastContainer } from 'react-toastify'
import { Styles } from '../General/StaticVariables/Styles.js'
import NavBar from '../General/NavBar'
import Footer from '../General/Footer'
import User from '../User/User'
import Department from '../Department/Department'
import Services from '../Services/Services'
import SubService from '../SubService/SubService'
import ServiceStatistics from '../Statistics/ServiceStatistics'
import Invoice from '../Invoice/Invoice'
import ServiceOrnekRead from '../ServiceOrnekRead/ServiceOrnekRead'
import OrnekRead from '../OrnekRead/OrnekRead'
const drawerWidth = 240
function Copyright() {
  return <Footer />
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
     backgroundColor: '#353A40',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  // title: {
  //   flexGrow: 1,
  // },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))

export default function Dashboard() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const [activeItem, setActiveItem] = React.useState()
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const callbackFunction = (value) => {
    setActiveItem(value)
  }
  return (
    
    <div className={classes.root}>
      {localStorage.getItem("token")?<CssBaseline />:<></>}
      {localStorage.getItem("token")? 
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <div 
          // style={{ width: '100%' }}
          >
            <NavBar />
          </div>
        </Toolbar>
      </AppBar>:<></>}
      {localStorage.getItem("token")? <div>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MainListItems parentCallback={callbackFunction} open={open} />
          </List>
          <Divider />
        </Drawer>
      </div>:<></>}
      {localStorage.getItem("token")?<main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <div style={Styles.minHeight}>
            <ItemComponent itemName={activeItem} />
          </div>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>:<></>}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

function ItemComponent(props) {
  switch (props.itemName) {
    case '????????????????????':
      return <User />
      case "?????? ????????????????":
        return <Department />
       case  '????????????':
        return <ServiceStatistics/>
        
    case  "?????? ????????????":
       return <Services />
       case  '?????? ?? ?????????? ?????? ??????????':
        return <ServiceOrnekRead />
          case  '?????? ?? ?????????? ?????? ???????? ????????':
        return <OrnekRead />
       case  "????????????":
       return <SubService/>
       case  '?????????? ??????':
       return <Invoice />
  }
}
