import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react';
import DataSize from './DataSize';
import { BasicStoryArgs } from '../types';

export default {
  title: 'Example/Data Size',
  component: DataSize,
  argTypes: {
    dataSize: { control: 'number' },
    frameSize: { control: 'number' },
  },
} as ComponentMeta<typeof DataSize>;

const Template: ComponentStory<typeof DataSize> = (args) => (
  <DataSize {...args} />
);

const generateSource = (args: BasicStoryArgs) => {
  const {
    dataSize,
    frameSize,
  } = args;
  return `
import {
  useDataFrame,
  VirtualScroll,
} from 'react-data-frame';

export const MyList = () => {
  const data = [
    1,
    2,
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
      {frame.map((row) => {
        return (
          <div
            key={row.id}
          >
            {row.title}
          </div>
        );
      })}
    </VirtualScroll>
  );
};
`.trim();
};

export const Small = Template.bind({});
Small.args = {
  dataSize: 15,
  frameSize: 5,
};
Small.parameters = {
  docs: {
    source: {
      code: generateSource(Small.args as BasicStoryArgs),
    },
  },
};

export const Large = Template.bind({});
Large.args = {
  dataSize: 1500,
  frameSize: 10,
};
Large.parameters = {
  docs: {
    source: {
      code: generateSource(Large.args as BasicStoryArgs),
    },
  },
};

export const Huge = Template.bind({});
Huge.args = {
  dataSize: 15000000,
  frameSize: 10,
};
Huge.parameters = {
  docs: {
    source: {
      code: generateSource(Huge.args as BasicStoryArgs),
    },
  },
};
