'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'standardDeviation_running',
    initialValue: 0,
    requirements: ['variance_running'],
    onGet: function onGet(prev, state) {
      return Math.sqrt(state.variance_running);
    }
  };
};
//# sourceMappingURL=standardDeviation_running.js.map
