import React, { useContext,  useEffect,  useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  useHistory,
  useLocation
} from "react-router-dom";
import { authContext } from "./App.js";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SimpleAlerts from './next/alerting.js';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [user, setUser]= useState({id:"", firstname:"", lastname:"", email:"", password:"", conect:""});
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  var [prob, setProb]= useState("")


  let { from } = location.state || { from: { pathname: "/" } };


  const handleClose = () => {
    setOpen(false);
  };



  const fetchTasks = ()=>{
    fetch("http://127.0.0.1:8000/api/task-list/")
    .then(response=>response.json())
    .then(data =>console.log('Data:', data))
  }

  useEffect(()=>{
      var url= 'http://127.0.0.1:8000/api/plz'
      fetch(url, {
        method: 'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(user)
      }).catch(function(error){
        console.log('ERROR: ',error)
      }).then(response=>response?.json())
        .then(data =>setProb(data));
  },[user]);


  const handleInputChange = (event) => {
        event.persist();
        setUser(user => ({...user, [event.target.name]: event.target.value}));
        fetchTasks()
      }
    
    
  function handleSubmit(event) {

        event.preventDefault();
        var url= 'http://127.0.0.1:8000/api/plz'

        fetch(url, {
          method: 'POST',
          headers:{
            'Content-type':'application/json',
          },
          body:JSON.stringify(user)
        }).catch(function(error){
          console.log('ERROR: ',error)
        }).then(response=>response?.json())
          .then(data =>setProb(data))

        if (typeof(prob)=="object"){
          return(auth.signin(() => {history.replace(from);},prob[0]));
          
        }else{setOpen(true);}

        
      }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
            autoFocus
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleInputChange}
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
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <SimpleAlerts mode={{type:"error",message:prob}}/>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}


function useAuth() {
  return useContext(authContext);
}



