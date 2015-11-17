'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'runningStandardDeviation',
    initialValue: 0,
    requirements: ['runningVariance'],
    onGet: function onGet(prev, state) {
      return Math.sqrt(state.runningVariance);
    }
  };
};