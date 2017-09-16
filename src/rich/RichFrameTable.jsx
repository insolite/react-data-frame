import React from 'react';
import { isEqual } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

import FrameTable from '../FrameTable';
import Row from './fragments/Row';
import Cell from './fragments/Cell';
import Header from './fragments/Header';
import Table from './fragments/Table';
import Body from './fragments/Body';
import Column from './fragments/Column';
import Checkbox from './Checkbox';
import { SORT_NONE, SORT_ASC, SORT_DSC } from '../constants';


const FAKE_SCROLL_CONTAINER_HEIGHT = 10000;

const SORT_DIRECTIONS = [
    SORT_ASC,
    SORT_DSC,
    SORT_NONE,
];

const getNextSort = (sort, id, dataField) => {
    let directionIndex;
    if (sort && sort.id === id) {
        directionIndex = (SORT_DIRECTIONS.indexOf(sort.direction) + 1) % SORT_DIRECTIONS.length;
    } else {
        directionIndex = 0;
    }
    return {id, dataField, direction: SORT_DIRECTIONS[directionIndex]};
};

const defaultSortComparator = (value1, value2) => {
    if (value1 > value2) {
        return 1;
    } else if (value1 < value2) {
        return -1;
    }
    return 0;
};

const defaultFilter = (filterValue, value) => {
    return filterValue == value;
};

const getColumnId = column => {
    const { id, dataField } = column.props;
    return id === undefined ? dataField : id;
};

class RichFrameTable extends React.Component {

    constructor(props) {
        super(props);

        this.onScrollFrame = this.onScrollFrame.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.invertSelection = this.invertSelection.bind(this);
        this.isSelectedAll = this.isSelectedAll.bind(this);
        this.renderCheckboxColumn = this.renderCheckboxColumn.bind(this);
        this.renderCheckboxCell = this.renderCheckboxCell.bind(this);
        this.filterData = this.filterData.bind(this);
        this.sortData = this.sortData.bind(this);
        this.getData = this.getData.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.renderRow = this.renderRow.bind(this);

        this.state = {
            scrollIndex: 0,
            data: this.getData(props.data, props.children, props.filters, props.sort),
        };

        this.lastSelectedId = null;
    }

    onScrollFrame(values) {
        const { data, scrollIndex } = this.state;
        const { frameSize } = this.props;
        let newIndex = parseInt(values.top * data.length);
        if (newIndex >= (data.length - frameSize)) {
            newIndex = data.length - frameSize;
        }
        if (newIndex != scrollIndex) {
            this.setState({
                scrollIndex: newIndex,
            });
        }
    }

    onWheel(e) {
        const { scrollbars } = this.refs;
        const { onWheel } = this.props;
        scrollbars.scrollTop(scrollbars.getScrollTop() + e.deltaY);
        if (onWheel) {
            onWheel(e);
        }
    }

    onRowClick(row, rowIndex, e) {
        const { onSelectedRowsChange, selectedRows } = this.props;
        const { data } = this.state;
        let rowId = row.id,
            newSelectedRows;

        if (e.ctrlKey) {
            newSelectedRows = this.invertSelection(rowId);
        } else if (e.shiftKey) {
            const lastSelectedIndex = data.findIndex(row => row.id === this.lastSelectedId);
            if (lastSelectedIndex >= 0) {
                newSelectedRows = selectedRows.slice();
                const startIndex = Math.min(lastSelectedIndex, rowIndex);
                const endIndex = Math.max(lastSelectedIndex, rowIndex);
                for (let i = startIndex; i <= endIndex; i ++) {
                    const rowId = data[i].id;
                    if (!newSelectedRows.includes(rowId)) {
                        newSelectedRows.push(rowId);
                    }
                }
            } else {
                newSelectedRows = [rowId];
            }
        } else {
            newSelectedRows = [rowId]
        }
        this.lastSelectedId = rowId;
        if (onSelectedRowsChange) {
            onSelectedRowsChange(newSelectedRows);
        }
    }

    invertSelection(rowId) {
        const { selectedRows } = this.props;
        const rowIndex = selectedRows.indexOf(rowId);
        let newSelectedRows = selectedRows.slice();
        if (rowIndex >= 0) {
            newSelectedRows.splice(rowIndex, 1);
        } else {
            newSelectedRows.push(rowId);
        }
        return newSelectedRows;
    }

    isSelectedAll() {
        const { data, selectedRows } = this.props;
        // Poor but fast detection
        return data.length > 0 && data.length == selectedRows.length;
    }

    getData(data, columns, filters, sort) {
        return this.sortData(this.filterData(data, columns, filters), columns, sort);
    }

    filterData(data, columns, filters) {
        let newData = data;
        Object.keys(filters).map(filterKey => {
            const filterValue = filters[filterKey];
            const column = columns.find(column => getColumnId(column) === filterKey);
            newData = newData.filter((row) => (
                (column.props.filter || defaultFilter)(
                    filterValue,
                    row[column.props.dataField],
                    row,
                    defaultFilter
                )
            ));
        });
        return newData;
    }

    sortData(data, columns, sort) {
        let newData = data;
        if (sort && sort.direction !== SORT_NONE) {
            const column = columns.find(column => getColumnId(column) === sort.id);
            const sortSign = sort.direction === SORT_ASC ? 1 : -1;
            newData = newData.slice().sort((row1, row2) => (
                sortSign * (column && column.props.sortComparer || defaultSortComparator)(
                    row1[sort.dataField],
                    row2[sort.dataField],
                    row1,
                    row2,
                    defaultSortComparator
                )
            ));
        }
        return newData;
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.externalSort !== this.props.externalSort ||
            !nextProps.externalSort && !isEqual(nextProps.sort, this.props.sort) ||
            nextProps.externalFilters !== this.props.externalFilters ||
            !nextProps.externalFilters && !isEqual(nextProps.filters, this.props.filters) ||
            !isEqual(nextProps.data, this.props.data)
            // TODO: check columns
        ) {
            // TODO: optimize: call only sort when possible
            this.setState({
                data: this.getData(nextProps.data, nextProps.children, nextProps.filters, nextProps.sort),
            }, () => this.props.onVisibleDataChange && this.props.onVisibleDataChange(this.state.data));
        }
    }

    renderBody(props) {
        return React.createElement(this.props.bodyComponent, {
            ...props,
            onWheel: this.onWheel,
        })
    }

    renderRow(props) {
        const { data, index } = props;
        return React.createElement(this.props.rowComponent, {
            ...props,
            onClick: e => this.onRowClick(data, index, e),
        })
    }

    renderCheckboxColumn(props) {
        const { checkboxComponent } = this.props;
        return (
            React.createElement(checkboxComponent, {
                checked: this.isSelectedAll(),
                onChange: () => {
                    const { data, onSelectedRowsChange } = this.props;
                    if (this.isSelectedAll()) {
                        onSelectedRowsChange([]);
                    } else {
                        onSelectedRowsChange(data.map(row => row.id));
                    }
                },
            })
        );
    }

    renderCheckboxCell(props) {
        const { selectedRows, checkboxComponent } = this.props;
        return (
            React.createElement(checkboxComponent, {
                checked: selectedRows.includes(props.row.id),
                onChange: () => {
                    const { onSelectedRowsChange } = this.props;
                    const newSelectedRows = this.invertSelection(props.row.id);
                    if (onSelectedRowsChange) {
                        onSelectedRowsChange(newSelectedRows);
                    }
                }
            })
        );
    }

    render() {
        const height = 281;
        const {
            data, children,
            selectedRows, onSelectedRowsChange,
            sort, onSortChange, externalSort,
            filters, onFiltersChange, externalFilters,
            checkboxComponent,
            ...tableProps
        } = this.props;
        const { data: visibleData } = this.state;
        let columnIds = [];
        return (
            <div className="rich-frame-table">
                <FrameTable {...tableProps}
                            data={visibleData}
                            scrollIndex={this.state.scrollIndex}
                            bodyComponent={this.renderBody}
                            rowComponent={this.renderRow}
                >
                    {[React.createElement(tableProps.columnComponent, {
                        id: '_selected',
                        label: this.renderCheckboxColumn,
                        filterComponent: () => <div>&nbsp;</div>,
                        filter: () => true, // TODO: filterable flag
                        cellFormatter: this.renderCheckboxCell,
                    }), ...children].map((column, index) => {
                        const { dataField, width, label } = column.props;
                        const id = getColumnId(column);
                        if (columnIds.includes(id)) {
                            throw 'Column must have unique "dataField" or "id" prop';
                        }
                        columnIds.push(id);
                        return (
                            React.cloneElement(column, {
                                key: index,
                                id: id,
                                filter: filters[id],
                                onFilterChange: value => {
                                    let newFilters = {...filters, [id]: value};
                                    if (value === undefined) {
                                        delete newFilters[id];
                                    }
                                    return onFiltersChange(newFilters);
                                },
                                sortDirection: sort && sort.id === id ? sort.direction : SORT_NONE,
                                onSortChange: onSortChange,
                                onSortSwitch: () => onSortChange(getNextSort(sort, id, dataField)),
                                width: width,
                            }, label === undefined ? (
                                id === undefined ? dataField : id
                            ) : (
                                typeof label === 'string' ? label : React.createElement(label, {})
                            ))
                        );
                    })}
                </FrameTable>
                <Scrollbars style={{ width: 10, height: height }}
                            className="scrollbars"
                            onScrollFrame={this.onScrollFrame}
                            ref="scrollbars"
                >
                    <div style={{height: Math.min(this.state.data.length * (height / tableProps.frameSize), FAKE_SCROLL_CONTAINER_HEIGHT)}}>&nbsp;</div>
                </Scrollbars>
            </div>
        );
    }
}

RichFrameTable.defaultProps = {
    tableComponent: Table,
    headerComponent: Header,
    bodyComponent: Body,
    rowComponent: Row,
    cellComponent: Cell,
    columnComponent: Column,
    checkboxComponent: Checkbox,
    selectedRows: [],
};

export default RichFrameTable;
