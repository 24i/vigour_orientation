# Orientation plugin
Observe device orientation

## Install
Add `"orientation": "git+ssh://git@github.com:vigour-io/orientation.git#master"` to the dependencies in your app's pakage.json, then run `npm update orientation`
Coming soon: `npm i vigour-orientation`

## Updates via upstream remote

- `git remote add skeleton git@github.com:vigour-io/plugin.git`
- `git pull skeleton develop`

## Usage

```js
var Orientation = require('vigour-orientation')

var or = new Orientation()
or.val = 'landscape' // calls 'set' on native and locks the orientation
or.locked.val = true // calls 'lock' on native

// we can then listen for changes
or.on(() => {
  if (this.val === 'landscape') console.log('Hey i\'m landscape')
  if (this.val === 'portrait') console.log('Hey i\'m portrait')
})
```

See [tests](test) for more use cases.

## Building native apps
See [wrapper](http://github.com/vigour-io/wrapper)
