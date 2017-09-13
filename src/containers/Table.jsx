import React from 'react';


class Table extends React.Component {

    render() {
        return (
            <div className="table">
                {this.props.children}
            </div>
        );
    }
}

export default Table;
