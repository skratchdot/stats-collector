'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'runningMean',
    initialValue: 0,
    requirements: ['count'],
    onUpdate: function onUpdate(mean, value, newState) {
      return mean + (value - mean) / newState.count;
    }
  };
};