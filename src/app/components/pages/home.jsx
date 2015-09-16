let React = require('react');
let Router = require('react-router');
let { Mixins, RaisedButton, Styles } = require('material-ui');
let FullWidthSection = require('../full-width-section');

let { StylePropable, StyleResizable } = Mixins;
let { Colors, Spacing, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager().getCurrentTheme();


let HomePage = React.createClass({

  mixins: [StylePropable, StyleResizable],

  contextTypes: {
    router: React.PropTypes.func,
  },

  render() {
    let style = {
      paddingTop: Spacing.desktopKeylineIncrement,
    };

    return (
      <div style={style}>
        {this._getHomePageHero()}
        {this._getHomePurpose()}
      </div>
    );
  },

  _getHomePageHero() {
    let styles = {
      root: {
        backgroundColor: Colors.cyan500,
        overflow: 'hidden',
      },
      svgLogo: {
        marginLeft: (window.innerWidth * 0.5) - 210 + 'px',
        width: 420,
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: 575,
      },
      label: {
        color: ThemeManager.palette.primary1Color,
      },
      githubStyle: {
        margin: '16px 32px 0px 8px',
      },
      demoStyle: {
        margin: '16px 32px 0px 32px',
      },
      h1: {
        color: Colors.darkWhite,
        fontWeight: Typography.fontWeightLight,
      },
      h2: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
      taglineWhenLarge: {
        marginTop: 32,
      },
      h1WhenLarge: {
        fontSize: 56,
      },
      h2WhenLarge: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
      },
    };

    styles.h2 = this.mergeStyles(styles.h1, styles.h2);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.tagline = this.mergeStyles(styles.tagline, styles.taglineWhenLarge);
      styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection style={styles.root}>
          <img style={styles.svgLogo} src="images/tongpao.svg" />
          <div style={styles.tagline}>
            <h1 style={styles.h1}>同袍智慧校园系统</h1>
          </div>
      </FullWidthSection>
    );
  },

  _getHomePurpose() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
      },
      content: {
        maxWidth: 700,
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
    };

    return (
      <FullWidthSection
        style={styles.root}
        useContent={true}
        contentStyle={styles.content}
        contentType="p"
        className="home-purpose">
        重要通知：后台地址改为 http://admin.withinyou.cn/ <br />
        <br />
        可能是东半球最好的北航助手 APP<br />
        <br />
        【超过3万北航学子的选择】<br />
        “有了同袍校园助手，我再也不用一个一个的入课表了，哪里不会点哪里！”（via 尼古拉斯·卖萌·琦）
        “同袍有最靠谱的成绩查询、导员通知、考表推送、GPA 计算，妈妈再也不担心我挂科了，值得下载。10/10”（via 饺子设计奖评委）
        “不选课的时候我们流量少了一半。”（via 教务网）<br />
        <br />
        【官方指定软件】<br />
        “航概女最喜欢的APP”、“从未登上苹果推荐应用和热门应用榜”、“网络信息中心、教务处、学生处授权”、“饺子设计奖”、“饺子是谁请看关于界面”

      </FullWidthSection>
    );
  },
});

module.exports = HomePage;
