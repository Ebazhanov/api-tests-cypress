import { defineConfig } from 'cypress'

export default defineConfig({
  watchForFileChanges: false,
  waitForAnimations: true,
  numTestsKeptInMemory: 1,
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  failOnStatusCode: false,
  video: true,
  videoCompression: 32,
  videoUploadOnPasses: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
  },
})
