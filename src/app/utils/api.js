import request from 'superagent';
import Prefix from 'superagent-prefix';
import cookie from './cookie';

let prefix = Prefix('https://tongpao.qinix.com/adminapi/v1');
const DEBUG = false;

export function loggedIn() {
  let token = cookie.get('token');
  if (token && token !== '') {
    return true;
  } else {
    return false;
  }
}

export function signIn(username, password, callback) {
  if (!DEBUG) {
    request
      .post('/sign_in')
      .use(prefix)
      .send({ username: username, password: password })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (!err && res.body.status === 0) {
          const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          cookie.set({
            name: 'token',
            value: res.body.payload.token,
            expires,
          });
          callback(true);
        } else {
          callback(false);
        }
      });
  } else {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookie.set({
      name: 'token',
      value: 'token',
      expires,
    });
    callback(true);
  }
}

export function logOut() {
  cookie.unset('token');
}

export function sendNotification(content, channel, callback) {
  if (!DEBUG) {
    let token = cookie.get('token');
    request
      .post('/send_notification')
      .use(prefix)
      .send({ content: content, channel: channel })
      .set('Accept', 'application/json')
      .set('Token', token)
      .end(function(err, res) {
        if (!err && res.body.status === 0) {
          callback(true);
        } else {
          callback(false);
        }
      });
  } else {
    callback(true);
  }
}

export function channels(callback) {
  if (!DEBUG) {
    let token = cookie.get('token');
    request
      .get('/channels')
      .use(prefix)
      .set('Accept', 'application/json')
      .set('Token', token)
      .end(function(err, res) {
        if (!err && res.body.status === 0) {
          callback(res.body.payload);
        } else {
          callback(undefined);
        }
      })
  }
}

export function notificationHistory(callback) {
  if (!DEBUG) {
    let token = cookie.get('token');
    request
      .get('/notification_history')
      .use(prefix)
      .set('Accept', 'application/json')
      .set('Token', token)
      .end(function(err, res) {
        if (!err && res.body.status === 0) {
          callback(res.body.payload);
        } else {
          callback(undefined);
        }
      });
  } else {
    callback([
      {
        sender: '同袍工作室',
        channel: 'all',
        sendTimestamp: 1442415666,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
      },
      {
        sender: '同袍工作室',
        channel: '14091059',
        sendTimestamp: 1442415666,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
      },
    ]);
  }
}

