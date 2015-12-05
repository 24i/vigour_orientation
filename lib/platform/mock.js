'use strict'
exports._platform = {
  on: {
    init: {
      orientation () {
        setTimeout(() => {
          this.parent.ready.val = true
          console.warn('[Orientation] mock platform')
        })
      }
    },
    orientation: {
      orientation (data) {
        this.parent.locked.val = true
        data.done(null)
        console.warn('[Orientation] mock platform')
      }
    },
    locked: {
      orientation (obj) {
        obj.done(null)
        console.warn('[Orientation] mock platform')
      }
    }
  }
}
