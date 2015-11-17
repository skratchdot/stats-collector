'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    name: '_values',
    initialValue: [],
    onUpdate: function onUpdate(prev, state, val) {
      var result = prev.slice(0);
      result.push(val);
      return result;
    }
  };
};
//# sourceMappingURL=_values.js.map
