import React from 'react';


class Table extends React.Component {

    render() {
        return (
            React.createElement(this.props.tableComponent, {}, this.props.children)
        );
    }
}

export default Table;
