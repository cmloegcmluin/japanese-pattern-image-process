const {
    maybeNewCategorySectionWithSideEffectOfUpdatingCurrentCategories,
    nameSection,
    imagesSectionWithSideEffectOfDownloadingTheImages,
    maybeExtraStuffSection,
} = require('../src/htmlSections')

const parse = require('csv-parse')
const fs = require('fs')

const INPUT = 'data/data.csv'
const OUTPUT_HTML = 'data/post.html'

const parseResult = entry => {
    const [
        id,
        rawName,
        images,
        subSubCategory,
        rawFinalOrder,
        repetitionType,
        geometry,
        represents,
        modifierFromName,
        limitedToCraft,
        notes,
        fundamentality,
        superSuperCategory,
        superCategory,
        subCategory,
        originalManualOrder,
        alternateNameOne,
        alternateNameTwo,
        alternateNameThree,
        alternateNameFour,
    ] = entry
    const [englishName, kanjiName, hiraganaReading, romaji, literalTranslation] = rawName.split('/').map(namePart => namePart.trim())
    const alternateNames = [alternateNameOne, alternateNameTwo, alternateNameThree, alternateNameFour]


    let html = ''
    html += maybeNewCategorySectionWithSideEffectOfUpdatingCurrentCategories({superCategory, subCategory})
    html += nameSection({englishName, kanjiName, hiraganaReading, romaji, literalTranslation})
    html += imagesSectionWithSideEffectOfDownloadingTheImages({rawName, rawFinalOrder, images})
    html += maybeExtraStuffSection({notes, alternateNames})

    fs.appendFileSync(OUTPUT_HTML, html)
}

let lineNumber = 0
const readResults = parser => {
    let entry
    while (entry = parser.read()) {
        lineNumber && parseResult(entry)
        lineNumber++
    }
}

const parseAllResults = () => {
    const data = fs.readFileSync(INPUT, 'utf8')
    const parser = parse({delimiter: ','})
    parser.on('readable', () => readResults(parser))
    parser.write(data)
    parser.end()
}

fs.existsSync(OUTPUT_HTML) && fs.unlinkSync(OUTPUT_HTML)

parseAllResults()
