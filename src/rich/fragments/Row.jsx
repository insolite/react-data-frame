import React from 'react';


const Row = props => {
    const { children, data, index, ...rowProps } = props;
    return (
        <div className="row" {...rowProps}>
            {children}
        </div>
    );
};

export default Row;
