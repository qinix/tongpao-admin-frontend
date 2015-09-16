let React = require('react');
let Router = require('react-router');
let { Paper, Mixins, RaisedButton, Styles, TextField, FlatButton, Snackbar } = require('material-ui');
let FullWidthSection = require('../full-width-section');
let api = require('../../utils/api');

let { StylePropable, StyleResizable } = Mixins;
let { Colors, Spacing, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager().getCurrentTheme();


let LoginPage = React.createClass({

  mixins: [StylePropable, StyleResizable],

  contextTypes: {
    router: React.PropTypes.func,
  },

  render() {
    if (api.loggedIn()) {
      api.logOut();
      this.context.router.transitionTo('home');
    }

    let style = {
      paddingTop: Spacing.desktopKeylineIncrement,
    };

    return (
      <div style={style}>
        {this._getMain()}
      </div>
    );
  },

  _getMain() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
      },
      content: {
        maxWidth: 500,
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 0,
        marginBottom: 13,
        letterSpacing: 0,
        color: Typography.textDarkBlack,
      },
      inputFields: {
        padding: '0',
        margin: '0 auto',
        maxWidth: 300,
      },
      loginLabel: {
        textAlign: 'center',
        color: Typography.textDarkBlack,
        fontWeight: Typography.fontWeightLight,
        fontSize: 24,
        paddingTop: '20px',
      },
      loginButton: {
        padding: '30px 0',
        margin: '0',
      },
    };

    return (
      <FullWidthSection
        style={styles.root}
        useContent={true}
        contentStyle={styles.content}
        contentType="div">

        <Paper>
          <div style={styles.inputFields}>
            <h3 style={styles.loginLabel}>登录</h3>
            <div>
              <TextField
                fullWidth={true}
                ref="usernameField"
                floatingLabelText="用户名" />
            </div>
            <div>
              <TextField
                fullWidth={true}
                type="password"
                ref="passwordField"
                floatingLabelText="密码" />
            </div>
            <div style={styles.loginButton}>
              <RaisedButton
                fullWidth={true}
                label="登录"
                secondary={true}
                onTouchTap={this._handleLogin} />
            </div>
          </div>
        </Paper>

        <Snackbar
          message="登录成功！"
          autoHideDuration={1500}
          style={{ bottom: 55 }}
          onDismiss={this._handleSnackbarDismiss}
          ref="successBar" />

        <Snackbar
          message="登录失败，请检查用户名密码"
          style={{ bottom: 55 }}
          ref="failBar" />

      </FullWidthSection>
    );
  },

  _handleLogin() {
    api.signIn(this.refs.usernameField.getValue(), this.refs.passwordField.getValue(), function(result) {
      if (result) {
        this.refs.successBar.show();
      } else {
        this.refs.failBar.show();
      }
    }.bind(this));
  },

  _handleSnackbarDismiss() {
    this.context.router.transitionTo("home");
  },
});

module.exports = LoginPage;
