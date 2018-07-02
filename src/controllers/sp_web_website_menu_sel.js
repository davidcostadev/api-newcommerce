const subGroup = [
  {
    ID_SUBGRUPO: 1,
    PATH_PAGE_SUBGRUPO: 'oiu',
    SUBGRUPO: 'SUBGRUPO',
  },
];

const group = [
  {
    ID_GRUPO: 1,
    TABLE_SUBGRUPO: subGroup,
    PATH_PAGE_GRUPO: 'fgh',
    GRUPO: 'GRUPO',
  },
];

const list = ({ query, params, body }, res) => {
  console.log({ query, params, body });
  res.json({
    result: [
      {
        PS_TABELA_INFO: [
          {
            TABLE_FAMILIA: [
              {
                ID_FAMILIA: 1,
                PATH_PAGE_FAMILIA: 'slug-1',
                FAMILIA: 'Família 1',
                TABLE_GRUPO: group,
              },
              {
                ID_FAMILIA: 2,
                PATH_PAGE_FAMILIA: 'slug-2',
                FAMILIA: 'Família 2',
                TABLE_GRUPO: group,
              },
              {
                ID_FAMILIA: 3,
                PATH_PAGE_FAMILIA: 'slug-3',
                FAMILIA: 'Família 3',
                TABLE_GRUPO: group,
              },
              {
                ID_FAMILIA: 4,
                PATH_PAGE_FAMILIA: 'slug-4',
                FAMILIA: 'Família 4',
                TABLE_GRUPO: group,
              },
              {
                ID_FAMILIA: 5,
                PATH_PAGE_FAMILIA: 'slug-5',
                FAMILIA: 'Família 5',
                TABLE_GRUPO: group,
              },
              {
                ID_FAMILIA: 6,
                PATH_PAGE_FAMILIA: 'slug-6',
                FAMILIA: 'Família 6',
                TABLE_GRUPO: group,
              },
              {
                ID_FAMILIA: 7,
                PATH_PAGE_FAMILIA: 'slug-7',
                FAMILIA: 'Família 7',
                TABLE_GRUPO: group,
              },
            ],
          },
        ],
      },
    ],
  });
};

export default list;
