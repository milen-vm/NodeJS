let fs = require('fs')
let nav = fs.readFileSync('./content/partial/nav.html', 'utf-8')

module.exports = nav
