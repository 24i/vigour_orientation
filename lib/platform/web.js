'use strict'
// TODO web implementation is not done

exports._platform = {
  on: {
    init: {
      orientation () {
        var plugin = this.parent
        plugin.ready.val = true
        plugin.val = whichOrientation()
        setUporientationListener(plugin)
      }
    },
    orientation: {
      orientation (data, event) {
        this.parent.locked.val = true
        data.done(null)
      }
    },
    locked: {
      orientation (data, event) {
        data.done(null)
      }
    }
  }
}

function whichOrientation () {
  if (window.matchMedia('(orientation: portrait)').matches) return 'portrait'
  else if (window.matchMedia('(orientation: landscape)').matches) return 'landscape'
  else return false
}

function setUporientationListener (plugin) {
  window.addEventListener('resize', function () {
    plugin.val = whichOrientation()
  })
}
