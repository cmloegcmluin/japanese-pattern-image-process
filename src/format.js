const prependZeroes = number => {
    let output = number.toString()
    while (output.length < 3) {
        output = '0' + output
    }

    return output
}

const cleanupName = name => name
    .replace(/\//g, '-')
    .replace(/"/g, '\'')
    .replace(/”/g, '\'')
    .replace(/“/g, '\'')

const cleanupUrl = url => url
    .replace('(','')
    .replace(')','')

const buildFilename = ({finalOrder, index, name}) => `${finalOrder}.${index} - ${name}`

module.exports = {
    prependZeroes,
    cleanupName,
    cleanupUrl,
    buildFilename,
}
