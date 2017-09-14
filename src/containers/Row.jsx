import React from 'react';

import Cell from './Cell';


class Row extends React.Component {

    render() {
        const { rowComponent, cellComponent, data, columns, onClick, index } = this.props;
        return (
            React.createElement(rowComponent, {onClick: e => onClick(data, index, e)}, columns.map((column, cellIndex) => (
                <Cell cellComponent={cellComponent}
                      key={cellIndex}
                      rowIndex={index}
                      value={data[column.props.dataField]}
                      row={data}
                      column={column}
                />
            )))
        );
    }
}

export default Row;
