let fields = require('./fields-todo')
let todos = require('./todos')
let items = todos.get()

let err = ''
// TODO
function isValid (todo) {
  for (let field of fields) {
    let val = todo[field].trim()

    if (!val) {
      err += `Field ${field} is empty or missing. `
      return false
    }
  }

  return fields.length === Object.keys(todo).length
}

function save (todo, validate = true) {
  if (validate) {
    if (!isValid(todo)) {
      return false
    }
  }

  if (todo.id) {
    items = items.filter((item) => {
      return item.id !== todo.id
    })
  } else {
    todo.id = items.length + 1
    todo.comments = []
  }

  items.push(todo)
  todos.save(items)

  return true
}

function getSorted () {
  items.sort((a, b) => {
    if (a.state < b.state) {
      return 1
    }

    if (a.state > b.state) {
      return -1
    }

    return a.id - b.id
  })

  return items
}

function getById (id) {
  let todo = items.filter((item) => {
    return item.id === id
  })

  if (todo.length !== 1) {
    throw new Error('Invalid todo Id error.')
  }

  return todo[0]
}

function reverseState (id) {
  let todo = getById(id)

  if (todo.state === 'Done') {
    todo.state = 'Pending'
  } else if (todo.state === 'Pending') {
    todo.state = 'Done'
  }

  save(todo, false)
}

function addComment (id, text) {
  let todo = getById(id)
  let now = new Date()

  let comment = {
    date: now.toLocaleString(),
    text: text
  }

  todo.comments.push(comment)
  save(todo, false)
}

function getTodosCount () {
  return items.length
}

function getCommentsCount() {
  let count = 0
  for (let todo of items) {
    count += todo.comments.length
  }

  return count
}

module.exports = {
  save: save,
  get: todos.get(),
  getSorted: getSorted,
  getById: getById,
  revState: reverseState,
  addComment: addComment,
  getTodosCount: getTodosCount,
  getCommentsCount: getCommentsCount
}
