let React = require('react');
let Router = require('react-router');
let AppLeftNav = require('./app-left-nav');
let FullWidthSection = require('./full-width-section');
let api = require('../utils/api');
let { AppBar,
      AppCanvas,
      FontIcon,
      IconButton,
      EnhancedButton,
      Menu,
      Mixins,
      RaisedButton,
      Styles,
      Tab,
      Tabs,
      Paper} = require('material-ui');

let RouteHandler = Router.RouteHandler
let { Colors, Spacing, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();

class Master extends React.Component {
  constructor() {
    super();
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    }
  }

  getStyles() {
    let darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: Colors.lightWhite,
        maxWidth: 335,
      },
      iconButton: {
        color: darkWhite,
      },
    };
  }

  componentWillMount() {
    ThemeManager.setComponentThemes({
      inkBar: {
        backgroundColor: Colors.yellow200,
      },
    });
    this.setState({tabIndex: this._getSelectedIndex()});
    let setTabsState = function() {
      this.setState({renderTabs: !(document.body.clientWidth <= 647)});
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  }

  componentWillReceiveProps() {
    this.setState({tabIndex: this._getSelectedIndex()});
  }

  render() {
    this._authenticate.bind(this)();
    let styles = this.getStyles();
    let title =
      this.context.router.isActive('home') ? 'Home' :
      this.context.router.isActive('notification') ? 'Notification' :
      this.context.router.isActive('login') ? 'Login' : '';

    return (
      <AppCanvas>
        {this.state.renderTabs ? this._getTabs() : this._getAppBar()}

        <RouteHandler />
        <AppLeftNav ref="leftNav" />
        <FullWidthSection style={styles.footer}>
          <p style={styles.p}>
            Powered by <a style={styles.a} href="https://qinix.com">Eric Zhang</a> at <a style={styles.a} href="http://blog.withinyou.cn">同袍工作室</a>.
          </p>
        </FullWidthSection>
      </AppCanvas>
    );
  }

  _getTabs() {
    let styles = {
      root: {
        backgroundColor: Colors.cyan500,
        position: 'fixed',
        height: 64,
        top: 0,
        right: 0,
        zIndex: 4,
        width: '100%',
      },
      container: {
        position: 'absolute',
        right: (Spacing.desktopGutter/2) + 48,
        bottom: 0,
      },
      span: {
        color: Colors.white,
        fontWeight: Typography.fontWeightLight,
        left: 45,
        top: 22,
        position: 'absolute',
        fontSize: 26,
      },
      svgLogoContainer: {
        position: 'fixed',
        width: 300,
        left: Spacing.desktopGutter,
      },
      svgLogo: {
        width: 45,
        backgroundColor: Colors.cyan500,
        position: 'absolute',
        top: 15,
      },
      tabs: {
        width: 425,
        bottom: 0,
      },
      tab: {
        height: 64,
      },
    };

    let materialIcon = this.state.tabIndex !== '1' ? (
      <EnhancedButton
        style={styles.svgLogoContainer}
        linkButton={true}
        href="/#/home">
        <img style={styles.svgLogo} src="images/tongpao.svg" />
        <span style={styles.span}>同袍后台管理系统</span>
      </EnhancedButton>
    ) : null;

    return (
      <div>
        <Paper
          zDepth={0}
          rounded={false}
          style={styles.root}>
          {materialIcon}
          <div style={styles.container}>
            <Tabs
              style={styles.tabs}
              value={this.state.tabIndex}
              onChange={this._handleTabChange.bind(this)}>
              <Tab
                value="1"
                label="HOME"
                style={styles.tab}
                route="home" />
              <Tab
                value="2"
                label="NOTIFICATION"
                style={styles.tab}
                route="notification" />
              <Tab
                value="3"
                label={api.loggedIn() ? "LOGOUT" : "LOGIN"}
                style={styles.tab}
                route="login" />
            </Tabs>
          </div>
        </Paper>
      </div>
    );
  }

  _getSelectedIndex() {
    return this.context.router.isActive('home') ? '1' :
      this.context.router.isActive('notification') ? '2' :
      this.context.router.isActive('login') ? '3' : '1';
  }

  _isRequiredLoggedIn() {
    return this.context.router.isActive('notification');
  }

  _authenticate() {
    if (this._isRequiredLoggedIn() && !api.loggedIn()) {
      this.context.router.transitionTo('login');
    }
  }

  _handleTabChange(value, e, tab) {
    this.context.router.transitionTo(tab.props.route);
    this.setState({tabIndex: this._getSelectedIndex()});
  }

  _getAppBar() {
    let title =
      this.context.router.isActive('home') ? 'Home' :
      this.context.router.isActive('notification') ? 'Notification' :
      this.context.router.isActive('login') ? 'Login' : '';

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap.bind(this)}
          title={title}
          zDepth={0}
          style={{position: 'absolute', top: 0}} />
      </div>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
}

Master.contextTypes = {
  router: React.PropTypes.func,
}

Master.childContextTypes = {
  muiTheme: React.PropTypes.object,
}

module.exports = Master;
