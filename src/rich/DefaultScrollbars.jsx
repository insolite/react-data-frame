import React from 'react';

import { Scrollbars } from 'react-custom-scrollbars';


const FAKE_SCROLL_CONTAINER_HEIGHT = 10000;

const DefaultScrollbars = props => {
    const { scrollbarsRef, frameSize, rowHeight, rowsCount, ...scrollbarsProps } = props;
    const height = frameSize * rowHeight;
    return (
        <Scrollbars style={{ width: 10, height: height }}
                    className="react-frame-table--scrollbars"
                    ref={scrollbarsRef}
                    {...scrollbarsProps}
        >
            <div style={{height: Math.min(rowsCount * (height / frameSize), FAKE_SCROLL_CONTAINER_HEIGHT)}}>&nbsp;</div>
        </Scrollbars>
    );
};

export default DefaultScrollbars;
