import React from 'react';


class Column extends React.Component {

    render() {
        const { column, label, dataField, width, sort, onSortChange, onSortSwitch, id } = this.props;
        return (
            React.cloneElement(column, {
                width,
                sortDirection: sort && sort.id === id ? sort.direction : undefined,
                onSortChange,
                onSortSwitch,
                dataField,
                id,
            }, label === undefined ? (id === undefined ? dataField : id) : label)
        );
    }
}

export default Column;
