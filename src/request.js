/* eslint-disable no-console */
'use strict';

const got = require('got');
const tunnel = require('tunnel');
const chalk = require('chalk');

// Dynamically performs a request for any given protocol or method
module.exports = async (context, protocol, method) => {
  try {
    // Fetch the response
    const response = await got(`${protocol}://${context.endpoint}`, {
      agent: tunnel[method]({
        ca: context.ca,
        proxy: context.proxy
      })
    });

    // Print result row with status code
    console.info(tag(protocol, method, chalk.green(response.statusCode)));
  } catch (error) {
    // Print result row with error
    console.error(tag(protocol, method, chalk.red(error.message)));
  }
};

// Function to format and colourise table row in output
function tag(protocol, method, message) {
  let protocolTag;

  switch (protocol) {
  case 'http':
    protocolTag = chalk.cyan(protocol);
    break;
  default:
    protocolTag = chalk.magenta(protocol);
  }

  return `${chalk.yellow(method)}\t${protocolTag}\t\t${message}`;
}
