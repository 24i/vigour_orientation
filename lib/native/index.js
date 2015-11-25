'use strict'
var Plugin = require('vigour-wrapper/lib/bridge/plugin')

module.exports = new Plugin({
  key: 'Orientation',
  platform: 'wrapped',
  on: {
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
    ready: {
      plugin (data) {
        if (data !== 'landscape' && data !== 'portrait') return
        this.set(data, false)
      }
    }
  },
  define: {
    init () {
      this.send('init')
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
})
