'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')

var orientation = module.exports = new Plugin({
  inject: require('./platform'),
  locked: {
    val: false,
    on: {
      data: {
        condition (data, done, event) {
          console.log('plugin locked', data)
          this._platform.emit('locked', {data, done})
        }
      }
    }
  },
  on: {
    data: {
      condition (data, done, event) {
        console.log('--- or.value condition')
        this._platform.emit('orientation', {data, done})
      }
    }
  }
})

orientation._platform.emit('init')