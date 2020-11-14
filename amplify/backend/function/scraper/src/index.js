/* Amplify Params - DO NOT EDIT
	API_CRAWLERAPI_APIID
	API_CRAWLERAPI_APINAME
Amplify Params - DO NOT EDIT */

// var AWS = require('aws-sdk');
const fetch = require('node-fetch');
// const cheerio = require('cheerio');
const googleNewsScraper = require('google-news-scraper');
// const url = require('url');
let nf_status = 0;

exports.handler = async (event) => {

    console.log(">>> EVENT : ",event);
    const keyword = event.pathParameters.tag;
    console.log(">>> Keyword : ",keyword);
    // const webPageTags = await getPost();
    // // console.log(webPageTags);
    // const webPageTitles = await parseTitles(webPageTags, keyword);

    // const keyword = "money laundering";    
    // === Specific website scraping
    // const webPageTags = await getPost();
    // console.log(webPageTags);
    // const webPageTitles = await parseTitles(webPageTags, keyword);

    // var webPageTags = await scraperGoogle(keyword);
    var webPageTags = await scraperGoogleNews(keyword);
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
        body: JSON.stringify(titles)
        // body: webPageTitles.toString()
    };
    console.log(webPageTitles);

    return response;
};

async function scraperGoogleNews(keyword) {
    const articles = await googleNewsScraper({
        searchTerm: keyword,
        prettyURLs: true,
        timeframe: "5d"
    })

    console.log("articles: ", articles);
    return articles;
  
  }

async function scraperGoogle(keyword) {
    const url2 = "https://www.google.com/search?q="+encodeURIComponent(keyword);
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

// async function parseTitles(source, keyword) {
//     let titlesList = []; 
//     const $ = await cheerio.load(source);
//     // const elementIds = $('header.entry-header');
//     const elementIds = $('div.nDgy9d');
//     for (let i = 0; i < elementIds.length; i++) {
//         // const title = $(elementIds[i]).find('a.entry-title-link')[0];
//         const title = $(elementIds[i]).find('div.Y3v8qd')[0];
//         if(title && $(title).text().includes(keyword)) {

//             titlesList.push($(title).text());
//         }
//     }
//     return titlesList;
// }

// async function getPost() {

//     const url1 = url.parse('https://www.google.co.uk/search?biw=1471&bih=681&tbm=nws&sxsrf=ALeKk02rySLXtE59FIolxszNKOi_xCK5dw%3A1600547522193&ei=wmpmX7OsC4mE1fAPmfqg4Ag&q=bank+money+laundering&oq=bank+money&gs_l=psy-ab.3.0.0.22295.24929.0.30554.7.5.0.2.2.0.51.242.5.5.0....0...1c.1.64.psy-ab..0.7.245....0.qR5DvlODX58');
//     // const url2 = "https://www.broadbandtvnews.com/news/";

//     const paramsGet = {
//         method: "GET",
//         mode: "cors"
//     };

//     return await fetch(url1, paramsGet).then(res => {
//         nf_status = res.status;
//         return res.text();
//     });
// }

// async function sendPost() {

//     const url1 = "http://requestbin.net/r/vjv4mvvj";

//     const body = {
//         foo: "foo",
//         bar: "bar",
//         baz: "baz"      
//   };

//     const paramsPost = {
//         method: "POST",
//         mode: "cors",
//         headers: {"Content-Type":"application/json"},
//         body: JSON.stringify(body)
//     };

//     await fetch(url1, paramsPost);
// }

// const cheerio = require('cheerio')
// const axios = require('axios')

// exports.handler = async (event) => {

//     let collectorData = []
//     let response = {}
//     // fetch(url, { method: 'GET' })
//     //   .then((response) => response.json())
//     //   .then((responseJson) => {
//     //       this.setState({addressList: responseJson});
//     //       this.setState({ showAddressList: true});
//     //   })
//     //   .catch((error) => {
//     //       alert(JSON.stringify(error));
//     //       console.error(error);
//     //   })

//     axios.get('https://www.broadbandtvnews.com/news/').then((res) => {
//         console.log(res.json())
//         // Load the web page source code into a cheerio instance
//         const $ = cheerio.load(res)

//         // The pre.highlight.shell CSS selector matches all `pre` elements
//         // that have both the `highlight` and `shell` class
//         const elementIds = $('header.entry-header')

//         // We now loop through all the elements found
//         for (let i = 0; i < elementIds.length; i++) {
//             // Since the URL is within the span element, we can use the find method
//             // To get all span elements with the `s1` class that are contained inside the
//             // pre element. We select the first such element we find (since we have seen that the first span
//             // element contains the URL)
//             const chunk = $(elementIds[i]).find('a.entry-title-link')[0]

//             // We proceed, only if the element exists
//             if (chunk) {
//                 // We wrap the span in `$` to create another cheerio instance of only the span
//                 // and use the `text` method to get only the text (ignoring the HTML)
//                 // of the span element
//                 collectorData.push($(chunk).text())

//                 // We then print the text on to the console
//                 // console.log(collectorData)
//             }
//         }

//         // TODO implement
//         response = {
//             statusCode: 200,
//             // body: JSON.stringify('Hello from Lambda!'),
//             headers: {
//                 "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
//             },
//             body: JSON.stringify(collectorData),
//         };
//     })
//     //
//     return response;
// };
