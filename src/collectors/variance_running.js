/*
 *  Modified from the following source:
 *  https://subluminal.wordpress.com/2008/07/31/running-standard-deviations/
 */
export default function () {
  return {
    name: 'variance_running',
    initialValue: 0,
    requirements: ['count', 'mean', 'powerSumAvg_running'],
    onGet: function (prev, state) {
      return (state.powerSumAvg_running * state.count -
        state.count * state.mean * state.mean) / (
        state.count - 1);
    }
  };
}
