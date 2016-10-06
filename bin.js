#!/usr/bin/env node
/* jshint esnext: true */

var program = require('commander');

var config = require('./package.json');
var getPickupMessage = require('./src/pickup-message');

program
  .version(config.version)
  .usage('<source>')
  .description(`
    @TODO there should be description here which explains the command line
    options and the ouput in a easily understandable description.
  `)
  .option(
    '--countryCode <code>',
    'Country Code',
    'de'
  )
  .option(
    '--postalCode <code>',
    'Postal Code'
  )
  .option(
    '--parts <items>',
    'Apple Part Numbers',
    (val) => {
    return val.split(/,\s+/).filter((part) => {
      return part;
    })
  })
  .parse(process.argv);

// @TODO break the bin when no parts there
// @TODO break the bin when no country code
// @TODO break when no country code (is that required?)

program.parts.forEach(function(partNumber) {
  getPickupMessage(program.countryCode, program.postalCode, partNumber).then(
    function(response) {
      console.log(response);
    }
  );
});
