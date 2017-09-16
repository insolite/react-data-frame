import React from 'react';


const Header = props => {
    const { children, ...headerProps } = props;
    return (
        <div className="header" {...headerProps}>
            {children}
        </div>
    );
};

export default Header;
