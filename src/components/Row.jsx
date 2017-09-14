import React from 'react';


class Row extends React.Component {

    render() {
        const { children, onClick } = this.props;
        return (
            <div className="row" onClick={onClick}>
                {children}
            </div>
        );
    }
}

export default Row;
