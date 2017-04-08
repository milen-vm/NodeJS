let fs = require('fs')
let ejs = require('ejs')
let images = require('../models/images')
let imageList = images.imageList

module.exports = (req, res) => {
  if (req.pathName === '/images/details') {
    fs.readFile('./content/images/details.html', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(500)
        res.end()

        return
      }

      let imgs = []
      let get = req.GET

      if (get['id']) {
        let id = parseInt(get['id'])
        if (imageList[id]) {
          imgs.push(imageList[id])
        }
      } else {
        imgs = imageList
      }

      let imagesHtml = ''
      let length = imgs.length

      for (let i = 0; i < length; i++) {
        let img = imgs[i]
        imagesHtml += `<li>Nmame: ${img.name} <img src="${img.url}" alt="image"/></li>`
      }

      let status = 200

      if (imagesHtml.length === 0) {
        status = 404
        imagesHtml = '<li>Invalid image</li>'
      }

      let renderedHtml = ejs.render(data, {images: imagesHtml})

      res.writeHead(status, {
        'Content-Type': 'text/html',
        'Content-Length': renderedHtml.length
      })
      res.write(renderedHtml)
      res.end()
    })
  } else {
    return true
  }
}
