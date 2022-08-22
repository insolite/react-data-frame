import {
  useMemo,
  useState,
} from 'react';
import { limitNumber } from './utils';

export interface DataFrameState<TRow> {
  data: TRow[];
  frame: TRow[];
  setFrameIndex: (newValue: number) => void;
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

  const [frameIndex, setFrameIndex] = useState<number>(() => Math.floor(frameSize / 2));
  const indexStart = limitNumber(
    Math.round(frameIndex - frameSize / 2),
    0,
    data.length - frameSize,
  );
  const indexEnd = indexStart + frameSize;

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

  return {
    data,
    frame,
    setFrameIndex,
  };
};

export default useDataFrame;
