import React from 'react';


class Column extends React.Component {

    render() {
        const { column, label, dataField, width } = this.props;
        return (
            React.cloneElement(column, {}, label === undefined ? dataField : label)
        );
    }
}

export default Column;
