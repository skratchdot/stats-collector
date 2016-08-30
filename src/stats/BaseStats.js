
/**
 * A stat collector that initially includes no collector functions.
 * @example
 * const stats = new BaseStats();
 * stats.addCollector({name: 'custom', initialValue: 0, requirements: [], handleUpdate: fn});
 * stats.processAll([1, 2, 3, 4, 5]);
 * stats.get();
 */
export default class BaseStats {
  constructor() {
    this._collectors = {};
    this._collectorNames = [];
    this._processCount = 0;
    this._processFilteredCount = 0;
    this._state = {};
    this._ignore = [];
    this._filters = [];
    this._handleProcessList = [];
    this._handleGetList = [];
  }
  /**
   * Add a collector function that can process data
   * when process() or get() is called.
   * @param {Object} collector An object with the following properties:
   *   - **name** - [String] The name of the collector
   *   - **initialValue** - [any] The initial value if update() has never been called
   *   - **requirements** - [Array] An array of collector names that must be added before this collector
   *   - **handleProcess** - [Function]
   *   - **handleGet** - [Function]
   * @example
   * const stats = new BaseStats();
   * stats.addCollector({
   *   name: 'test-sum',
   *   initialValue: 0,
   *   requirements: [],
   *   handleUpdate: function (prev, state, val) { return prev + val; }
   * });
   * @return {undefined}
   */
  addCollector(collector) {
    const self = this;
    if (self._processCount > 0) {
      throw new Error('Cannot add a new collector unless you call reset() first');
    }
    if (collector.hasOwnProperty('name') &&
      collector.hasOwnProperty('initialValue') &&
      collector.hasOwnProperty('requirements')) {
      let reqIndex;
      let requirements = collector.requirements;
      if (!Array.isArray(requirements)) {
        throw new Error('The collector\'s requirements need to be an array.');
      }
      // make a copy
      requirements = requirements.slice(0);
      // check requirements
      self._collectorNames.forEach((collectorName) => {
        const currentCollector = self._collectors[collectorName];
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
      // add our collector
      self._collectorNames.push(collector.name);
      self._collectors[collector.name] = collector;
      if (typeof collector.handleProcess === 'function') {
        self._handleProcessList.push(collector.name);
      }
      if (typeof collector.handleGet === 'function') {
        self._handleGetList.push(collector.name);
      }
    } else {
      throw new Error('Collectors have names, initialValues, and requirements');
    }
    self.reset();
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
    // run handleGet()
    if (this._processCount > 0) {
      for (let i = 0; i < this._handleGetList.length; i++) {
        const collectorName = this._handleGetList[i];
        const collector = this._collectors[collectorName];
        this._state[collectorName] = collector.handleGet(
          this._state
        );
      }
    }
    // sort, ignore, deep-copy, and use zeroForUndefined if neeeded
    Object.keys(this._state).sort().forEach((key) => {
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
  processAll(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.process(arr[i]);
    }
  }
  process(value) {
    // run filters
    for (let i = 0; i < this._filters.length; i++) {
      if (!this._filters[i](value)) {
        this._processFilteredCount++;
        return;
      }
    }
    this._processCount++;
    // run handleProcess()
    for (let i = 0; i < this._handleProcessList.length; i++) {
      const collectorName = this._handleProcessList[i];
      const collector = this._collectors[collectorName];
      this._state[collectorName] = collector.handleProcess(
        this._state,
        this._state[collectorName] || collector.initialValue,
        value
      );
    }
  }
  reset() {
    const self = this;
    this._state = {};
    this._collectorNames.forEach((collectorName) => {
      self._state[collectorName] = undefined;
    });
    this._processCount = 0;
    this._processFilteredCount = 0;
  }
}
