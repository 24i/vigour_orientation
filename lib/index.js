'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')

module.exports = new Plugin({
  inject: require('./platform'),
  locked: {
    val: false,
    on: {
      value: {
        orientation (data, event) {
          var val = this.val
          if (val === true) {
            this.platform.emit('lock')
          } else if (val === false) {
            this.platform.emit('unlock')
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
          this.platform.emit('fix', {
            orientation: val,
            done: done
          })
        }
      }
    }
  }
})
