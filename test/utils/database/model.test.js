import {
  getArgs,
  getBlobValue,
  trateResult,
  revertAlias,
} from '../../../src/utils/database/model';
import { ops } from '../../../src/utils/database/where';

describe('model utils', () => {
  let streamMock;

  beforeAll(() => {
    streamMock = {
      events: {},
      on(event, callback) {
        this.events[event] = callback;
      },
      start() {
        this.events.data('legal');
        this.events.data(' de mais');
        this.events.end();
      },
    };
  });

  describe('getArgs should', () => {
    it('works params different order', () => {
      const scheme = [
        'one',
        'two',
      ];
      const args = {
        two: 2,
        one: 1,
      };

      expect(getArgs(scheme, args)).toEqual([1, 2]);
    });
  });

  describe('getBlobValue should', () => {
    const key = 'description';

    it('works', async () => {
      const field = (callback) => {
        callback(false, key, streamMock);
        streamMock.start();
      };

      const result = await getBlobValue(key, field);

      expect(result).toEqual({
        key: 'description',
        value: 'legal de mais',
      });
    });

    it('get error of blob', async () => {
      const field = (callback) => {
        callback(new Error('BLOB INVALID'), key, streamMock);
      };

      try {
        await getBlobValue(key, field);
      } catch (e) {
        expect(e.message).toBe('getBlobValue: `description` "BLOB INVALID"');
      }
    });

    it('get error of timeout', async () => {
      const field = (callback) => {
        callback(false, key, streamMock);
      };

      try {
        await getBlobValue(key, field);
      } catch (e) {
        expect(e.message).toBe('getBlobValue: `description` "TIMEOUT_BLOB_ERROR"');
      }
    });
  });

  describe('trateResult', () => {
    it('is a array of default fields', async () => {
      const result = [
        {
          description: 'bla bla bla',
        },
      ];
      const tratedResult = await trateResult(result);

      expect(tratedResult).toEqual([
        {
          description: 'bla bla bla',
        },
      ]);
    });

    it('is a object with blob', async () => {
      const field = (callback) => {
        callback(false, 'description', streamMock);
        streamMock.start();
      };
      const result = [
        {
          description: field,
          name: 'name',
        },
      ];
      const tratedResult = await trateResult(result);

      expect(tratedResult).toEqual([
        {
          description: 'legal de mais',
          name: 'name',
        },
      ]);
    });

    it('is a object with error on blob', async () => {
      const field = (callback) => {
        callback(new Error('BLOB INVALID'), 'description', streamMock);
        streamMock.start();
      };
      const result = [
        {
          description: field,
        },
      ];
      try {
        await trateResult(result);
      } catch (e) {
        expect(e.message).toBe('getBlobValue: `description` "BLOB INVALID"');
      }
    });
  });

  describe('revertAlias should', () => {
    it('revert with sucess', () => {
      const where = {
        PAGE: 1,
        limit: 1,
        [ops.AND]: {
          NAME: 'David',
          email: {
            [ops.NE]: 'david@costa.com',
          },
        },
      };
      const fields = [
        'PAGE',
        'LIMIT as limit',
        'NAME',
        'EMAIL as email',
      ];
      expect(revertAlias(where, fields)).toEqual({
        PAGE: 1,
        LIMIT: 1,
        [ops.AND]: {
          NAME: 'David',
          EMAIL: {
            [ops.NE]: 'david@costa.com',
          },
        },
      });
    });
  });
});
