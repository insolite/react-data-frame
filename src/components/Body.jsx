import React from 'react';


class Body extends React.Component {

    render() {
        return (
            <div className="body" onWheel={this.props.onWheel}>
                {this.props.children}
            </div>
        );
    }
}

export default Body;
