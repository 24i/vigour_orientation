'use strict'
module.exports = function () {
  // tests data flows between native and js side using the bridge (if native) or the mock (if browser)
  var bridge = window.vigour.native.bridge /* require('../mockBridge') */

  // bridge.send(pluginId, fnName, opts, cb)
  // bridge.ready(err, response, pluginId)
  describe('Testing data flows for bridge', function () {
    // basic init expects to receive a ready call with the current orientation, eg: 'portrait'
    it('after init should call ready with either landscape or portrait as argument', function (done) {
      var spy = sinon.spy(bridge, 'ready')
      bridge.send('orientation', 'init', null, null)
      setTimeout(function () {
        expect(spy).to.have.been.calledWithExactly(null, sinon.match(/^(portrait|landscape)$/), 'orientation')
        bridge.ready.restore()
        done()
      }, 500)
    })
    // when calling 'set' with a specific orientation we expect 2 receive calls:
    //  - first fires 'change' with current orientation, eg: {type: 'change', data: 'landscape'}
    //  - then it calls 'lock' to lock orientation changes, eg: {type: 'lock', data: true}
    it('when calling set it will call 2 times receive, one with the orientation setted and then with a lock', function (done) {
      var spy = sinon.spy(bridge, 'receive')
      bridge.send('orientation', 'set', 'landscape', null)
      // spy.withArgs(null, {type: 'change', data: 'landscape'}, 'orientation')
      // spy.withArgs(null, {type: 'lock', data: true}, 'orientation')
      setTimeout(function () {
        expect(spy.firstCall).to.have.been.calledWithExactly(null, {type: 'change', data: 'landscape'}, 'orientation')
        expect(spy.secondCall).to.have.been.calledWithExactly(null, {type: 'lock', data: true}, 'orientation')
        bridge.receive.restore()
        done()
      }, 500)
    })
    // when calling 'lock' it will call receive with type lock and data true, eg: {type: 'lock', data: true}
    it('when calling lock it will call receive with type lock and data true', function (done) {
      var spy = sinon.spy(bridge, 'receive')
      bridge.send('orientation', 'lock')
      // spy.withArgs(null, {type: 'change', data: 'landscape'}, 'orientation')
      // spy.withArgs(null, {type: 'lock', data: true}, 'orientation')
      setTimeout(function () {
        expect(spy).to.have.been.calledWithExactly(null, {type: 'lock', data: true}, 'orientation')
        bridge.receive.restore()
        done()
      }, 500)
    })
    // when calling 'unlock' it will call receive with type lock and data false, eg: {type: 'lock', data: false}
    it('when calling lock it will call receive with type lock and data false', function (done) {
      var spy = sinon.spy(bridge, 'receive')
      bridge.send('orientation', 'unlock')
      // spy.withArgs(null, {type: 'change', data: 'landscape'}, 'orientation')
      // spy.withArgs(null, {type: 'lock', data: true}, 'orientation')
      setTimeout(function () {
        expect(spy).to.have.been.calledWithExactly(null, {type: 'lock', data: false}, 'orientation')
        bridge.receive.restore()
        done()
      }, 500)
    })
  })
}
