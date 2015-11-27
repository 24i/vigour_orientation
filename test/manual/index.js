'use strict'
// ------
// Those tests should run manually from a browser or a native implementation
// ------
var or = require('../../lib')

describe('Manual testing', () => {
  this.timeout(25 * 1000)
  // when initialized the plugin should send back the current orientation with the ready event
  it('should be able to get current orientation after init', (done) => {
    alert('put the device in portrait')
    or.init()
    or.on('ready', (data) => {
      expect(data).to.equal('portrait')
      done()
    })
    or.ready.on((data) => {
      expect(data).to.be.true
      expect(or.ready.val).to.be.true
    })
  })
  // when the orientation is defined by the JS side the plugin needs to change the orientation and call a lock
  it('should be able to set the orientation to landscape and lock it', (done) => {
    alert('keep in portrait, i call landscape and it should change')
    or.val = 'landscape'
    or.on('change', (data) => {
      expect(data).to.equal('landscape')
    })
    or.locked.on((data) => {
      expect(data).to.be.true
      expect(or.locked.val).to.be.true
      done()
    })
  })
  // with orientation locked we should be able to rotate the device without changing the orientation
  it('when locked orientation should\'t change', (done) => {
    let current = or.val
    or.locked.val = true
    alert('orientation change is locked, turning the device should\'t change it, try it')
    setTimeout(() => {
      expect(or.val).to.equal(current)
    }, 1000)
  })
  // we now can unlock the orientation and then it should change
  it('we unlock orientation and rotating the device should change also the orientation', () => {
    or.locked.val = false
    alert('now rotating the device should change the orientation')
  })
})
