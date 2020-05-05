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

    find({ search = "", options }) { //anime-query object
        // Define the config we'll need for our Api request

        options = {
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
        
        return Promise((resolve, reject) => {
            fetch(this.url, this.options)
                .then(res => res.json()
                    .then(json => res.ok ? resolve(json) : reject(json)))
        })
    }
}