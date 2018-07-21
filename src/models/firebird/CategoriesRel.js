const Offers = {
  tableName: 'TBL_CADASTRO_TAXO_REL as CategoriesRel',
  id: 'idCategory',
  fields: [
    'ID_TAXO_REL as id',
    'ID_CATEGORY as idCategory',
    'ID_MERCHANT as idMerchant',
    'ID_PARENT as idParent',
    'DT_CADASTRO as createdAt',
  ],
};

export default Offers;
