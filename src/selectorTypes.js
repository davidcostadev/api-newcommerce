import * as validate from './utils/validate';

export const stringType = {
  validation: validate.string,
};

export const numberType = {
  validation: validate.number,
};

export const floatType = {
  validation: validate.float,
};

const boolType = {
  validation: validate.bool,
};

export const id = numberType;

export const nameSelType = stringType;

export const enabledSelType = boolType;

export const batchSelType = stringType;

export const limitSelType = {
  ...numberType,
  default: 30,
};

export const pageSelType = {
  ...numberType,
  default: 1,
};
