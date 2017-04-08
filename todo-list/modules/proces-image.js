let fs = require('fs')
let allowed = ['jpeg', 'jpg', 'png', 'gif']

function genUniqueString (length) {
  let letters = 'abcdefghijklmnopqrstuvwxyz'
  let numbers = '1234567890'
  let charset = letters + letters.toUpperCase() + numbers
  let name = ''

  for (let i = 0; i < length; i++) {
    name += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return name
}

function getFileExtension (fileName) {
  return fileName.substring(fileName.lastIndexOf('.') + 1)
}

function isValidFormat (fileName) {
  let ext = getFileExtension(fileName)

  return allowed.indexOf(ext) > -1
}

function genUniqueName (fileName, length) {
  let name = genUniqueString(length)
  let ext = getFileExtension(fileName)
  let newFileName = name + '.' + ext

  try {
    fs.accessSync('./content/images/' + newFileName, fs.F_OK)
    genUniqueName(fileName, length)
  } catch (err) {
    return newFileName
  }
}

module.exports = {
  isValidFormat: isValidFormat,
  genUniqueName: genUniqueName,
  allowedFormats: allowed
}
