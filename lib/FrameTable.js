'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FrameTable = function FrameTable(props) {
    var tableComponent = props.tableComponent,
        headerComponent = props.headerComponent,
        bodyComponent = props.bodyComponent,
        rowComponent = props.rowComponent,
        cellComponent = props.cellComponent,
        children = props.children,
        frameSize = props.frameSize,
        scrollIndex = props.scrollIndex,
        data = props.data;

    var safeScrollIndex = Math.max(0, Math.min(data.length - frameSize, scrollIndex));

    var rows = [];

    var _loop = function _loop(frameIndex) {
        var rowIndex = safeScrollIndex + frameIndex;
        var row = data[rowIndex];
        rows.push(_react2.default.createElement(rowComponent, {
            key: frameIndex,
            index: rowIndex,
            data: data[rowIndex]
        }, children.map(function (column, cellIndex) {
            return _react2.default.createElement(cellComponent, {
                key: cellIndex,
                index: cellIndex,
                value: row[column.props.dataField],
                row: row,
                rowIndex: rowIndex,
                columnProps: column.props
            });
        })));
    };

    for (var frameIndex = 0; frameIndex < Math.min(frameSize, data.length); frameIndex++) {
        _loop(frameIndex);
    }

    return _react2.default.createElement(tableComponent, {}, [_react2.default.createElement(headerComponent, {
        key: 'header'
    }, children), _react2.default.createElement(bodyComponent, {
        key: 'body'
    }, rows)]);
};

FrameTable.defaultProps = {
    data: [],
    scrollIndex: 0,
    frameSize: 10,
    tableComponent: 'div',
    headerComponent: 'div',
    bodyComponent: 'div',
    rowComponent: 'div',
    cellComponent: 'div'
};

exports.default = FrameTable;