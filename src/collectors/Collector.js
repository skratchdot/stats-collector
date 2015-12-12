/**
 * A base Collector class. You can add the following methods when you extend it:
 *   - handleProcess(state, prev, val)
 *   - handleGet(state)
 */
export default class Collector {
  constructor(name, initialValue, requirements = []) {
    this.name = name;
    this.initialValue = initialValue;
    this.requirements = requirements;
  }
}
