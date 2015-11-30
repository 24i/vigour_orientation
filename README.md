# Orientation plugin
Observe device orientation

## Install
Add `"orientation": "git+ssh://git@github.com:vigour-io/orientation.git#master"` to the dependencies in your app's pakage.json, then run `npm update orientation`

Coming soon: `npm i vigour-orientation`

## Usage
The plugin will observe device orientation changes and can also be used to force the device to use a specific orientation. Orientation can also be locked.

By default if the orientation is set by the JS side (eg: `or.val = 'landscape'`) the plugin will also lock the orientation preventing any other change to it.

```js
// once required the plugin will execute the initialisation and receive
// back the current orientation.
var or = require('vigour-orientation')
// we can then listen for changes
or.on(() => {
  if (this.val === 'landscape') console.log('Hey I\'m landscape')
  if (this.val === 'portrait') console.log('Hey I\'m portrait')
})

// the plugin with a value or set the value later
// in either cases value changes will set 'or.locked.val' to true
// we can listen for changes on 'locked'
or.val = 'landscape'

// we can listens for locks
or.locked.on((data) => {
  if (data === true) console.log('Hey I\'m locked')
  else if (data === true) console.log('Hey I\'m unlocked')
})

// we can lock the orientation
or.locked.val = true
// or unlock it
or.locked.val = false
```

See [tests](test) for more use cases.
