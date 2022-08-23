import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react';
import RawHtml from './RawHtml';
import { BasicStoryArgs } from '../types';

export default {
  title: 'Example/Raw HTML',
  component: RawHtml,
  argTypes: {
    dataSize: { control: 'number' },
    frameSize: { control: 'number' },
  },
} as ComponentMeta<typeof RawHtml>;

const Template: ComponentStory<typeof RawHtml> = (args) => (
  <RawHtml {...args} />
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

export const Simple = Template.bind({});
Simple.args = {
  dataSize: 15,
  frameSize: 5,
};
Simple.parameters = {
  docs: {
    source: {
      code: generateSource(Simple.args as BasicStoryArgs),
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
