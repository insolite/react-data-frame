import React from 'react';


const Body = props => {
    const { children, ...bodyProps } = props;
    return (
        <div className="body" {...bodyProps}>
            {children}
        </div>
    );
};

export default Body;
