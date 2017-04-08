let home = require('./home')
let create = require('./create')
let all = require('./all')
let details = require('./details')
let revState = require('./rev-state')
let staticFiles = require('./static-files')
let comment = require('./comment')
let status = require('./status')

module.exports = [
  home,
  create,
  all,
  details,
  revState,
  comment,
  status,
  staticFiles
]
