import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import FrameTable from './FrameTable';
import Row from './Row';
import Cell from './Cell';
import Header from './Header';
import Column from './Column';
import Body from './Body';


const FAKE_SCROLL_CONTAINER_HEIGHT = 10000;


class RichFrameTable extends React.Component {

    constructor(props) {
        super(props);

        this.onScrollFrame = this.onScrollFrame.bind(this);
        this.onWheel = this.onWheel.bind(this);

        this.state = {
            scrollIndex: 0,
        };
    }

    onScrollFrame(values) {
        let newIndex = parseInt(values.top * this.props.data.length);
        if (newIndex >= (this.props.data.length - this.props.frameSize)) {
            newIndex = this.props.data.length - this.props.frameSize;
        }
        if (newIndex != this.state.scrollIndex) {
            this.setState({
                scrollIndex: newIndex,
            });
        }
    }

    onWheel(e) {
        const { scrollbars } = this.refs;
        scrollbars.scrollTop(scrollbars.getScrollTop() + e.deltaY);
    }

    render() {
        const height = 281;
        return (
            <div className="rich-frame-table">
                <FrameTable data={this.props.data}
                            frameSize={this.props.frameSize}
                            scrollIndex={this.state.scrollIndex}
                            rowComponent={Row}
                            cellComponent={Cell}
                            headerComponent={Header}
                            columnComponent={Column}
                            bodyComponent={Body}
                            columns={this.props.columns}
                            onWheel={this.onWheel}
                />
                <Scrollbars style={{ width: 10, height: height }}
                            className="scrollbars"
                            onScrollFrame={this.onScrollFrame}
                            ref="scrollbars"
                >
                    <div style={{height: Math.min(this.props.data.length * (height / this.props.frameSize), FAKE_SCROLL_CONTAINER_HEIGHT)}}>&nbsp;</div>
                </Scrollbars>
            </div>
        );
    }
}

export default RichFrameTable;
