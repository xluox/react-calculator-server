const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const {addLog, getLogs} = require('./logs.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket, callback) => {
    console.log('We have a new connection!!!');

    socket.on('newLog', (log) => {
        const newLog = addLog({id: socket.id, log });
        socket.emit('newLog', newLog);
        socket.broadcast.emit('newLog', newLog);

    })


    socket.on('disconnect', () => {
        console.log('User has left.');
    })
})


app.use(router);
app.use(cors);
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));