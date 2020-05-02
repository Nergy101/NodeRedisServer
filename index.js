const Redis = require("ioredis");
// https://github.com/luin/ioredis
var redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    // password: "auth",
    db: 0,
});

var pub = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    // password: "auth",
    db: 0,
});
////////////////////////////////////////////////////////////////////////////
redis.subscribe("news", "music", function (err, count) {
    // Now we are subscribed to both the 'news' and 'music' channels.
    // `count` represents the number of channels we are currently subscribed to.

    pub.publish("news", "Hello news!");
    pub.publish("music", "Hello music!");
});

redis.on("message", function (channel, message) {
    // Receive message Hello world! from channel news
    // Receive message Hello again! from channel music
    console.log(`Received message ${message} from channel ${channel}`);
});

// There's also an event called 'messageBuffer', which is the same as 'message' except
// it returns buffers instead of strings.
redis.on("messageBuffer", function (channel, message) {
    // Both `channel` and `message` are buffers.
});