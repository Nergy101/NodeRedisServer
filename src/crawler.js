// const rp = require('request-promise');
// const cheerio = require('cheerio');
// const url = "https://anilist.co/search/anime";


// function getFrontPage() {
//     return new Promise((resolve, reject) => {
//         rp(url)
//             .then(function (html) {
//                 resolve(html);
//             })
//             .catch(function (err) {
//                 reject(err);
//             });
//     })
// }

// async function main() {
//     const html = await getFrontPage();
//     const $ = cheerio.load(html);
//     console.log($.html('body'))
//     console.log($.html('.results'))
// }

// main()


const fetch = require('node-fetch');
// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
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

// Define our query variables and values that will be used in the query request
var variables = {
    search: "LISTENERS"
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
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

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data.data.Media)
}

function handleError(error) {
    // alert('Error, check console');
    console.error(error);
}