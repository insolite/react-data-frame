import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC } from 'react';
import {
  useDataFrame,
  VirtualScroll,
} from 'react-data-frame';
import { BasicStoryArgs } from '../types';
import useTestData from '../useTestData';

export interface MuiTableProps extends BasicStoryArgs {
}

const MuiTable: FC<MuiTableProps> = (props) => {
  const {
    dataSize,
    frameSize,
    children,
  } = props;

  const data = useTestData(dataSize);

  const frameState = useDataFrame({
    data,
    frameSize,
  });

  const {
    frame,
  } = frameState;

  return (
    <VirtualScroll
      frameState={frameState}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {frame.map((row) => (
              <TableRow
                key={row.id}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {children}
    </VirtualScroll>
  );
};

export default MuiTable;
