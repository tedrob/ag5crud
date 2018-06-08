const coinsController = require('\../controllers').coins;

module.exports = (app) => {
  /* app.get('/api/', (req,res) => res.status(200).send({
    message: 'Welcome to the Coins API!',
  })); */

  console.log('rtes', app.body.name, '{', app.body.price, '}' );
  // console.log('cntrl', coinsController);
  // app.create('/api/coins', coinsController.create);
  coinsController.create(app);
  };

//  module.exports = api;
  //app.post('/api/coins', coinsController.create);app
// }
