import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import FrameTable from '../containers/FrameTable';
import Row from './Row';
import Cell from './Cell';
import Header from './Header';
import Table from './Table';
import Body from './Body';


const FAKE_SCROLL_CONTAINER_HEIGHT = 10000;


class RichFrameTable extends React.Component {

    constructor(props) {
        super(props);

        this.onScrollFrame = this.onScrollFrame.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onVisibleDataChange = this.onVisibleDataChange.bind(this);

        this.state = {
            scrollIndex: 0,
            visibleData: props.data,
        };
    }

    onVisibleDataChange(visibleData) {
        this.setState({
            visibleData,
        });
    }

    onScrollFrame(values) {
        let newIndex = parseInt(values.top * this.state.visibleData.length);
        if (newIndex >= (this.state.visibleData.length - this.props.frameSize)) {
            newIndex = this.state.visibleData.length - this.props.frameSize;
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
                            tableComponent={this.props.tableComponent}
                            headerComponent={this.props.headerComponent}
                            bodyComponent={this.props.bodyComponent}
                            rowComponent={this.props.rowComponent}
                            cellComponent={this.props.cellComponent}
                            columnComponent={this.props.columnComponent}
                            onWheel={this.onWheel}
                            renderSquash={this.props.renderSquash}
                            sort={this.props.sort}
                            onSortChange={this.props.onSortChange}
                            externalSort={this.props.externalSort}
                            filters={this.props.filters}
                            onFiltersChange={this.props.onFiltersChange}
                            externalFilters={this.props.externalFilters}
                            onVisibleDataChange={this.onVisibleDataChange}
                            onRowClick={this.props.onRowClick}
                >
                    {[React.createElement(this.props.columnComponent, {
                        id: '_selected',
                        label: props => <input type="checkbox" disabled/>,
                        filterComponent: () => <div>&nbsp;</div>,
                        filter: () => true, // TODO: filterable flag
                        cellFormatter: props => {
                            const value = this.props.selectedRows.indexOf(props.row.id);
                            const checked = value >= 0;
                            return (
                                <input type="checkbox" checked={checked} onChange={() => {
                                    let newSelectedRows = this.props.selectedRows.slice();
                                    if (checked) {
                                        newSelectedRows.splice(value, 1);
                                    } else {
                                        newSelectedRows.push(props.row.id);
                                    }
                                    this.props.onSelectedRowsChange(newSelectedRows);
                                }}/>
                            );
                        }
                    }), ...this.props.children].map((component, index) => (
                        React.cloneElement(component, {
                            key: index,
                        })
                    ))}
                </FrameTable>
                <Scrollbars style={{ width: 10, height: height }}
                            className="scrollbars"
                            onScrollFrame={this.onScrollFrame}
                            ref="scrollbars"
                >
                    <div style={{height: Math.min(this.state.visibleData.length * (height / this.props.frameSize), FAKE_SCROLL_CONTAINER_HEIGHT)}}>&nbsp;</div>
                </Scrollbars>
            </div>
        );
    }
}

RichFrameTable.defaultProps = {
    tableComponent: Table,
    headerComponent: Header,
    bodyComponent: Body,
    rowComponent: Row,
    cellComponent: Cell,
};

export default RichFrameTable;
