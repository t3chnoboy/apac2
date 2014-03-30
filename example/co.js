var amazon = require('../lib');
var co = require('co');

var client = amazon.createClient({
  awsTag: process.env.AWS_TAG,
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET
});

co(function *(){

  results = yield client.itemSearch({
    keywords: 'Pulp fiction',
    searchIndex: 'DVD',
    responseGroup: 'ItemAttributes,Offers,Images'
  });

  console.log(results);

})();
