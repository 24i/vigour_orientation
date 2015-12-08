'use strict'
// TODO web implementation is not done

exports._platform = {
  on: {
    init: {
      orientation () {
        console.log('--- [0][PLATFORM] web init')
        console.log('.[0][PLATFORM] setting ready')
        var plugin = this.parent
        plugin.ready.val = true
        console.log('.[0][PLATFORM] setting current orientation', whichOrientation())
        plugin.val = whichOrientation()
        setUporientationListener(plugin)
      }
    },
    orientation: {
      orientation (data, event) {
        console.log('--- [1][PLATFORM] web orientation', 'data', data)
        console.log('.[1][PLATFORM] setting locked')
        this.parent.locked.val = true
        data.done(null)
      }
    },
    locked: {
      orientation (data, event) {
        console.log('--- [2][PLATFORM] web locked', 'data', data)
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
