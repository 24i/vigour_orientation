'use strict'

var bridge = require('vigour-wrapper/lib/bridge')
var mockbridge = window.vigour.native.bridge

var mockMethods = {
  init () {
    console.log('bridge.init')
    // plugin init
    setTimeout(() => {
      cb(null, 'portrait', 'orientation')
    })
  },
  orientation (orientation) {
    console.log('bridge.orientation')
    // set device orientation and locks it
    setTimeout(() => {
      mockbridge.receive(null, {type: 'change', data: orientation}, 'orientation')
      setTimeout(() => {
        mockbridge.receive(null, {type: 'lock', data: true}, 'orientation')
      })
    })
  },
  lock () {
    console.log('bridge.lock')
    setTimeout(() => {
      mockbridge.receive(null, {type: 'lock', data: true}, 'orientation')
    })
  },
  unlock () {
    console.log('bridge.unlock')
    setTimeout(() => {
      mockbridge.receive(null, {type: 'lock', data: false}, 'orientation')
    })
  }
}

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    console.log('bridge.send', pluginId, fnName, opts, cb)
    return mockMethods[fnName](opts, cb)
  }
})

module.exports = bridge
