import { createServer } from "../support/wsServer";

describe("WebSockets Chat UI", () => {
  let wsServer = createServer("wss://9af4375c1960.ngrok.io");
  before(() => {
    cy.visitWithWsStub('/')
    cy.get("#nick-input").type("User 1");
    cy.get("#set-nick").click();
  });
  
  describe("on connection to WS server/source", () => {
    it("is expected to display connection message", () => {
      cy.get("body").should("contain.text", "Connected to fake server");
    });
  });

  describe("on receiving an incomming mssage, the chat UI", () => {
    it("is expected to display a new message", () => {
      cy.incommingMessage(
        wsServer,
        { nick: "Thomas", message: "Hello World" }
      );
      cy.get("#messages").should("contain.text", "Thomas: Hello World");
    });
  });

  describe("on sending a messege, the chat UI", () => {
    it("is expected to display the message that was just sent", () => {
      cy.get("#chat-input").type("Hello Mars");
      cy.get("#send-chat").click();
      cy.get("#messages").should("contain.text", "User 1: Hello Mars");
    });
  });
});
