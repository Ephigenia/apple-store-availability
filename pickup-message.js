// curl -X "GET" "http://www.apple.com/de/shop/retail/pickup-message?little=true&location=10243&parts.0=MN8X2ZD%2FA"
/* jshint esnext: true */

var request = require('request');
var Promise = require('promise');

var postalCode = 10245;
var countryCode = 'de';
var maxDistance = 100;
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
    name: 'Watch 2 38mm Steel Leather',
    partNumber: 'MNP72ZD/A',
  },
  {
    name: 'Watch 2 38mm Steal Space Black Sport',
    partNumber: 'MP492ZD/A',
  }
];

function getAvailability(countryCode, postalCode, partNumber) {
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

parts.map(function(part) {
  return getAvailability(countryCode, postalCode, part)
    .then((stores) => {
      return stores.filter((store) => {
        return store.storedistance < maxDistance;
      });
    })
    .then((stores) => {
      console.log(`${part.name} (${part.partNumber})`);
      stores.forEach((store) => {
        console.log(`\t${store.storeName} (${store.city} ${store.address.address} ${store.storeDistanceWithUnit}km)`);
        Object.keys(store.partsAvailability).map(function(key) {
          let item = store.partsAvailability[key];
          switch(item.pickupDisplay) {
            default:
              console.log(`\tnot available`);
              break;
            case 'ships-to-store':
              console.log(`\tshipping (${item.storePickupQuote})`);
              break;
            case 'available':
              console.log(`\tAVAILABLE FOR PICKUP (${item.storePickupQuote})`);
              break;
          }
        });
      });
      console.log('---------------------------------------');
      return availability;
    });
});
