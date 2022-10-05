# 4tune

## Prep environment

1. Install Firebase CLI `npm install -g firebase-tools`
2. Install SDKMAN `curl -s "https://get.sdkman.io" | bash`
3. Install JAVA `sdk install java 11.0.2-open`
4. Add below environment variable to your shell .rc file (~/.zshrc or ~/.bashrc)


```sh
# JAVA & Android
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Running the app

```sh
# start local dev server
npm start

# run ios emulator
npm run start:ios

# run android emulator (NOTE: emulator must already be running)
npm run start:android
```

## iOS

- [Setup](https://ionicframework.com/docs/developing/ios)
- [Debugging](https://ionicframework.com/docs/developing/ios#debugging-ios-apps)
- [Viewing Native Logs](https://ionicframework.com/docs/developing/ios#viewing-native-logs)

## Android

- [Setup](https://ionicframework.com/docs/developing/android)
- [Debugging](https://ionicframework.com/docs/developing/android#debugging-android-apps)
- [Viewing Native Logs](https://ionicframework.com/docs/developing/android#viewing-native-logs)

## Emulating Firebase Functions

See Emulator UI at `http://localhost:4000/`

```sh
# run firebase emulator
npm run functions:emulate

# run emulator and watch for changes to code
npm run functions:watch
```


## Development

- [Detecting Platform](https://ionicframework.com/docs/core-concepts/cross-platform#platform-detection)

## Deployment
```sh
# deploy to hosting
npm run deploy
```