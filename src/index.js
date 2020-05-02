var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// HTTP (Express)
app.get('/', (_, res) => {
    res.status(200).send(res.body);
});

// WEBSOCKET
io.on('connection', (socket) => {
    var id = "anonymous";
    console.log('a user connected');
    socket.on('register', registration => {
        console.log(`user ${registration.id} connected at ${registration.time}`);
        id = registration.id;
    });

    // repeated ping
    setInterval(() => {
        socket.send({data: `Ping to you (${id}) from server :)`})
    }, 15000);
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});