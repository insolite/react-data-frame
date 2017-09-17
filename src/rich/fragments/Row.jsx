import React from 'react';


const Row = props => {
    const { children, data, index, selected, ...rowProps } = props;
    return (
        <div className={`react-frame-table--row ${selected ? 'react-frame-table--selected' : ''}`} {...rowProps}>
            {children}
        </div>
    );
};

export default Row;
