'use strict'
var Observable = require('vigour-js/lib/observable')

module.exports = new Observable({
  key: 'orientation',
  platform: 'mock',
  ready: false,
  locked: false,
  initalized: false,
  define: {
    init () {}
  }
})
