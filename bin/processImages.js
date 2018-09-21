const Jimp = require('jimp')
const fs = require('fs')

fs.readdir('data/input', (err, filenames) => {
    filenames.forEach(filename => {
        Jimp.read(`data/input/${filename}`, (err, image) => {
            if (err) throw err

            image
                .resize(480, 360)
                .rgba(false)
                .background(0xFFFFFFFF)
                .greyscale()
                .scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, i) => {
                    if (image.bitmap.data[i] < 128) {
                        image.bitmap.data[i] = 0
                        image.bitmap.data[i + 1] = 0
                        image.bitmap.data[i + 2] = 0
                    } else {
                        image.bitmap.data[i] = 255
                        image.bitmap.data[i + 1] = 255
                        image.bitmap.data[i + 2] = 255
                    }
                })
                .write(`data/output/${filename}`)
        })
    })
})
