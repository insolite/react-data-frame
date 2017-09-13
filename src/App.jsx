import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import RichFrameTable from './components/RichFrameTable';
import Column from './components/Column';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.onSortChange = this.onSortChange.bind(this);

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
            sort: null,
        };
    }

    onSortChange(sort) {
        this.setState({
            sort,
        });
    }

    render() {
        return (
            <RichFrameTable data={this.state.data}
                            frameSize={10}
                            sort={this.state.sort}
                            onSortChange={this.onSortChange}
            >
                <Column dataField="id"
                        width={100}
                        cellFormatter={props => <div style={{color: 'green'}}>{props.value}</div>}
                />
                <Column dataField="name"
                        width={300}
                        sortComparer={(value1, value2) => (value1 || '').localeCompare(value2 || '')}
                />
                <Column id="num0"
                        dataField="num"
                        width={60}
                />
                <Column id="num1"
                        dataField="num"
                        width={60}
                />
                <Column id="num2"
                        dataField="num"
                        width={60}
                />
                <Column id="num3"
                        dataField="num"
                        width={60}
                />
                <Column id="num4"
                        dataField="num"
                        width={60}
                />
                <Column id="num5"
                        dataField="num"
                        width={60}
                />
                <Column id="num6"
                        dataField="num"
                        width={60}
                />
                <Column id="num7"
                        dataField="num"
                        width={60}
                />
                <Column id="num8"
                        dataField="num"
                        width={60}
                />
                <Column id="num9"
                        dataField="num"
                        width={60}
                />
            </RichFrameTable>
        );
    }
}

export default App;
