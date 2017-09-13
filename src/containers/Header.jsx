import React from 'react';

import Column from './Column';


class Header extends React.Component {

    render() {
        const { headerComponent, columns } = this.props;
        return (
            React.createElement(headerComponent, {}, columns.map((column, index) => (
                <Column {...column.props} column={column} key={index}/>
            )))
        );
    }
}

export default Header;
