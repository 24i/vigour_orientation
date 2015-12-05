'use strict'
// TODO web implementation is not done

exports._platform = {
  on: {
    init: {
      orientation () {
        var plugin = this.parent
        plugin.ready.val = true
        console.warn('[Orientation] web implementation is missing for plugin')
      }
    },
    orientation: {
      orientation (data, event) {
        console.warn('[Orientation] web implementation is missing for plugin')
        data.done()
      }
    },
    lock: {
      orientation (data, event) {
        console.warn('[Orientation] web implementation is missing for plugin')
        data.done()
      }
    },
    unlock: {
      orientation (data, event) {
        console.warn('[Orientation] web implementation is missing for plugin')
        data.done()
      }
    }
  }
}
