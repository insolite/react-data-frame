import React from 'react';

import { SORT_NONE, SORT_ASC, SORT_DSC } from '../containers/constants';


const SORT_ICONS = {
    [SORT_ASC]: '↑',
    [SORT_DSC]: '↓',
    [SORT_NONE]: '',
};

class Column extends React.Component {

    render() {
        const { width, children, sortDirection, onSortChange, onSortSwitch, dataField, id } = this.props;
        return (
            <div className="column"
                 style={{width: width || 'auto'}}
                 onClick={() => onSortSwitch()}
            >
                {SORT_ICONS[sortDirection]}
                {children}
            </div>
        );
    }
}

export default Column;
