const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.port || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

// server (emit) -> client (receieve) - countUpdated
// client (emit) -> server(receieve) - increment

io.on('connection', (socket) => {
    console.log("New web socket conncetion : WELCOME");

    socket.emit('message', 'Welcome!')
    //will send a message to all the clients except this
    socket.broadcast.emit('message', 'A new user has joined')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })
})

server.listen(port, () => {
    console.log("Server started at port : ", port);
})