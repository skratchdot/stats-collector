import execMethod from './helpers/execMethod';

/**
 * A stat collector that initially includes no collector functions.
 * @example
 * const statsCollector = new BaseStatsCollector();
 * statsCollector.addCollector({name: 'custom', onUpdate: fn});
 * statsCollector.update([1, 2, 3, 4, 5]);
 * statsCollector.get();
 */
export default class BaseStatsCollector {
  constructor() {
    this._collectors = [];
    this._reset = true;
    this._state = {};
    this._ignore = [];
    this._filters = [];
  }
  /**
   * Add a collector function that can process data
   * when update() or get() is called.
   * @param {Object} collector An object with the following properties:
   *   - **name** - [String] The name of the collector
   *   - **initialValue** - [any] The initial value if update() has never been called
   *   - **requirements** - [Array] An array of collector names that must be added before this collector
   *   - **onUpdate** - [Function]
   *   - **onGet** - [Function]
   * @example
   * const statCollector = new BaseStatsCollector();
   * statCollector.addCollector({
   *   name: 'test-sum',
   *   initialValue: 0,
   *   onUpdate: function (prev, state, val) { return prev + val; }
   * });
   * @return {undefined}
   */
  addCollector(collector) {
    if (!this._reset) {
      throw new Error('Cannot add a new collector unless you call reset() first');
    }
    if (typeof collector === 'object' && typeof collector.name === 'string') {
      let reqIndex;
      let requirements = collector.requirements;
      if (!Array.isArray(requirements)) {
        requirements = [];
      }
      this._collectors.forEach(function (currentCollector) {
        if (currentCollector.name === collector.name) {
          throw new Error('A collector with that name has already been added.');
        }
        reqIndex = requirements.indexOf(currentCollector.name);
        if (reqIndex >= 0) {
          requirements.splice(reqIndex, 1);
        }
      });
      if (requirements.length) {
        throw new Error(`Did not meet the requirements: ${requirements}`);
      }
      this._collectors.push(collector);
    } else {
      throw new Error('Collector must be an object with a name');
    }
    this.reset();
  }
  addFilter(filter) {
    if (typeof filter !== 'function') {
      throw new Error('Filter must be a function.');
    }
    this._filters.push(filter);
  }
  addIgnore(name) {
    if (this._ignore.indexOf(name) === -1) {
      this._ignore.push(name);
    }
  }
  get(zeroForUndefined) {
    const self = this;
    const result = {};
    if (!this._reset) {
      execMethod(this, 'onGet');
    }
    Object.keys(this._state).sort().forEach(function (key) {
      if (self._ignore.indexOf(key) === -1) {
        let val = self._state[key];
        if (val) {
          val = JSON.parse(JSON.stringify(val));
        } else if (typeof val === 'undefined' && zeroForUndefined) {
          val = 0;
        }
        result[key] = val;
      }
    });
    return result;
  }
  update(...values) {
    const self = this;
    values.forEach(function (value) {
      if (Array.isArray(value)) {
        value.forEach(function (v) {
          self.update(v);
        });
      } else {
        const v = parseFloat(value);
        for (let i = 0; i < self._filters.length; i++) {
          if (!self._filters[i](v)) {
            return;
          }
        }
        if (Number.isFinite(v)) {
          execMethod(self, 'onUpdate', v);
        }
      }
    });
  }
  reset() {
    const self = this;
    this._state = {};
    this._collectors.forEach(function (collector) {
      self._state[collector.name] = undefined;
    });
    this._reset = true;
  }
}
