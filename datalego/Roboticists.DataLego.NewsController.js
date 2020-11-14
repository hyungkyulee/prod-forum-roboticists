'use strict';

const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// const lambda = new AWS.Lambda({
//   region: 'eu-west-1'
// });
// AWS.config.region = 'eu-west-1';
// var lambda = new AWS.Lambda();

let nf_status = 0;

const ALLOWED_ORIGINS = [
	'http://localhost:3000/bites',
	'http://localhost:3000'
];

//https://stackoverflow.com/questions/31714788/can-an-aws-lambda-function-call-another#answer-31745774
// var aws = require('aws-sdk');
// var lambda = new aws.Lambda({
//   region: 'us-west-2' //change to your region
// });

// lambda.invoke({
//   FunctionName: 'name_of_your_lambda_function',
//   Payload: JSON.stringify(event, null, 2) // pass params
// }, function(error, data) {
//   if (error) {
//     context.done('error', error);
//   }
//   if(data.Payload){
//    context.succeed(data.Payload)
//   }
// });

module.exports.getPrettyNews = async (event, context, callback) => {

  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: `${event} - from the other function`,
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // }
  const response_success = {
    statusCode: 200,
    body: JSON.stringify(
      {
        // message: results.filter(result => result.title),
        message: 'invoke is called ...',
        input: event,
      },
      null,
      2
    ),
  };

  const response_error = {
    statusCode: 400,
    body: JSON.stringify({
      message: `error-!! ${event}`
    }),
  };
  // callback(response_error, response_success)
  callback(null, { message: 'hello from another lambda', event });
  
  // console.log('Lambda B Received event:', JSON.stringify(event, null, 2));
  // context.succeed('Hello ' + event.name);


  // console.log(`> called another lambda: ${event}`)
  // const response = {
  //   statusCode: 200,
  //   headers: {
  //     'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
  //   },
  //   body: JSON.stringify(
  //     {
  //       message: `${event} - from the other function`,
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };
  // callback(null, response);
  // return response;

   // const response = {
  //   statusCode: 200,
  //   headers: {
  //     'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
  //   },
  //   body: JSON.stringify(
  //     {
  //       message: results.filter(result => result.title),
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };
}

module.exports.get = async (event, context, callback) => {
  // const url = `https://news.google.com/search?q=${event.pathParameters.filter} when:${'7d'}`
  
  // const browser = await puppeteer.launch({headless:true})
  // const page = await browser.newPage()
  // page.setViewport({ width: 1366, height: 768 })
  // page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
  // page.setRequestInterception(true)
  // page.on('request', request => {
  //   if (!request.isNavigationRequest()) {
  //     request.continue()
  //     return
  //   }
  //   const headers = request.headers()
  //   headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
  //   headers['Accept-Encoding'] = 'gzip'
  //   headers['Accept-Language'] = 'en-US,en;q=0.9,es;q=0.8'
  //   headers['Upgrade-Insecure-Requests'] = 1
  //   headers['Referer'] = 'https://www.google.com/'
  //   request.continue({ headers })
  // })
  // await page.goto(url, { waitUntil: 'networkidle2' })``
  
  // const content = await page.content()
  // context.callbackWaitsForEmptyEventLoop = false

  // const keyword = event.pathParameters.filter;
  var webPage = await scraperGoogle('bank');

  // console.log('>>> webPage : ', keyword, webPage)
  // console.log(context.get.time)

  const $ = cheerio.load(webPage)
  const imgs = $('c-wiz img')
  const articles = $('c-wiz article')
  let results = []
  let i = 0

  $(articles).each(function() {
    const hasSubArticles = $(this).siblings('div[jsname]').length
    // if (hasSubArticles && i < 2) {
    const who = $(this).find('div:last-child a').text()
    // 'Forbes'
    
    if (hasSubArticles) {
      // if(who === 'Reuters' || who === 'Economic Times' || who === 'The Guardian') {
      if(who === 'The Guardian') {
        results.push({
          "title": $(this).find('h3').text() || false,
          "subtitle": $(this).find('span').first().text() || false,
          "link": $(this).find('a').first().attr('href').replace('./', 'https://news.google.com/') || false,
          "image": $(imgs[i]).attr('src') || false,
          "source": $(this).find('div:last-child a').text() || false,
          "time": $(this).find('div:last-child time').text() || false,
          "body": ""
        })
        const subArticles = $(this).siblings('div[jsname]').find('article')
        $(subArticles).each(function() {
          results.push({
            "title": $(this).find('h4').text() || $(this).find('h4 a').text() || false,
            "subtitle": $(this).find('span').first().text() || false,
            "link": $(this).find('a').first().attr('href').replace('./', 'https://news.google.com/') || false,
            "image": $(imgs[i]).attr('src') || false,
            "source": $(this).find('div:last-child a').text() || false,
            "time": $(this).find('div:last-child time').text() || false,
            "body": ""
          })
        })
      }
    // } else if(i<2) {
    } else {
      // if(who === 'Reuters' || who === 'Economic Times' || who === 'The Guardian') {
      if(who === 'The Guardian') {
        results.push({
          "title": $(this).find('h3').text() || false,
          "subtitle": $(this).find('span').first().text() || false,
          "link": $(this).find('a').first().attr('href').replace('./', 'https://news.google.com/') || false,
          "image": $(imgs[i]).attr('src') || false,
          "source": $(this).find('div:last-child a').text() || false,
          "time": $(this).find('div:last-child time').text() || false,
          "body": ""
        })
      }
    }
    i++
  })

  // console.log('>>> results: ', results)
 
  ///// calling another lambda.
  // const params = {
  //   FunctionName: "getPrettyNews",
  //   InvocationType: "RequestResponse",
  //   Payload: "This is the Test String."
  // };

  // lambda.invoke(params, function(error, data) {
  //   if(error) {
  //     console.error(JSON.stringify(error));
  //     // return new Error(`Error message : ${JSON.stringify(error)}`);
  //   }
  //   else {
  //     console.log(`>> ${data}`)
  //   }
  // })

  const lambda = new AWS.Lambda({
    region: 'eu-west-1'
  });
  
  results.forEach(article => {
    console.log(`article : ${article.link}`)
  })

  var nbProducts=5; 
  for (let i = 1; i <= nbProducts; i++) {
    console.log('Loop nb='+i+'\n');

  // results.forEach(article => {
    const params = {
      FunctionName: 'datalego-dev-getPrettyNews', // the lambda function we are going to invoke
      // InvocationType: 'RequestResponse',
      // LogType: 'Tail',
      Payload: JSON.stringify({"jsonKey2":i})
      // Payload :'test payload'
    }

    lambda.invoke(params, async function(error, data) {
      if (error) {
        console.error(JSON.stringify(error));
        // return new Error(`Error printing messages: ${JSON.stringify(error)}`);
      } else if (data) {
        console.log(data);
        console.log(`>> payload: ${data.Payload}`)
      }
    })

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
      },
      // body: JSON.parse(data.Payload)
      body: JSON.stringify(
        {
          // message: results.filter(result => result.title),
          message: 'invoke is called ...',
          input: event,
        },
        null,
        2
      ),
    }
    callback(null, response)
  }
  // )


  /////////////////////////////

  // if (config.prettyURLs) {

    // results = await Promise.all(results.map(article => {
    //   // results = results.map(article => {
    //     return fetch(article.link).then(res => res.text()).then(data => {
    //       const _$ = cheerio.load(data)
    //       // console.log(_$)
    //       article.link = _$('c-wiz a[rel=nofollow]').attr('href')

    //       if(article.link.includes('theguardian')) {
    //         article.body = _$(this).find('.content__article-body.from-content-api.js-article__body').find('p')
    //       }
    //       // else if (article.link.includes('bbc')) {
    //       //   article.body = _$(this).find(article).first().find('.css-83cqas-RichTextContainer.e5tfeyi2').find('p')
    //       // }
    //       // else if (article.link.includes('reuters')) {
    //       //   article.body = _$(this).find(article).first().find('.Paragraph-paragraph-2Bgue.ArticleBody-para-TD_9x').find('p')
    //       // }

    //       return article
    //     })
    //   }))


  // }

  // await page.close()
  // await browser.close()

  // const origin = event.headers.origin;
  // let preheaders;

  // if(origin != null) {
  //   if (ALLOWED_ORIGINS.includes(origin)) {
  //     preheaders = {
  //       'Access-Control-Allow-Origin': origin,
  //       'Access-Control-Allow-Credentials': true,
  //     }
  //   } else {
  //     preheaders = {
  //       'Access-Control-Allow-Origin': '*',
  //     }
  //   }
  // }

  // const response = {
  //   statusCode: 200,
  //   headers: {
  //     'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
  //   },
  //   body: JSON.stringify(
  //     {
  //       message: results.filter(result => result.title),
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };

  // return response;
};

// async function scraperGoogleNews(keyword) {
//   const articles = await googleNewsScraper({
//       searchTerm: keyword,
//       prettyURLs: true,
//       timeframe: "5d"
//   })

//   console.log("articles: ", articles);
//   return articles;

// };

async function scraperGoogle(keyword) {
  // const url2 = "https://www.google.com/search?q="+encodeURIComponent(keyword);
  const encodedKeyword = encodeURIComponent(keyword);
  const url2 = `https://news.google.com/search?q=${keyword}+when:2d`;
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
};

