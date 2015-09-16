(function () {
  let React = require('react');
  let Router = require('react-router');
  let AppRoutes = require('./app-routes.jsx');
  let injectTapEventPlugin = require('react-tap-event-plugin');

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  // Render the main app react component into the document body.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  Router
  .create({
    routes: AppRoutes,
    scrollBehavior: Router.ScrollToTopBehavior,
  })
  .run(function (Handler) {
    React.render(<Handler/>, document.body)
  })

})();
