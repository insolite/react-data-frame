# react-data-frame

React library for large data sets rendering.

The main idea is to create a subset of large data set that contains only visible
data. Then, we can navigate through the data by changing current frame (viewport
position), presumably using virtual scrollable area.

This is an alternative approach to pagination. The goal is to provide more
seamless navigation through items.

## Install

```bash
yarn add react-data-frame
```

## Quick start

```tsx
import {
  useDataFrame,
  VirtualScroll,
} from 'react-data-frame';

export const MyTable = () => {
  // Source large data set
  const data = [
    1,
    2,
    3,
    4,
    5,
  ];

  // Proxy data throuh `useDataFrame` hook
  const frameState = useDataFrame({
    data,
    frameSize: 3,
  });

  const {
    frame, // `frame` contains `[1, 2, 3]`
  } = frameState;

  return (
    // `VirtualScroll` controls current frame changing
    //  using virtual scrllable area
    <VirtualScroll
      frameState={frameState}
    >
      // Use `frame` instead of `data` to render UI
      {frame.map((item) => (
        <div key={item}>
          {item}
        </div>
      ))}
    </VirtualScroll>
  );
};
```

## Examples

See [Storybook](https://insolite.github.io/react-data-frame)

## API Docs

See [Docs](https://github.com/insolite/react-data-frame/tree/master/docs)
