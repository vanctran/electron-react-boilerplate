import React, { ChangeEvent, MouseEvent, useState } from 'react';
import {
  Grid,
  Container,
  CssBaseline,
  Select,
  MenuItem,
  makeStyles,
  InputLabel,
  TextField,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';
import { useDispatch } from 'react-redux';
import { addDataset } from '../redux/datasetSlice';
import Dataset from '../interfaces/Dataset';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  selector: {
    minWidth: 110,
  },
  button: {
    paddingBottom: theme.spacing(0),
  },
}));

export default function FormInput(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    datasetName: '',
    datasetType: 'C',
    hasInvalidInput: false,
  });

  const handleOnAddButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    // Check for invalid state every time.
    setState({ ...state, hasInvalidInput: state.datasetName === '' });
    if (state.hasInvalidInput) return;

    dispatch(
      addDataset({
        name: state.datasetName,
        type: state.datasetType,
      } as Dataset)
    );
  };

  const handleChange = (
    event: ChangeEvent<{ value: unknown; name?: string }>
  ) => {
    event.preventDefault();
    setState({ ...state, [event.target.name as string]: event.target.value });
  };

  return (
    <Container component="main" className={classes.root} fixed>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={3} justify="flex-start">
          <Grid item xs={7}>
            <TextField
              name="datasetName"
              label="Dataset name"
              variant="outlined"
              onChange={handleChange}
              error={state.hasInvalidInput}
              autoFocus
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <InputLabel>Type</InputLabel>
            <Select
              defaultValue="C"
              name="datasetType"
              className={classes.selector}
              variant="standard"
              onChange={handleChange}
            >
              <MenuItem value="C">Command</MenuItem>
              <MenuItem value="W">Waypoint</MenuItem>
              <MenuItem value="A">Attribute</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Button
              type="button"
              onClick={handleOnAddButtonClick}
              className={classes.button}
              size="small"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add Dataset
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
