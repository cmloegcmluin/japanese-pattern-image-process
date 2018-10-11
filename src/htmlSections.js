const {downloadImage} = require('./download')
const {formatFilenameForWordpress, cleanupName, replaceQuotedJapaneseWordsWithItalics} = require('./format')
const {nameHtml, primaryImageHtml, supplementaryImageHtml, tieOffSectionHtml, categoryHtml, subcategoryHtml} = require('./htmlChunks')
const currentCategories = require('./currentCategories')

const maybeNewCategorySectionWithSideEffectOfUpdatingCurrentCategories = ({category, subcategory}) => {
    let sectionHtml = ''

    if (category !== currentCategories.currentCategory) {
        // WEEEE SIDE EFFECT!!!!
        currentCategories.currentCategory = category
        sectionHtml += categoryHtml(category)
    }

    if (subcategory !== currentCategories.currentSubcategory) {
        // WEEEE SIDE EFFECT!!!!
        currentCategories.currentSubcategory = subcategory
        sectionHtml += subcategoryHtml(subcategory)
    }

    return sectionHtml
}

const buildWordpressFileUrl = filename => {
    return `https://cmloegcmluin.files.wordpress.com/2018/10/${filename}.png`
}

const imageHtml = ({index, filename}) => {
    const wordpressFileUrl = buildWordpressFileUrl(filename)
    return index === 0 ? primaryImageHtml(wordpressFileUrl) : supplementaryImageHtml(wordpressFileUrl)
}

const imagesSectionWithSideEffectOfDownloadingTheImages = ({primaryNameEnglishTranslation, primaryNameRomaji, finalOrder, images}) => {
    let sectionHtml = ''

    const rawName = `${primaryNameEnglishTranslation}_${primaryNameRomaji}`
    const name = cleanupName(rawName)

    images.split(',').sort().forEach((image, index) => {
        const filename = formatFilenameForWordpress({finalOrder, index, name})

        // WEEEE SIDE EFFECT!!!!
        downloadImage({image, filename})

        if (index === 1) {
            sectionHtml += '<div class="alignright" style="margin-right: 0px; margin-bottom: -15px">'
        }

        sectionHtml += imageHtml({index, filename})

        if (index > 0 && index === images.split(',').length - 1) {
            sectionHtml += '</div>'
        }
    })

    sectionHtml += tieOffSectionHtml()

    return sectionHtml
}

const maybeExtraStuffSection = ({
                                    notes,
                                    alternateNames,
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
}) => {
    let sectionHtml = ''

    if (secondaryNameJapanese !== '') {
        sectionHtml += `${secondaryNameJapanese} / ${replaceQuotedJapaneseWordsWithItalics(secondaryNameEnglishTranslation)} / ${secondaryNameHiraganaReading} / ${secondaryNameRomaji}\r\n`
    }
    if (tertiaryNameJapanese !== '') {
        sectionHtml += `${tertiaryNameJapanese} / ${replaceQuotedJapaneseWordsWithItalics(tertiaryNameEnglishTranslation)} / ${tertiaryNameHiraganaReading} / ${tertiaryNameRomaji}\r\n`
    }
    if (quaternaryNameJapanese !== '') {
        sectionHtml += `${quaternaryNameJapanese} / ${replaceQuotedJapaneseWordsWithItalics(quaternaryNameEnglishTranslation)} / ${quaternaryNameHiraganaReading} / ${quaternaryNameRomaji}\r\n`
    }
    if (quinternaryNameJapanese !== '') {
        sectionHtml += `${quinternaryNameJapanese} / ${replaceQuotedJapaneseWordsWithItalics(quinternaryNameEnglishTranslation)} / ${quinternaryNameHiraganaReading} / ${quinternaryNameRomaji}\r\n`
    }

    if (notes) sectionHtml += notes

    sectionHtml += '\r\n'

    return sectionHtml
}

const nameSection = argumentsObject => {
    let sectionHtml = '<div style="height: 40px;"></div>\r\n'

    sectionHtml += nameHtml(argumentsObject)
    sectionHtml += tieOffSectionHtml()

    return sectionHtml
}

module.exports = {
    maybeNewCategorySectionWithSideEffectOfUpdatingCurrentCategories,
    nameSection,
    imagesSectionWithSideEffectOfDownloadingTheImages,
    maybeExtraStuffSection,
}
