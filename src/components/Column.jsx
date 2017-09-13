import React from 'react';


class Column extends React.Component {

    render() {
        let column = this.props.column;
        return (
            <div className="column" style={{width: this.props.column.width || 'auto'}}>
                {column.label || column.key}
            </div>
        );
    }
}

export default Column;
