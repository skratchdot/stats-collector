'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'count',
    initialValue: 0,
    onUpdate: function onUpdate(prev) {
      return prev + 1;
    }
  };
};