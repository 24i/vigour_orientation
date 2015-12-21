'use strict'

module.exports = function (inject, type) {
  var or

  it('require', function () {
    or = require('../lib')
  })

  it('should be ready after the init', function (done) {
    or.ready.is(true, () => {
      done()
    })
  })

  it('should inform on orientation chnages', function (done) {
    alert('try to change device orientation 2 times')
    this.timeout(25000)
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
    })
  })

  it('should be able to set orientation to landscape and lock it', function (done) {
    alert('setting orientation to landscape')
    or.val = 'landscape'
    or.locked.on('data', function () {
      done()
    })
  })

  it('should not change orientation now that is set to landscape', function (done) {
    this.timeout(25000)
    alert('try to change orientation, it should not change')
    setTimeout(function () {
      done()
    }, 5000)
  })

  it('should be able to set orientation to portrait and lock it', function (done) {
    alert('setting orientation to landscape')
    or.val = 'portrait'
    or.locked.on('data', function () {
      done()
    })
  })

  it('should not change orientation now that is set to portrait', function (done) {
    this.timeout(25000)
    alert('try to change orientation, it should not change')
    setTimeout(function () {
      done()
    }, 5000)
  })

  it('should be able to unlock orientation', function (done) {
    this.timeout(25000)
    or.locked.val = false
    alert('try to change orientation, it should')
    setTimeout(function () {
      done()
    }, 5000)
  })

  it('should be able to lock orientation', function (done) {
    this.timeout(25000)
    or.locked.val = true
    alert('try to change orientation, it should')
    setTimeout(function () {
      done()
    }, 5000)
  })

}
