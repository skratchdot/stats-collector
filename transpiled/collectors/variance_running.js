'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'variance_running',
    initialValue: 0,
    requirements: ['count', 'mean', 'powerSumAvg_running'],
    onGet: function onGet(prev, state) {
      return (state.powerSumAvg_running * state.count - state.count * state.mean * state.mean) / (state.count - 1);
    }
  };
};
//# sourceMappingURL=variance_running.js.map
