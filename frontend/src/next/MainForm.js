import React ,{useContext ,useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import FirstForm from './First_Semesters_notes';
import SecondForm from './Second_Semester_notes';
import Review from './Review';
import { authContext} from "../App.js";
import {
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import TransitionsModal from './popup';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SimpleAlerts from './alerting';

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
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const useStyles2 = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


const steps = ['First Semesters notes', 'Second Semester notes', 'Review your notes'];

function getStepContent(step, myListe,setMyList) {
  switch (step) {
    case 0:
      return <FirstForm myListe={myListe} setMyList={setMyList} />;
    case 1:
      return <SecondForm myListe={myListe} setMyList={setMyList} />;
    case 2:
      return <Review myListe={myListe} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function MainForm() {
  let auth = useAuth();
  const classes = useStyles();
  const classes2 = useStyles2();
  const [activeStep, setActiveStep] = React.useState(0);
  const [myListe,setMyList]=React.useState({"math":'',"analyse":'',"systemL":'',
  "reseau1":'',"systemE":'',"algo":'',"progC":'',
  "fr":'',"eng":'',"sgbd":'',
  "cloud":'',"moys1":'',"proba":'',"graph":'',"reseau2":'',"linux":'',"java":'',
  "python":'',"tla":'',"uml":'',"web":'',"fr2":'',"eng2":'',"moys2":'','spec':''})
  const [pred,setPred]=useState("") 
  const [open, setOpen] = useState(false);

   const [pop,setPop]=useState()
   let history = useHistory();
   let location = useLocation();
   let { from } = location.state || { from: { pathname: "/" } };
   const [x,setX] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function handleSubmit(event) {
    for(let i in myListe){
      if (myListe[i]===""){
        setPop("You still didnt fill everything ")
        return(setOpen(true))
      }
      if (parseFloat(myListe[i]) > 20 || parseFloat(myListe[i]) < 0  ){
        setPop("did you know? but your notes need to be between 0 and 20")
        return(setOpen(true))
      }
    }
    event.preventDefault();

    
    var url= 'http://127.0.0.1:8000/api/make'
    fetch(url, {
        method: 'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(myListe)
      }).catch(function(error){
        console.log('ERROR: ',error)
      }).then(response=>response.json())
        .then(data =>setPred(data));

    setActiveStep(activeStep + 1);
  }


  function checkConnected(){

    const getData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/checkConnect');
      const newData = await response.json();

      if (newData!=="nope"){
        auth.signin(() => {history.replace(from);},{"conect":newData.conect,"id":newData.id,
         "firstname":newData.firstname, "lastname":newData.lastname, "email":newData.email, "password":newData.password});
        }
      else {setX(true);};
    }
    getData()
 }

  useEffect(()=>{
    checkConnected();

    console.log("here??",x);
  },[x]);

  if (auth.user["email"]===""){
    if (x===false){ return(<Typography style={{paddingTop: "80px"}} component="h1" variant="h4" align="center">
      <TransitionsModal/>
      <CircularProgress/></Typography>);}}

  return  auth.user.conect==="yes" ?(
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Welcome {auth.user.firstname}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for trying our predection.
                </Typography>
                <Box bgcolor="secondary.main" color="secondary.contrastText" p={2}>
                <Typography variant="h6" gutterBottom>
                  here ur predection for ur second year if u chose {myListe["spec"]} : {pred}
                  </Typography>
                  </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, myListe, setMyList)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length -1 ? 
                  
                  (<Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                    className={classes.button}
                  >
                    Submit notes
                  </Button>):

                  (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next 
                  </Button>)}

                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes2.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500, }}>
          <Fade in={open}>
            <div className={classes2.paper}>
              <SimpleAlerts mode={{type:"error",message:pop}}/>
            </div>
          </Fade>
        </Modal>
        <Copyright />
      </main>
    </React.Fragment>
  ):( 
    <Redirecting/>);
}

function useAuth() {
  return useContext(authContext);
}


function Redirecting(){
  return(<Redirect to={{pathname: "/login"}}/>)

}
