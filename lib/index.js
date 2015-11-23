'use strict'

var ua = require('vigour-ua')
var agent = ua(navigator.userAgent)

var Observable = require('vigour-js/lib/observable')

var platform
if (agent.platform === 'android' || agent.platform === 'ios') { // native
  platform = require('./native')
} else { // not needed
  platform = new Observable({
    val: false
  })
}

module.exports = platform
