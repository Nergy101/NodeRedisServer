var express = require('express')
var app = express()
const port = 3000;

const redis = require('./redisDatabase')

redis.SetValue('test', { hello: "world" })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/:key', function (req, res) {
    const key = req.params.key
    redis.GetValue(key)
        .then(result => {
            if (result) {
                res.send(JSON.stringify(result));
            } else {
                res.send(JSON.stringify({ error: `key '${key}' not found` }))
            }
        });
});

app.post('/', function (req, res) {
    const key = req.body.key;
    redis.GetValue(key).then(result => {
        if (!result) {
            redis.SetValue(key, req.body.data);
            res.sendStatus(201);
        } else {
            res.send(JSON.stringify({ error: `key '${key}' already exists` }));
        }
    });
});

app.put('/', function (req, res) {

    redis.GetValue(req.body.key).then(result => {
        if (result) {
            redis.SetValue(req.body.key, req.body.data);
            res.send(req.body.data);
        } else {
            res.sendStatus(404);
        }
    });
});

app.delete('/:key', function (req, res) {
    redis.DeleteValue(req.params.key).then(result => {
        if (result === 1) {
            res.sendStatus(202);
        } else {
            res.sendStatus(404);
        }
    });
})

app.listen(port, () => console.log(`App listening on port ${port}`))