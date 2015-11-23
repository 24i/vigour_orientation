'use strict'
var Plugin = require('vigour-wrapper/lib/bridge/plugin')
var Observable = require('vigour-js/lib/observable')

module.exports = new Plugin({
  key: 'Orientation',
  platform: 'wrapped',
  on: {
    new () {
      console.log('new')
    },
    data () {console.log('data')},
    value (data) {
      console.log('value')
      if (data !== 'landscape' || 'portrait') return
      this.send('init')
      this.send('set', data)
    }
  },
  properties: {
    locked: new Observable({
      on: {
        value (data, event) {
          if (event.type === 'new') return
          if (typeof data === 'boolean') {
            var plugin = this.parent
            plugin.send('lock', data)
          }
        }
      }
    })
  },
  on: {
    lock (data) {
      this.locked.val = data
    },
    change (data) {
      this.val = data
    }
  },
  locked: false
}).Constructor
