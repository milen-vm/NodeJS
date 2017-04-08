let favIcon = require('./favicon')
let homePage = require('./home-page')
let staticFiles = require('./static-files')
let imageForm = require('./image-form')
let imagesList = require('./images-list')
let imagesDetails = require('./images-details')
let imagesInvalidData = require('./images-invalid-data')
let imagesUpload = require('./images-upload')

module.exports = [
  favIcon,
  homePage,
  imageForm,
  imagesList,
  imagesDetails,
  imagesInvalidData,
  imagesUpload,
  staticFiles
]
