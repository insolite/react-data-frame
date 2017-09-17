import React from 'react';


const Body = props => {
    const { children, ...bodyProps } = props;
    return (
        <div className="react-frame-table--body" {...bodyProps}>
            {children}
        </div>
    );
};

export default Body;
