import execMethod from '../helpers/execMethod';

export default class BaseStatCollector {
  constructor() {
    this._collectors = [];
    this._reset = true;
    this._state = {};
    this._ignore = [];
  }
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
    }
    this.reset();
  }
  addIgnore(name) {
    if (this._ignore.indexOf(name) === -1) {
      this._ignore.push(name);
    }
  }
  get() {
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
