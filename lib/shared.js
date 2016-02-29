'use strict'

var pkg = require('vigour-package')
var config = pkg.orientation

module.exports = {
  val: config,
  on: {
    data: {
      condition (data, done, event) {
        data = this.val
        // console.log('orientation data!', data)
        // var isBridge
        // try {
        //   isBridge = typeof event.stamp === 'string' && event.stamp.indexOf('bridge') > -1
        // } catch (err) {
        //   console.error('crash when checking if bridge', event, err)
        // }
        // if (isBridge) {
        //   done()
        //   return
        // }

        if (this._fromNative) {
          // console.log('block this')
          done()
          return
        }
        // console.log('no block')
        if (typeof data === 'string') {
          // console.log('emit orientation change to native go do native!')
          this._platform.emit('orientation', {data: data, done: done})
        } else {
          // console.log('wuut not a string init?!')
          this._platform.emit('init', {done: done})
        }
      },
      val: function () {}
    }
  },
  locked: {
    val: false,
    on: {
      data: {
        condition (data, done, event) {
          data = this.val
          // console.log('SETTING LOCKED TO', data)
          this._platform.emit('locked', {data: data, done: done})
        },
        val: function () {}
      }
    }
  }
}
