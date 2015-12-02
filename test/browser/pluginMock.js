'use strict'
exports.platform = {
  on: {
    init: {
      orientation () {
        setTimeout(() => {
          this.parent.val = 'portrait'
        })
      }
    },
    orientation: {
      orientation (data, event) {
        this.parent.locked.val = true
        data.done()
      }
    },
    lock: {
      orientation () {
        return
      }
    },
    unlock: {
      orientation () {
        return
      }
    }
  }
}
