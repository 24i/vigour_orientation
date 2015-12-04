'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')

var Config = require('vigour-config')
var config = new Config().orientation

// use config for app level package.json config info
// such as default value for orientation
console.log('read app level orientation config:', config)

var orientation = module.exports = new Plugin({
  val: config && config.val,
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