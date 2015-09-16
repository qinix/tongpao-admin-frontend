let React = require('react');
let Router = require('react-router');
let Route = Router.Route;
let Redirect = Router.Redirect;
let DefaultRoute = Router.DefaultRoute;

let Master = require('./components/master');
let Home = require('./components/pages/home');
let Login = require('./components/pages/login');

let Notification = require('./components/pages/notification');
let Send = require('./components/pages/notification/send');
let History = require('./components/pages/notification/history');

let AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="notification" handler={Notification}>
      <Route name="send" handler={Send} />
      <Route name="history" handler={History} />
      <Redirect from="/notification" to="send" />
    </Route>

    <Route name="login" handler={Login} />

    <DefaultRoute name="home" handler={Home} />
  </Route>
);

module.exports = AppRoutes;
