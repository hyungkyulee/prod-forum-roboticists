// var Crawler = require("js-crawler").default;

// new Crawler().configure({depth: 3})
//   .crawl("http://www.google.com", function onSuccess(page) {
//     console.log(page.url);
//   });

console.log('hello');

const { Logger } = require('aws-amplify');
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
// const axios = require('axios')
const fetch = require("node-fetch")
const url = require('url');
let nf_status = 0;

async function getPost() {

  // const url1 = url.parse('https://www.google.co.uk/search?biw=1471&bih=681&tbm=nws&sxsrf=ALeKk02rySLXtE59FIolxszNKOi_xCK5dw%3A1600547522193&ei=wmpmX7OsC4mE1fAPmfqg4Ag&q=bank+money+laundering&oq=bank+money&gs_l=psy-ab.3.0.0.22295.24929.0.30554.7.5.0.2.2.0.51.242.5.5.0....0...1c.1.64.psy-ab..0.7.245....0.qR5DvlODX58');
  const url2 = "https://www.broadbandtvnews.com/news/";

  const paramsGet = {
      method: "GET",
      mode: "cors"
  };

  return await fetch(url2, paramsGet).then(res => {
      nf_status = res.status;
      return res.text();
  });
}

async function parseTitles(source, keyword) {
  let titlesList = []; 
  const $ = await cheerio.load(source);
  const elementIds = $('header.entry-header');
  // const elementIds = $('div.nDgy9d');
  for (let i = 0; i < elementIds.length; i++) {
      const title = $(elementIds[i]).find('a.entry-title-link')[0];
      // const title = $(elementIds[i]).find('div.Y3v8qd')[0];
      if(title && $(title).text().includes(keyword)) {

          titlesList.push($(title).text());
      }
  }
  return titlesList;
}

async function scraperGoogle(keyword) {
  const url2 = "https://www.google.co.uk/search?q="+encodeURIComponent(keyword);
  // const url2 = "https://www.google.co.uk/search?biw=1471&bih=681&tbm=nws&sxsrf=ALeKk02rySLXtE59FIolxszNKOi_xCK5dw%3A1600547522193&ei=wmpmX7OsC4mE1fAPmfqg4Ag&q=bank+money+laundering&oq=bank+money&gs_l=psy-ab.3.0.0.22295.24929.0.30554.7.5.0.2.2.0.51.242.5.5.0....0...1c.1.64.psy-ab..0.7.245....0.qR5DvlODX58";

  console.log(url2);
  const paramsGet = {
      method: "GET",
      mode: "cors",
      headers: {'Content-Type':'application/x-www-form-url-encoded', 'Accept': 'application/json'}
  };

  return await fetch(url2, paramsGet).then(res => {
      nf_status = res.status;
      // return res.text().then(function(text) {
      //   var parser = new DOMParser();
      //   var doc = parser.parseFromString(text, 'text/html');
      //   var div = doc.querySelector('div');
      //   console.log(div);
      // });
      // return res.arrayBuffer().then(function(buffer) {
      //   let decoder = new TextDecoder("iso-8859-1");
      //   let text = decoder.decode(buffer);
      //   return handleText(text);
      // })
      return res.text();
  });
}

module.exports.main = async function () {
  const keyword = "money laundering";

  console.log(">>> START ==========>");
  console.log(">>> Keyword : ",keyword);
  
  // === Specific website scraping
  // const webPageTags = await getPost();
  // console.log(webPageTags);
  // const webPageTitles = await parseTitles(webPageTags, keyword);

  var webPageTags = await scraperGoogle(keyword);
  // console.log(webPageTags);

  var titleExp = /<div class=\"BNeawe s3v9rd AP7Wnd([\s\S]*?)<\/div>/gi;
  // console.log(titleExp);

  // var webPageTitles = webPageTags.match(/<div class=\"BNeawe([\s\S]*?)<\/div>/gi);
  var webPageTitles = webPageTags.match(titleExp);
  console.log(webPageTitles);

  for(var i in webPageTitles) {
    var titles = webPageTitles[i].replace(/(^\s+)|(\s+$)/g, "").replace(/<\/?[^>]+>/gi, "");
    console.log(titles);
  }


  const response = {
      statusCode: nf_status,
      headers: {
          "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(webPageTitles)
      // body: webPageTitles.toString()
  };
  // console.log(webPageTitles);
}

// function status(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return Promise.resolve(response)
//   } else {
//     return Promise.reject(new Error(response.statusText))
//   }
// }

// function json(response) {
//   return response.json()
// }

// fetch("https://www.broadbandtvnews.com/news/")
//   .then(status)
//   .then(json)
//   .then(function(data) {
//     console.log('Request succeeded with JSON response', data);
//   }).catch(function(error) {
//     console.log('Request failed', error);
//   });
// axios.get('https://www.broadbandtvnews.com/news/').then((res) => {
    // fetch('https://www.broadbandtvnews.com/news/', {method: 'GET'})
    //   .then((res) => res.json())
    //   .then(data => {
    //     console.log(data)
    //     // Load the web page source code into a cheerio instance
        // const $ = cheerio.load(data)

        // // The pre.highlight.shell CSS selector matches all `pre` elements
        // // that have both the `highlight` and `shell` class
        // const elementIds = $('header.entry-header')

        // // We now loop through all the elements found
        // for (let i = 0; i < elementIds.length; i++) {
        //     // Since the URL is within the span element, we can use the find method
        //     // To get all span elements with the `s1` class that are contained inside the
        //     // pre element. We select the first such element we find (since we have seen that the first span
        //     // element contains the URL)
        //     const chunk = $(elementIds[i]).find('a.entry-title-link')[0]

        //     // We proceed, only if the element exists
        //     if (chunk) {
        //         // We wrap the span in `$` to create another cheerio instance of only the span
        //         // and use the `text` method to get only the text (ignoring the HTML)
        //         // of the span element
        //         collectorData.push($(chunk).text())

        //         // We then print the text on to the console
        //         // console.log(collectorData)
        //     }
        // }
        // console.log(collectorData)
      // })
   
    // console.log(collectorData.map)