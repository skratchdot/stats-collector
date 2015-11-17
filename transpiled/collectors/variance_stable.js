'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'variance_stable',
    initialValue: 0,
    requirements: ['_values', 'sumOfSquaredDeviations_stable'],
    onGet: function onGet(prev, state) {
      var len = Math.max(1, state._values.length - 1);
      return state.sumOfSquaredDeviations_stable / len;
    }
  };
};