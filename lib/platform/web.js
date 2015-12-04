'use strict'
// TODO web implementation is not done

exports.platform = {
  on: {
    init: {
      orientation () {
        var plugin = this.parent
        plugin.ready.val = true
      }
    },
    orientation: {
      orientation (data, event) {
        this.parent.locked.val = true
        data.done()
      }
    },
    lock: {
      // calls lock on native side and is triggered when plugin.locked is set to true
      orientation (data, event) {
        data.done()
      }
    },
    unlock: {
      // calls unlock on native side and triggered when plugion.locked is set to false
      orientation (data, event) {
        data.done()
      }
    }
  }
}
