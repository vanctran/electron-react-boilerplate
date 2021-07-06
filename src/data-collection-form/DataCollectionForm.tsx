import React from 'react';
import { Grid, Container, makeStyles } from '@material-ui/core';
import FormInput from './FormInput';
import DatasetTable from './DatasetTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function DataCollectionForm() {
  const classes = useStyles();
  return (
    <Container component="main" className={classes.root}>
      <Grid container className={classes.paper} spacing={3}>
        <Grid item xs={12} justify="flex-start">
          <FormInput />
        </Grid>
        <Grid item xs={12}>
          <DatasetTable />
        </Grid>
      </Grid>
    </Container>
  );
}
