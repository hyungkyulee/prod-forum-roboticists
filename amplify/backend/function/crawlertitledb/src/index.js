var AWS = require('aws-sdk');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
let nf_status = 0;

exports.handler = async (event) => {

    console.log(">>> EVENT : ",event);
    const keyword = event.pathParameters.tag;
    console.log(">>> Keyword : ",keyword);
    const webPageTags = await getPost();
    // console.log(webPageTags);
    const webPageTitles = await parseTitles(webPageTags, keyword);
    
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
    console.log(webPageTitles);

    return response;
};

async function parseTitles(source, keyword) {
    let titlesList = []; 
    const $ = await cheerio.load(source);
    const elementIds = $('header.entry-header');
    for (let i = 0; i < elementIds.length; i++) {
        const title = $(elementIds[i]).find('a.entry-title-link')[0];
        if(title && $(title).text().includes(keyword)) {

            titlesList.push($(title).text());
        }
    }
    return titlesList;
}

async function getPost() {

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
