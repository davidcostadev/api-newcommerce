/* eslint max-len:"off" */
import Table from '../../../src/utils/database/Table';

describe('Table', () => {
  let TableOne;
  let db;
  const user = {
    id: 1,
    name: 'name',
  };

  beforeEach(() => {
    db = {
      con: () => ({
        query: (sql, callback) => {
          callback(null, user);
        },
      }),
    };
    TableOne = new Table({
      tableName: 'tbl_table',
      id: 'id',
      fields: [
        'id',
      ],
      args: [
        'one',
        'two',
      ],
    }, db);
  });

  describe('findAll with', () => {
    it('error on con', async () => {
      TableOne.db = {
        con: () => {
          throw new Error('error on con');
        },
      };

      try {
        await TableOne.findAll();
      } catch (e) {
        expect(e.message).toBe('error on con');
      }
    });

    it('error on query', async () => {
      TableOne.db = {
        con: () => ({
          query: (sql, callback) => {
            callback(new Error('query error'), null);
          },
        }),
      };

      try {
        await TableOne.findAll();
      } catch (e) {
        expect(e.message).toBe('query error');
      }
    });

    it('empty args', async () => {
      await TableOne.findAll();

      expect(TableOne.lastSql).toBe('SELECT\nFIRST 30 SKIP 0\n\tid\nFROM\n\ttbl_table');
    });

    it('select fields', async () => {
      await TableOne.findAll({
        select: ['id', 'name as abc'],
      });

      expect(TableOne.lastSql).toBe('SELECT\nFIRST 30 SKIP 0\n\tid, name as "abc"\nFROM\n\ttbl_table');
    });

    it('where filter', async () => {
      await TableOne.findAll({
        select: ['id', 'name as abc'],
        where: {
          id: 1,
        },
      });

      expect(TableOne.lastSql).toBe('SELECT\nFIRST 30 SKIP 0\n\t' +
        'id, name as "abc"\nFROM\n\ttbl_table\n' +
        'WHERE\n\tid = 1');
    });

    it('orders default', async () => {
      await TableOne.findAll({
        order: ['id'],
      });

      expect(TableOne.lastSql).toBe('SELECT\nFIRST 30 SKIP 0\n\tid\nFROM\n\ttbl_table\nORDER BY id ASC');
    });

    it('orders DESC', async () => {
      await TableOne.findAll({
        order: ['id', 'DESC'],
      });

      expect(TableOne.lastSql).toBe('SELECT\nFIRST 30 SKIP 0\n\tid\nFROM\n\ttbl_table\nORDER BY id DESC');
    });
  });

  describe('findAndCountAll with where', () => {
    it('empty', async () => {
      TableOne.db = {
        con: () => ({
          query: (sql, callback) => {
            callback(null, [{ COUNT: 2 }]);
          },
        }),
      };

      const count = await TableOne.findAndCountAll({ where: {} });

      expect(count).toBe(2);
    });

    it('arguments', async () => {
      TableOne.db = {
        con: () => ({
          query: (sql, callback) => {
            callback(null, [{ COUNT: 1 }]);
          },
        }),
      };

      const count = await TableOne.findAndCountAll({ where: { id: 1 } });

      expect(count).toBe(1);
    });

    it('errors', async () => {
      TableOne.db = {
        con: () => ({
          query: (sql, callback) => {
            callback(new Error('Database error'), null);
          },
        }),
      };

      try {
        await TableOne.findAndCountAll({ where: { id: 1 } });
      } catch (e) {
        expect(e.message).toBe('Database error');
      }
    });
  });

  describe('findById with', () => {
    it('arguments empty', async () => {
      TableOne.db = {
        con: () => ({
          query: (sql, callback) => {
            callback(null, [user]);
          },
        }),
      };

      const data = await TableOne.findById(1);

      expect(data).toEqual(user);
    });

    it('error on con', async () => {
      TableOne.db = {
        con: () => {
          throw new Error('error on con');
        },
      };

      try {
        await TableOne.findById(1);
      } catch (e) {
        expect(e.message).toBe('error on con');
      }
    });

    it('error on query', async () => {
      TableOne.db = {
        con: () => ({
          query: (sql, callback) => {
            callback(new Error('error on query'), null);
          },
        }),
      };

      try {
        await TableOne.findById(1);
      } catch (e) {
        expect(e.message).toBe('error on query');
      }
    });
  });

  describe('procedure with', () => {
    it('erros on con', async () => {
      TableOne.db = {
        con: () => {
          throw new Error('error on con');
        },
      };
      const args = {
        one: 'david',
        two: 99,
      };

      try {
        await TableOne.procedure({ args });
      } catch (e) {
        expect(e.message).toBe('error on con');
      }
    });

    it('error on query', async () => {
      TableOne.db = {
        con: () => ({
          query: (sql, callback) => {
            callback(new Error('error on query'), null);
          },
        }),
      };
      const args = {
        one: 'david',
        two: 99,
      };

      try {
        await TableOne.procedure({ args });
      } catch (e) {
        expect(e.message).toBe('error on query');
      }
    });

    it('arguments', async () => {
      TableOne.db = {
        con: () => ({
          query: (sql, callback) => {
            callback(null, [
              {
                ...user,
                count: 2,
              },
            ]);
          },
        }),
      };
      const args = {
        one: 'david',
        two: 99,
      };

      const data = await TableOne.procedure({ args });

      expect(data).toEqual([{
        ...user,
        count: 2,
      }]);
      expect(TableOne.procedureCount()).toEqual(2);
    });
  });

  describe('logger should', () => {
    it('works', () => {
      TableOne.lastSql = '123';
      TableOne.db.logger = true;

      const { log } = console;

      console.log = jest.fn();
      TableOne.logger();

      expect(console.log.mock.calls[0][0]).toBe('DATABASE: `123`');

      console.log = log;
    });
  });
});
