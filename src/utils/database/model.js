import minify from 'htmlclean';
import path from 'path';
import fs from 'fs';
import { escape } from 'node-firebird';

export const listDefaultOptions = {
  where: {},
  filter: null,
  fields: [],
};

export const getModelAlias = (aliasDatabase, db) => (model) => {
  const aliasList = Object.keys(aliasDatabase);

  if (aliasList.includes(model)) {
    const alias = aliasList[aliasList.indexOf(model)];

    return {
      model: db[aliasDatabase[alias]],
      as: model,
    };
  }

  return {
    model: db[model],
  };
};

/* eslint no-use-before-define: "off" */
const clearItem = scheme => (item) => {
  const newItem = {};

  scheme.forEach((field) => {
    if (typeof field === 'string') {
      newItem[field] = item[field];
    } else {
      Object.keys(field).forEach((key) => {
        if (typeof item[key] !== 'undefined') {
          newItem[key] = clearData(item[key], field[key]);
        }
      });
    }
  });

  return newItem;
};

export const clearData = (data, scheme) => {
  if (Array.isArray(data)) {
    return data.map(clearItem(scheme));
  }

  return clearItem(scheme)(data);
};

export const getField = (fields, key) => {
  const fieldFromKey = fields.find(field => field.split(' as ')
    .reverse().find((cur, index) => index === 0) === key);

  if (fieldFromKey) {
    return fieldFromKey.split(' as ').find((cur, index) => index === 0);
  }

  return key;
};

export const revertAlias = (where, fields) => {
  const newObj = {};

  Object.keys(where).forEach((key) => {
    if (typeof where[key] === 'object') {
      newObj[getField(fields, key)] = revertAlias(where[key], fields);
    } else {
      newObj[getField(fields, key)] = where[key];
    }
  });

  return newObj;
};

export const getBlobValue = (key, blob) => new Promise((resolve, reject) => {
  blob((err, name, e) => {
    if (err) reject(new Error(`getBlobValue: \`${name}\` "${err.message}"`));

    let body = '';
    e.on('data', (chunk) => {
      body += chunk.toString('utf8');
    });

    e.on('end', () => {
      resolve({ key, value: compressHtml(body) });
    });

    setTimeout(() => {
      reject(new Error(`getBlobValue: \`${name}\` "TIMEOUT_BLOB_ERROR"`));
    }, 1000 * 10);
  });
});

const isFunctionOrNot = (key, value) => {
  if (typeof value === 'function') {
    return getBlobValue(key, value);
  }

  return Promise.resolve({ key, value });
};

const trareResultItem = async (item) => {
  const newObj = {};
  const listFields = Object.keys(item).map(key => isFunctionOrNot(key, item[key]));

  try {
    const newList = await Promise.all(listFields);

    newList.forEach(({ key, value }) => {
      newObj[key] = value;
    });
  } catch (e) {
    throw e;
  }

  return newObj;
};

export const trateResult = result => (
  Array.isArray(result) ?
    Promise.all(result.map(item => Promise.resolve(trareResultItem(item)))) :
    trareResultItem(result)
);

export const compressHtml = string => minify(string);

const isNumeric = n => Number.isInteger(parseInt(n, 10));

export const escapeValues = v => (
  isNumeric(v) ? parseInt(v, 10) : escape(v)
);

export const escapeKeys = v => `"${v}"`;

export const getArgs = (scheme, values) => scheme.map(key => escapeValues(values[key]));

export const tratePageZero = obj => Object.keys(obj).map(key => (
  key === 'page' ?
    ({
      key: 'page',
      value: obj[key] - 1,
    }) : ({
      key,
      value: obj[key],
    })
)).reduce((acc, cur) => {
  acc[cur.key] = cur.value;

  return acc;
}, {});

export const getFilesModels = (basename, dirname) => fs
  .readdirSync(dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .map(file => path.join(dirname, file));
