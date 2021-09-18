import React from 'react';
import { makeStyles , withStyles  } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  myClass: 
  {paddingleft: "30px"},
  
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
}));

const WhiteTextTypography = withStyles({
  root: {
    color: "red"
  }
})(Typography);



export default function Review(props) {
  const classes = useStyles();
  const myListe=props.myListe;

  const liste1={"math":"Mathématiques de l'ingénieur","analyse":"Analyse numérique","systemL":"Systèmes logiques",
  "reseau1":"Réseaux -1 (partie 1)","systemE":"Systèmes d'exploitation","algo":"Algorithmiques","progC":"Programmation C",
  "fr":"Techniques decommunication - 1","eng":"English communication - 1","sgbd":"Bases de données",
  "cloud":"Virtualisation et Cloud","moys1":"Moyenne general S1","proba":"Probab,Stat.et Proc.aléatoires","graph":"Théorie des graphes","reseau2":"Réseaux IP (partie2)",
  "linux":"Systèmes d'exploitation Linux - 2","java":"Programmation 1: JAVA","python":"Programmation Python","tla":"Théorie des langages",
  "uml":"Modélisation UML","web":"Développement Web","fr2":"Techniques de communication - 2",
  "eng2":"English communication - 2","moys2":"Moyenne general S2","spec":"Speciality"}


  function GeneralMoy(){

    return(myListe["moys1"] &&myListe["moys2"] ?
    (<Typography variant="subtitle1" className={classes.total}>
        {((parseFloat(myListe["moys1"])+parseFloat(myListe["moys2"]))/2).toString()}
    </Typography>):(<WhiteTextTypography className={classes.total} color="red" variant="body2">Empty</WhiteTextTypography>))
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Notes summary
      </Typography>
      <List component="nav">
        {Object.keys(myListe).map((i) => (
          <ListItem divider className={classes.listItem} key={i}>
            <ListItemText className={classes.myClass} primary={liste1[i]+" :"} />
            {myListe[i]?(<Typography variant="body2">{myListe[i]}</Typography>):
            (<WhiteTextTypography className={classes.palette} color="red" variant="body2">Empty</WhiteTextTypography>)}
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Moyenne General :" />
          
          <GeneralMoy/>

        </ListItem>
      </List>
    </React.Fragment>
  );
}