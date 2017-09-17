import React from 'react';


const Cell = props => {
    const { row, rowIndex, value, index, columnProps, columnProps: { dataField, cellValue, cellFormatter, width}, ...cellProps } = props;
    const finalValue = cellValue ? cellValue(value, row, rowIndex) : value;
    return (
        <div className="react-frame-table--cell" style={{width: width || 'auto'}} {...cellProps}>
            {cellFormatter ? (
                React.createElement(cellFormatter, {
                    index: index,
                    value: finalValue,
                    row,
                    rowIndex,
                    columnProps,
                })
            ) : (
                finalValue
            )}
        </div>
    );
};

export default Cell;
