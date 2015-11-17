'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'varianceStable',
    initialValue: 0,
    requirements: ['_values', 'sumOfSquaredDeviationsStable'],
    onGet: function onGet(prev, state) {
      var len = Math.max(1, state._values.length - 1);
      return state.sumOfSquaredDeviationsStable / len;
    }
  };
};