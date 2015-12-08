'use strict'

module.exports = function (inject, type) {
  var or
  var manual = !inject && type !== 'browser'
  var web = !inject && type === 'browser'

  it('require env', function () {
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
    it('should change the orientation to landscape and lock it', function (done) {
      this.timeout(25000)
      alert('put device orientation on portrait if not already')
      or.locked.val = 0
      var itfired = false
      or.on('data', function () {
        itfired = true
        if (!manual) {
          expect(or.locked.val).to.be.true
          done()
        }
      })
      or.val = 'landscape'

      if (manual) {
        setTimeout(() => {
          expect(itfired).to.be.true
          alert('the orientation should now be landscape, please check')
        }, 2000)
      }
    })

    it('should change the orientation to portrait and lock it', function (done) {
      this.timeout(25000)
      or.locked.val = 0
      var itfired = false
      or.on('data', function () {
        expect(or.locked.val).to.be.true
        itfired = true
        if (!manual) {
          done()
        }
      })

      or.val = 'portrait'

      if (manual) {
        setTimeout(() => {
          expect(itfired).to.be.true
          alert('the orientation should now (already) be portrait')
        }, 2000)
      }
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
