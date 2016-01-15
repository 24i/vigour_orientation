'use strict'

var Config = require('vigour-config')
var config = new Config().orientation

module.exports = {
  val: config && config.val,
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
           isBridge = event.inherits.stamp.indexOf('bridge') > -1
        } catch (err) {
        }
        if (isBridge) {
          console.log('its the bridge')
          done()
          return
        }
        console.log('its NOT the bridge, API user just set orientation > go tell bridge and lock!')
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
