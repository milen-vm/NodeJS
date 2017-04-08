const path = './modules/todos-json.json'
let fs = require('fs')

function saveToJsonFile (todos) {
  let json = JSON.stringify(todos)

  fs.writeFileSync(path, json, 'utf-8')
}

function getFromJsonFile () {
  let json = fs.readFileSync(path, 'utf-8')

  return JSON.parse(json || '[]')
}

module.exports = {
  save: saveToJsonFile,
  get: getFromJsonFile
}
