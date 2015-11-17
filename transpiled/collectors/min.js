'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: 'min',
    initialValue: Number.MAX_VALUE,
    onUpdate: function onUpdate(prev, state, val) {
      return Math.min(prev, val);
    }
  };
};
//# sourceMappingURL=min.js.map
