'use strict'

var ua = require('vigour-ua')
var agent = ua(navigator.userAgent)

var Observable = require('vigour-js/lib/observable')

var platform
if (agent.platform === 'android' || agent.platform === 'ios') { // native
  platform = require('./native')
} else if (agent.browser) { // web
  platform = require('./web')
} else { // not needed
  platform = require('./mock')
}

module.exports = platform
