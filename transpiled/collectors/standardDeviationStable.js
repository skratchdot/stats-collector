'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'standardDeviationStable',
    initialValue: 0,
    requirements: ['varianceStable'],
    onGet: function onGet(prev, state) {
      return Math.sqrt(state.varianceStable);
    }
  };
};