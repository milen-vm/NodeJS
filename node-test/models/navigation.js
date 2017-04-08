let fs = require('fs')
let navigation = fs.readFileSync('./content/layout/navigation.html', 'utf-8')

module.exports = navigation
