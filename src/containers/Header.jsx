import React from 'react';

import Column from './Column';
import { SORT_NONE, SORT_ASC, SORT_DSC } from './constants';


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

class Header extends React.Component {

    render() {
        const { headerComponent, columns, sort, onSortChange } = this.props;
        return (
            React.createElement(headerComponent, {}, columns.map((column, index) => (
                <Column {...column.props}
                        key={index}
                        column={column}
                        sort={sort}
                        onSortChange={onSortChange}
                        onSortSwitch={() => onSortChange(getNextSort(sort, column.props.id, column.props.dataField))}
                />
            )))
        );
    }
}

export default Header;
