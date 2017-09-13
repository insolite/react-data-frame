import React from 'react';


class Cell extends React.Component {

    render() {
        return (
            <div className="cell" style={{width: this.props.width || 'auto'}}>
                {this.props.children}
            </div>
        );
    }
}

export default Cell;
