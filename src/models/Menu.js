const Menu = {
  tableName: 'SP_CADASTRO_TAXO_REL as Menu',
  id: 'idCategory',
  fields: [
    'ID_TAXO_REL as id',
    'ID_PARENT as idParent',
    'ID_CATEGORY as idCategory',
    'ID_MERCHANT as idMerchant',
    'ID_IDIOMA as idLang',
    'CATEGORIA as category',
    'CATEGORIA_ORIGEM as categoryOrigin',
    'URL_DESTINO as urlDestiny',
    'URL_IMG as urlImage',
    'URL_AFFILIATE as urlAffiliate',
    'URL_WEBSITE as webWebsite',
    'QT_PRODUTO_CADASTRO as quantProductsRegister',
    'QT_PRODUTO_MERCANTE as quantProductsMerchant',
    'DT_CADASTRO as createdAt',
  ],
  args: [
    'idMerchant',
    'idParent',
    'idLang',
  ],
};

export default Menu;
