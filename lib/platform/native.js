'use strict'
var pkg = require('../../package.json')
var injection = require('vigour-wrapper-bridge/lib/plugin/injection')(pkg.name)
exports._platform = {
  inject: injection,
  key: 'native-platform',
  on: {
    init (data, event) {
      var or = this.parent
      this.send('init', {}, (err, orientation) => {
        if (err) {
          or.emit('error', err)
          data.done(err)
        } else {
          event.stamp += '$bridge'
          or.set(orientation, event)
          data.done()
        }
      })
    },
    orientation: {
      orientation (data, event) {
        var or = this.parent
        this.send('orientation', {orientation: data.data}, function (err) {
          if (!err) {
            or.locked.val = true
          }
          data.done(err)
        })
      }
    },
    locked: {
      orientation (obj, event) {
        var lock = obj.data
        this.send('locked', {locked: lock}, (err) => {
          obj.done(err)
        })
      }
    },
    change: {
      // handles changes of orientation coming fron native side
      orientation (data, event) {
        // console.log('change event in orientation!')
        // event.stamp += '$bridge'
        // this.parent.set(data, event)

        var orientation = this.parent
        orientation._fromNative = true
        orientation.val = data
        orientation._fromNative = false
      }
    }
  }
}
