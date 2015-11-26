'use strict'

var ua = require('vigour-ua')
var agent = ua(navigator.userAgent)

var Observable = require('vigour-js/lib/observable')

var platform
if (agent.device === 'phone' || agent.device === 'tablet' &&
  agent.platform === 'android' || agent.platform === 'ios') { // native
  platform = require('./native')
} else { // not needed
  platform = new Observable({
    val: false
  })
}

module.exports = platform

'use strict'
var Plugin = require('vigour-wrapper/lib/bridge/plugin')
module.exports = new Plugin({
  key: 'Orientation',
  platform: 'wrapped',
  on: {
    value: {
      plugin (data, event) {
        if (data !== 'landscape' && data !== 'portrait') {
          return
        }
        this.locked.origin.set(true, event)
        this.send('set', data)
      }
    },
    change: {
      plugin (data) {
        this.val = data
      }
    },
    ready: {
      plugin (data) {
        if (data !== 'landscape' && data !== 'portrait') {
          return
        }
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
        var plugin = this.parent
        if (event.type === 'new' || event.origin === plugin) {
          return
        }
        let lock = this.locked.val
        if (typeof lock === 'boolean') {
          plugin.send(lock ? 'lock' : 'unlock')
        }
      }
    }
  }
})
