"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name, filter) {
  return {
    name: name,
    initialValue: 0,
    onUpdate: function onUpdate(prev, state, val) {
      return filter(val) ? prev + 1 : prev;
    }
  };
};
//# sourceMappingURL=filteredCount.js.map
