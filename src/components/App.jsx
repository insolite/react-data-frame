import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import FrameTable from './FrameTable';
import Row from './Row';
import Cell from './Cell';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.onScrollFrame = this.onScrollFrame.bind(this);

        let data = [];
        // let rowsCount = 1000;
        let rowsCount = 10000000;
        for (let i = 0; i < rowsCount; i++) {
            data.push({
                id: i + 1,
                name: `Some Name ${i+1}`,
            });
        }

        this.state = {
            scrollIndex: 0,
            data: data,
            frameSize: 10,
        };

        this.columns = [
            {
                key: 'id',
                width: 100,
            },
            {
                key: 'name',
                width: 300,
            },
        ];
    }

    onScrollFrame(values) {
        let newIndex = parseInt(values.top * this.state.data.length);
        if (newIndex >= (this.state.data.length - this.state.frameSize)) {
            newIndex = this.state.data.length - this.state.frameSize;
        }
        if (newIndex != this.state.scrollIndex) {
            this.setState({
                scrollIndex: newIndex,
            });
        }
    }

    render() {
        const height = 281;
        return (
            <div>
                <FrameTable data={this.state.data}
                            frameSize={this.state.frameSize}
                            scrollIndex={this.state.scrollIndex}
                            rowComponent={Row}
                            cellComponent={Cell}
                            columns={this.columns}
                />
                <Scrollbars style={{ width: 10, height: height }}
                            className="scrollbars"
                            onScrollFrame={this.onScrollFrame}

                >
                    <div style={{height: Math.min(this.state.data.length * (height / this.state.frameSize), 10000)}}>&nbsp;</div>
                </Scrollbars>
            </div>
        );
    }
}

export default App;
