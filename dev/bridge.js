'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

// exports.init()
// exports.set()

var mockMethods = {
  init () {
    // plugin init
    setTimeout(() => {
      bridge.ready(null, 'portrait', 'Orientation')
    })
  },
  set (orientation) {
    console.log('bridge.set')
    // set device orientation and locks it
    setTimeout(() => {
      bridge.receive(null, {type: 'change', data: orientation}, 'Orientation')
      setTimeout(() => {
        bridge.receive(null, {type: 'lock', data: true}, 'Orientation')
      })
    })
  },
  lock () {
    console.log('bridge.lock')
    setTimeout(() => {
      bridge.receive(null, {type: 'lock', data: true}, 'Orientation')
    })
  },
  unlock () {
    console.log('bridge.unlock')
    setTimeout(() => {
      bridge.receive(null, {type: 'lock', data: false}, 'Orientation')
    })
  }
}

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    console.log('bridge.send', pluginId, fnName, opts, cb)
    return mockMethods[fnName](opts, cb)
  }
})

exports.bridge = bridge
