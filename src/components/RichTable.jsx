import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import FrameTable from '../containers/Table';
import Row from './Row';
import Cell from './Cell';
import Header from './Header';
import Table from './Table';
import Body from './Body';
import Column from './Column';


const FAKE_SCROLL_CONTAINER_HEIGHT = 10000;


const Checkbox = props => {
    return (
        <input type="checkbox"
               {...props}
        />
    );
};


class RichTable extends React.Component {

    constructor(props) {
        super(props);

        this.onScrollFrame = this.onScrollFrame.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onVisibleDataChange = this.onVisibleDataChange.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.invertSelection = this.invertSelection.bind(this);
        this.isSelectedAll = this.isSelectedAll.bind(this);
        this.renderCheckboxColumn = this.renderCheckboxColumn.bind(this);
        this.renderCheckboxCell = this.renderCheckboxCell.bind(this);

        this.state = {
            scrollIndex: 0,
            visibleData: props.data,
        };

        this.lastSelectedId = null;
    }

    onVisibleDataChange(visibleData) {
        const { onVisibleDataChange } = this.props;
        this.setState({
            visibleData,
        }, onVisibleDataChange ? () => onVisibleDataChange(visibleData) : undefined);
    }

    onScrollFrame(values) {
        const { visibleData, scrollIndex } = this.state;
        const { frameSize } = this.props;
        let newIndex = parseInt(values.top * visibleData.length);
        if (newIndex >= (visibleData.length - frameSize)) {
            newIndex = visibleData.length - frameSize;
        }
        if (newIndex != scrollIndex) {
            this.setState({
                scrollIndex: newIndex,
            });
        }
    }

    onWheel(e) {
        const { scrollbars } = this.refs;
        const { onWheel } = this.props;
        scrollbars.scrollTop(scrollbars.getScrollTop() + e.deltaY);
        if (onWheel) {
            onWheel(e);
        }
    }

    onRowClick(row, rowIndex, e) {
        const { onSelectedRowsChange, selectedRows } = this.props;
        const { visibleData } = this.state;
        let rowId = row.id,
            newSelectedRows;

        if (e.ctrlKey) {
            newSelectedRows = this.invertSelection(rowId);
        } else if (e.shiftKey) {
            const lastSelectedIndex = visibleData.findIndex(row => row.id === this.lastSelectedId);
            if (lastSelectedIndex >= 0) {
                newSelectedRows = selectedRows.slice();
                const startIndex = Math.min(lastSelectedIndex, rowIndex);
                const endIndex = Math.max(lastSelectedIndex, rowIndex);
                for (let i = startIndex; i <= endIndex; i ++) {
                    const rowId = visibleData[i].id;
                    if (!newSelectedRows.includes(rowId)) {
                        newSelectedRows.push(rowId);
                    }
                }
            } else {
                newSelectedRows = [rowId];
            }
        } else {
            newSelectedRows = [rowId]
        }
        this.lastSelectedId = rowId;
        if (onSelectedRowsChange) {
            onSelectedRowsChange(newSelectedRows);
        }
    }

    invertSelection(rowId) {
        const { selectedRows } = this.props;
        const rowIndex = selectedRows.indexOf(rowId);
        let newSelectedRows = selectedRows.slice();
        if (rowIndex >= 0) {
            newSelectedRows.splice(rowIndex, 1);
        } else {
            newSelectedRows.push(rowId);
        }
        return newSelectedRows;
    }

    isSelectedAll() {
        const { data, selectedRows } = this.props;
        // Poor but fast detection
        return data.length > 0 && data.length == selectedRows.length;
    }

    renderCheckboxColumn(props) {
        const { checkboxComponent } = this.props;
        return (
            React.createElement(checkboxComponent, {
                checked: this.isSelectedAll(),
                onChange: () => {
                    const { data, onSelectedRowsChange } = this.props;
                    if (this.isSelectedAll()) {
                        onSelectedRowsChange([]);
                    } else {
                        onSelectedRowsChange(data.map(row => row.id));
                    }
                },
            })
        );
    }

    renderCheckboxCell(props) {
        const { selectedRows, checkboxComponent } = this.props;
        return (
            React.createElement(checkboxComponent, {
                checked: selectedRows.includes(props.row.id),
                onChange: () => {
                    const { onSelectedRowsChange } = this.props;
                    const newSelectedRows = this.invertSelection(props.row.id);
                    if (onSelectedRowsChange) {
                        onSelectedRowsChange(newSelectedRows);
                    }
                }
            })
        );
    }

    render() {
        const height = 281;
        const { selectedRows, children, checkboxComponent, ...tableProps } = this.props;
        return (
            <div className="rich-frame-table">
                <FrameTable {...tableProps}
                            scrollIndex={this.state.scrollIndex}
                            onWheel={this.onWheel}
                            onVisibleDataChange={this.onVisibleDataChange}
                            onRowClick={this.onRowClick}
                >
                    {[React.createElement(tableProps.columnComponent, {
                        id: '_selected',
                        label: this.renderCheckboxColumn,
                        filterComponent: () => <div>&nbsp;</div>,
                        filter: () => true, // TODO: filterable flag
                        cellFormatter: this.renderCheckboxCell,
                    }), ...children].map((component, index) => (
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
                    <div style={{height: Math.min(this.state.visibleData.length * (height / tableProps.frameSize), FAKE_SCROLL_CONTAINER_HEIGHT)}}>&nbsp;</div>
                </Scrollbars>
            </div>
        );
    }
}

RichTable.defaultProps = {
    tableComponent: Table,
    headerComponent: Header,
    bodyComponent: Body,
    rowComponent: Row,
    cellComponent: Cell,
    columnComponent: Column,
    checkboxComponent: Checkbox,
    selectedRows: [],
};

export default RichTable;
