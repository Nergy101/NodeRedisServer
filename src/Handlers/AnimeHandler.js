const AnimeService = require('../Services/AnimeService.js');

module.exports = class AnimeHandler {
    constructor() {
        this.animeService = new AnimeService();
        // singleton
    }

    Guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async handleQuery(message) {
        try {
            const result = await this.animeService.find(message);
            const data = { result: result.data.Media, metadata: message.metadata }
            return { type: 'query-anime-result', data }
        } catch (error) {
            console.error(error)
            throw `AnimeService threw error: ${error}`;
        }
    }
    
    async handleQueryList(message) {
        try {
            const result = await this.animeService.list(message);
            console.log(result)
            const data = { result: {page: result.data.Page}, metadata: message.metadata }
            return { type: 'query-anime-result', data }
        } catch (error) {
            console.error(error)
            throw `AnimeService threw error: ${error}`;
        }
    }


    async handle(message) {
        if (message.metadata == undefined) {
            message.metadata = { date: Math.floor(Date.now() / 1000), guid: this.Guid() }
        }

        console.log("Anime-handler:", message.metadata.guid)

        if (message.type === 'query') {
            return await this.handleQuery(message)
        }
        if (message.type === 'query-list'){
            return await this.handleQueryList(message);
        }
        else {
            throw `Could not handle message with type: ${message.type}`
        }
    }
}
