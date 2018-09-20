const superCategoryHtml = superCategory => `<h1 style="font-size: 48px; line-height: 48px;">${superCategory}</h1>\r\n`

const subCategoryHtml = subCategory => `<h1 style="font-size: 36px; line-height: 36px;">${subCategory}</h1>\r\n`

const nameHtml = ({englishName, kanjiName, hiraganaReading, romaji, literalTranslation}) => {
    return `<div>
    <h3 class="alignleft">${englishName}</h3>
    <div class="alignright" style="margin-bottom: -3em;">
        <div style="font-size: 1.7em;">${kanjiName}</div>
        <div>${hiraganaReading}</div>
        <div>${romaji}</div>
        <div>${literalTranslation}</div>
    </div>
</div>
`
}

const primaryImageHtml = wordpressFileUrl => {
    return imageHtml({
        wordpressFileUrl, align: 'left', style: 'padding-top: 20px;', srcQuery: '300', width: '320', height: '240'
    })
}

const supplementaryImageHtml = wordpressFileUrl => {
    return imageHtml({
        wordpressFileUrl, align: 'right', style: '', srcQuery: '150', width: '100', height: '75'
    })
}

const imageHtml = ({wordpressFileUrl, align, style, srcQuery, width, height}) => {
    return `<a href="${wordpressFileUrl}">
    <img
        class="align${align}"
        style="${style}"
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
    superCategoryHtml,
    subCategoryHtml,
    tieOffSectionHtml,
}
