'use strict';

exports.__esModule = true;

var _electron = require('electron');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable fp/no-class, fp/no-this */

const { buildFromTemplate, setApplicationMenu } = _electron.remote.Menu;

class ApplicationMenu extends _react.Component {
  constructor(props) {
    super(props);
    this.appendMenuItem = this.appendMenuItem.bind(this);
    this.menuItems = [];
    this.updated = true;
  }
  getChildContext() {
    return { append: this.appendMenuItem };
  }
  componentDidMount() {
    this.renderMenu();
    this.domNode.remove();
    this.domNode = null;
  }
  // shouldComponentUpdate() {
  //   return this.updated;
  // }
  componentDidUpdate() {
    this.renderMenu();
  }
  componentWillUnmount() {
    this.menuItems = [];
    this.renderMenu();
  }
  appendMenuItem(menuItem, updated = true) {
    this.menuItems.push(menuItem);
    this.updated = updated || this.updated;
  }
  renderMenu() {
    if (this.updated) {
      setApplicationMenu(buildFromTemplate(this.menuItems));
    }
    this.menuItems = [];
    this.updated = false;
  }
  render() {
    return _react2.default.createElement(
      'div',
      { ref: div => {
          this.domNode = div;
        } },
      this.props.children
    );
  }
}

ApplicationMenu.childContextTypes = {
};

ApplicationMenu.propTypes = {
};

exports.default = ApplicationMenu;
