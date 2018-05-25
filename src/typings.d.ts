import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';
/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

type SequelizeAttribute = string | DataTypeAbstract | DefineAttributeColumnOptions;
declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: SequelizeAttribute
  };
}
