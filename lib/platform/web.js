'use strict'
var pkg = require('../../package.json')

// TODO web implementation is not done

exports.platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    init: {
      // on init we receive back a callback with the current orientation
      orientation () {
        warn()
      }
    },
    orientation: {
      // will ask the native to change the orientation
      // and lock the orientation
      orientation (data, event) {
        warn()
      }
    },
    lock: {
      // calls lock on native side and is triggered when plugin.locked is set to true
      orientation (data, event) {
        warn()
      }
    },
    unlock: {
      // calls unlock on native side and triggered when plugion.locked is set to false
      orientation (data, event) {
        warn()
      }
    },
    change: {
      // handles changes of orientation coming fron native side
      orientation (data) {
        warn()
      }
    }
  }
}

function warn () {
  console.warn('orientation plugin web implementation missing')
}
