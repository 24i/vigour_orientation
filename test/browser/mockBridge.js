'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

bridge.label = 'mockBridge'
bridge.mock = {
  methods: {
    init (opts, cb) {
      // initialize
      console.log('lala beng dat initinitinitinit')
      setTimeout(function () {
        cb && cb(null)
      }, 100)
    },
    orientation (orientation, cb) {
      console.log('lala beng dat orientation', orientation)
      // - set orientation according to expected values:
      // "landscape"
      // "portrait"

      // - lock orientation
      setTimeout(function () {
        cb && cb(null)
      }, 200)
    },
    locked (locked, cb) {
      console.log('lala beng dat locked')
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
