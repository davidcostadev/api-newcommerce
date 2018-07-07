/* eslint no-use-before-define: "off" */

const trateString = value => (
  typeof value === 'string' ? `'${value}'` : value
);

const opAND = fields => Object.keys(fields)
  .map(field => opLogic(field, fields[field]))
  .join(' AND ');

const opOR = fields => Object.keys(fields)
  .map(field => opLogic(field, fields[field]))
  .join(' OR ');

const opEQ = (field, value) => `${field} = ${trateString(value)}`;

const opNE = (field, value) => `${field} != ${trateString(value)}`;

export const ops = {
  AND: 'AND',
  OR: 'OR',
  EQ: 'EQ',
  NE: 'NE',
};

const operations = {
  [ops.AND]: opAND,
  [ops.OR]: opOR,
  [ops.EQ]: opEQ,
  [ops.NE]: opNE,
};

const checkValue = value => (
  typeof value === 'string' ||
  typeof value === 'number'
);

const opLogic = (field, value) => {
  if (checkValue(value)) {
    return opEQ(field, value);
  }

  return Object.keys(value)
    .map(op => operations[op](field, value[op]));
};

const findOperation = (op, value) => {
  if (typeof operations[op] === 'undefined') {
    return opLogic(op, value);
  }
  return operations[op](value);
};

const where = (attrs) => {
  const logic = Object.keys(attrs)
    .map(att => findOperation(att, attrs[att]));

  if (logic.length === 1) {
    return `WHERE\n\t${logic[0]}`;
  }

  return `WHERE\n\t(${logic.join(')\nAND\n\t(')})`;
};

export default where;
