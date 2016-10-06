var request = require('request');
var Promise = require('promise');

module.exports.getPickupMessage = (countryCode, postalCode, partNumber) => {
  var url = `http://www.apple.com/${countryCode}/shop/retail/pickup-message`;
  var options = {
    qs: {
      location: postalCode,
      little: 'true',
      'parts.0': partNumber
    }
  };
  return new Promise((resolve, reject) => {
    request(url, options, function(error, {body}) {
      if (error) {
        return reject(error);
      }
      var json = JSON.parse(body);
      return resolve(json.body.stores);
    }.bind(this));
  });
}
