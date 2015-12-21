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
          this._platform.emit('locked', {data: data, done: done})
        }
      }
    }
  },
  on: {
    data: {
      condition (data, done, event) {
        this._platform.emit('orientation', {data: data, done: done})
      }
    }
  }
}
