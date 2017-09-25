import React from 'react';

import DefaultFilter from '../DefaultFilter';
import { SORT_NONE, SORT_ASC, SORT_DSC } from '../../constants';


const SORT_ICONS = {
    [SORT_ASC]: '↑',
    [SORT_DSC]: '↓',
    [SORT_NONE]: '',
};

const Column = props => {
    const {
        dataField, id, width, children, visible,
        sortDirection, onSortChange, onSortSwitch, sortable,
        filter, onFilterChange, filterComponent, filterable,
    } = props;
    return (
        <div className="react-frame-table--column"
             style={{width: width || 'auto'}}
        >
            <div className="react-frame-table--column-label" onClick={sortable ? () => onSortSwitch() : undefined}>
                {SORT_ICONS[sortDirection]}
                {children}
            </div>
            <div className="react-frame-table--column-filter">
                {filterable ? (
                    React.createElement(filterComponent || DefaultFilter, {
                        value: filter,
                        onChange: onFilterChange,
                    })
                ) : (
                    <div className="react-frame-table--no-filter">&nbsp;</div>
                )}
            </div>
        </div>
    );
};

Column.defaultProps = {
    sortable: true,
    visible: true,
    filterable: true,
};

export default Column;
