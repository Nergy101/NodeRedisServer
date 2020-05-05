const Redis = require("ioredis");
// https://github.com/luin/ioredis

var redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    // password: "auth",
    db: 0,
});

// var pub = new Redis({
//     port: 6379, // Redis port
//     host: "127.0.0.1", // Redis host
//     family: 4, // 4 (IPv4) or 6 (IPv6)
//     // password: "auth",
//     db: 0,
// });
// pub.publish("news", "Hello news!");
// pub.publish("music", "Hello music!");

const handleMusicEvent = require('./music-event-handler.js');

redis.subscribe("news", "music", function (err, count) {});

redis.on("message", function (channel, message) {
    if (channel === "music") {
        handleMusicEvent(message);
    }
    if (channel === "news") {
        console.log('no handler yet for news')
    }
});