'use strict'

var bridge = require('vigour-wrapper/lib/bridge')
var mockbridge = window.vigour.native.bridge

var mockMethods = {
  init () {
    console.log('called?')
    // plugin init
    setTimeout(() => {
      mockbridge.ready(null, 'landscape', 'Orientation')
    })
  },
  set (orientation) {
    // set device orientation and locks it
    setTimeout(() => {
      mockbridge.receive(null, {type: 'change', data: orientation}, 'Orientation')
      setTimeout(() => {
        mockbridge.receive(null, {type: 'lock', data: true}, 'Orientation')
      })
    })
  },
  lock () {
    setTimeout(() => {
      mockbridge.receive(null, {type: 'lock', data: true}, 'Orientation')
    })
  },
  unlock () {
    mockbridge.receive(null, {type: 'lock', data: false}, 'Orientation')
  }
}


bridge.send = function (pluginId, fnName, opts, cb) {
  return mockMethods[fnName](opts, cb)
}

module.exports = bridge
