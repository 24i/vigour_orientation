'use strict'

var pkg = require('vigour-package')
var config = pkg.orientation

module.exports = {
  inject: config,
  locked: {
    val: false,
    on: {
      data: {
        condition (data, done, event) {
          data = this.val
          this._platform.emit('locked', {data: data, done: done})
        },
        val: function () {}
      }
    }
  },
  on: {
    data: {
      condition (data, done, event) {
        data = this.val
        var isBridge
        try {
          isBridge = typeof event.stamp === 'string' && event.stamp.indexOf('bridge') > -1
        } catch (err) {
          console.error('crash when checking if bridge', event, err)
        }
        if (isBridge) {
          done()
          return
        }
        if (typeof data === 'string') {
          this._platform.emit('orientation', {data: data, done: done})
        } else {
          this._platform.emit('init', {done: done})
        }
      },
      val: function () {}
    }
  }
}
