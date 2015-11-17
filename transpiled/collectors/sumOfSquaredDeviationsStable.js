'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'sumOfSquaredDeviationsStable',
    initialValue: 0,
    requirements: ['_values', 'mean'],
    onGet: function onGet(prev, state) {
      var len = state._values.length;
      var sum = 0;
      var current = 0;
      for (var i = 0; i < len; i++) {
        current = state._values[i];
        sum += Math.pow(current - state.mean, 2);
      }
      return sum;
    }
  };
};