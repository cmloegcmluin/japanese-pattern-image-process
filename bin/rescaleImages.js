const Jimp = require('jimp')
const fs = require('fs')

const INPUT_DIRECTORY = '../../Downloads/rescale'
const OUTPUT_DIRECTORY = '../../Downloads/rescaled'

fs.readdir(INPUT_DIRECTORY, (err, filenames) => {
    filenames.forEach(filename => {
        Jimp.read(`${INPUT_DIRECTORY}/${filename}`, (err, image) => {
            if (err) throw err

            image
                .scale(1.5)
                .crop(120,90,480,360)
                .write(`${OUTPUT_DIRECTORY}/${filename}`)
        })
    })
})
