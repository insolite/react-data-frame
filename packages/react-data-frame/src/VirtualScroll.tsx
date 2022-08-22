import {
  FC,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { FrameState } from './useDataFrame';

export interface VirtualScrollProps<TRow> {
  frameState: FrameState<TRow>;
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

  const ref = useCallback((element: HTMLDivElement) => {
    if (element) {
      setRowHeight(element.offsetHeight / frame.length);
    } else {
      setRowHeight(0);
    }
  }, [setRowHeight, frame.length]);

  return (
    <div
      style={{
        maxHeight: `${frame.length * rowHeight}px`,
        overflowY: 'auto',
      }}
      onScroll={(event) => {
        const {
          currentTarget: {
            scrollTop,
            offsetHeight: frameHeight,
            scrollHeight: dataHeight,
          },
        } = event;
        const framePosition = scrollTop / (dataHeight - frameHeight);
        const newFrame = Math.round(data.length * framePosition);
        setFrameIndex(newFrame);
      }}
      onWheel={(event) => {
        event.currentTarget.scrollBy({
          top: event.deltaY,
        });
      }}
    >
      <div
        ref={ref}
        style={{ position: 'sticky', top: 0 }}
      >
        {children}
      </div>
      <div
        style={{
          height: `${data.length * rowHeight}px`,
        }}
      >
      </div>
    </div>
  );
};

export default VirtualScroll;
