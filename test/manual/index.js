'use strict'
require('gaston-tester')
var env = require('vigour-env')
var tests = require('../tests')

describe('Orientation', function () {
  // this.timeout(25000)
  this.bail(true)
  tests(null, env.isWeb.val ? 'browser' : null)
})

