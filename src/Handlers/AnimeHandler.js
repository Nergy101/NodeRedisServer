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
                    .then(result => resolve({ type: 'query-anime-result', data: result.data.Media }))
                    .catch(errors => reject(`AnimeService threw error: ${JSON.stringify(errors)}`))
            } else {
                reject(`${message.type} does not exist`)
            }
        })
    }
}
