'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCustomScrollbars = require('react-custom-scrollbars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FAKE_SCROLL_CONTAINER_HEIGHT = 10000;

var DefaultScrollbars = function DefaultScrollbars(props) {
    var scrollbarsRef = props.scrollbarsRef,
        frameSize = props.frameSize,
        rowHeight = props.rowHeight,
        rowsCount = props.rowsCount,
        scrollbarsProps = _objectWithoutProperties(props, ['scrollbarsRef', 'frameSize', 'rowHeight', 'rowsCount']);

    var height = frameSize * rowHeight;
    return _react2.default.createElement(
        _reactCustomScrollbars.Scrollbars,
        _extends({ style: { width: 10, height: height },
            className: 'react-frame-table--scrollbars',
            ref: scrollbarsRef
        }, scrollbarsProps),
        _react2.default.createElement(
            'div',
            { style: { height: Math.min(rowsCount * (height / frameSize), FAKE_SCROLL_CONTAINER_HEIGHT) } },
            '\xA0'
        )
    );
};

exports.default = DefaultScrollbars;