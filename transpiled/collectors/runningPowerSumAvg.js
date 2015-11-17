'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'runningPowerSumAvg',
    initialValue: 0,
    requirements: ['count'],
    onUpdate: function onUpdate(prev, state, val) {
      var newValue = prev;
      newValue += (val * val - prev) / state.count;
      return newValue;
    }
  };
};