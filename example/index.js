var or = global.or = require('../lib')

or.on((data, event) => {
  console.log('[orientation] ------------ update!')
  console.log('[orientation]  data:', data)
  console.log('[orientation]  event:', event)
})

document.body.appendChild(document.createTextNode('MARPS'))
