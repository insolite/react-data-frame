import React from 'react';

import Header from './Header';
import Body from './Body';


class Table extends React.Component {

    render() {
        const {
            tableComponent, headerComponent, children, bodyComponent, rowComponent, onRowClick,
            sort, onSortChange, externalSort, filters, onFiltersChange, externalFilters,
            cellComponent, onWheel, frameSize, scrollIndex, data, renderSquash, onVisibleDataChange,
            onRowContextMenu
        } = this.props;
        let columnIds = [];
        const columnComponents = children.reduce((columns, column) => {
            let id = column.props.id || column.props.dataField;
            if (columnIds.includes(id)) {
                throw 'Column must have unique "dataField" or "id" prop';
            }
            columnIds.push(id);
            columns.push(
                React.cloneElement(column, {id})
            );
            return columns;
        }, []);
        return (
            React.createElement(tableComponent, {}, [
                <Header key="header"
                        headerComponent={headerComponent}
                        columns={columnComponents}
                        sort={sort}
                        onSortChange={onSortChange}
                        filters={filters}
                        onFiltersChange={onFiltersChange}
                />,
                <Body key="body"
                      bodyComponent={bodyComponent}
                      rowComponent={rowComponent}
                      cellComponent={cellComponent}
                      columns={columnComponents}
                      onWheel={onWheel}
                      frameSize={frameSize}
                      scrollIndex={scrollIndex}
                      data={data}
                      renderSquash={renderSquash}
                      sort={sort}
                      externalSort={externalSort}
                      filters={filters}
                      externalFilters={externalFilters}
                      onVisibleDataChange={onVisibleDataChange}
                      onRowClick={onRowClick}
                      onRowContextMenu={onRowContextMenu}
                />
            ])
        );
    }
}

Table.defaultProps = {
    data: [],
    filters: {},
    sort: null,
};

export default Table;
