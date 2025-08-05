const { defineConfig } = require('cypress');

module.exports = defineConfig({
  
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  },
  e2e: {
    
    baseUrl: 'https://dummyjson.com',
    setupNodeEvents(on, config) {
       require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        logToTerminal(message) {
          console.log('🔥 Terminal Log:', message); 
          return null;
        }
      });
      
    }
  },
  env: {
  userEmail: "emilys",
  password: "emilyspass"
}


});
