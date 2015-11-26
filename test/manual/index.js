module.exports = function () {
  var or = require('../../lib/native')
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
    // unlock the orientation should fires a lock event with false value
  })
}
