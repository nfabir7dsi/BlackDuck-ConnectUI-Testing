const { defineConfig } = require("cypress");
import 'dotenv/config';

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
