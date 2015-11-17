'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'standardDeviation_stable',
    initialValue: 0,
    requirements: ['variance_stable'],
    onGet: function onGet(prev, state) {
      return Math.sqrt(state.variance_stable);
    }
  };
};