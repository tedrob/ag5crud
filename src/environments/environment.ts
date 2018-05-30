// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  // 'url': 'postgres://postgres:P2ssw0rd@localhost:5432/ag5ted',
  'url': 'heroku config:get DATABASE_URL -a ag5-crud',
  'dialect': 'postgres',
  'operatorsAliases': false,
  production: false
};
