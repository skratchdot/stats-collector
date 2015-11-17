/*
 *  Modified from the following source:
 *  https://subluminal.wordpress.com/2008/07/31/running-standard-deviations/
 */
export default function () {
  return {
    name: 'powerSumAvg_running',
    initialValue: 0,
    requirements: ['count'],
    onUpdate: function (prev, state, val) {
      let newValue = prev;
      newValue += (val * val - prev) / state.count;
      return newValue;
    }
  };
}
