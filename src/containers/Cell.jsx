import React from 'react';


class Cell extends React.Component {

    render() {
        const { cellComponent, column: { props: { cellFormatter, width } }, value, row } = this.props;
        return (
            React.createElement(cellComponent, {width}, cellFormatter ? (
                React.createElement(cellFormatter, {
                    value,
                    row,
                })
            ) : (
                value
            ))
        );
    }
}

export default Cell;
