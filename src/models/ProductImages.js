const ProductImages = {
  tableName: 'TBL_PRODUTO_IMAGENS as ProductImages',
  fields: [
    'ID_IMAGEM as idImage',
    'ID_POST as idPost',
    'ID_PRODUTO as idProduct',
    'ID_POST_IMG as idPostImg',
    'CODIGO as uui',
    'URL_WEBSITE as website',
    'URL_ALIEXPRESS as aliexpress',
    'URL_MERCHANT as merchamt',
    'NOME as name',
    'SLUG as slug',
    'EXTENSAO as extension',
    'TITULO_IMAGEM as titleImage',
    'ALT as alt',
    'TITLE as title',
    'FLAG_LOOP as flagLoop',
    'DT_CADASTRO as createdAt',
  ],
};

export default ProductImages;
