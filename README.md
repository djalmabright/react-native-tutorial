# pubnub-chat-native
Real-time chat application using the PubNub network and React Native

## Getting Started
Clone this repo.

Install the npm packages using:

```bash
$ npm install
```

## Obtaining OAuth Keys
- Visit [https://github.com/settings/profile](https://github.com/settings/profile)
- Select **OAuth applications** in the left panel
- You will need separate keys for ios and android instances because the
  simulators use different IP addresses to refer to the host machine.

### ios
- Go to **Developer applications** tab, then click on the **Register new application** button
- **Application name**: Your app name
- **Homepage URL**: *http://localhost:3000*
- **Authorization callback URL**: *http://localhost:3000/callback*
- Click on the **Register application** button
- Get your `Client ID` and `Client Secret`

### android
- Go to **Developer applications** tab, then click on the **Register new application** button
- **Application name**: Your app name
- **Homepage URL**: *http://10.0.2.2:3000*
- **Authorization callback URL**: *http://10.0.2.2:3000/callback*
- Click on the **Register application** button
- Get your `Client ID` and `Client Secret`

## Obtaining PubNub Keys
- Visit [https://admin.pubnub.com/](https://admin.pubnub.com/) to login or create an account
- Click on the **New app** button and give it a name.
- Click on the **Create new keyset** button and give it a name.
- Get your `Publish Key`, `Subscribe Key` and `Secret Key`.
- Make sure **Access Manager** and **Stream Controller** are on.

## Setup keys for client
- Go to ```constants/config.example.js``` and enter your pubnub
  subscribe and publish keys:

```
import { Platform } from 'react-native';

const loopbackAddress = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

export const config = {
  port: 3000,
  host: `http://${loopbackAddress}:3000`,
  client: {
    publishKey: '', // enter your publish key
    subscribeKey: '', // enter your subscribe key
    ssl: false,
  },
};
```

- Change the name of the file to ```constants/config.js```.

## Setup keys for server
- Go to ```.env.example``` and replace every ```example_```something
  with the actual key. You can make up ```PUBNUB_AUTH_KEY```:

```
PORT=3000
HOST_ANRDOID=http://10.0.2.2:3000
HOST_IOS=http://localhost:3000
PUBNUB_PUBLISH_KEY=example_publish_key
PUBNUB_SUBSCRIBE_KEY=example_subscribe_key
PUBNUB_SECRET_KEY=example_secret_key
PUBNUB_AUTH_KEY=example_auth_key
GITHUB_CLIENT_ID_ANDROID=example_client_key
GITHUB_CLIENT_SECRET_ANDROID=example_secret_key
GITHUB_CLIENT_ID_IOS=example_client_key
GITHUB_CLIENT_SECRET_IOS=example_secret_key
```

- Change the name of the file to ```.env```.

## Run The App Locally
Start the local server in a separate window.

For ios:
```bash
$ npm run serve ios
```

For android:
```bash
$ npm run serve android
```

Then compile.

For ios, the emulator should automatically load:
```bash
$ react-native run-ios
```

For android, make sure you have an emulator on Android Developer tools
running before executing the command:
```bash
$ react-native run-android
```
