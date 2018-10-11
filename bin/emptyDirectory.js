const path = require('path')
const fs = require('fs')

const directory = process.argv[2]

fs.readdir(directory, (err, files) => {
    if (err) throw err

    for (const file of files) {
        fs.unlinkSync(path.join(directory, file), err => {
            if (err) throw err
        })
    }
})
