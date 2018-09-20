const https = require('https')
const fs = require('fs')
const {cleanupUrl} = require('./format')

const downloadImage = ({image, filename}) => {
    const [___, rawUrl] = image.split(' ')
    const url = cleanupUrl(rawUrl)
    const file = fs.createWriteStream(`data/input/${filename}.png`)
    https.get(url, response => response.pipe(file))
}

module.exports = {
    downloadImage,
}
