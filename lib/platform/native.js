'use strict'
var pkg = require('../../package.json')

exports.platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    init: {
      // on init we receive back a callback with the current orientation
      orientation () {
        this.send('init', (e, data) => {
          this.parent.set(data)
        })
      }
    },
    orientation: {
      // will ask the native to change the orientation
      // and lock the orientation
      orientation (data, event) {
        this.send('orientation', data.orientation, (err) => {
          if (err) {
            data.done(true)
            return
          }
          this.parent.locked.val = true
          data.done()
        })
      }
    },
    lock: {
      // calls lock on native side and is triggered when plugin.locked is set to true
      orientation (data, event) {
        this.send('lock', (err) => {
          if (err) {
            data.done(true)
            return
          }
          data.done()
        })
      }
    },
    unlock: {
      // calls unlock on native side and triggered when plugion.locked is set to false
      orientation (data, event) {
        this.send('unlock', (err) => {
          if (err) {
            data.done(true)
            return
          }
          data.done()
        })
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
