// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
Cypress.Commands.add("visitWithWsStub", (path) => {
  cy.visit(path, {
    onBeforeLoad(win) {
      cy.stub(win, "WebSocket", (url) => new WebSocket(url));
    },
  });
});

Cypress.Commands.add("incommingMessage", (wsServer, message) => {
  cy.wrap(wsServer).then((connection) => {
    message =
      message.constructor.name === "Object" ? JSON.stringify(message) : message;
    connection.send(message);
  });
});
