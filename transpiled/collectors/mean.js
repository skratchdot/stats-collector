'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'mean',
    initialValue: 0,
    requirements: ['count'],
    onUpdate: function onUpdate(prev, state, val) {
      return prev + (val - prev) / state.count;
    }
  };
};