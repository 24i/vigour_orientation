'use strict'

var Orientation = require('../../lib/native')
var bridge = require('../../dev/bridge')

describe('Orientation', function () {
  var or
  it('should be able to create a plugin instance', (done) => {
    or = new Orientation()
    or.on('ready', () => {
      done()
    })
  })
  it('setting a value should lock the device orientation', (done) => {
    or.val = 'landscape'
    or.locked.on((data) => {
      expect(data).to.be.true
      expect(or.locked.val).to.be.true
      done()
    })
  })
})
