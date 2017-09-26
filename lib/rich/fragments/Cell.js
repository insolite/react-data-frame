'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Cell = function Cell(props) {
    var row = props.row,
        rowIndex = props.rowIndex,
        value = props.value,
        index = props.index,
        columnProps = props.columnProps,
        _props$columnProps = props.columnProps,
        dataField = _props$columnProps.dataField,
        cellValue = _props$columnProps.cellValue,
        cellFormatter = _props$columnProps.cellFormatter,
        width = _props$columnProps.width,
        cellProps = _objectWithoutProperties(props, ['row', 'rowIndex', 'value', 'index', 'columnProps', 'columnProps']);

    var finalValue = cellValue ? cellValue(value, row, rowIndex) : value;
    return _react2.default.createElement(
        'div',
        _extends({ className: 'react-frame-table--cell', style: { width: width || 'auto' } }, cellProps),
        cellFormatter ? _react2.default.createElement(cellFormatter, {
            index: index,
            value: finalValue,
            row: row,
            rowIndex: rowIndex,
            columnProps: columnProps
        }) : finalValue
    );
};

exports.default = Cell;