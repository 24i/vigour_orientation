'use strict'
var pkg = require('../../package.json')

exports.platform = {
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
    // lock: {
    //   // calls lock on native side and is triggered when plugin.locked is set to true
    //   orientation (data, event) {
    //     console.log('-- native lock')
    //     this.send('lock', data, (err) => {
    //       if (err) {
    //         // TODO manage the error
    //         return
    //       }
    //       return
    //     })
    //   }
    // },
    // unlock: {
    //   // calls unlock on native side and triggered when plugion.locked is set to false
    //   orientation (data, event) {
    //     console.log('-- native unlock')
    //     this.send('unlock', data, (err) => {
    //       if (err) {
    //         // TODO manage the error
    //         return
    //       }
    //       return
    //     })
    //   }
    // },
    change: {
      // handles changes of orientation coming fron native side
      orientation (data) {
        this.parent.set(data, false)
      }
    }
  }
}
