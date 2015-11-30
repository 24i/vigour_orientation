'use strict'
var pkg = require('../../package.json')

exports.platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    set: {
      // will ask the native to change the orientation
      // and lock the orientation
      orientation (data, event) {
        this.send('set', data.orientation, (err) => {
          if (err) {
            data.done(true)
          }
          this.parent.locked.val = true
          data.done()
        })
      }
    },
    init: {
      // on init we receive back a callback with the current orientation
      orientation () {
        this.send('init', (e, data) => {
          this.parent.set(data)
        })
      }
    },
    lock: {
      // calls lock on native side and is triggered when plugin.locked is set to true
      orientation () {
        this.send('lock')
      }
    },
    unlock: {
      // calls unlock on native side and triggered when plugion.locked is set to false
      orientation () {
        this.send('unlock')
      }
    },
    change: {
      // handles changes of orientation coming fron native side
      orientation (data) {
        this.parent.set(data, false)
      }
    }
  }
}
