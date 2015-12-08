'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')

var Config = require('vigour-config')
var config = new Config().orientation

var orientation = module.exports = new Plugin({
  val: config && config.val,
  inject: require('./platform'),
  locked: {
    val: false,
    on: {
      data: {
        condition (data, done, event) {
          console.info('--- [0][PLUGIN]', 'locked.on.data', 'data', data)
          this._platform.emit('locked', {data: data, done: done})
        }
      }
    }
  },
  on: {
    data: {
      condition (data, done, event) {
        console.info('--- [1][PLUGIN]', 'on.data', 'data', data, 'event', event)
        this._platform.emit('orientation', {data: data, done: done})
      }
    }
  }
})

orientation._platform.emit('init')
