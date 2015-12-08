'use strict'
var agent = require('vigour-ua')(navigator.userAgent)

if (agent.browser === true && (agent.platform === 'ios' || agent.platform === 'android')) {
  console.info('Loading NATIVE plugin')
  module.exports = require('./native')
} else if (agent.browser && typeof agent.browser === 'string') {
  console.info('Loading WEB plugin')
  module.exports = require('./web')
} else {
  console.info('Loading MOCK plugin')
  module.exports = require('./mock')
}
