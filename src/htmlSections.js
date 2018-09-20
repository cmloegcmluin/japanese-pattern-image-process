const {downloadImage} = require('./download')
const {buildFilename, cleanupName, prependZeroes} = require('./format')
const {nameHtml, primaryImageHtml, supplementaryImageHtml, tieOffSectionHtml, superCategoryHtml, subCategoryHtml} = require('./htmlChunks')
const currentCategories = require('./currentCategories')

const maybeNewCategorySectionWithSideEffectOfUpdatingCurrentCategories = ({superCategory, subCategory}) => {
    let sectionHtml = ''

    if (superCategory !== currentCategories.currentSuperCategory) {
        // WEEEE SIDE EFFECT!!!!
        currentCategories.currentSuperCategory = superCategory
        sectionHtml += superCategoryHtml(superCategory)
    }

    if (subCategory !== currentCategories.currentSubCategory) {
        // WEEEE SIDE EFFECT!!!!
        currentCategories.currentSubCategory = subCategory
        sectionHtml += subCategoryHtml(subCategory)
    }

    return sectionHtml
}

const imageHtml = ({index, filename}) => {
    const wordpressFileUrl = `https://cmloegcmluin.files.wordpress.com/2018/09/${filename}.png`
    return index === 0 ? primaryImageHtml(wordpressFileUrl) : supplementaryImageHtml(wordpressFileUrl)
}

const imagesSectionWithSideEffectOfDownloadingTheImages = ({rawName, rawFinalOrder, images}) => {
    let sectionHtml = ''

    const name = cleanupName(rawName)
    const finalOrder = prependZeroes(rawFinalOrder)

    images.split(',').forEach((image, index) => {
        const filename = buildFilename({finalOrder, index, name})

        // WEEEE SIDE EFFECT!!!!
        downloadImage({image, filename})

        sectionHtml += imageHtml({index, filename})
    })

    sectionHtml += tieOffSectionHtml()

    return sectionHtml
}

const maybeExtraStuffSection = ({notes, alternateNames}) => {
    let sectionHtml = ''

    alternateNames.forEach(alternateName => {
        if (alternateName) sectionHtml += alternateName + '\r\n'
    })

    if (notes) sectionHtml += notes

    sectionHtml += '\r\n'

    return sectionHtml
}

const nameSection = argumentsObject => {
    let sectionHtml = ''

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
