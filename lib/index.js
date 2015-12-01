'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')

module.exports = new Plugin({
  inject: require('./platform'),
  locked: {
    val: false,
    on: {
      value: {
        condition (data, done, event) {
          var val = this.val
          if (val === true) {
            this.platform.emit('lock', {done: done})
          } else if (val === false) {
            this.platform.emit('unlock', {done: done})
          }
        }
      }
    }
  },
  on: {
    data: {
      condition (data, done, event) {
        var val = this.val
        if (val === 'landscape' || val === 'portrait') {
          this.platform.emit('orientation', {
            orientation: val,
            done: done
          })
        }
      }
    }
  }
})
