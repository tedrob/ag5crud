export const environment = {
  // tslint:disable-next-line:max-line-length
  // 'url':  'postgres://ddpdvlujtbflwv:4bfec4912dbaf8969f9bd4fe6b51936f34781e2a2edd713257c12ddc9d6dcff3@ec2-54-243-235-153.compute-1.amazonaws.com:5432/dc79kjvbe6a50c',
  'url': `$(heroku config:get DATABASE_URL -a ag5-crud`,
  'dialect': 'postgres',
  'ssl': true,
  'operatorsAliases': false,
  production: true
};
