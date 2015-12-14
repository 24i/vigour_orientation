'use strict'

module.exports = function (inject, type) {
  var or
  var web = !inject && type === 'browser'
  var bridge = type && type.label === 'mockBridge'
  var manual = !inject && !bridge && !web

  it('require', function () {
    or = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      or = new or.Constructor(inject)
    })
  }

  it('should be ready after the init', function (done) {
    or.ready.is(true, () => {
      done()
    })
  })

  it('should inform on orientation chnages', function (done) {
    this.timeout(25000)
    var portrait = false
    var landscape = false
    or.on('data', function (data) {
      if (data === 'portrait') portrait = true
      if (data === 'landscape') landscape = true
      if (portrait && landscape) done()
    }, 'changes')
    if (manual) {
      alert('try to change device orientation 2 times')
    } else if (!web) {
      or.val = or.val === 'portrait' ? 'landscape' : 'portrait'
      setTimeout(function () {
        or.val = or.val === 'portrait' ? 'landscape' : 'portrait'
      }, 300)
    }
  })

  if (!web || bridge) {
    it('should change the orientation to portrait and lock it', function (done) {
      var timeout
      if (manual) {
        this.timeout(25000)
        timeout = 5000
        alert('put device orientation on landscape if not already')
      }
      or.locked.val = 0
      setTimeout(function () {
        if (manual) {
          alert('the orientation should now be portrait, please check')
        }
        expect(or.locked.val).to.be.true
        done()
      }, timeout || 1500)
      or.val = 'portrait'
    })

    it('should change the orientation to landscape and lock it', function (done) {
      var timeout
      if (manual) {
        this.timeout(25000)
        timeout = 5000
        alert('put device orientation on portrait if not already')
      }
      or.locked.val = 0
      setTimeout(function () {
        if (manual) {
          alert('the orientation should now be landscape, please check')
        }
        expect(or.locked.val).to.be.true
        done()
      }, timeout || 1500)
      or.val = 'landscape'
    })
  }

  if (manual) {
    it('should be locked', function (done) {
      alert('orientation should be locked, you now have 5 seconds to confirm...')
      setTimeout(function () {
        done()
      }, 5000)
    })
  }
}
