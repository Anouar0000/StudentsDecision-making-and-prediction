import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import React from 'react';

export default function SecondForm(props) {

  const myListe=props.myListe
  const setMyList=props.setMyList

  const liste1={"proba":"Probab,Stat.et Proc.aléatoires","graph":"Théorie des graphes","reseau2":"Réseaux IP (partie2)",
  "linux":"Systèmes d'exploitation Linux - 2","java":"Programmation 1: JAVA","python":"Programmation Python","tla":"Théorie des langages",
  "uml":"Modélisation UML","web":"Développement Web","fr2":"Techniques de communication - 2",
  "eng2":"English communication - 2","moys2":"Moyenne general S2"}

  const handleInputChange = (event) => {
    event.persist();
    setMyList(myListe => ({...myListe, 'spec': event.target.value}))
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Second Semester
      </Typography>
      <Grid container spacing={3}>
        <NumberList liste={liste1} myListe={myListe} setMyList={setMyList} />


        <Grid item xs={12}>
        <FormControl component="fieldset" dense>
          <FormLabel component="h4" fontSize="large" variant='h1' dense>Pick a speciality</FormLabel>
          <RadioGroup  aria-label="Pick a speciality" name="speciality" value={myListe['spec']} align="left" row onChange={handleInputChange} required>
          <Grid item xs={12} sm={6}>
            <FormControlLabel value="gl" control={<Radio />} label="génie logiciel" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel value="dsen" control={<Radio />} label="data science" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel value="ssir" control={<Radio />} label="sécurité" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel value="dev_w_m" control={<Radio />} label="développement web et mobile" />
          </Grid>
          </RadioGroup>
        </FormControl>
        </Grid>
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
      type="number" min="0" max="20" step="0.01"
      key={i}
      id={index.toString()}
      name={i}
      label={newliste[i]}
      value={myListe[i]}
      onChange={handleInputChange}
      fullWidth
    />
    </Grid>);
  return(<Grid container spacing={3}>{listItems}</Grid>);
  }

