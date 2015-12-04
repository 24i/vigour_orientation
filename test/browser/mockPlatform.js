'use strict'
exports.platform = {
  on: {
    init: {
      orientation () {
        console.log('mock init')
        setTimeout(() => {
          this.parent.ready.val = true
        })
      }
    },
    orientation: {
      orientation (data) {
        console.log('mock orientation')
        this.parent.locked.val = true
        data.done(null)
        return
      }
    },
    locked: {
      orientation (obj) {
        console.log('mock lock')
        obj.done(null)
        // i'm going to lock for real in native
        return
      }
    }
  }
}
