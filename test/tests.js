'use strict'

module.exports = function (inject, type) {
  var or, bridge
  var manual = !inject

  it('require env', function () {
    or = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      or = new or.Constructor(inject)
    })
  }

  if (type && type.label === 'bridge') {
    bridge = window.vigour.native.bridge
  }

  it('should be ready after the init', function (done) {
    or.ready.is(true, () => {
      done()
    })
  })

  it('should change the orientation to landscape and lock it', function (done) {

    or.locked.val = 0
    var itfired = false
    or.on('data', function () {
      expect(or.locked.val).to.be.true
      itfired = true
      if (!manual) {
        done()
      }
    })

    or.val = 'landscape'

    if (manual) {
      setTimeout(() => {
        expect(itfired).to.be.true
        alert('the orientation should now (already) be landscape')
      }, 2000)
    }
  })

  if (manual) {
    it('should be locked', function (done) {
      alert('orientation should be locked, you now have 5 seconds to confirm...')
      setTimeout(function () {
        done()
      }, 5000)
    })
  }
}
