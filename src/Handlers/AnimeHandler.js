const fetch = require('node-fetch');
const AnimeService = require('../Services/AnimeService.js');

module.exports = class AnimeHandler {
    constructor() {
        this.animeService = new AnimeService();
        // singleton
    }

    handle(message) {
        return new Promise((resolve, reject) => {
            if (message.type === "query") {
                this.animeService.find(message)
                    .then(res => resolve('query-anime-result', res))
                    .catch(error => reject(`AnimeService threw error: ${error.message}`))
            }

            reject(`${message.type} does not exist`)
        })
    }
}
