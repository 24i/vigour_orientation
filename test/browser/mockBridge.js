'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

bridge.label = 'mockBridge'
bridge.mock = {
  methods: {
    init (opts, cb) {
      setTimeout(function () {
        cb && cb(null)
      }, 100)
    },
    orientation (opts, cb) {
      setTimeout(function () {
        cb && cb(null)
      }, 200)
    },
    locked (opts, cb) {
      // opts: true > lock, false > unlock
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
