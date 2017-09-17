import React from 'react';


const Header = props => {
    const { children, ...headerProps } = props;
    return (
        <div className="react-frame-table--header" {...headerProps}>
            {children}
        </div>
    );
};

export default Header;
