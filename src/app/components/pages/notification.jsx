let React = require('react');
let PageWithNav = require('./page-with-nav');

class Notification extends React.Component {
  render() {
    let menuItems = [
      { route: 'send', text: '发送推送' },
      { route: 'history', text: '查看历史推送' },
    ];

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }
}

module.exports = Notification
