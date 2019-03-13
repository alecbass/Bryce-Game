const http = require('http');
const WebSocketServer = require("ws").Server;
const host = "192.168.0.4";
const port = 3002;

/*interface Item {
	id: number;
	name: string;
}*/

// const thing = {
// 	id: 1,
// 	name: "An item"
// }

const httpServer = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  let t = Object.keys(req);
  res.end(`${t}`);
});

// httpServer.listen(port, host, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// readline.question(`What's your name?`, (name) => {
//   readline.close()
// })

// create the server
const messages = [];

const server = new WebSocketServer({
  server: httpServer,
  port: port,
  host: host,

});

// websocket server here
server.on("listening", () => {
  console.log("I'M LISTENING");
})

server.on("connection", (socket, request) => {
  let connection = request.socket;

  if (messages.length > 0) {
    socket.send(JSON.stringify(messages));
  }

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      // process WebSocket message
      console.log("received" + message);
    }
  });

  socket.onmessage = (event) => {
    if (event.type === "message") {
      // it's a message!!!
      const { data } = event;
      const realData = JSON.parse(data);
      if (realData.message) {
        messages.push(realData.message);
        console.log(messages.length);
        socket.send(realData.message);
      }
    }
  }

  connection.on('close', function (connection) {
    // close user connection
    console.log("closed a connection");
  });
});
