let fs = require('fs')
let ejs = require('ejs')
let images = require('../models/images')
let imageList = images.imageList

module.exports = (req, res) => {
  if (req.pathName === '/images/list') {
    let imagesHtml = ''
    let length = imageList.length

    for (let i = 0; i < length; i++) {
      let img = imageList[i]
      imagesHtml += `<li>Image - ${img.name}: <a href="/images/details?id=${i}" title="Image Details">Details</a>`
    }

    if (imagesHtml === '') {
      imagesHtml = '<li>You have no saved images</li>'
    }

    // utf-8' read file as a string
    fs.readFile('./content/images/list.html', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(500)
        res.end()

        return
      }

      let renderedHtml = ejs.render(data, {images: imagesHtml})

      res.writeHead(200, {
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
