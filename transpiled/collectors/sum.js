'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'sum',
    initialValue: 0,
    onUpdate: function onUpdate(prev, state, val) {
      return prev + val;
    }
  };
};
//# sourceMappingURL=sum.js.map
