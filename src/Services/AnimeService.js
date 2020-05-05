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

    find({ search = ""}) { //anime-query object
        // Define the config we'll need for our Api request
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

        return new Promise((resolve, reject) => {
            fetch(this.url, options)
                .then(res => res.json()
                    .then(json => resolve(json)).catch(err => reject(err.message)))
        })
    }
}