'use strict'
var Plugin = require('vigour-wrapper/lib/bridge/plugin')
var Observable = require('vigour-js/lib/observable')

module.exports = new Plugin({
  key: 'Orientation',
  platform: 'wrapped',
  on: {
    new () {
      this.send('init')
    },
    value (data, event) {
      if (data !== 'landscape' && data !== 'portrait') return
      this.send('set', data)
    },
    lock (data) {
      this.locked.set(data, false)
    },
    change (data, event) {
        this.val = data
    },
    ready (data) {
      if (data !== 'landscape' && data !== 'portrait') return
      this.set(data, false)
    }
  },
  locked: {
    val: false,
    on: {
      value (data, event) {
        if (event.type === 'new') return
        if (typeof data === 'boolean') {
          var plugin = this.parent
          plugin.send(data ? 'lock' : 'unlock')
        }
      }
    }
  }
}).Constructor
