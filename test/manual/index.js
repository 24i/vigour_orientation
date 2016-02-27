'use strict'
require('gaston-tester')
var env = require('vigour-env')
var tests = require('../tests')
var bridge = require('vigour-wrapper-bridge')
bridge.on('error', function (err) {
  console.error('wrapper-bridge error:', err)
})

describe('Orientation', function () {
  // this.timeout(25000)
  this.bail(true)
  tests(null, env.isWeb.val ? 'browser' : null)
})

