'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

var mock = {
  label: 'bridge',
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

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    return mock[fnName](opts, cb)
  }
})

module.exports = mock
