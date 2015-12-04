'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

var mock = {
  label: 'bridge',
  init (opts, cb) {
    console.log('bridge init')
    setTimeout(function () {
      cb && cb(null)
    })
  },
  orientation (opts, cb) {
    console.log('bridge orientation')
    setTimeout(function () {
      console.log(cb)
      cb && cb(null)
    })
  },
  locked (opts, cb) {
    console.log('bridge lock')
    console.log('opts', opts, 'cb', cb)
    // opts: true > lock, false > unlock
    setTimeout(function () {
      console.log('calling callbackst!')
      cb && cb(null)
    })
  },
  // lock (opts, cb) {
  //   console.log('bridge lock')
  //   console.log('opts', opts, 'cb', cb)
  //   setTimeout(function () {
  //     cb && cb(null)
  //   })
  // },
  // unlock (opts, cb) {
  //   console.log('bridge unlock')
  //   console.log('opts', opts, 'cb', cb)
  //   setTimeout(function () {
  //     cb && cb(null)
  //   })
  // },
  events: {
    changeToPortrait: {
      eventType: 'orientation',
      data: 'portrait'
    },
    changeToLandscape: {
      eventType: 'orientation',
      data: 'landscape'
    }
  }
}

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    return mock[fnName](opts, cb)
  }
})

module.exports = mock
