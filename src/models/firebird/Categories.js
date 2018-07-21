const Offers = {
  tableName: 'TBL_CADASTRO_TAXONOMIA as Categories',
  id: 'idCategory',
  fields: [
    'ID_CATEGORY as idCategory',
    'ID_MERCHANT as idMerchant',
    'ID_IDIOMA as idLang',
    'CATEGORIA as category',
    'CATEGORIA_ORIGEM as categoryOrigin',
    'URL_DESTINO as urlDestiny',
    'URL_IMG as urlImage',
    'URL_SLUG as slug',
    'URL_AFFILIATE as urlAffiliate',
    'URL_WEBSITE as webWebsite',
    'QT_PRODUTO_CADASTRO as quantProductsRegister',
    'QT_PRODUTO_MERCANTE as quantProductsMerchant',
    // 'TEXT_VENDA as textSell',
    'META_TITLE as metaTititle',
    'META_DESCRIPTION as metaDescription',
    'FLAG_LOOP as flatLoop',
    'DT_CADASTRO as createdAt',
    'DT_UPDATE as updatedAt',
    // 'DESCRIPTION as description',
  ],
};

export default Offers;
