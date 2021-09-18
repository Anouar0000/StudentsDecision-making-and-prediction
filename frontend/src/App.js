import './App.css';
import MyLogin from './Login';
import SignUp from './Signup';
import MainForm from './next/MainForm';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


function App() {
  const classes = useStyles();

  return (
    
    <div className="App">
      <ProvideAuth>
      <Router>
      <div>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
          <div className={classes.navbar}>
            <ul className={classes.nav1}>
              <li className={classes.li}>
              <a href="https://tek-up.de/"><Button color="primary">Tek-up</Button></a>
              </li>
                <Home/>
            </ul>
            <AuthButton />
        </div>
          </Typography>
        </Toolbar>
      </AppBar>


        <Switch>
          <Route exact path="/">
            <MainForm />
          </Route>
          <Route path="/Login">
            <MyLogin />
          </Route>
          <Route path="/Signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
    </ProvideAuth>
    </div>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  var [user, setUser] = useState({conect:"",id:"", firstname:"", lastname:"", email:"", password:""});

  const signin = (cb,a) => {
    return fakeAuth.signin(() => {
      setUser(user => ({...user,conect:a["conect"],id:a["id"],
      firstname:a["firstname"],lastname:a["lastname"],email:a["email"],password:a["password"]}));
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      fetch("http://127.0.0.1:8000/api/oki",
      {
        method: 'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(user)}).catch(function(error){
          console.log('ERROR: ',error)
        }).then(response=>response.json());


      setUser(user => ({...user, conect: null}));
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();
  const classes = useStyles();

  return auth.user.conect ? (
    <ul className={classes.nav2}>
      <li className={classes.li}>
      <Button color="secondary" style={{textDecoration: "underline"}}
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Signout
      </Button>
      </li>
    </ul>
  ) : (
    <ul className={classes.nav2}>
      <li className={classes.li}>

          <Link to="/Login">
            <Button color="primary">Login</Button>
            </Link>

      </li>
      <li className={classes.li}>  
      <Link to="/Signup">
        <Button color="primary">Signup</Button>
        </Link>
      </li>
    </ul>
  );
}

function Home() {
  let auth = useAuth();
  const classes = useStyles();
  return auth.user.conect ?(
      <li className={classes.li}>
      <a href="/">
      <Button color="primary">Home</Button>
      </a>
      </li>):(<></>);
}



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  li:{
    float: 'left',
    margin: '0 15px',
    fontsize: '13px',
    position: 'relative',
    overflow: 'hidden',
    height: '42px',
    lineheight: '42px'
  },
  navbar:{
    height: '65px',
    width: '100%'
  },
  nav1: {
    position: 'absolute'
  },
  nav2: {
    position: 'absolute',
    right: '20px',
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



export default App;
export const authContext = createContext();
