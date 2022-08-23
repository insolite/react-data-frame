import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react';
import MuiTable from './MuiTable';
import { BasicStoryArgs } from '../types';

export default {
  title: 'Example/MUI Table',
  component: MuiTable,
  argTypes: {
    dataSize: { control: 'number' },
    frameSize: { control: 'number' },
  },
} as ComponentMeta<typeof MuiTable>;

const Template: ComponentStory<typeof MuiTable> = (args) => (
  <MuiTable {...args} />
);

const generateSource = (args: BasicStoryArgs) => {
  const {
    dataSize,
    frameSize,
  } = args;
  return `
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  useDataFrame,
  VirtualScroll,
} from 'react-data-frame';

export const MyTable = () => {
  const data = [
    {
      id: 42,
      title: 'foo',
    },
    // ...
  ]; // Your source data of length ${dataSize}

  const frameState = useDataFrame({
    data,
    frameSize: ${frameSize},
  });

  const {
    frame, // Framed data of length ${frameSize}
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
    </VirtualScroll>
  );
};
`.trim();
};

export const Simple = Template.bind({});
Simple.args = {
  dataSize: 15,
  frameSize: 3,
};
Simple.parameters = {
  docs: {
    source: {
      code: generateSource(Simple.args as BasicStoryArgs),
    },
  },
};
