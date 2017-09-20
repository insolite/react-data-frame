import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { Column, RichFrameTable } from 'react-frame-table';

import Checkbox from './Checkbox';


const IdCell = props => {
    return (
        <div style={{fontStyle: 'italic'}}>{props.value}</div>
    );
};

const CheckboxFilter = props => {
    return (
        <div>&nbsp;</div>
    );
};

class App extends React.Component {

    constructor(props) {
        super(props);

        this.onSortChange = this.onSortChange.bind(this);
        this.onFiltersChange = this.onFiltersChange.bind(this);
        this.onSelectedRowsChange = this.onSelectedRowsChange.bind(this);
        this.generateRows = this.generateRows.bind(this);
        this.renderCheckboxCell = this.renderCheckboxCell.bind(this);
        this.renderCheckboxColumnLabel = this.renderCheckboxColumnLabel.bind(this);

        this.rowSets = [
            {
                label: '1000 rows',
                count: 1000,
            },
            {
                label: "100'000 rows",
                count: 100000,
            },
            {
                label: "5'000'000 rows!",
                count: 5000000,
            },
        ];

        this.state = {
            data: this.generateRows(this.rowSets[0].count),
            sort: null,
            filters: {},
            selectedRows: [],
        };
    }

    generateRows(count) {
        let data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                id: i + 1,
                name: `Some Name ${i+1}`,
                num: parseInt(Math.random() * 10),
            });
        }
        return data;
    }

    onSortChange(sort) {
        this.setState({
            sort,
        });
    }

    onFiltersChange(filters) {
        this.setState({
            filters,
        });
    }

    onSelectedRowsChange(selectedRows) {
        this.setState({
            selectedRows,
        });
    }

    renderCheckboxColumnLabel(props) {
        const { richTable } = this.refs;
        return (
            <Checkbox checked={richTable ? richTable.isSelectedAll() : false}
                      onChange={() => {
                          const { richTable } = this.refs;
                          if (richTable) {
                              const { data } = this.state;
                              if (richTable.isSelectedAll()) {
                                  this.onSelectedRowsChange([]);
                              } else {
                                  this.onSelectedRowsChange(data.map(row => row.id));
                              }
                          }
                      }}
            />
        );
    }

    renderCheckboxCell(props) {
        const { selectedRows } = this.state;
        return (
            <Checkbox checked={selectedRows.includes(props.row.id)}
                      onChange={() => {
                          const { richTable } = this.refs;
                          if (richTable) {
                              const newSelectedRows = richTable.invertSelection(props.row.id);
                              this.onSelectedRowsChange(newSelectedRows);
                          }
                      }}
                      onClick={e => e.stopPropagation()}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="options">
                    {this.rowSets.map((rowSet, index) => {
                        return (
                            <a className={`generate-rows ${rowSet.count == this.state.data.length ? 'active' : ''}`}
                               key={index}
                               onClick={() => this.setState({data: this.generateRows(rowSet.count)})}
                            >{rowSet.label}</a>
                        );
                    })}
                </div>
                <RichFrameTable data={this.state.data}
                                frameSize={10}
                                rowHeight={35}
                                sort={this.state.sort}
                                onSortChange={this.onSortChange}
                                filters={this.state.filters}
                                onFiltersChange={this.onFiltersChange}
                                columnComponent={Column}
                                selectedRows={this.state.selectedRows}
                                onSelectedRowsChange={this.onSelectedRowsChange}
                                ref="richTable"
                >
                    <Column id="_selected"
                            label={this.renderCheckboxColumnLabel}
                            cellFormatter={this.renderCheckboxCell}
                            filterComponent={CheckboxFilter}
                            sortable={false}
                    />
                    <Column dataField="id"
                            width={100}
                            cellFormatter={IdCell}
                    />
                    <Column dataField="name"
                            width={300}
                            filterFunction={(filterValue, value) => (value || '').indexOf(filterValue || '') >= 0}
                            sortComparer={(value1, value2) => (value1 || '').localeCompare(value2 || '')}
                    />
                    <Column id="num0"
                            dataField="num"
                            width={72}
                            filterComponent={props => (
                                <input value={props.value}
                                       onChange={e => props.onChange(e.target.value === '' ? undefined : parseInt(e.target.value))}
                                       placeholder=">="
                                       type="number"
                                       style={{width: '100%'}}
                                />
                            )}
                            filterFunction={(filterValue, value, row) => value >= filterValue}
                    />
                    <Column id="num1"
                            dataField="num"
                            width={72}
                    />
                    <Column id="num2"
                            dataField="num"
                            width={72}
                    />
                    <Column id="num3"
                            dataField="num"
                            width={72}
                    />
                    <Column id="num4"
                            dataField="num"
                            width={72}
                    />
                </RichFrameTable>
            </div>
        );
    }
}

export default App;
