import React from 'react';


class Cell extends React.Component {

    render() {
        const { column, column: { cellFormatter }, value, row } = this.props;
        return (
            <div className="cell" style={{width: column.width || 'auto'}}>
                {cellFormatter ? (
                    React.createElement(cellFormatter, {
                        value,
                        row,
                    })
                ) : (
                    value
                )}
            </div>
        );
    }
}

export default Cell;
