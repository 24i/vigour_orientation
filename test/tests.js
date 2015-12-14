'use strict'

module.exports = function (inject, type) {
  var or
  var manual = !inject && type !== 'browser'
  var web = !inject && type === 'browser'

  it('require', function () {
    console.warn('--- [0][TEST] require plugin')
    or = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      console.warn('--- [1][TEST] require inject')
      or = new or.Constructor(inject)
    })
  }

  it('should be ready after the init', function (done) {
    console.warn('--- [2][TEST] wating for ready')
    or.ready.is(true, () => {
      console.warn('--- [2][TEST] ready received')
      done()
    })
  })

  if (!web) {
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

  it('should inform on orientation chnages', function (done) {
    this.timeout(25000)
    alert('try to change device orientation 2 times')
    var portrait = false
    var landscape = false
    or.on('data', function (data) {
      if (data === 'portrait') portrait = true
      if (data === 'landscape') landscape = true
      if (portrait && landscape) done()
    })
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
