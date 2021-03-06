var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const AnimeHandlerClass = require('./Handlers/AnimeHandler.js');
const WeatherHandlerClass = require('./Handlers/WeatherHandler.js');

const AnimeHandler = new AnimeHandlerClass();
const WeatherHandler = new WeatherHandlerClass();

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
    res.status(200).send(`<h1>Hello from Express</h1>`);
});

// WEBSOCKET
io.on('connection', async socket => {
    console.log(`socket ${socket.id} connected`);
    // .send() becomes emit('message', data)
    socket.emit('hello', { data: 'world' });

    socket.on('disconnect', () => {
        // close underlaying connection
        socket.disconnect(close = true);
    });

    //  RequestTypeHandler.handle(message).then(response => {...});
    socket.on('anime', message => AnimeHandler.handle(message)
        .then(({ type, data }) => socket.emit(type, data))
        .catch(errorMessage => {
            console.error(errorMessage);
            socket.emit('anime-error', { errorMessage })
        })
    );

    socket.on('weather', message => WeatherHandler.handle(message)
        .then(({ type, data }) => socket.emit(type, data))
        .catch(errorMessage => socket.emit('weather-error', { errorMessage })));

    socket.on('register', message => AuthHandler.handle(message)
        .then(res => socket.emit(res.type || 'register-result', res.data))
        .catch(errorMessage => socket.emit('register-error', { errorMessage })));

    socket.on('login', message => AuthHandler.handle(message)
        .then(res => socket.emit(res.type || 'login-result', res.data))
        .catch(errorMessage => socket.emit('login-error', { errorMessage })));

    // ping and pong are reserved by Socket.io
    socket.on('client-ping', () => socket.emit('server-pong', { pong: `Pong to you (${socket.id}) from server :)` }));

    // repeated ping for giggles
    setInterval(() => {
        socket.emit('server-ping', { ping: `Ping to you (${socket.id}) from server :)` });
    }, 15000);
});

http.listen(port, () => {
    console.log(`listening on *:${port} for http:// and ws://`);
});