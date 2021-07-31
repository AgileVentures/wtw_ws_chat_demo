const WebSocket = require('ws')
const wsServer = new WebSocket.Server({port: 8080})

wsServer.on('connection', connection => {
  connection.send('Live Long And Prosper!')
  connection.on('message', message => {
    message = JSON.parse(message)
    console.table(message)
    wsServer.clients.forEach(function each (client) {
      client.send(JSON.stringify(message))
    })
  })
})