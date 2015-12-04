'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')

module.exports = new Plugin({
  inject: require('./platform'),
  locked: {
    val: false,
    on: {
      data: {
        orientation (data, event) {
          console.log('plugin locked', data)
          if (data === true) {
            this.platform.emit('lock', data)
          } else {
            this.platform.emit('unlock', data)
          }
        }
      }
    }
  },
  direction: {
    val: false,
    on: {
      data: {
        orientation (data, event) {
          this.platform.emit('orientation', data)
        }
      }
    }
  },
  on: {
    data: {
      orientation (data, event) {
        if (!this.ready.val) {
          this.platform.emit('init')
        }
      }
    }
  }
})
