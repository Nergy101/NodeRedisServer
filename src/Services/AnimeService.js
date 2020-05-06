const fetch = require('node-fetch');
module.exports = class AnimeService {
    constructor() {
        this.url = 'https://graphql.anilist.co';
    }

    createOptions(query, variables) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    }

    async find({ search = "" }) { //anime-query object

        const query = `
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
        const options = this.createOptions(query, { search })
        const result = await fetch(this.url, options);
        return await result.json();
    }

    async list({ search = "", page = 1, perPage = 8 }) {
        // lists the first 8 anime's that sound like 'pokemon', TODO: add popularity
        const query = `
        query($search: String, $page: Int, $perPage: Int){
            Page(page: $page, perPage: $perPage) {
              pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
              }
              media(search: $search, type: ANIME) {
                id
                title {
                    userPreferred
                }
                episodes
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
                bannerImage
              }
            }
          }
          `;
        const options = this.createOptions(query, { search, page, perPage })
        const result = await fetch(this.url, options);
        return await result.json();
    }
}