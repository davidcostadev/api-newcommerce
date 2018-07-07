import query from '../../../src/utils/database/queryBuilder';
import { ops } from '../../../src/utils/database/where';

describe('Query Builder', () => {
  const selectExpect = 'SELECT\n\tid, NAME as "name", email';
  const tableExpect = 'FROM\n\tTBL_OFERTAS';
  const whereExpect = 'WHERE\n' +
    '\t(name = \'David\' AND email != \'david@costa.com\')\n' +
    'AND\n' +
    '\t(name = \'David\' OR email = \'david@costa.com\')\n' +
    'AND\n' +
    '\t(name = \'Legal\')\n' +
    'AND\n' +
    '\t(idade != 3)';
  const orderExpect = 'ORDER BY name DESC';

  const whereProp = {
    [ops.AND]: {
      name: 'David',
      email: {
        [ops.NE]: 'david@costa.com',
      },
    },
    [ops.OR]: {
      name: 'David',
      email: 'david@costa.com',
    },
    name: 'Legal',
    idade: {
      [ops.NE]: 3,
    },
  };

  it('table', () => {
    const sql = query()
      .table('TBL_OFERTAS');

    expect(sql.build()).toHaveProperty('table');
    expect(sql.build().table).toEqual(tableExpect);
  });

  it('select', () => {
    const sql = query()
      .select(['id', 'NAME as name ', 'email']);

    expect(sql.build()).toHaveProperty('select');
    expect(sql.build().select).toEqual(selectExpect);
  });

  it('select with empty props', () => {
    const sql = query()
      .select();

    expect(sql.build()).toHaveProperty('select');
    expect(sql.build().select).toEqual('SELECT\n\t*');
  });

  it('where', () => {
    const sql = query()
      .where(whereProp);

    expect(sql.build()).toHaveProperty('where');
    expect(sql.build().where).toEqual(whereExpect);
  });

  it('order ASC', () => {
    const sql = query()
      .order('name');

    expect(sql.build()).toHaveProperty('order');
    expect(sql.build().order).toEqual('ORDER BY name ASC');
  });

  it('order DESC', () => {
    const sql = query()
      .order('name', 'DESC');

    expect(sql.build()).toHaveProperty('order');
    expect(sql.build().order).toEqual('ORDER BY name DESC');
  });

  it('build', () => {
    const sql = query()
      .table('TBL_OFERTAS')
      .select(['id', 'NAME as name ', 'email'])
      .where(whereProp)
      .build();

    expect(sql).toEqual({
      select: selectExpect,
      table: tableExpect,
      where: whereExpect,
    });
  });

  it('toSql', () => {
    const sql = query()
      .select(['id', 'NAME as name ', 'email'])
      .table('TBL_OFERTAS')
      .where(whereProp)
      .order('name', 'DESC')
      .toSql();

    expect(sql).toEqual(`${selectExpect}\n${tableExpect}\n${whereExpect}\n${orderExpect}`);
  });
});
