import React from 'react';


class Cell extends React.Component {

    render() {
        return (
            <div className="cell" style={{width: this.props.column.width || 'auto'}}>
                {this.props.value}
            </div>
        );
    }
}

export default Cell;
