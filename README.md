[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://badge.fury.io/js/vigour-orientation.svg)](https://badge.fury.io/js/vigour-orientation)
[![Build Status](https://travis-ci.org/vigour-io/orientation.svg?branch=develop)](https://travis-ci.org/vigour-io/orientation)

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

// we can listens for orientation locks
or.locked.on((data) => {
  if (data === true) console.log('Hey I\'m locked')
  else if (data === true) console.log('Hey I\'m unlocked')
})
// and we can lock it
or.locked.val = true
// or unlock it
or.locked.val = false
```

See [tests](test) for more use cases.

## Specifications for native communication

###### init
The plugin at startup will fire the `init` command expecting in return the current orientation as a *String* which can be `portrait` or `landscape`.

###### Orientation changes

* **from js to native**, when an orientation change is requested by the JS side a command `orientation` is fired with the desidered orientation passed as *String* parameter which can be `portrait` or `landscape`
* **from native to js**, the native side will use the `change` command when the orientation changes passing the current orientation as *String* which can be `portrait` or `landscape`

###### Locks
Locks can be used to prevent orientation changes to happen automatically when the device turns. In order to do that the JS side can request locks and remove them using the methods:

* **lock** sent to lock the current orientation and prevent further changes, if lock is applied `change` events shouldn't be fired from native
* **unclock** sent to unlock the orientation locks and start receiving `change` events again
