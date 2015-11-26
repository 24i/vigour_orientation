// this is temp stuff, needs web implementation first
// should not being considered, is here just as a reference
var bridge = require('./bridge')

module.exports = function () {
  var or
  it('should be able to init the plugin and receive back the current orientation', (done) => {
    or = require('../../lib/native')
    or.init()
    or.on('ready', (data) => {
      expect(data).to.match(/^(portrait|landscape)$/)
    })
    or.ready.on(() => {
      expect(or.ready.val).to.be.true
      done()
    })
  })
  it('setting a value should lock the device orientation', (done) => {
    or.val = 'landscape'
    setTimeout(() => {
      expect(or.locked.val).to.be.true
      done()
    }, 100)
  })
  it('setting locked to it\'s same value shouldn\'t call the bridge', () => {
    var sendSpy = sinon.spy(bridge, 'send')
    or.locked.val = true
    expect(sendSpy).to.not.have.been.called
    bridge.send.restore()
  })
  it('setting locked to false should call `unlock` on the bridge', () => {
    var sendSpy = sinon.spy(bridge, 'send')
    or.locked.val = false
    expect(sendSpy).to.have.been.called
    expect(sendSpy).to.have.been.calledWith('Orientation', 'unlock')
    bridge.send.restore()
  })
  it('setting locked to true should call `lock` on the bridge', () => {
    var sendSpy = sinon.spy(bridge, 'send')
    or.locked.val = true
    expect(sendSpy).to.have.been.called
    expect(sendSpy).to.have.been.calledWith('Orientation', 'lock')
    bridge.send.restore()
  })
}
