import React from 'react';


const FrameTable = (props) => {
    const {
        tableComponent, headerComponent, bodyComponent, rowComponent, cellComponent,
        children, frameSize, scrollIndex, data,
    } = props;
    const safeScrollIndex = Math.max(
        0,
        Math.min(data.length - frameSize, scrollIndex)
    );

    let rows = [];
    for (let frameIndex = 0; frameIndex < Math.min(frameSize, data.length); frameIndex++) {
        let rowIndex = safeScrollIndex + frameIndex;
        const row = data[rowIndex];
        rows.push(
            React.createElement(rowComponent, {
                key: frameIndex,
                index: rowIndex,
                data: data[rowIndex],
                // columns: children,
                // onClick: onRowClick,
                // onContextMenu: onContextMenu,
            }, children.map((column, cellIndex) => {
                return (
                    React.createElement(cellComponent, {
                        key: cellIndex,
                        index: cellIndex,
                        value: row[column.props.dataField],
                        row,
                        rowIndex,
                        // width,
                        columnProps: column.props,
                    })
                );
            }))
        );
    }

    return (
        React.createElement(tableComponent, {}, [
            React.createElement(headerComponent, {
                key: 'header',
            }, children),
            React.createElement(bodyComponent, {
                key: 'body',
            }, rows)
        ])
    );
};

FrameTable.defaultProps = {
    data: [],
    scrollIndex: 0,
    frameSize: 10,
    tableComponent: 'div',
    headerComponent: 'div',
    bodyComponent: 'div',
    rowComponent: 'div',
    cellComponent: 'div',
};

export default FrameTable;
