import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { DatasetState, removeDataset } from '../redux/datasetSlice';
import Dataset from '../interfaces/Dataset';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles(() =>
  createStyles({
    table: {
      minWidth: 650,
    },
  })
);

const NAME_CELL_WIDTH = '60%';
const TYPE_CELL_WIDTH = '20%';
const REMOVE_BUTTON_CELL_WIDTH = '20%';

const createRow = (
  dataset: Dataset,
  dispatch: ReturnType<typeof useDispatch>
): JSX.Element => {
  const handleRemoveDataset = () => {
    dispatch(removeDataset(dataset));
  };

  return (
    <StyledTableRow key={dataset.name}>
      <StyledTableCell component="th" scope="row" width={NAME_CELL_WIDTH}>
        {dataset.name}
      </StyledTableCell>
      <StyledTableCell align="left" width={TYPE_CELL_WIDTH}>
        {dataset.type[0].toUpperCase()}
      </StyledTableCell>
      <StyledTableCell align="right" width={REMOVE_BUTTON_CELL_WIDTH}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleRemoveDataset}
        >
          Remove
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default function DatasetTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const datasets = useSelector((state: DatasetState) => state.datasets);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <StyledTableCell width={NAME_CELL_WIDTH}>Name</StyledTableCell>
          <StyledTableCell align="left" width={TYPE_CELL_WIDTH}>
            Type
          </StyledTableCell>
          <StyledTableCell width={REMOVE_BUTTON_CELL_WIDTH} />
        </TableHead>
        <TableBody>
          {[...datasets].map((dataset: Dataset) =>
            createRow(dataset, dispatch)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
