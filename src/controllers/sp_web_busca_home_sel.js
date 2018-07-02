const list = ({ query, params, body }, res) => {
  console.log({ query, params, body });
  res.json({
    result: [
      {
        PS_TABELA_INFO: [
          {
            PS_ID_PRODUTO: 1,
            PS_PATH_IMAGEM_250: 'http://www.winerp.com.br/images/mundial/products/42048-300-183603.jpg',
            PS_VALOR_DE_VENDA: '50,44',
            PS_FLAG_DISPONIBILIDADE: 'asd',
            PS_PATH_PAGE: 'zxc',
          },
        ],
      },
    ],
  });
};

export default list;
