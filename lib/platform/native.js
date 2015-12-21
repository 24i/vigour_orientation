'use strict'
var pkg = require('../../package.json')

exports._platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    init: {
      orientation () {
        this.send('init', true, () => {
          this.parent.ready.val = true
        })
      }
    },
    orientation: {
      orientation (data, event) {
        console.log(data.data)
        this.send('orientation', data.data, (err) => {
          if (!err) {
            this.parent.locked.val = true
          }
          data.done(err)
        })
      }
    },
    locked: {
      orientation (obj, event) {
        if (obj.data === 0) obj.data = false
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
