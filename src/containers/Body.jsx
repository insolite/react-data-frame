import React from 'react';

import Row from './Row';


class Body extends React.Component {

    constructor(props) {
        super(props);

        this.update = this.update.bind(this);

        this.renderTime = null;
        this.timeout = null;
    }

    update() {
        this.timeout = null;
        this.forceUpdate();
    }

    shouldComponentUpdate() {
        if (this.props.renderSquash && this.renderTime) {
            const now = new Date();
            const diff = this.props.renderSquash - (now - this.renderTime);
            if (diff > 0) {
                if (!this.timeout) {
                    this.timeout = setTimeout(this.update, diff);
                }
                return false;
            }
        }
        return true;
    }

    render() {
        if (this.props.renderSquash) {
            this.renderTime = new Date();
        }

        const { onWheel, frameSize, rowComponent, bodyComponent, cellComponent, columns, data, scrollIndex } = this.props;
        let rows = [];
        for (let i = 0; i < Math.min(frameSize, data.length); i++) {
            rows.push(
                <Row rowComponent={rowComponent}
                     key={i}
                     data={data[scrollIndex + i]}
                     cellComponent={cellComponent}
                     columns={columns}
                />
            );
        }
        return (
            React.createElement(bodyComponent, {onWheel}, rows)
        );
    }
}

export default Body;
