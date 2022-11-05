import React, { Component } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import classes from './BackgroundVideo.module.css'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Carousel } from "react-bootstrap";
// import "react-alice-carousel/lib/alice-carousel.css";
import staticVariables from "../../statics.json"
import vid from "../SignIn/vid.mp4"
import "./CSS.css"
import Footer from '../General/Footer';
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

class SignIn extends Component  {
    state={
        token:'',
        username:'',
        password:'',
        type:''
        ,
        mainFeaturedPost:
        [
          "/receipt.png"
        ]
    
      }
      getUserType=async(username)=>
      {
         await axios.get( staticVariables.backendUrl+"/users/username/"+username,{headers: { authToken :this.state.token }}
        ).then((response) => {
          
          const x=response.data.data[0].type
          const department=response.data.data[0].department
          localStorage.setItem("department",department)
          this.setState({type:x},()=>{localStorage.setItem("type",x)
          // console.log(response.data.data)
          window.location.href=staticVariables.frontUrl+'main/'+x
          
        } )
    
          
    
        })}
      login=async(username,password)=>
      {
        const body= {"username":username,"password":password}
        await axios
        .post(staticVariables.backendUrl+"/auth/login",body)
        .then(res=>{
    if(res.data==="خطأ فى كلمة السر او اسم المستخدم")
    alert("خطأ فى كلمة السر او اسم المستخدم")
    if(res.data==="هذا المستخدم غير فعال")
    alert("هذا المستخدم غير فعال")
    else
    
    {
      //alert(this.state.username)
      this.setState({token:res.data.token,username:username},()=>{
        // this.sendData()
        localStorage.setItem('userId',res.data.id)
       
        localStorage.setItem('token',this.state.token)
        // console.log(username)
        localStorage.setItem('username',username)
        this.getUserType(this.state.username)
    
        // window.location.href=staticVariables.frontUrl+'main/'+localStorage.getItem('type')
      }
      )
       
    //window.location.href='http://localhost:3000/main/'+this.state.type
    
    }
    
    
      }
    
        )
        .catch(error=> {
          alert(error.message)
        })
      }
    
    //   sendData = () => {
    //     this.props.value({token:this.state.token,username:this.state.username});
    // }
   handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    this.login(data.get('username'),data.get('password'))



  };
  render=()=>{
  return (
    <div>
      <div>
        <video src={vid} autoPlay loop muted 
        
        ></video>
        <div className='content'>
 {/* <Carousel autoPlay
  // fade="true"
  wrap="true"
  interval="1000"
  pause="hover"
  style={{ 
    marginLeft:"10%",
    marginRight:"10%",
    // marginBottom:"5%",
    // width: "50%",
                // height: "300px"
              }}
  >
  {
  this.state.mainFeaturedPost&&this.state.mainFeaturedPost.map((post) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={post}
                
           
              />
            
            </Carousel.Item>
  ))}
          </Carousel>
     */}
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
       
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="اسم المستخدم"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="كلمة المرور"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
           
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
    
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}}

export default SignIn