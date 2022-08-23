import { FC } from 'react';
import {
  useDataFrame,
  VirtualScroll,
} from 'react-data-frame';
import FrameInfo from '../FrameInfo';
import { BasicStoryArgs } from '../types';
import useTestData from '../useTestData';

export interface DataSizeProps extends BasicStoryArgs {
}

const DataSize: FC<DataSizeProps> = (props) => {
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
    <>
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
        {children}
      </VirtualScroll>
      <FrameInfo frameState={frameState}/>
    </>
  );
};

export default DataSize;
