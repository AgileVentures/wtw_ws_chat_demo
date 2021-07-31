import { Server } from "mock-socket";

const createServer = (url) => {
  return new Cypress.Promise((resolve) => {
    const mockServer = new Server(url);
    // Here we want to define on event actions
    mockServer.on("connection", (connection) => {
      connection.send("Connected to fake server");
      connection.on("message", (message) => {
        message = JSON.parse(message);
        connection.send(JSON.stringify(message));
      });
      resolve(connection);
    });
  });
};

module.exports = { createServer };
