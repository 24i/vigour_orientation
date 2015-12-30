'use strict'
var pkg = require('../../package.json')

exports._platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  key: 'native-platform',
  on: {
    init () {
      var or = this.parent
      this.send('init', {}, (err, orientation) => {
        if (err) {
          or.emit('error', err)
        } else {
          or.set(orientation)
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
        event.stamp += '$bridge'
        this.parent.set(data, event)
      }
    }
  }
}
