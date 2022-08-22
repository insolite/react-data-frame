import {
  FC,
  ReactNode,
  UIEventHandler,
  useCallback,
  useState,
  WheelEventHandler,
} from 'react';
import { DataFrameState } from './useDataFrame';

export interface VirtualScrollProps<TRow> {
  frameState: DataFrameState<TRow>;
  children: ReactNode;
}

const VirtualScroll: FC<VirtualScrollProps<unknown>> = (props) => {
  const {
    frameState,
    children,
  } = props;

  const {
    data,
    frame,
    setFrameIndex,
  } = frameState;

  const [rowHeight, setRowHeight] = useState<number>(0);

  const dataSize = data.length;
  const frameSize = frame.length;

  const onFrameRef = useCallback(
    (element: HTMLDivElement) => {
      const frameHeight = element?.offsetHeight || 0;
      setRowHeight(frameHeight / frameSize);
    },
    [
      setRowHeight,
      frameSize,
    ],
  );

  const onScroll = useCallback<UIEventHandler<HTMLDivElement>>(
    (event) => {
      const {
        currentTarget: {
          scrollTop,
          offsetHeight: frameHeight,
          scrollHeight: dataHeight,
        },
      } = event;
      const framePosition = scrollTop / (
        dataHeight - frameHeight
      );
      const newFrame = Math.round(dataSize * framePosition);
      setFrameIndex(newFrame);
    },
    [
      dataSize,
      setFrameIndex,
    ],
  );

  const onWheel = useCallback<WheelEventHandler<HTMLDivElement>>((event) => {
    const {
      currentTarget,
      deltaY,
    } = event;
    currentTarget.scrollBy({
      top: deltaY,
    });
  }, []);

  return (
    <div
      style={{
        maxHeight: `${frameSize * rowHeight}px`,
        overflowY: 'auto',
      }}
      onScroll={onScroll}
      onWheel={onWheel}
    >
      <div
        ref={onFrameRef}
        style={{
          position: 'sticky',
          top: 0,
        }}
      >
        {children}
      </div>
      <div
        style={{
          height: `${dataSize * rowHeight}px`,
        }}
      />
    </div>
  );
};

export default VirtualScroll;
