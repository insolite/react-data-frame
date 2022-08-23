import { FC } from 'react';
import { DataFrameState } from 'react-data-frame';

export interface FrameInfo<TRow> {
  frameState: DataFrameState<TRow>
}

const FrameInfo: FC<FrameInfo<unknown>> = (props) => {
  const {
    frameState,
    children,
  } = props;

  const {
    data,
    frameIndex,
  } = frameState;

  return (
    <div>
      <p>Data size: {data.length}</p>
      <p>Frame index: {frameIndex}</p>
      {children}
    </div>
  );
};

export default FrameInfo;
