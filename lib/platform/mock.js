'use strict'
exports._platform = {
  on: {
    init: {
      orientation () {
        setTimeout(() => {
          console.log('--- [0][PLATFORM] mock init')
          console.log('.[0][PLATFORM] setting ready')
          this.parent.ready.val = true
        })
      }
    },
    orientation: {
      orientation (data) {
        console.log('--- [1][PLATFORM] mock orientation', 'data', data)
        console.log('.[1][PLATFORM] setting locked')
        this.parent.locked.val = true
        data.done(null)
      }
    },
    locked: {
      orientation (data) {
        console.log('--- [2][PLATFORM] mock locked', 'data', data)
        data.done(null)
      }
    }
  }
}
