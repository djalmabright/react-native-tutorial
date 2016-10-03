# pubnub-chat-native
Real-time chat application using the PubNub network and React Native

## Getting Started
Clone this repository.

Install the npm packages using:

```bash
$ npm install
```

## Obtaining OAuth keys
- Visit [https://github.com/settings/profile](https://github.com/settings/profile)
- Select **OAuth applications** in the left panel
- You will need separate keys for ios and android instances because the
  simulators use different IP addresses to refer to the host machine.

### iOS
- Go to **Developer applications** tab, then click on the **Register new application** button
- **Application name**: Your app name
- **Homepage URL**: *http://localhost:3000*
- **Authorization callback URL**: *http://localhost:3000/callback*
- Click on the **Register application** button
- Get your `Client ID` and `Client Secret`

### Android
- Go to **Developer applications** tab, then click on the **Register new application** button
- **Application name**: Your app name
- **Homepage URL**: *http://10.0.2.2:3000*
- **Authorization callback URL**: *http://10.0.2.2:3000/callback*
- Click on the **Register application** button
- Get your `Client ID` and `Client Secret`

## Obtaining PubNub keys
- Visit [https://admin.pubnub.com/](https://admin.pubnub.com/) to login or create an account
- Click on the **New app** button and give it a name.
- Click on the **Create new keyset** button and give it a name.
- Get your `Publish Key`, `Subscribe Key` and `Secret Key`.
- Make sure **Access Manager** and **Stream Controller** are on.

## Configure authentication and PubNub keys
* Edit the `config.js` file in the root folder and enter your configuration
  information for PubNub and GitHub.
* Note that the default `config.js` includes some defaults that point to
  preconfigured GitHub applications, so you can use those values for testing
  purposes if you like.)

## Run the application
Start the local server in a separate window.

For Android, make sure you have a virtual device running (to create and run
virtual devices, use the command `android avd`), or a physical device connected
through USB, then run this command:

```bash
$ npm run serve android &
$ react-native run-android
```

For iOS, to run the application, use:
```bash
$ npm run serve ios &
$ react-native run-ios
```
