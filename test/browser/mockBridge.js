'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

bridge.label = 'mockBridge'
bridge.mock = {
  methods: {
    init (opts, cb) {
      // initialize
      setTimeout(function () {
        cb && cb(null)
      }, 100)
    },
    orientation (orientation, cb) {
      // - set orientation according to expected values:
      // "landscape"
      // "portrait"

      // - lock orientation
      setTimeout(function () {
        cb && cb(null)
      }, 200)
    },
    locked (locked, cb) {
      // locked === true > lock
      // locked === false > unlock
      setTimeout(function () {
        cb && cb(null)
      }, 300)
    }
  }
}

delete bridge.send

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    return bridge.mock.methods[fnName](opts, cb)
  }
})

module.exports = bridge
