'use strict'
var pkg = require('../../package.json')
var Event = require('vigour-js/lib/event')

exports._platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    orientation: {
      orientation (data, event) {
        console.log('ON DATA STAMP?', event.stamp) // STAMP IS DIFFERENT!
        console.log('ON DATA BRIDGE?', event.bridge) // undefined
        var origin = event.origin
        if (origin && origin.key === '_platform') {
          data.done()
        } else {
          this.send('orientation', {orientation: data.data}, (err) => {
            if (!err) {
              this.parent.locked.val = true
            }
            data.done(err)
          })
        }
      }
    },
    locked: {
      orientation (obj, event) {
        var lock = obj.data
        if (lock === 0) lock = false
        this.send('locked', {locked: lock}, (err) => {
          obj.done(err)
        })
      }
    },
    change: {
      // handles changes of orientation coming fron native side
      orientation (data, event) {
        console.error('CHANGE STAMP', event.stamp)
        event.bridge = true
        event.stamp += '$bridge'
        this.parent.set(data, event)
      }
    }
  }
}
