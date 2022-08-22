import { FC } from 'react';
import {
  useDataFrame,
  VirtualScroll,
} from 'react-data-frame';
import { BasicStoryArgs } from '../types';
import useTestData from '../useTestData';

export interface RawHtmlProps extends BasicStoryArgs {
}

const RawHtml: FC<RawHtmlProps> = (props) => {
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
  );
};

export default RawHtml;
