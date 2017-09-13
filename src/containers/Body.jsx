import React from 'react';

import Row from './Row';


class Body extends React.Component {

    render() {
        const { onWheel, frameSize, rowComponent, bodyComponent, cellComponent, columns, data, scrollIndex } = this.props;
        let rows = [];
        for (let i = 0; i < frameSize; i++) {
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
