import React from 'react';

import { SORT_NONE, SORT_ASC, SORT_DSC } from '../constants';


const SORT_ICONS = {
    [SORT_ASC]: '↑',
    [SORT_DSC]: '↓',
    [SORT_NONE]: '',
};

class DefaultFilter extends React.Component {
    render() {
        const { value, onChange } = this.props;
        return (
            <input type="text" value={value || ''} onChange={e => onChange(e.target.value || undefined)} style={{width: '100%'}}/>
        );
    }
}

class Column extends React.Component {

    render() {
        const { width, children, sortDirection, onSortChange, onSortSwitch, filter, onFilterChange, filterComponent, dataField, id } = this.props;
        return (
            <div className="column"
                 style={{width: width || 'auto'}}
            >
                <div onClick={() => onSortSwitch()}>
                    {SORT_ICONS[sortDirection]}
                    {children}
                </div>
                <div>
                    {React.createElement(filterComponent || DefaultFilter, {
                        value: filter,
                        onChange: onFilterChange,
                    })}
                </div>
            </div>
        );
    }
}

export default Column;
