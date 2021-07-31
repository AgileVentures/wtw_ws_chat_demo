import { Server, WebSocket } from "mock-socket";

function getServer() {
  return new Cypress.Promise((resolve) => {
    // Initialize server
    const mockServer = new Server("wss://3201a21afc10.ngrok.io");

    let mockSocket;
    mockServer.on("connection", (socketHandle) => {
      socketHandle.send("Connection message")
      resolve(socketHandle);
    });
  });
}

// const sockets = {};
// let mockedServer
// function initServer() {
//   // useful to reset sockets when doing TDD and webpack refreshes the app
//   for (const socket of Object.values(sockets)) {
//     socket.close();
//   }

//   mockServer();
// }

// function mockServer() {
//   // Of course, your frontend will have to connecto to localhost:4000, otherwise change this
//   sockets.mockServer = new Server("wss://3201a21afc10.ngrok.io")

//   sockets.mockServer.on("connection", socket => {
//     mockedServer = socket
//     console.table(mockedServer.connection)

//     // Will be sent any time a client connects
//     socket.send("Connection message")

//     socket.on("message", data => {
//       // Do whatever you want with the message, you can use socket.send to send a response
//     })
//   })
// }

describe("on receiving an incomming mssage, chat UI", () => {
  before(() => {});
  it("is expected to display a new message", () => {
    const socketPromise = getServer();
    // initServer()
    cy.visit("/", {
      onBeforeLoad(win) {
        // Stub out JS WebSocket
        cy.stub(win, "WebSocket", (url) => new WebSocket(url));
      },
    });
    // sockets.mockServer.send("Another Connection message");
    cy.wrap(socketPromise).then((mockSocket) => {
      // Use the mockSocket variable to send a message to client
      // mockSocket.send("Connection message");
    });
    // cy.get("body").should("contain.text", "Connection message");
  });
});
