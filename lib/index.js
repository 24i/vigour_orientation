'use strict'

var Plugin = require('vigour-wrapper/lib/plugin')

var orientation = new Plugin({
  inject: [
    require('./shared'),
    require('./platform')
  ]
})

orientation.val = true

module.exports = orientation
