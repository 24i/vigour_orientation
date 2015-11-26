'use strict'
var Observable = require('vigour-js/lib/observable')

module.exports = new Observable({
  key: 'orientation',
  platform: 'wrapped',
  on: {
    value: {
      plugin (data, event) {
        if (data !== 'landscape' && data !== 'portrait') return
        // this.send('set', data)
      }
    },
    lock: {
      plugin (data) {
        this.locked.val = data
      }
    },
    change: {
      plugin (data) {
        this.set(data, false)
      }
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
      // this.send('init')
    }
  },
  locked: {
    val: false,
    on: {
      value (data, event) {
        var plugin = this.parent
        if (event.type === 'new' || event.origin === plugin) return
        if (typeof data === 'boolean') {
          // plugin.send(data ? 'lock' : 'unlock')
        }
      }
    }
  }
})