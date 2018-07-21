const OfferContent = {
  tableName: 'TBL_OFERTAS_CONTEUDO as OfferContent',
  id: 'idOffer',
  fields: [
    'ID_OFERTA as idOffer',
    'OFERTA_CHAMADA01 as call1',
    'OFERTA_CHAMADA02 as call2',
    'OFERTA_CHAMADA03 as call3',
    'OFERTA_VANTAGENS as benefits',
    'OFERTA_RELACIONADAS as related',
    'OFERTA_CARACTERISTICAS as features',
    'OFERTA_PACOTE as pot',
    'OFERTA_REVIEWS as reviews',
    'OFERTA_IMAGENS as images',
    'OFERTA_COMPARAR as comparator',
    'OFERTA_VENDEDOR as seller',
    'DT_CADASTRO as createdAt',
  ],
};

export default OfferContent;
