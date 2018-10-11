const {
    maybeNewCategorySectionWithSideEffectOfUpdatingCurrentCategories,
    nameSection,
    imagesSectionWithSideEffectOfDownloadingTheImages,
    maybeExtraStuffSection,
} = require('../src/htmlSections')
const {prependZeroes} = require('../src/format')

const parse = require('csv-parse')
const fs = require('fs')

const INPUT = 'data/airtable.csv'
const OUTPUT_HTML = 'data/post.html'

const parseResult = entry => {
    const [
        id,
        images,
        order,
        geometry,
        represents,
        category,
        subcategory,
        notes,
        primaryNameJapanese,
        primaryNameEnglishTranslation,
        primaryNameHiraganaReading,
        primaryNameRomaji,
        primaryNameEnglishSubstitutionsForKanji,
        secondaryNameJapanese,
        secondaryNameEnglishTranslation,
        secondaryNameHiraganaReading,
        secondaryNameRomaji,
        secondaryNameEnglishSubstitutionsForKanji,
        tertiaryNameJapanese,
        tertiaryNameEnglishTranslation,
        tertiaryNameHiraganaReading,
        tertiaryNameRomaji,
        tertiaryNameEnglishSubstitutionsForKanji,
        quaternaryNameJapanese,
        quaternaryNameEnglishTranslation,
        quaternaryNameHiraganaReading,
        quaternaryNameRomaji,
        quaternaryNameEnglishSubstitutionsForKanji,
        quinternaryNameJapanese,
        quinternaryNameEnglishTranslation,
        quinternaryNameHiraganaReading,
        quinternaryNameRomaji,
        quinternaryNameEnglishSubstitutionsForKanji,
    ] = entry
    const finalOrder = prependZeroes(order)

    let html = ''
    html += maybeNewCategorySectionWithSideEffectOfUpdatingCurrentCategories({category, subcategory})
    html += nameSection({
        finalOrder,
        primaryNameEnglishTranslation,
        primaryNameJapanese,
        primaryNameHiraganaReading,
        primaryNameRomaji,
        primaryNameEnglishSubstitutionsForKanji,
    })
    html += imagesSectionWithSideEffectOfDownloadingTheImages({
        primaryNameEnglishTranslation,
        primaryNameRomaji,
        finalOrder,
        images
    })
    html += maybeExtraStuffSection({
        notes,
        secondaryNameJapanese,
        secondaryNameEnglishTranslation,
        secondaryNameHiraganaReading,
        secondaryNameRomaji,
        tertiaryNameJapanese,
        tertiaryNameEnglishTranslation,
        tertiaryNameHiraganaReading,
        tertiaryNameRomaji,
        quaternaryNameJapanese,
        quaternaryNameEnglishTranslation,
        quaternaryNameHiraganaReading,
        quaternaryNameRomaji,
        quinternaryNameJapanese,
        quinternaryNameEnglishTranslation,
        quinternaryNameHiraganaReading,
        quinternaryNameRomaji,
    })

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
