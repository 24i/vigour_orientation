'use strict'

module.exports = function (inject, type) {
  var or, bridge

  it('require env', function () {
    or = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      or = new or.Constructor(inject)
    })
  }

  if (type.label === 'bridge') {
    bridge = window.vigour.native.bridge
  }

  it('should be ready after the init', function (done) {
    or.ready.is(true, () => {
      done()
    })
    or.val = true
  })

  it('should change the orientation to landscape and lock it', function (done) {
    if (type === 'platform' || type.label === 'bridge') {
      or.locked.val = false
      or.direction.val = 'landscape'
      setTimeout(() => {
        expect(or.locked.val).to.be.true
        done()
      })
    }
  })

  it('should change the orientation to portrait and lock it', function (done) {
    if (type === 'platform' || type.label === 'bridge') {
      or.locked.val = false
      or.direction.val = 'portrait'
      setTimeout(() => {
        expect(or.locked.val).to.be.true
        done()
      })
    }
  })

  it('should not emit orientation changes automatically if it is locked', function () {
  })
}
