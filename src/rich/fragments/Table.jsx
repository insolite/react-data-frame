import React from 'react';


const Table = props => {
    const { children, ...tableProps } = props;
    return (
        <div className="table" {...tableProps}>
            {children}
        </div>
    );
};

export default Table;
