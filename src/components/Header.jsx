import React from 'react';


class Row extends React.Component {

    render() {
        return (
            <div className="header">
                {this.props.columns.map((column, index) => (
                    React.createElement(this.props.columnComponent, {
                        // key: index,
                        // value: this.props.data[column.key],
                        column: column,
                    })
                ))}
            </div>
        );
    }
}

export default Row;
