'use strict'
var Plugin = require('vigour-wrapper/lib/bridge/plugin')

module.exports = new Plugin({
  key: 'orientation',
  platform: 'wrapped',
  initialized: false,
  on: {
    value: {
      plugin (data, event) {
        if (data !== 'landscape' && data !== 'portrait') return
        if (this.initialized.val) {
          this.send('set', data)
        } else {
          this.send('init', function () {
            this.send('set', data)
          })
        }
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
        this.initialized.val = true
      }
    }
  },
  define: {
    init (orientation) {
      this.send('init')
    }
  },
  locked: {
    val: false,
    on: {
      value (data, event) {
        var plugin = this.parent
        if (event.type === 'new' || event.origin === plugin) return
        if (typeof data === 'boolean') {
          plugin.send(data ? 'lock' : 'unlock')
        }
      }
    }
  }
})
