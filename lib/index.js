var generateQueryString = require('./utils').generateQueryString,
    request = require('request'),
    Promise = require('es6-promise').Promise;


var itemSearchStream = function(credentials) {

  return function(query) {
    var url = generateQueryString(query, credentials);

    return request(url);
  };
};

var itemSearch = function(credentials) {

  return function(query, cb) {
    var url = generateQueryString(query, credentials);

    if (typeof cb === 'function') {
      request(url, function(error, response, body) {

        if (error) {
          cb(error);
        }

        if (response.statusCode != 200) {
          cb(body);
        }

        cb(null, body);
      });

    }

    var promise = new Promise(function(resolve, reject) {

      request(url, function(error, response, body) {

        if (error) {
          reject(error);
        }

        if (response.statusCode != 200) {
          reject(body);
        }

        resolve(body);
      });
    });

    return promise;
  };
};

var createClient = function(credentials) {
  return {
    itemSearch: itemSearch(credentials),
    itemSearchStream: itemSearchStream(credentials)
  };
};

exports.createClient = createClient;
