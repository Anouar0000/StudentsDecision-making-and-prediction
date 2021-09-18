import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


export default function FirstForm(props) {

  const myListe=props.myListe
  const setMyList=props.setMyList

  const liste1={"math":"Mathématiques de l'ingénieur","analyse":"Analyse numérique","systemL":"Systèmes logiques",
  "reseau1":"Réseaux -1 (partie 1)","systemE":"Systèmes d'exploitation","algo":"Algorithmiques","progC":"Programmation C",
  "fr":"Techniques decommunication - 1","eng":"English communication - 1","sgbd":"Bases de données",
  "cloud":"Virtualisation et Cloud","moys1":"Moyenne general S1"}

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        First Semesters notes
      </Typography>
      <Grid container spacing={3}>
        <NumberList liste={liste1} myListe={myListe} setMyList={setMyList} />
      </Grid>
    </React.Fragment>
  );
}

function NumberList(props) {
  const newliste = props.liste;
  const myListe= props.myListe;
  const setMyList= props.setMyList;


  const handleInputChange = (event) => {
    event.persist();
    setMyList(myListe => ({...myListe, [event.target.name]: event.target.value}));
  }

  const listItems = Object.keys(newliste).map((i,index) =>
<Grid item xs={12} sm={6}>
    <TextField
      required
      type="number" min={0} max={20} step={0.01}
      InputProps={{ inputProps: { min: "0", max: "20" } }}
      id={index.toString()}
      key={i}
      name={i}
      label={newliste[i]}
      value={myListe[i]}
      onChange={handleInputChange}
      fullWidth
    />
    </Grid>);
  return(<Grid container spacing={3}>{listItems}</Grid>);
  }

