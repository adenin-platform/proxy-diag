'use strict';

const inquirer = require('inquirer');

module.exports = async () => {
  return inquirer.prompt([
    // Prompt for RSS endpoint URL
    {
      name: 'endpoint',
      type: 'input',
      message: 'Enter endpoint to proxy to:',
      validate: (value) => {
        if (value.length) return true;

        return 'Endpoint is required';
      }
    },
    // Prompt for proxy server hostname or IP
    {
      name: 'host',
      type: 'input',
      message: 'Enter proxy hostname or IP:',
      validate: (value) => {
        if (value.length) return true;

        return 'Proxy hostname or IP is required';
      }
    },
    // Prompt for custom proxy port
    {
      name: 'port',
      type: 'number',
      message: 'Enter proxy port (optional):',
      default: 80,
      validate: (value) => {
        if (isNaN(value) || value > 65535) return 'Must be a valid port number';

        return true;
      }
    },
    // Ask if auth credentials are required
    {
      name: 'auth',
      type: 'confirm',
      message: 'Proxy requires auth credentials?'
    },
    // Prompt for username if auth required
    {
      name: 'username',
      type: 'input',
      message: 'Proxy username:',
      when: (answers) => {
        return answers.auth;
      },
      validate: (value) => {
        if (value.length) return true;

        return 'Username is required';
      }
    },
    // Prompt for password if auth required
    {
      name: 'password',
      type: 'password',
      message: 'Proxy password:',
      when: (answers) => {
        return answers.auth;
      },
      validate: (value) => {
        if (value.length) return true;

        return 'Password is required';
      }
    },
    // Ask about *OverHttps
    {
      name: 'overHttps',
      type: 'confirm',
      message: 'Also test *OverHttps methods? (for https client->proxy connections)',
      default: false,
      // Currently *OverHttps would need further implementation, so never ask
      when: (answers) => {
        return isNaN(answers.port);
      }
    },
    // Ask whether to use the local certificate.pem
    {
      name: 'useCA',
      type: 'confirm',
      message: 'Use local certificate.pem for client authentication?',
      default: true
    }
  ]);
};
