'use strict'

var Plugin = require('vigour-wrapper/lib/plugin')

module.exports = function (inject, type) {
  var or
  var web = !inject && type === 'browser'
  var bridge = type && type.label === 'mockBridge'
  var manual = !inject && !bridge && !web

  it('require', function () {
    or = window.ORIENTATION = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      or = window.ORIENTATION = new Plugin({
        inject: [
          require('../lib/shared'),
          inject
        ]
      })
      or.ready.val = true
    })
  }

  it('should be ready after the init', function (done) {
    or.val = true
    or.ready.is(true, () => {
      done()
    })
  })

  it('should inform on orientation changes', function (done) {
    if (manual || web) {
      this.timeout(25000)
    }
    var portrait = false
    var landscape = false
    var finished = false
    or.on('data', function (data) {
      if (finished) return
      if (data === 'portrait') portrait = true
      if (data === 'landscape') landscape = true
      if (portrait && landscape) {
        finished = true
        done()
      }
    }, 'inform')
    if (manual) {
      alert('try to change device orientation 2 times')
    } else if (!web) {
      or.val = or.val === 'portrait' ? 'landscape' : 'portrait'
      setTimeout(function () {
        or.val = or.val === 'portrait' ? 'landscape' : 'portrait'
      })
    }
  })

  if (!web || bridge) {
    it('should change the orientation on command', function (done) {
      this.timeout(5000)
      var current = or.val
      or.val = current === 'portrait' ? 'landscape' : 'portrait'
      setTimeout(function () {
        alert('Orientation is changed to ' + or.val + '?')
        done()
      }, 3000)
    })

    it('should be locked after setting the orientation', function () {
      expect(or.locked.val).to.be.true
    })

    it('should change the orientation on command', function (done) {
      this.timeout(5000)
      var current = or.val
      or.val = current === 'portrait' ? 'landscape' : 'portrait'
      setTimeout(function () {
        alert('Orientation is changed to ' + or.val + '?')
        done()
      }, 3000)
    })

    it('should be locked after setting the orientation', function () {
      expect(or.locked.val).to.be.true
    })
  }

  if (manual) {
    it('should be locked', function (done) {
      alert('orientation should be locked, you now have 5 seconds to confirm...')
      this.timeout(25000)
      setTimeout(function () {
        done()
      }, 10000)
    })
  }
}
