let React = require('react');
let { Card, CardHeader, CardText, Avatar, Snackbar, DropDownMenu, Styles, Mixins, TextField, SelectField, Paper, RaisedButton, Dialog } = require('material-ui');
let { Typography, Spacing, Colors } = Styles
let { StyleResizable, StylePropable } = Mixins;
let api = require('../../../utils/api');
let moment = require('moment');

let HistoryPage = React.createClass({

  mixins: [StyleResizable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      history: [],
    };
  },

  componentWillMount() {
    api.notificationHistory(function(history) {
      this.setState({ history });
    }.bind(this));
  },

  render() {
    let borderColor = this.context.muiTheme.palette.borderColor;
    let desktopGutter = Spacing.desktopGutter;
    let menuItems = [
      { payload: 'all', text: 'all' },
      { payload: '14091059', text: '14091059' },
    ];

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
      paddingContainer: {
        padding: '16px',
      },
      button: {
        padding: '20px 0',
      },
    };

    let notificationHistory = this.state.history.map(function(h, key) {
      return (
        <div style={styles.paddingContainer}>
          <Card initiallyExpanded={true}>
            <CardHeader
              title={h.sender + ' @ ' + h.channel}
              subtitle={moment(h.sendTimestamp * 1000).format("YYYY年M月D日 HH:mm:ss")}
              avatar={<Avatar style={{color: 'red'}}>{h.sender[0]}</Avatar>}
              showExpandableButton={true}>
            </CardHeader>
            <CardText expandable={true}>
              {h.content}
            </CardText>
          </Card>
        </div>
      )
    })

    return (
      <div style={styles.root}>
        <h3 style={styles.h3}>历史推送</h3>
        <Paper>
          {notificationHistory}
        </Paper>
      </div>

    );
  },
});

module.exports = HistoryPage
