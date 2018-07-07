import Table from '../../../src/utils/database/Table';

describe('Table', () => {
  let TableOne;
  let db;

  beforeEach(() => {
    db = {
      con: () => ({
        query: (sql, callback) => {
          callback(null, {
            id: 1,
            name: 'name',
          });
        },
      }),
    };
    TableOne = new Table({
      tableName: 'tbl_table',
    }, db);
  });

  describe('findAll', () => {
    it('findAll with error on qery', async () => {
      db.query = (sql, callback) => callback('Database error');

      try {
        await TableOne.findAll();
      } catch (e) {
        expect(e).toMatch('Database error');
      }
    });

    it('findAll with empty args', async () => {
      await TableOne.findAll();

      expect(TableOne.lastSql).toBe('SELECT\n\t*\nFROM\n\ttbl_table');
    });

    it('with select fields', async () => {
      await TableOne.findAll({
        select: ['id', 'name as abc'],
      });

      expect(TableOne.lastSql).toBe('SELECT\n\tid, name as "abc"\nFROM\n\ttbl_table');
    });

    it('with where filter', async () => {
      await TableOne.findAll({
        select: ['id', 'name as abc'],
        where: {
          id: 1,
        },
      });

      expect(TableOne.lastSql).toBe('SELECT\n\t' +
        'id, name as "abc"\nFROM\n\ttbl_table\n' +
        'WHERE\n\tid = 1');
    });

    it('with orders default', async () => {
      await TableOne.findAll({
        order: ['id'],
      });

      expect(TableOne.lastSql).toBe('SELECT\n\t*\nFROM\n\ttbl_table\nORDER BY id ASC');
    });

    it('with orders DESC', async () => {
      await TableOne.findAll({
        order: ['id', 'DESC'],
      });

      expect(TableOne.lastSql).toBe('SELECT\n\t*\nFROM\n\ttbl_table\nORDER BY id DESC');
    });
  });
});
