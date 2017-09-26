'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SORT_ICONS;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DefaultFilter = require('../DefaultFilter');

var _DefaultFilter2 = _interopRequireDefault(_DefaultFilter);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SORT_ICONS = (_SORT_ICONS = {}, _defineProperty(_SORT_ICONS, _constants.SORT_ASC, '↑'), _defineProperty(_SORT_ICONS, _constants.SORT_DSC, '↓'), _defineProperty(_SORT_ICONS, _constants.SORT_NONE, ''), _SORT_ICONS);

var Column = function Column(props) {
    var dataField = props.dataField,
        id = props.id,
        width = props.width,
        children = props.children,
        visible = props.visible,
        sortDirection = props.sortDirection,
        onSortChange = props.onSortChange,
        onSortSwitch = props.onSortSwitch,
        sortable = props.sortable,
        filter = props.filter,
        onFilterChange = props.onFilterChange,
        filterComponent = props.filterComponent,
        filterable = props.filterable;

    return _react2.default.createElement(
        'div',
        { className: 'react-frame-table--column',
            style: { width: width || 'auto' }
        },
        _react2.default.createElement(
            'div',
            { className: 'react-frame-table--column-label', onClick: sortable ? function () {
                    return onSortSwitch();
                } : undefined },
            SORT_ICONS[sortDirection],
            children
        ),
        _react2.default.createElement(
            'div',
            { className: 'react-frame-table--column-filter' },
            filterable ? _react2.default.createElement(filterComponent || _DefaultFilter2.default, {
                value: filter,
                onChange: onFilterChange
            }) : _react2.default.createElement(
                'div',
                { className: 'react-frame-table--no-filter' },
                '\xA0'
            )
        )
    );
};

Column.defaultProps = {
    sortable: true,
    visible: true,
    filterable: true
};

exports.default = Column;