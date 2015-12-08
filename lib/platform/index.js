'use strict'
var agent = require('vigour-ua')(navigator.userAgent)
var env = global.env
var target = env && env.target

if (target === 'android' || target === 'ios') {
  console.info('Loading NATIVE plugin')
  module.exports = require('./native')
// temp until env works!
} else if (!agent.browser && (agent.platform === 'ios' || agent.platform === 'android')) {
  console.info('Loading NATIVE plugin')
  module.exports = require('./native')
} else if (agent.browser) {
  console.info('Loading WEB plugin')
  module.exports = require('./web')
} else {
  console.info('Loading MOCK plugin')
  module.exports = require('./mock')
}
