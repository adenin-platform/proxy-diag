/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const chalk = require('chalk');

const inquire = require('./inquire');
const request = require('./request');

// Main method
module.exports = async () => {
  // Prompt user for input and set required parameters
  const answers = await inquire();
  const context = {
    endpoint: answers.endpoint.replace(/(^\w+:|^)\/\//, ''), // strip any provided protocol
    proxy: {
      host: answers.host
    }
  };

  // Configure optional proxy settings
  if (answers.port !== 80) context.proxy.port = answers.port; // only set port if one provided
  if (answers.auth) context.proxy.proxyAuth = `${answers.username}:${answers.password}`;

  if (answers.useCA) {
    if (fs.existsSync('certificate.pem')) {
      context.ca = [fs.readFileSync('certificate.pem')];
    } else {
      console.error(chalk.red('certificate.pem was requested but not found'));
    }
  }

  // Valid proxy methods
  const methods = [
    'httpOverHttp',
    'httpsOverHttp',
    'httpOverHttps',
    'httpsOverHttps'
  ];

  // Print results table header
  console.log(chalk.gray('method\t\tprotocol\tresult'));

  // Perform request for each method first with http then https target
  for (let i = 0; i < methods.length; i++) {
    // Don't do *OverHttps unless requested
    if (!answers.overHttps && methods[i].includes('OverHttps')) continue;

    // Run the method for http then https target url
    await request(context, 'http', methods[i]);
    await request(context, 'https', methods[i]);
  }
};
