const url = "https://anilist.co/search/anime";

var Xray = require('x-ray')
var x = Xray()
 
x(url, 'div.media-card', [{
    title: ".title",
    image: "img@src",
}]).limit(1)
.then(res => {
    console.log(res)
}).catch( err => {
    console.error(err)
})