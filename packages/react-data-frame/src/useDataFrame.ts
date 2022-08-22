import {
  useMemo,
  useState,
} from 'react';

export interface FrameState<TRow> {
  data: TRow[];
  frame: TRow[];
  setFrameIndex: (newValue: number) => void;
}

export interface FrameOptions<TRow> {
  data: TRow[];
  frameSize: number;
}

const limit = (
  value: number,
  min: number,
  max: number,
): number => {
  return Math.min(Math.max(value, min), max);
};

const useDataFrame = <TRow>(options: FrameOptions<TRow>): FrameState<TRow> => {
  const {
    data,
    frameSize,
  } = options;

  const [frameIndex, setFrameIndex] = useState<number>(() => Math.floor(frameSize / 2));
  const indexStart = limit(Math.round(frameIndex - frameSize / 2), 0, data.length - frameSize);
  const indexEnd = indexStart + frameSize;

  const frame = useMemo<TRow[]>(() => {
    return data.slice(indexStart, indexEnd);
  }, [data, indexStart, indexEnd]);

  return {
    data,
    frame,
    setFrameIndex,
  };
};

export default useDataFrame;
