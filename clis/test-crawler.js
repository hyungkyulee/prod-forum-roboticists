// var Crawler = require("js-crawler").default;

// new Crawler().configure({depth: 3})
//   .crawl("http://www.google.com", function onSuccess(page) {
//     console.log(page.url);
//   });

console.log('hello');

// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   //Return the url part of the request object:
//   res.write(req.url);
//   res.end();
// }).listen(8080);

// const request = require("request");
// const cheerio = require("cheerio");
// function getFull(id, callback) {
//   request.get(`https://www.imdb.com/title/${id}/?ref_=fn_al_tt_1`, function(
//     error,
//     response,
//     data
//   ) {
//     const $ = cheerio.load(data);
//     callback(error, {
//       story: $("div.inline:nth-child(3) > p:nth-child(1) > span:nth-child(1)")
//         .text()
//         .trim()
//     });
//   });
// }

// async function loadGraphicCards(page = 1) {
//   const searchUrl = `https://www.amazon.de/s/?page=${page}&keywords=graphic+card`;
//   const response = await fetch(searchUrl);  // fetch page 

//   const htmlString = await response.text(); // get response text
//   const $ = cheerio.load(htmlString);       // parse HTML string

//   return $("#s-results-list-atf > li")             // select result <li>s
//     .map((_, li) => ({                      // map to an list of objects
//       asin: $(li).data("asin"),                   
//       title: $("h2", li).text(),                
//       price: $("span.a-color-price", li).text(),
//       rating: $("span.a-icon-alt", li).text(),
//       imageUrl: $("img.s-access-image").attr("src")
//     }));
// }

// const axios = require('axios')

// // Use the `get` method of axios with the URL of the ButterCMS documentation page as an argument
// axios.get('https://buttercms.com/docs/api/').then((response) => {
//         // `response` is an HTTP response object, whose body is contained in it's `data` attribute
        
//         // This will print the HTML source code to the console
//         console.log(response.data)
// })

const cheerio = require('cheerio')
const axios = require('axios')

axios.get('https://www.broadbandtvnews.com/news/').then((response) => {
  // Load the web page source code into a cheerio instance
  const $ = cheerio.load(response.data)

  // The pre.highlight.shell CSS selector matches all `pre` elements
  // that have both the `highlight` and `shell` class
  const urlElems = $('header.entry-header')

  // We now loop through all the elements found
  for (let i = 0; i < urlElems.length; i++) {
    // Since the URL is within the span element, we can use the find method
    // To get all span elements with the `s1` class that are contained inside the
    // pre element. We select the first such element we find (since we have seen that the first span
    // element contains the URL)
    const url_a = $(urlElems[i]).find('a.entry-title-link')[0]

    // We proceed, only if the element exists
    if (url_a) {
      // We wrap the span in `$` to create another cheerio instance of only the span
      // and use the `text` method to get only the text (ignoring the HTML)
      // of the span element
      const urlText = $(url_a).text()

      // We then print the text on to the console
      console.log(urlText)
    }
  }
})