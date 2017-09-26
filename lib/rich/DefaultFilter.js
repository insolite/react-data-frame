'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultFilter = function DefaultFilter(props) {
    var value = props.value,
        _onChange = props.onChange,
        style = props.style;

    return _react2.default.createElement('input', { type: 'text',
        value: value || '',
        onChange: function onChange(e) {
            return _onChange(e.target.value || undefined);
        },
        style: _extends({ width: '100%' }, style)
    });
};

exports.default = DefaultFilter;