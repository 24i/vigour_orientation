'use strict'
var pkg = require('../../package.json')

exports._platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  key: 'native-platform',
  on: {
    init (data, event) {
      var or = this.parent
      console.log('SENDING INIT', data)
      this.send('init', {}, (err, orientation) => {
        console.log('INIT CALLBACK', data)
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
        console.log('SENDING ORIENTATION AS', data)
        var or = this.parent
        this.send('orientation', {orientation: data.data}, function (err) {
          console.log('ORIENTATION CALLBACK', data)
          if (!err) {
            or.locked.val = true
          }
          data.done(err)
        })
      }
    },
    locked: {
      orientation (obj, event) {
        console.log('SENDING LOCK AS', obj.data)
        var lock = obj.data
        this.send('locked', {locked: lock}, (err) => {
          console.log('LOCK CALLBACK', obj.data)
          obj.done(err)
        })
      }
    },
    change: {
      // handles changes of orientation coming fron native side
      orientation (data, event) {
        console.log('RECEIVE CHANGE', data)
        event.stamp += '$bridge'
        this.parent.set(data, event)
      }
    }
  }
}
