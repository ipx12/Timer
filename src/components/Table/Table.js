import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectTimers, onDelete } from '../Timer/timerSlice';

const rowStyle = {backgroundColor: "#eaf6ff", 
                    color: '#3150d2', 
                    fontWeight: 'bold'}

export default function BasicTable() {

    const datas = useSelector(selectTimers);
    const dispatch = useDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell align="center">Task</TableCell>
            <TableCell align="center">Time Start</TableCell>
            <TableCell align="center">Time End</TableCell>
            <TableCell align="center">Time spend</TableCell>
            <TableCell align="center">Info</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.timers.map((timer, i) => (
            <TableRow
              key={timer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={rowStyle}>
                {i + 1}
              </TableCell>
              <TableCell align="center" sx={rowStyle}>{timer.task}</TableCell>
              <TableCell align="center" sx={rowStyle}>{timer.timeStart}</TableCell>
              <TableCell align="center" sx={rowStyle}>{timer.timeEnd}</TableCell>
              <TableCell align="center" sx={rowStyle}>{timer.timeSpend}</TableCell>
              <TableCell align="center" sx={rowStyle}><Link style={{textDecoration: 'none'}} to={`task/${timer.id}`}><Button sx={{backgroundColor: '#fff'}}>INFO</Button></Link></TableCell>
              <TableCell align="center" sx={rowStyle}><Button sx={{backgroundColor: '#fff'}} onClick={() => dispatch(onDelete(timer.id))}>DELETE</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
