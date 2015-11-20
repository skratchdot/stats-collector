const execMethod = function (obj, methodName, value) {
  obj._reset = false;
  obj._collectors.forEach(function (collector) {
    if (typeof collector[methodName] === 'function') {
      obj._state[collector.name] = collector[methodName].call(
        null,
        obj._state[collector.name] || collector.initialValue,
        obj._state,
        value
      );
    }
  });
};

export default execMethod;