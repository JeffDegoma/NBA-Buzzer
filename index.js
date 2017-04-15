const express = require('express');
const proxy = require('http-proxy-middleware');
const WebSocketServer = require("ws").Server


const app = express();
const runServer = require('./server').runServer;

if (process.env.NODE_ENV === 'production') {
    // Just run the server
    runServer(process.env.PORT || 8080);
}
else {
    const app = express();
    // Proxy everything through to Create React App

    app.use(proxy('http://localhost:3000/', {
        logLevel: 'warn', // Keep the logs clean
        ws: true, // Proxy websockets too
        router: {
            // Anything to /api goes to our backend
            'localhost:8080/api': 'http://localhost:3001'
        }
    }));   

    app.listen(process.env.PORT || 8080);

    const wss = new WebSocketServer({server: app})
    console.log("websocket server created")

    wss.on("connection", function(ws) {
      var id = setInterval(function() {
        ws.send(JSON.stringify(new Date()), function() {  })
      }, 1000)

      console.log("websocket connection open")

      ws.on("close", function() {
        console.log("websocket connection close")
        clearInterval(id)
      })
    })

}
