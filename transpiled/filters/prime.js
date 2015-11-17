'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  if (value % 1 || value < 2) {
    return false;
  }
  if (value == (0, _leastFactor2.default)(value)) {
    return true;
  }
  return false;
};

var _leastFactor = require('../helpers/leastFactor');

var _leastFactor2 = _interopRequireDefault(_leastFactor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }