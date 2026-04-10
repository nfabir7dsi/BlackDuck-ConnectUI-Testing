const { defineConfig } = require("cypress");
import 'dotenv/config';

module.exports = defineConfig({
  viewportWidth: 1024,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
