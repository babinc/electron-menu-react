'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable fp/no-class, fp/no-this, react/no-unused-prop-types */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const menuItemOptions = ['click', 'role', 'type', 'label', 'sublabel', 'accelerator', 'icon', 'enabled', 'visible', 'checked', 'submenu', 'id', 'position'];

class MenuItem extends _react.Component {
  constructor(props) {
    super(props);
    this.appendMenuItem = this.appendMenuItem.bind(this);
    this.submenu = [];
    this.childUpdated = true;
  }
  getChildContext() {
    return { append: this.appendMenuItem };
  }
  componentDidMount() {
    this.appendToParent();
  }
  // shouldComponentUpdate(nextProps) {
  //   return this.childUpdated || this.props !== nextProps;
  // }
  componentDidUpdate(prevProps) {
    this.childUpdated = this.props !== prevProps || this.childUpdated;
    this.appendToParent();
  }
  appendMenuItem(menuItem, updated = true) {
    this.submenu.push(menuItem);
    this.childUpdated = updated || this.childUpdated;
  }
  appendToParent() {
    const submenu = [...this.props.submenu, ...this.submenu];
    this.context.append(Object.keys(this.props).filter(key => menuItemOptions.includes(key)).filter(key => key !== 'submenu' || submenu.length > 0).reduce((acc, key) => _extends({}, acc, {
      [key]: key === 'submenu' ? submenu : this.props[key]
    }), {}), this.childUpdated);
    // this.context.append(
    //   Object.entries({...this.props, submenu})
    //     .reduce((acc, [k, v]) => menuItemOptions.includes(k) ? {...acc, [k]: v} : acc, {}),
    // );
    this.submenu = [];
    this.childUpdated = false;
  }
  render() {
    return _react2.default.createElement(
      'div',
      null,
      this.props.children
    );
  }
}

MenuItem.childContextTypes = {
};

MenuItem.contextTypes = {
};

MenuItem.defaultProps = {
  submenu: []
};

MenuItem.propTypes = {
};

exports.default = MenuItem;
