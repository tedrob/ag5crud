// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
  const tables:ITables = {
  };
  return tables;
};
