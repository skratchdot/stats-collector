'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'max',
    initialValue: Number.MIN_VALUE,
    onUpdate: function onUpdate(prev, state, val) {
      return Math.max(prev, val);
    }
  };
};
//# sourceMappingURL=max.js.map
