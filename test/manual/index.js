'use strict'
require('gaston-tester')
var agent = require('vigour-ua')(navigator.userAgent)

var tests = require('../tests')
describe('Orientation', function () {
  // this.timeout(25000)
  tests(null, agent.browser ? 'browser' : null)
})

