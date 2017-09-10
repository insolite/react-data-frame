import React from 'react';


class Row extends React.Component {

    render() {
        return (
            <div className="row">
                {this.props.columns.map((column, index) => (
                    React.createElement(this.props.cellComponent, {
                        key: index,
                        value: this.props.data[column.key],
                        column: column,
                    })
                ))}
            </div>
        );
    }
}

export default Row;
