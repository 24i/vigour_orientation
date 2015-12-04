'use strict'
var pkg = require('../../package.json')

exports._platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    init: {
      orientation () {
        console.log('-- native init')
        this.send('init', null, () => {
          this.parent.ready.val = true
        })
      }
    },
    orientation: {
      orientation (data, event) {
        console.log('--- platform native orientation')
        this.send('orientation', data.orientation, (err) => {
          console.error('orientantion callback??')
          if (!err) {
            console.log('SET DAT TRUE!!')
            this.parent.locked.val = true
          }
          console.error('ok done!!')
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
