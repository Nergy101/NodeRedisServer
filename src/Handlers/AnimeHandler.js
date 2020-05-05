const AnimeService = require('../Services/AnimeService.js');

module.exports = class AnimeHandler {
    constructor() {
        this.animeService = new AnimeService();
        // singleton
    }

    async handle(message) {
        console.log("Anime-handler:", message)
        if (message.type === 'query') {
            try {
                const result = await this.animeService.find(message);
                return { type: 'query-anime-result', data: result.data.Media }
            } catch (error) {
                throw `AnimeService threw error: ${error}`;
            }
        }
        else {
            throw `Could not handle message with type: ${message.type}`
        }

    }
}
