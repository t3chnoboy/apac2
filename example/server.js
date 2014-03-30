var amazon = require('../lib');
var express = require('express');

var app = express();

var client = amazon.createClient({
  awsTag: process.env.AWS_TAG,
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET
});


app.get('/amazon/:index', function(req, res){
  client.itemSearchStream({
    keywords: req.query.title,
    searchIndex: req.params.index,
    responseGroup: 'ItemAttributes,Offers,Images'
  }).pipe(res);

});

app.listen(3000);
