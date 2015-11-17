'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collectors = require('../helpers/collectors');

var collectors = _interopRequireWildcard(_collectors);

var _filters = require('../helpers/filters');

var filters = _interopRequireWildcard(_filters);

var _StatCollector2 = require('./StatCollector');

var _StatCollector3 = _interopRequireDefault(_StatCollector2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdvancedStatCollector = (function (_StatCollector) {
  _inherits(AdvancedStatCollector, _StatCollector);

  function AdvancedStatCollector() {
    _classCallCheck(this, AdvancedStatCollector);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AdvancedStatCollector).call(this));

    _this.addCollector(collectors._values());
    _this.addCollector(collectors.sumOfSquaredDeviations_stable());
    _this.addCollector(collectors.variance_stable());
    _this.addCollector(collectors.standardDeviation_stable());
    var self = _this;
    Object.keys(filters).forEach(function (filterName) {
      var filter = filters[filterName];
      self.addCollector(collectors.filteredCount('count_' + filterName, filter));
    });
    _this.addIgnore('_values');
    return _this;
  }

  return AdvancedStatCollector;
})(_StatCollector3.default);

exports.default = AdvancedStatCollector;