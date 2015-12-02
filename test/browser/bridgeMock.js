'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

var mockMethods = {
  init (opts, cb) {
    // init the plugin and get the current orientation, we will use portrait as start
    setTimeout(function () {
      cb && cb(null, 'portrait')
    })
  },
  // opts should match this regex ^(portrait|landscape)$
  orientation (opts, cb) {
    // set device orientation and executes the callback
    setTimeout(function () {
      cb && cb(null)
    })
  },
  lock (opts, cb) {
    // locks the device orientation preventing any other changes to happen automatically
    setTimeout(function () {
      cb && cb(null)
    })
  },
  unlock (opts, cb) {
    // ubnlock the device orientation, if the device turns the orientation can change automatically
    setTimeout(function () {
      cb && cb(null)
    })
  }
}

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    return mockMethods[fnName](opts, cb)
  }
})

exports.inject = require('../../lib/platform/native')
