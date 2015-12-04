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
        return
      }
    },
    lock: {
      orientation (data) {
        console.log('mock lock')
        // i'm going to lock for real in native
        return
      }
    },
    unlock: {
      orientation (data) {
        console.log('mock unclock')
        // i'm going to unlock for real in native
        return
      }
    }
  }
}
