'use strict'

var Plugin = require('vigour-wrapper/lib/plugin')

var orientation = module.exports = new Plugin({
  inject: [
    require('./shared'),
    require('./platform')
  ]
})

orientation._platform.emit('init')
