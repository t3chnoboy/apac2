var crypto = require('crypto');

var generateSignature = function(stringToSign, awsSecret) {
  var hmac = crypto.createHmac('sha256', awsSecret);
  var signature = hmac.update(stringToSign).digest('base64');

  return signature;
};

exports.generateQueryString = function(query, credentials) {
  var condition = query.condition || 'All';
  var keywords = query.keywords || '';
  var responseGroup = (query.responseGroup || 'ItemAttributes').replace(/,/g, '%2C');
  var searchIndex = query.searchIndex || 'All';
  var unsignedString =
    "AWSAccessKeyId=" + credentials.awsId +
    "&AssociateTag=" + credentials.awsTag +
    "&Condition=" + condition +
    "&Keywords=" + (escape(keywords)) +
    "&Operation=ItemSearch&ResponseGroup=" + responseGroup +
    "&SearchIndex=" + searchIndex +
    "&Service=AWSECommerceService&Timestamp=" + (escape((new Date()).toISOString())) +
    "&Version=2011-08-01";
  var signature = escape(generateSignature('GET\nwebservices.amazon.com\n/onca/xml\n' + unsignedString, credentials.awsSecret)).replace(/\+/g, '%2B');
  var queryString = 'http://webservices.amazon.com/onca/xml?' + unsignedString + '&Signature=' + signature;

  return queryString;
};
