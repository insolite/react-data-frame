import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { limitNumber } from './utils';

export interface SetFrameIndex {
  (newValue: number): void;
}

export interface DataFrameState<TRow> {
  data: TRow[];
  frame: TRow[];
  frameIndex: number;
  setFrameIndex: SetFrameIndex;
}

export interface DataFrameOptions<TRow> {
  data: TRow[];
  frameSize: number;
}

const useDataFrame = <TRow>(options: DataFrameOptions<TRow>): DataFrameState<TRow> => {
  const {
    data,
    frameSize,
  } = options;

  const dataSize = data.length;
  const limitedFrameSize = limitNumber(frameSize, 0, dataSize);

  const [frameIndex, setFrameIndex] = useState<number>(() => Math.floor(limitedFrameSize / 2));
  const indexStart = limitNumber(
    Math.round(frameIndex - limitedFrameSize / 2),
    0,
    dataSize - limitedFrameSize,
  );
  const indexEnd = limitNumber(
    indexStart + limitedFrameSize,
    0,
    dataSize,
  );

  const frame = useMemo<TRow[]>(
    () => {
      return data.slice(indexStart, indexEnd);
    },
    [
      data,
      indexStart,
      indexEnd,
    ],
  );

  const setFrame = useCallback<SetFrameIndex>(
    (newValue: number) => {
      if (Number.isInteger(newValue)) {
        setFrameIndex(() => limitNumber(newValue, 0, dataSize));
      } else {
        console.warn('Providing non-integer value to setFrame will have no effect');
      }
    },
    [
      setFrameIndex,
      dataSize,
    ],
  );

  return {
    data,
    frame,
    frameIndex,
    setFrameIndex: setFrame,
  };
};

export default useDataFrame;
