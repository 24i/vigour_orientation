'use strict'
var tests = require('../tests')

describe('Orientation', function () {
  describe('Mock Platform tests', function () {
    tests(require('../../lib/platform/mockPlatform'), 'platform')
  })

  describe('Mock native tests', function () {
    var mockBridge = require('./mockBridge')
    var nativePlatform = require('../../lib/platform/native')
    tests(nativePlatform, mockBridge)
  })
})
