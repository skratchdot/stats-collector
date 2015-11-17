'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collectors = require('../helpers/collectors');

var collectors = _interopRequireWildcard(_collectors);

var _BasicStatCollector2 = require('./BasicStatCollector');

var _BasicStatCollector3 = _interopRequireDefault(_BasicStatCollector2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatCollector = (function (_BasicStatCollector) {
  _inherits(StatCollector, _BasicStatCollector);

  function StatCollector() {
    _classCallCheck(this, StatCollector);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StatCollector).call(this));

    _this.addCollector(collectors.powerSumAvg_running());
    _this.addCollector(collectors.variance_running());
    _this.addCollector(collectors.standardDeviation_running());
    return _this;
  }

  return StatCollector;
})(_BasicStatCollector3.default);

exports.default = StatCollector;