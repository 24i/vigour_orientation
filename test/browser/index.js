'use strict'

var Orientation = require('../../lib/native')
var mockBridge = require('../../dev/bridge')

describe('Orientation', function () {
  var or
  it('should be able to create a plugin instance', () => {
    or = new Orientation()
  })
  it('when a value is set it will call the init method and receive back the ready', (done) => {
    or.val = 'landscape'
    console.log(or, or.val)
    // or.on('ready', () => {
    //   done()
    // })
  })
})
