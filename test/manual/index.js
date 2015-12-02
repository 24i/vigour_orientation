'use strict'
require('gaston-tester')

describe('Orientation plugin manual tests', function () {
  var or = require('../../lib')

  // after the init we receive back the orientation but the locked property is false
  // iw till change just if we want to set a specific orientation
  it('should have the locked property as false after the init', function (done) {
    // we use a timeout because the init is called automatically, we don't know if here
    // the event is already fired or not
    // we just know that the value of the plugin must be 'orientation' or 'landscape'
    or.ready.is(true, () => {
      expect(or.locked.val).to.be.false
      expect(or.val).to.match(/^(portrait|landscape)$/)
      done()
    })
  })

  // we can set the orientation manually, the plugin should change the device orientation
  // when done we will ask the plugin to lock it
  it('should change the orientation on demand', function (done) {
    or.val = 'landscape'
    or.locked.on(function (data) {
      expect(data).to.be.true
    })
  })

  // now that we specified the orientation we can check if is it really locked
  it('should not change orientation on device rotation', function (done) {
    this.timeout(3000)
    alert('we are in landscape, rotate the device in portrait, check will be performed after 2 second')
    setTimeout(function () {
      expect(or.val).to.euqal('landscape')
    }, 2000)
  })

  // we can unlock the device and it should change orientation
  it('should change orientation if unlocked', function (done) {
    this.timeout(25000)
    or.on(function (data) {
      expect(data).to.equal('portrait')
      expect(or.locked.val).to.be.false
    })
    or.locked.on(function () {
      alert('move the device to portrait')
    })
  })
})

