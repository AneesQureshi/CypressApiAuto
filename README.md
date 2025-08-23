# Cypress API Automation

Lightweight API testing framework using [Cypress](https://docs.cypress.io/api/commands/request).  
Validates REST API endpoints with request/response assertions, authentication, and chaining.

## Tech Stack
- Cypress 13+
- JavaScript (ES6+)
- Mocha + Chai assertions
- Fixtures for mock data
- GitHub Actions (planned)

## Project Structure
cypress/  
    ├── e2e/        # API test cases  
    ├── fixtures/   # Test data (tokens, payloads)  
    ├── support/    # Shared commands & utilities  
cypress.config.js  

## Setup & Run
```bash
npm install
npx cypress open
npx cypress run --spec "cypress/e2e/api/*.cy.js"
```

## Features
- API tests using `cy.request()`
- Validate response status codes & payloads
- Authentication (token-based headers)
- Chained requests (dependent APIs)
- Global & environment variables
- Fixtures for mock request/response data

## Continuous Integration
- Configure GitHub Actions to run API tests
- Publish reports as artifacts

## Future Enhancements
- Schema validation (AJV / Joi)
- Allure reporting
- Negative test scenarios
- Integration with Postman & Newman for hybrid API testing
