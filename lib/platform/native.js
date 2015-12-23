'use strict'
var pkg = require('../../package.json')

exports._platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    orientation: {
      orientation (data, event) {
        console.log(data.data)
        this.send('orientation', {orientation: data.data}, (err) => {
          if (!err) {
            this.parent.locked.val = true
          }
          data.done(err)
        })
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
      orientation (data) {
        console.log('GOT CHANGE EVENT!', data, this.parent)
        this.parent.set(data)
      }
    }
  }
}
