let React = require('react');
let { Snackbar, DropDownMenu, Styles, Mixins, TextField, SelectField, Paper, RaisedButton, Dialog } = require('material-ui');
let { Typography, Spacing, Colors } = Styles
let { StyleResizable, StylePropable } = Mixins;
let api = require('../../../utils/api');

let SendPage = React.createClass({

  mixins: [StyleResizable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      channelItems: [],
    };
  },

  componentWillMount() {
    api.channels(function(channels) {
      let channelItems = channels.map(function(channel, key) {
        return { payload: channel, text: channel }
      });
      this.setState({ channelItems });
    }.bind(this));
  },

  render() {
    let borderColor = this.context.muiTheme.palette.borderColor;
    let desktopGutter = Spacing.desktopGutter;

    let styles = {
      root: {
        fontSize: '15px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        lineHeight: '24px',
        paddingTop: '3px',
        marginBottom: '13px',
        color: Typography.textDarkBack,
        width: '100%',
      },
      h3: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
      },
      inputFields: {
        padding: '16px',
      },
      button: {
        padding: '20px 0',
      },
    };

    let dialogActions = [
      { text: '取消' },
      { text: '发送', onTouchTap: this._sendNotification, ref: 'submit' },
    ];

    return (
      <div style={styles.root}>
        <h3 style={styles.h3}>发送推送</h3>
        <Paper>
          <div style={styles.inputFields}>
            <div>
              <SelectField
                value={this.state.selectedChannel}
                ref="channelField"
                onChange={this._handleChannelChange}
                floatingLabelText="频道"
                menuItems={this.state.channelItems} />
            </div><div>
              <TextField
                fullWidth={true}
                ref="contentField"
                floatingLabelText="内容"
                multiLine={true} />
            </div><div style={styles.button}>
              <RaisedButton label="发送推送" primary={true} onTouchTap={this._handleSubmitTouchTap} />
            </div>
          </div>
        </Paper>

        <Dialog
          ref="confirmDialog"
          title="确认推送"
          actions={dialogActions}>
          推送发出后无法取消，确认发送？
        </Dialog>

        <Snackbar
          message="推送成功！"
          autoHideDuration={5000}
          style={{ bottom: 55 }}
          ref="sentSnackBar" />

        <Snackbar
          message="推送失败，请联系管理员"
          autoHideDuration={5000}
          style={{ bottom: 55 }}
          ref="failSnackBar" />
      </div>

    );
  },

  _handleChannelChange(e) {
    this.setState({ selectedChannel: e.target.value });
  },

  _handleSubmitTouchTap() {
    this.refs.confirmDialog.show();
  },

  _sendNotification() {
    this.refs.confirmDialog.dismiss()
    api.sendNotification(this.refs.contentField.getValue(), this.state.selectedChannel, function (result) {
      if (result) {
        this.refs.sentSnackBar.show();
      } else {
        this.refs.failSnackBar.show();
      }
    }.bind(this));
  },
});

module.exports = SendPage
