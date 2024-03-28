# React Native Expo App

This is a simple React Native Expo app with two screens: Post to Feed and View Feed.

## Screens

### Post to Feed

This screen allows users to post content to the feed. Users can input text and attach images to their posts.

### View Feed

This screen displays the feed where users can view posts posted by themselves. Posts are displayed in a scrollable list.

## Installation

Running this command will install all the required dependencies.
```
npm install
```

# Config
You should update the `config.json` file at the root of `mobile/`. They key `BACKEND_URL` should be the ip address of your device where you're hosting backend followed by the port address of backend. For example if our ip address is `192.168.0.51` and out backend port is `8080` our `BACKEND_URL` should be 
```
BACKEND_URL: "http://192.168.0.51:8080/"
```

to know your ip address you can use commands like `if config`.

## Running the APP
To run the app on Android emulator
```
npm run android
```

To run the app on IOS emulator
```
npm run ios
```

To run the app on Web
```
npm run web
```

## Dependencies
- Expo Image Picker to pick images from users device.
- Redux toolkit to cache feed listing data and appending more entries to it as user posts.
- Axios for dealing with network requests.

## Improvements
- The feeds screen could have been a scrollable list which would fetch more lisitng on scrolling down to the bottom of screen.
- Some sort of authentication could have been a plus, including a splash screen.