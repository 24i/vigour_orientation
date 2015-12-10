'use strict'
exports._platform = {
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
      }
    },
    locked: {
      orientation (data) {
        data.done(null)
      }
    }
  }
}
