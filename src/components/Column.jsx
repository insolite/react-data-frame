import React from 'react';


class Column extends React.Component {

    render() {
        return (
            <div className="column" style={{width: this.props.width || 'auto'}}>
                {this.props.children}
            </div>
        );
    }
}

export default Column;
