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

export const getField = (fields, key) => fields.find(field => field
  .split(' as ').reverse().find((cur, index) => index === 0) === key)
  .split(' as ').find((cur, index) => index === 0);

export const revertAlias = (where, fields) => {
  const newObj = {};
  Object.keys(where).forEach((key) => {
    if (typeof where[key] === 'object') {
      revertAlias(where[key], fields);
    } else {
      newObj[getField(fields, key)] = where[key];
    }
  });

  return newObj;
};
