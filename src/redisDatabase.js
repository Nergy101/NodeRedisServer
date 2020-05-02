// const redis = require("redis");
// // const client = redis.createClient();
// const createClient = require('then-redis').createClient

// // Use the default config
// const client = createClient()

// client.on("error", function (error) {
//     console.error("Error:", error);
// });


// function setValue(key, object) {
//     client.set(key, JSON.stringify(object));
// }

// function getValue(key) {
//     return client.get(key)
//         // .then(res => {
//         //     return res ? JSON.parse(res) : null;
//         // });
// }

// function deleteValue(key) {
//     return client.del(key)
// }

// const redisDB = {
//     SetValue: setValue,
//     GetValue: getValue,
//     DeleteValue: deleteValue
// }

// module.exports = redisDB;