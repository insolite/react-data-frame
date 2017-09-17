import React from 'react';


const Table = props => {
    const { children, ...tableProps } = props;
    return (
        <div className="react-frame-table--table" {...tableProps}>
            {children}
        </div>
    );
};

export default Table;
