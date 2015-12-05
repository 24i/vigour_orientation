'use strict'
exports.platform = {
  on: {
    init: {
      orientation () {
        setTimeout(() => {
          this.parent.ready.val = true
        })
      }
    },
    orientation: {
      orientation (data) {
        this.parent.locked.val = true
        data.done(null)
        return
      }
    },
    locked: {
      orientation (obj) {
        obj.done(null)
        // i'm going to lock for real in native
        return
      }
    }
  }
}
