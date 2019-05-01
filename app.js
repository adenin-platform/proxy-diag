/* eslint-disable no-console */
'use strict';

// Run main method
try {
  require('./src/main')();
} catch (error) {
  console.error(error.message);
}
