'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'runningVariance',
    initialValue: 0,
    requirements: ['count', 'mean', 'runningPowerSumAvg'],
    onGet: function onGet(prev, state) {
      return (state.runningPowerSumAvg * state.count - state.count * state.mean * state.mean) / (state.count - 1);
    }
  };
};