const fetch = require('node-fetch');
module.exports = class AnimeService {
    constructor() {
        this.url = 'https://graphql.anilist.co';
        this.query = `
        query ($search: String) {
            Media(type: ANIME, search: $search) {
              id
              title {
                userPreferred
              }
              status
              genres
              isAdult
              episodes
              duration
              averageScore
              popularity
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
              tags {
                id
                name
              }
            }
          }
        `;

    }

    async find({ search = "" }) { //anime-query object
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: this.query,
                variables: { search }
            })
        };

        const result = await fetch(this.url, options);
        return await result.json();
    }
}