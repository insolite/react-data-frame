import React from 'react';

import Header from './Header';
import Table from './Table';
import Body from './Body';


class FrameTable extends React.Component {

    render() {
        return (
            <Table tableComponent={this.props.tableComponent}>
                <Header headerComponent={this.props.headerComponent}
                        columns={this.props.children}
                />
                <Body bodyComponent={this.props.bodyComponent}
                      rowComponent={this.props.rowComponent}
                      cellComponent={this.props.cellComponent}
                      columns={this.props.children}
                      onWheel={this.props.onWheel}
                      frameSize={this.props.frameSize}
                      scrollIndex={this.props.scrollIndex}
                      data={this.props.data}
                      renderSquash={this.props.renderSquash}
                />
            </Table>
        );
    }
}

export default FrameTable;
