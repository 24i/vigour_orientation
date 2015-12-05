'use strict'
var pkg = require('../../package.json')

exports._platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    init: {
      orientation () {
        this.send('init', null, () => {
          this.parent.ready.val = true
        })
      }
    },
    orientation: {
      orientation (data, event) {
        this.send('orientation', data.orientation, (err) => {
          if (!err) {
            this.parent.locked.val = true
          }
          data.done(err)
        })
      }
    },
    locked: {
      orientation (obj, event) {
        this.send('locked', obj.data, (err) => {
          obj.done(err)
        })
      }
    },
    change: {
      // handles changes of orientation coming fron native side
      orientation (data) {
        this.parent.set(data, false)
      }
    }
  }
}
