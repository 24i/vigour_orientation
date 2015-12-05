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
          this.platform.emit('locked', {data, done})
        }
      }
    }
  },
  on: {
    data: {
      condition (data, done, event) {
        console.log('--- or.value condition')
        this.platform.emit('orientation', {data, done})
      }
    }
  }
})

orientation.platform.emit('init')
