import React from 'react';


class Cell extends React.Component {

    render() {
        const { cellComponent, column: { props: { cellFormatter, cellValue, width } }, value, row, rowIndex } = this.props;
        return (
            React.createElement(cellComponent, {width}, cellFormatter ? (
                React.createElement(cellFormatter, {
                    value: cellValue ? cellValue(value, row, rowIndex) : value,
                    row,
                    rowIndex,
                })
            ) : (
                value
            ))
        );
    }
}

export default Cell;
