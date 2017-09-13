import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import RichFrameTable from './RichFrameTable';


class App extends React.Component {

    constructor(props) {
        super(props);

        let data = [];
        let rowsCount = 1000;
        // let rowsCount = 10000000;
        for (let i = 0; i < rowsCount; i++) {
            data.push({
                id: i + 1,
                name: `Some Name ${i+1}`,
                num: parseInt(Math.random() * 10),
            });
        }

        this.state = {
            data: data,
        };

        this.columns = [
            {
                key: 'id',
                width: 100,
                cellFormatter: props => <div style={{color: 'green'}}>{props.value}</div>,
            },
            {
                key: 'name',
                width: 300,
            },
            {
                key: 'num',
                width: 50,
            },
            {
                key: 'num',
                width: 50,
            },
            {
                key: 'num',
                width: 50,
            },
            {
                key: 'num',
                width: 50,
            },
            {
                key: 'num',
                width: 50,
            },
            {
                key: 'num',
                width: 50,
            },
            {
                key: 'num',
                width: 50,
            },
            {
                key: 'num',
                width: 50,
            },
            {
                key: 'num',
                width: 50,
            },
            {
                key: 'num',
                width: 50,
            },
            {
                key: 'num',
                width: 50,
            },
        ];
    }

    render() {
        return (
            <RichFrameTable data={this.state.data}
                            frameSize={10}
                            columns={this.columns}
            />
        );
    }
}

export default App;
