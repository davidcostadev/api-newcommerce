import {
  nameSelType,
  enabledSelType,
} from './selectorTypes';

export const ACTIONS = ['create', 'get', 'list', 'destroy', 'update'];

export const projectForm = {
  name: nameSelType,
  enabled: enabledSelType,
};
