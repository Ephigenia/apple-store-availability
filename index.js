/* jshint esnext: true */

var request = require('request');
var Promise = require('promise');
var Table = require('cli-table2');

var postalCode = 10245;
var countryCode = 'de';
var parts = [
  {
    name: 'Watch 2 38mm Steel Leather',
    partNumber: 'MNP72ZD/A',
  },
  {
    name: 'Watch 2 38mm Steal Space Black Sport',
    partNumber: 'MP492ZD/A',
  },
  {
    name: 'iPhone 7 Black 32GB',
    partNumber: 'MN8X2ZD/A'
  },
  {
    name: 'iPhone 7 Silver 32GB',
    partNumber: 'MN8Y2ZD/A'
  },
  {
    name: 'iPhone 7 Black 128GB',
    partNumber: 'MN922ZD/A'
  },
  {
    name: 'iPhone 7 Silver 128GB',
    partNumber: 'MN932ZD/A'
  }
];

function getAvailability(countryCode, postalCode, part) {
  var url = `http://www.apple.com/${countryCode}/shop/delivery-message`;
  var options = {
    qs: {
      postalCode: postalCode,
      'parts.0': part.partNumber
    }
  };
  return new Promise((resolve, reject) => {
    console.log(options);
    request(url, options, function(error, {body}) {
      if (error) {
        return reject(error);
      }
      var json = JSON.parse(body);
      return resolve(json.body.content.deliveryMessage[part.partNumber]);
    }.bind(this));
  });
}

var table = new Table({
  head: [
    'Name',
    'ProductNumber',
    'availablity',
    'earliest delivery date'
  ]
});
var promises = parts.map((part) => {
  return getAvailability(countryCode, postalCode, part).then(
    (availability) => {
      table.push([
        part.name,
        part.partNumber,
        availability.deliveryOptionMessages[0],
        availability.deliveryOptions[0].date
      ]);
      return availability;
    }
  );
});

Promise.all(promises).then(
  function() {
    console.log(table.toString());
  });
