import React from 'react';
import { isEqual } from 'lodash';

import Row from './Row';
import { SORT_NONE, SORT_ASC } from './constants';


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

class Body extends React.Component {

    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
        this.filterData = this.filterData.bind(this);
        this.sortData = this.sortData.bind(this);
        this.getData = this.getData.bind(this);

        this.state = {
            data: this.getData(props.data, props.columns, props.filters, props.sort),
        };

        this.renderTime = null;
        this.timeout = null;
    }

    getData(data, columns, filters, sort) {
        return this.sortData(this.filterData(data, columns, filters), columns, sort);
    }

    filterData(data, columns, filters) {
        let newData = data;
        Object.keys(filters).map(filterKey => {
            const filterValue = filters[filterKey];
            const column = columns.find(column => column.props.id === filterKey);
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
            const column = columns.find(column => column.props.id === sort.id);
            const sortSign = sort.direction === SORT_ASC ? 1 : -1;
            newData = newData.slice().sort((row1, row2) => (
                sortSign * (column.props.sortComparer || defaultSortComparator)(
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
        ) {
            // TODO: optimize: call only sort when possible
            this.setState({
                data: this.getData(nextProps.data, nextProps.columns, nextProps.filters, nextProps.sort),
            }, () => this.props.onVisibleDataChange && this.props.onVisibleDataChange(this.state.data));
        }
    }

    shouldComponentUpdate() {
        if (this.props.renderSquash && this.renderTime) {
            const now = new Date();
            const diff = this.props.renderSquash - (now - this.renderTime);
            if (diff > 0) {
                if (!this.timeout) {
                    this.timeout = setTimeout(this.update, diff);
                }
                return false;
            }
        }
        return true;
    }

    update() {
        this.timeout = null;
        this.forceUpdate();
    }

    render() {
        const {
            onWheel, frameSize, rowComponent, bodyComponent, cellComponent, columns,
            scrollIndex, renderSquash
        } = this.props;
        const { data } = this.state;

        if (renderSquash) {
            this.renderTime = new Date();
        }

        let rows = [];
        for (let i = 0; i < Math.min(frameSize, data.length); i++) {
            rows.push(
                <Row rowComponent={rowComponent}
                     key={i}
                     data={data[scrollIndex + i]}
                     cellComponent={cellComponent}
                     columns={columns}
                />
            );
        }
        return (
            React.createElement(bodyComponent, {onWheel}, rows)
        );
    }
}

export default Body;
