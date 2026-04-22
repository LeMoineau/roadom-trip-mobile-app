# AléaCarte Mobile App

Application mobile de road-trip sans connaitre la destination mais en y étant aiguillé via des indices rigolos.

## Installation

```bash
npm i
npm run dev
```

## Troubleshoot

### Error loading leaflet map

Si rencontre une erreur de la forme sur émulation Expo :

```js
None of these files exist:
  * leaflet.html
  * node_modules\react-native-leaflet-view\lib\android\src\main\assets\leaflet.html
  23 |
  24 | const LEAFLET_HTML_SOURCE = _reactNative.Platform.select({
> 25 |   ios: require('../../android/src/main/assets/leaflet.html'),
     |                 ^
  26 |   android: {
  27 |     uri: 'file:///android_asset/leaflet.html'
  28 |   }

Import stack:

 node_modules\react-native-leaflet-view\lib\commonjs\LeafletView\index.js
 | import "../../android/src/main/assets/leaflet.html"
```

Peut être corrigé en modifiant l'url sous la forme suivante :

```ts
const LEAFLET_HTML_SOURCE = _reactNative.Platform.select({
  ios: require("react-native-leaflet-view/android/src/main/assets/leaflet.html"),
  android: {
    uri: "file:///android_asset/leaflet.html",
  },
});
```

_source_: https://github.com/pavel-corsaghin/react-native-leaflet/issues/8
