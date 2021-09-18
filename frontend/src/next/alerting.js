import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    alignItems: 'center',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts(props) {
  const classes = useStyles();

  switch (props.mode.type) {
    case 'error':
      return (
        <div className={classes.root}>
          <Alert severity="error">error! {props.mode.message}!</Alert>
        </div>
      );
    case 'warning':
      return (
        <div className={classes.root}>
          <Alert severity="warning">This is a warning alert — check it out!</Alert>
        </div>
      );
    case 'success':
      return (
        <div className={classes.root}>
          <Alert severity="success">success! {props.mode.message} <a href="/login">login</a></Alert>
        </div>
      );
    case "info":
  return (
    <div className={classes.root}>
      <Alert severity="info">This is an info alert — check it out!</Alert>
    </div>
  );
  default:
    console.log(`Sorry, we are out of ${props.mode.message}.`);
}
}