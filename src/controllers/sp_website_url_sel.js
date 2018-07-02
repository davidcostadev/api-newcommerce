const list = ({ query, params, body }, res) => {
  console.log({ query, params, body });
  res.json({
    result: [
      {
        PS_ALERTA: 7,
        PS_TABELA_INFO: [
          {
            PS_ID_PRODUTO: 1,
            PS_TITLE: 'title',
            PS_DESCRIPTION: 'description',
            PS_ID_FAMILIA: 1,
            PS_ID_GRUPO: 1,
            PS_ID_SUBGRUPO: 1,
          },
        ],
      },
    ],
  });
};

export default list;
