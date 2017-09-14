import React from 'react';


class Column extends React.Component {

    render() {
        const { column, label, dataField, width, sort, onSortChange, onSortSwitch, filters, onFiltersChange, id } = this.props;

        return (
            React.cloneElement(column, {
                width,
                sortDirection: sort && sort.id === id ? sort.direction : undefined,
                onSortChange,
                onSortSwitch,
                filter: filters[id],
                onFilterChange: value => {
                    let newFilters = {...filters, [id]: value};
                    if (value === undefined) {
                        delete newFilters[id];
                    }
                    return onFiltersChange(newFilters);
                },
                dataField,
                id,
            }, label === undefined ? (
                id === undefined ? dataField : id
            ) : (
                typeof label === 'string' ? label : React.createElement(label, {})
            ))
        );
    }
}

export default Column;
