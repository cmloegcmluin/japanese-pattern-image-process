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

const formatFilenameForWordpress = ({finalOrder, index, name}) => {
    const fixedName = name
        .replace(/-/g, '')
        .replace(/ /g, '-')
        .replace(/ō/g, 'ou')
        .replace(/Ō/g, 'Ou')
        .replace(/ū/g, 'uu')
        .replace(/ū/g, 'uu')
        .replace(/ś/g, 's')
        .replace(/ṇ/g, 'n')
        .replace(/ñ/g, 'n')
        .replace(/ā/g, 'aa')
        .replace(/&/g, 'and')
        .replace(/'/g, '')
        .replace(/,/g, '')
        .replace(/\./g, '')
        .toLowerCase()

    return `${finalOrder}-${index}_${fixedName}`
}

const replaceQuotedJapaneseWordsWithItalics = name => {
    const fixedName = name
        .replace(/"tomoe"/g, '<i>tomoe</i>')
        .replace(/"magatama"/g, '<i>magatama</i>')
        .replace(/"kasuri"/g, '<i>kasuri</i>')
        .replace(/"hijiki"/g, '<i>hijiki</i>')
        .replace(/"tasuki"/g, '<i>tasuki</i>')
        .replace(/"suhama"/g, '<i>suhama</i>')
        .replace(/"enso"/g, '<i>enso</i>')
        .replace(/"murago"/g, '<i>murago</i>')
        .replace(/"susuki"/g, '<i>susuki</i>')
        .replace(/"Ku-ji"/g, '<i>Ku-ji</i>')
        .replace(/"musashi"/g, '<i>musashi</i>')
        .replace(/"meyui"/g, '<i>meyui</i>')
        .replace(/"dango"/g, '<i>dango</i>')
        .replace(/"shogi"/g, '<i>shogi</i>')
        .replace(/"asahi"/g, '<i>asahi</i>')

    return fixedName
}

module.exports = {
    prependZeroes,
    cleanupName,
    cleanupUrl,
    formatFilenameForWordpress,
    replaceQuotedJapaneseWordsWithItalics,
}
