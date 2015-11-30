'use strict'
var tests = require('./tests')

describe('Orientation plugin automated tests', function () {
  describe('Mock plugin tests', function () {
    tests(require('./pluginMock'))
  })

  describe('Mock bridge tests', function () {
    tests(require('./bridgeMock'))
  })
})
