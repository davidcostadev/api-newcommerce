const list = ({ query, params, body }, res) => {
  console.log({ query, params, body });
  res.json({
    result: [
      {
        PS_TABELA_INFO: [
          {
            PS_PRODUTO: 'produto nome',
            PS_ID_PRODUTO: 1,
            PS_VALOR_DE_VENDA: '50,44',
            PS_VL_VENDA_CCCREDITO3X: '16,81',
            PS_VL_VENDA_CCDEBITO: '60,01',
            PS_PATH_IMAGEM_400: 'http://www.winerp.com.br/images/mundial/products/42048-400-183603.jpg',
            PS_PATH_IMAGEM_250: 'http://www.winerp.com.br/images/mundial/products/42048-400-183603.jpg',
            PS_PATH_PAGE: 'aikf',
            PS_ID_FAMILIA: '1',
            PS_ID_GRUPO: '1',
            PS_ID_SUBGRUPO: '1',
            PS_DETALHES_PRODUTO: '<h2>legal</h2>',
          },
        ],
        PS_QUANT_TOTAL_REGISTRO: 1,
        PS_IMAGENS_PRODUTO: [],
        PS_PRODUTOS_RELACIONADOS: [],
      },
    ],
  });
};

export default list;
