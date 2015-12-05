'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

bridge.label = 'mockBridge'
bridge.mock = {
  methods: {
    init (opts, cb) {
      setTimeout(function () {
        cb && cb(null)
      })
    },
    orientation (opts, cb) {
      setTimeout(function () {
        console.log(cb)
        cb && cb(null)
      })
    },
    locked (opts, cb) {
      // opts: true > lock, false > unlock
      setTimeout(function () {
        console.log('calling callbackst!')
        cb && cb(null)
      })
    }
  }
}

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    return bridge.mock.methods[fnName](opts, cb)
  }
})

module.exports = bridge
