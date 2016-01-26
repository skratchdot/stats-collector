import Collector from '../Collector';

/**
 * A collector that captures `product`
 *   - The result of multiplying all data values.
 *     (x1 * x2 * x3 * ... * xn)
 */
export default class Product extends Collector {
  constructor() {
    super('product', 1);
  }
  handleProcess(state, prev, val) {
    return prev * val;
  }
}
