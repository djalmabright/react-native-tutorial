import PubNub from 'pubnub';

import {
  config,
} from '../constants';

let connection;

const presenceSubscriptions = new Set();

const messageSubscriptons = new Set();

const identifier = () => Math.random().toString(10).slice(12);

export const connect = authenticationToken => {
  if (connection) {
    return connection;
  }

  connection = new Promise((resolve, reject) => {
    const uuid = identifier();

    const options = Object.assign({}, config.client, {uuid});

    const pubnub = new PubNub(options);

    // pubnub.auth(authenticationToken);

    const initialHandler = {
      status: statusEvent => {
        switch (statusEvent.category) {
          case 'PNConnectedCategory':
          case 'PNNetworkUpCategory':
            resolve(pubnub);
            break;
          case 'PNDisconnectedCategory':
          case 'PNNetworkDownCategory':
            reject(new Error('Received a network-down message'));
            break;
          default:
            return;
        }

        pubnub.removeListener(initialHandler);

        pubnub.addListener({
          message: function () {
            messageSubscriptons.forEach(handler => handler.apply(undefined, arguments));
          },
          presence: function () {
            presenceSubscriptions.forEach(handler => handler.apply(undefined, arguments));
          },
          status: statusEvent => {
            switch (statusEvent.category) {
              case 'PNDisconnectedCategory':
              case 'PNNetworkDownCategory':
                connect(); // reconnect
                break;
            }
          },
        });
      },
    };

    pubnub.addListener(initialHandler);

    return handshake(pubnub).then(() => resolve({uuid, pubnub})).catch(reject);
  });

  return connection;
};

const handshake = pubnub =>
  new Promise((resolve, reject) => {
    pubnub.time(status => {
      if (status.error) {
        reject(new Error(`PubNub service failed to respond to time request: ${status.error}`));
      }
      else {
        resolve(pubnub);
      }
    });
  });

export const publish = msg =>
  connect().then(({ pubnub }) => {
    return new Promise(resolve => {
      pubnub.publish(msg,
        (status, response) => {
          resolve(response);
        });
    });
  });

export const subscribe = (channel, presenceHandler, messageHandler) => {
  presenceSubscriptions.add(presenceHandler);

  messageSubscriptons.add(messageHandler);

  connect().then(({ pubnub }) => {
    pubnub.subscribe({
      channel: channel,
      withPresence: true,
    })
  });

  return {
    unsubscribe: () => {
      presenceSubscriptions.delete(presenceHandler);

      messageSubscriptons.delete(messageHandler);

      return connect().then(handle => handle.unsubscribe({channel}));
    },
  };
};

export const history = (channel, startTime) =>
  new Promise((resolve, reject) => {
    connect().then(({ pubnub }) => {
      pubnub.history({
        channel,
        start: startTime,
        count: 15,
      },
      (status, response) => resolve(response),
      )
    })
    .catch(reject);
  });

export const publishTypingState = (channel, uuid, isTyping) =>
  connect().then(({ pubnub }) =>
    pubnub.state({
      channel,
      uuid,
      state: {isTyping},
    }));
