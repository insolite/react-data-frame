'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _FrameTable = require('../FrameTable');

var _FrameTable2 = _interopRequireDefault(_FrameTable);

var _Row = require('./fragments/Row');

var _Row2 = _interopRequireDefault(_Row);

var _Cell = require('./fragments/Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _Header = require('./fragments/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Table = require('./fragments/Table');

var _Table2 = _interopRequireDefault(_Table);

var _Body = require('./fragments/Body');

var _Body2 = _interopRequireDefault(_Body);

var _Column = require('./fragments/Column');

var _Column2 = _interopRequireDefault(_Column);

var _Checkbox = require('../../example/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _DefaultFilter = require('./DefaultFilter');

var _DefaultFilter2 = _interopRequireDefault(_DefaultFilter);

var _DefaultScrollbars = require('./DefaultScrollbars');

var _DefaultScrollbars2 = _interopRequireDefault(_DefaultScrollbars);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SORT_DIRECTIONS = [_constants.SORT_ASC, _constants.SORT_DSC, _constants.SORT_NONE];

var getNextSort = function getNextSort(sort, id, dataField) {
    var directionIndex = void 0;
    if (sort && sort.id === id) {
        directionIndex = (SORT_DIRECTIONS.indexOf(sort.direction) + 1) % SORT_DIRECTIONS.length;
    } else {
        directionIndex = 0;
    }
    return { id: id, dataField: dataField, direction: SORT_DIRECTIONS[directionIndex] };
};

var defaultSortComparator = function defaultSortComparator(value1, value2) {
    if (value1 > value2) {
        return 1;
    } else if (value1 < value2) {
        return -1;
    }
    return 0;
};

var defaultFilter = function defaultFilter(filterValue, value) {
    return filterValue == value;
};

var getColumnId = function getColumnId(column) {
    var _column$props = column.props,
        id = _column$props.id,
        dataField = _column$props.dataField;

    return id === undefined ? dataField : id;
};

var RichFrameTable = function (_React$Component) {
    _inherits(RichFrameTable, _React$Component);

    function RichFrameTable(props) {
        _classCallCheck(this, RichFrameTable);

        var _this = _possibleConstructorReturn(this, (RichFrameTable.__proto__ || Object.getPrototypeOf(RichFrameTable)).call(this, props));

        _this.onScrollFrame = _this.onScrollFrame.bind(_this);
        _this.onWheel = _this.onWheel.bind(_this);
        _this.onRowClick = _this.onRowClick.bind(_this);
        _this.invertSelection = _this.invertSelection.bind(_this);
        _this.isSelectedAll = _this.isSelectedAll.bind(_this);
        _this.filterData = _this.filterData.bind(_this);
        _this.sortData = _this.sortData.bind(_this);
        _this.getData = _this.getData.bind(_this);
        _this.renderBody = _this.renderBody.bind(_this);
        _this.renderRow = _this.renderRow.bind(_this);
        _this.setScrollbars = _this.setScrollbars.bind(_this);

        _this.state = {
            scrollIndex: 0,
            data: _this.getData(props.data, props.children, props.filters, props.sort)
        };

        _this.lastSelectedId = null;
        _this.scrollbars = null;
        return _this;
    }

    _createClass(RichFrameTable, [{
        key: 'onScrollFrame',
        value: function onScrollFrame(values) {
            var _state = this.state,
                data = _state.data,
                scrollIndex = _state.scrollIndex;
            var frameSize = this.props.frameSize;

            var newIndex = parseInt(values.top * data.length);
            if (newIndex >= data.length - frameSize) {
                newIndex = data.length - frameSize;
            }
            if (newIndex != scrollIndex) {
                this.setState({
                    scrollIndex: newIndex
                });
            }
        }
    }, {
        key: 'onWheel',
        value: function onWheel(e) {
            e.preventDefault();
            var scrollbars = this.scrollbars;
            if (scrollbars) {
                scrollbars.scrollTop(scrollbars.getScrollTop() + e.deltaY);
            }
        }
    }, {
        key: 'onRowClick',
        value: function onRowClick(row, rowIndex, e) {
            var _this2 = this;

            var _props = this.props,
                onSelectedRowsChange = _props.onSelectedRowsChange,
                selectedRows = _props.selectedRows;
            var data = this.state.data;

            var rowId = row.id,
                newSelectedRows = void 0;

            if (e.ctrlKey) {
                newSelectedRows = this.invertSelection(rowId);
            } else if (e.shiftKey) {
                var lastSelectedIndex = data.findIndex(function (row) {
                    return row.id === _this2.lastSelectedId;
                });
                if (lastSelectedIndex >= 0) {
                    newSelectedRows = selectedRows.slice();
                    var startIndex = Math.min(lastSelectedIndex, rowIndex);
                    var endIndex = Math.max(lastSelectedIndex, rowIndex);
                    for (var i = startIndex; i <= endIndex; i++) {
                        var _rowId = data[i].id;
                        if (!newSelectedRows.includes(_rowId)) {
                            newSelectedRows.push(_rowId);
                        }
                    }
                } else {
                    newSelectedRows = [rowId];
                }
            } else {
                newSelectedRows = [rowId];
            }
            this.lastSelectedId = rowId;
            if (onSelectedRowsChange) {
                onSelectedRowsChange(newSelectedRows);
            }
        }
    }, {
        key: 'invertSelection',
        value: function invertSelection(rowId) {
            var selectedRows = this.props.selectedRows;

            var rowIndex = selectedRows.indexOf(rowId);
            var newSelectedRows = selectedRows.slice();
            if (rowIndex >= 0) {
                newSelectedRows.splice(rowIndex, 1);
            } else {
                newSelectedRows.push(rowId);
            }
            return newSelectedRows;
        }
    }, {
        key: 'isSelectedAll',
        value: function isSelectedAll() {
            var _props2 = this.props,
                data = _props2.data,
                selectedRows = _props2.selectedRows;
            // Poor but fast detection

            return data.length > 0 && data.length == selectedRows.length;
        }
    }, {
        key: 'getData',
        value: function getData(data, columns, filters, sort) {
            return this.sortData(this.filterData(data, columns, filters), columns, sort);
        }
    }, {
        key: 'filterData',
        value: function filterData(data, columns, filters) {
            var newData = data;
            Object.keys(filters).map(function (filterKey) {
                var filterValue = filters[filterKey];
                var column = columns.find(function (column) {
                    return getColumnId(column) === filterKey;
                });
                newData = newData.filter(function (row) {
                    return (column.props.filterFunction || defaultFilter)(filterValue, row[column.props.dataField], row, defaultFilter);
                });
            });
            return newData;
        }
    }, {
        key: 'sortData',
        value: function sortData(data, columns, sort) {
            var newData = data;
            if (sort && sort.direction !== _constants.SORT_NONE) {
                var column = columns.find(function (column) {
                    return getColumnId(column) === sort.id;
                });
                var sortSign = sort.direction === _constants.SORT_ASC ? 1 : -1;
                newData = newData.slice().sort(function (row1, row2) {
                    return sortSign * (column && column.props.sortComparer || defaultSortComparator)(row1[sort.dataField], row2[sort.dataField], row1, row2, defaultSortComparator);
                });
            }
            return newData;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            if (nextProps.externalSort !== this.props.externalSort || !nextProps.externalSort && !(0, _lodash.isEqual)(nextProps.sort, this.props.sort) || nextProps.externalFilters !== this.props.externalFilters || !nextProps.externalFilters && !(0, _lodash.isEqual)(nextProps.filters, this.props.filters) || !(0, _lodash.isEqual)(nextProps.data, this.props.data)
            // TODO: check columns
            ) {
                    // TODO: optimize: call only sort when possible
                    this.setState({
                        data: this.getData(nextProps.data, nextProps.children, nextProps.filters, nextProps.sort)
                    }, function () {
                        return _this3.props.onVisibleDataChange && _this3.props.onVisibleDataChange(_this3.state.data);
                    });
                }
        }
    }, {
        key: 'renderBody',
        value: function renderBody(props) {
            return _react2.default.createElement(this.props.bodyComponent, _extends({}, props, {
                onWheel: this.onWheel
            }));
        }
    }, {
        key: 'renderRow',
        value: function renderRow(props) {
            var _this4 = this;

            var data = props.data,
                index = props.index;

            return _react2.default.createElement(this.props.rowComponent, _extends({}, props, {
                onClick: function onClick(e) {
                    return _this4.onRowClick(data, index, e);
                },
                style: { height: this.props.rowHeight },
                selected: this.props.selectedRows.includes(data.id)
            }));
        }
    }, {
        key: 'setScrollbars',
        value: function setScrollbars(scrollbars) {
            this.scrollbars = scrollbars;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                data = _props3.data,
                children = _props3.children,
                className = _props3.className,
                selectedRows = _props3.selectedRows,
                onSelectedRowsChange = _props3.onSelectedRowsChange,
                sort = _props3.sort,
                onSortChange = _props3.onSortChange,
                externalSort = _props3.externalSort,
                filters = _props3.filters,
                onFiltersChange = _props3.onFiltersChange,
                externalFilters = _props3.externalFilters,
                scrollbarsComponent = _props3.scrollbarsComponent,
                rowHeight = _props3.rowHeight,
                tableProps = _objectWithoutProperties(_props3, ['data', 'children', 'className', 'selectedRows', 'onSelectedRowsChange', 'sort', 'onSortChange', 'externalSort', 'filters', 'onFiltersChange', 'externalFilters', 'scrollbarsComponent', 'rowHeight']);

            var visibleData = this.state.data;

            var columnIds = [];
            return _react2.default.createElement(
                'div',
                { className: className },
                _react2.default.createElement(
                    _FrameTable2.default,
                    _extends({}, tableProps, {
                        data: visibleData,
                        scrollIndex: this.state.scrollIndex,
                        bodyComponent: this.renderBody,
                        rowComponent: this.renderRow
                    }),
                    children.filter(function (column) {
                        var visible = column.props.visible;

                        return visible === undefined ? true : visible;
                    }).map(function (column, index) {
                        var _column$props2 = column.props,
                            dataField = _column$props2.dataField,
                            width = _column$props2.width,
                            label = _column$props2.label;

                        var id = getColumnId(column);
                        if (columnIds.includes(id)) {
                            throw 'Column must have unique "dataField" or "id" prop';
                        }
                        columnIds.push(id);
                        return _react2.default.cloneElement(column, {
                            key: index,
                            id: id,
                            filter: filters[id],
                            onFilterChange: function onFilterChange(value) {
                                var newFilters = _extends({}, filters, _defineProperty({}, id, value));
                                if (value === undefined) {
                                    delete newFilters[id];
                                }
                                return onFiltersChange(newFilters);
                            },
                            sortDirection: sort && sort.id === id ? sort.direction : _constants.SORT_NONE,
                            onSortChange: onSortChange,
                            onSortSwitch: function onSortSwitch() {
                                return onSortChange(getNextSort(sort, id, dataField));
                            },
                            width: width
                        }, label === undefined ? id === undefined ? dataField : id : typeof label === 'string' ? label : _react2.default.createElement(label, {}));
                    })
                ),
                _react2.default.createElement(scrollbarsComponent, {
                    onScrollFrame: this.onScrollFrame,
                    scrollbarsRef: this.setScrollbars,
                    frameSize: this.props.frameSize,
                    rowHeight: rowHeight,
                    rowsCount: this.state.data.length
                })
            );
        }
    }]);

    return RichFrameTable;
}(_react2.default.Component);

RichFrameTable.defaultProps = {
    tableComponent: _Table2.default,
    headerComponent: _Header2.default,
    bodyComponent: _Body2.default,
    rowComponent: _Row2.default,
    cellComponent: _Cell2.default,
    columnComponent: _Column2.default,
    scrollbarsComponent: _DefaultScrollbars2.default,
    selectedRows: []
};

exports.default = RichFrameTable;