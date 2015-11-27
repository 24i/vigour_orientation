'use strict'
// ------
// Automate tests meant to run against the plugin js code
// ------
describe('Automate tests', function () {
  var bridge = require('../mockBridge')
  var or = require('../../lib')

  it('should be able to init the plugin and receive back the current orientation', function (done) {
    or = require('../../lib/native')
    or.init()
    or.on('ready', function (data) {
      expect(data).to.match(/^(portrait|landscape)$/)
    })
    or.ready.on(function () {
      expect(or.ready.val).to.be.true
      done()
    })
  })
  it('setting a value should lock the device orientation', function (done) {
    or.val = 'landscape'
    setTimeout(function () {
      expect(or.locked.val).to.be.true
      done()
    }, 100)
  })
  it('setting locked to it\'s same value shouldn\'t call the bridge', function () {
    var sendSpy = sinon.spy(bridge, 'send')
    or.locked.val = true
    expect(sendSpy).to.not.have.been.called
    bridge.send.restore()
  })
  it('setting locked to false should call `unlock` on the bridge', function () {
    var sendSpy = sinon.spy(bridge, 'send')
    or.locked.val = false
    expect(sendSpy).to.have.been.called
    expect(sendSpy).to.have.been.calledWith('orientation', 'unlock')
    bridge.send.restore()
  })
  it('setting locked to true should call `lock` on the bridge', function () {
    var sendSpy = sinon.spy(bridge, 'send')
    or.locked.val = true
    expect(sendSpy).to.have.been.called
    expect(sendSpy).to.have.been.calledWith('orientation', 'lock')
    bridge.send.restore()
  })
})
