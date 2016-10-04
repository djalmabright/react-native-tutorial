import PubNub from 'pubnub';

import {
  config,
  messageCount,
} from '../constants';

let connection;

const presenceSubscriptions = new Set();

const messageSubscriptons = new Set();

const identifier = () => Math.random().toString(10).slice(12);

export const connect = (authenticationToken, uuid) => {
  if (connection) {
    return connection;
  }

  connection = new Promise((resolve, reject) => {
    const options = Object.assign({}, config.client, {uuid});

    const pubnub = new PubNub(options);

    pubnub.setAuthKey(authenticationToken);

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

export const disconnect = () =>
  connect().then(({ pubnub }) => pubnub.stop());

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

export const subscribe = (channel, presenceHandler, messageHandler) => {
  presenceSubscriptions.add(presenceHandler);

  messageSubscriptons.add(messageHandler);

  connect().then(({ pubnub }) => {
    pubnub.subscribe({
      channels: [channel],
      withPresence: true,
    });
  });

  return {
    unsubscribe: () => {
      presenceSubscriptions.delete(presenceHandler);

      messageSubscriptons.delete(messageHandler);

      return connect().then(({pubnub}) => {
        pubnub.unsubscribe({channels: [channel]});
      });
    },
  };
};

export const participants = (channel) =>
  new Promise((resolve, reject) => {
    connect().then(({pubnub}) => {
      pubnub.hereNow({
          channels: [channel],
          channelGroups: [],
          includeUUIDs: true,
          includeState: true,
      },
      (status, response) => {
        if (status.error) {
          reject(status.category);
        }
        else {
          resolve(response.channels[channel].occupants);
        }
      });
    })
    .catch(reject);
  });

export const history = (channel, startTime) =>
  new Promise((resolve, reject) => {
    connect().then(({ pubnub }) => {
      pubnub.history({
        channel,
        start: startTime,
        count: messageCount,
      },
      (status, response) => {
        if (status.error) {
          reject(status.category);
        }
        else {
          resolve(response);
        }
      });
    })
    .catch(reject);
  });

export const publishTypingState = (channel, user, isTyping) =>
  connect().then(({ pubnub }) => {
    pubnub.setState({
      channels: [channel],
      state: {user, isTyping},
    });
  });

export const publishMessage = (channel, message) =>
  new Promise((resolve, reject) => {
    connect().then(({ pubnub }) =>
      pubnub.publish({
        channel,
        message,
      },
      (status, response) => {
        if (status.error) {
          reject(status.category);
        }
        else {
          resolve();
        }
      }));
  });
