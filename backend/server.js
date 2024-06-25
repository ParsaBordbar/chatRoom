const http = require('http')
const webSocket = require("ws");

const server = http.createServer()

const ws = new webSocket.Server({server});

ws.on('headers', (headers)=> {
})

ws.on("connection", (socket, req) => {
    //set the UserID as the SocketID
    let userID = req.url.slice(1);
    socket.id = userID;

    socket.send(JSON.stringify({ userID }));
    
    socket.on("message", (data)=> {
        ws.clients.forEach((client) => {
            client.send( 
                JSON.stringify({
                    userID: socket.id,
                    message: data.toString(),
                })
            )})
        })
    })


let PORT = 4001
server.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
});