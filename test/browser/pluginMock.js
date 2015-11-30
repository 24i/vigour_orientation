'use strict'
exports.platform = {
  on: {
    init: {
      orientation () {
        setTimeout(function () {
          this.parent.val = 'portrait'
        })
      }
    },
    fix: {
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
