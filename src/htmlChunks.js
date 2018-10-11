const {replaceQuotedJapaneseWordsWithItalics} = require('./format')

const categoryHtml = category => {
    const categories = category.split(' / ')
    const japaneseCategory = categories[1]
    const englishCategory = categories[0]
    return `
        <div style="height: 100px;"></div>
        <h1 style="font-size: 48px; line-height: 48px; text-align: center;">${japaneseCategory}</h1>
        <h1 style="font-size: 18px; line-height: 8px; text-align: center;">${englishCategory}</h1>
        <hr />
    `
}

const subcategoryHtml = subcategory => {
    const subcategories = subcategory.split(' / ')
    const japaneseSubcategory = subcategories[1]
    const englishSubcategory = subcategories[0]
    return `
        <div style="height: 100px;"></div>
        <h1 style="font-size: 32px; line-height: 32px; text-align: center;">${japaneseSubcategory}</h1>
        <h1 style="font-size: 16px; line-height: 7px; text-align: center;">${replaceQuotedJapaneseWordsWithItalics(englishSubcategory)}</h1>
        <div style="height: 20px;"></div>
    `
}

const nameHtml = ({
                      finalOrder,
                      primaryNameEnglishTranslation,
                      primaryNameJapanese,
                      primaryNameHiraganaReading,
                      primaryNameRomaji,
                      primaryNameEnglishSubstitutionsForKanji,
}) => {
    return `<br/>
<div>
    <div style="position: relative;">
        <span style="position: absolute; top: 10px;">${finalOrder}</span>
    </div>
    <h3 class="alignleft" style="width: 200px; border-bottom: none;">${replaceQuotedJapaneseWordsWithItalics(primaryNameEnglishTranslation)}</h3>
    <div class="alignright" style="width: 260px; margin-bottom: -3em;">
        <div style="font-size: 1.7em; text-align: right;">${primaryNameJapanese}</div>
        <div style="text-align: right;">${primaryNameHiraganaReading}</div>
        <div style="text-align: right;">${primaryNameRomaji}</div>
        <div style="text-align: right;">${replaceQuotedJapaneseWordsWithItalics(primaryNameEnglishSubstitutionsForKanji)}</div>
    </div>
</div>
`
}

const primaryImageHtml = wordpressFileUrl => {
    return `<div class="alignleft" style="margin-bottom: 0px;">${imageHtml({
        wordpressFileUrl, align: 'left', srcQuery: '300', width: '320', height: '240'
    })}</div>`
}

const supplementaryImageHtml = wordpressFileUrl => {
    return imageHtml({
        wordpressFileUrl, align: 'right', srcQuery: '150', width: '100', height: '75'
    })
}

const imageHtml = ({wordpressFileUrl, align, srcQuery, width, height}) => {
    return `<a href="${wordpressFileUrl}" target="_blank">
    <img
        class="align${align}"
        style="border: 1px solid grey; ${align === "left" ? " margin-bottom: 0px;" : ""}"
        src="${wordpressFileUrl}?w=${srcQuery}"
        alt=""
        width="${width}"
        height="${height}"
    />
</a>
`
}

const tieOffSectionHtml = () => `<div style="clear: both;"></div>\r\n`

module.exports = {
    nameHtml,
    primaryImageHtml,
    supplementaryImageHtml,
    categoryHtml,
    subcategoryHtml,
    tieOffSectionHtml,
}
