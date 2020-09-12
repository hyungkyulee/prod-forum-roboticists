const cheerio = require('cheerio')
const axios = require('axios')

exports.handler = async (event) => {

    // fetch(url, { method: 'GET' })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //       this.setState({addressList: responseJson});
    //       this.setState({ showAddressList: true});
    //   })
    //   .catch((error) => {
    //       alert(JSON.stringify(error));
    //       console.error(error);
    //   })

    axios.get('https://www.broadbandtvnews.com/news/').then((res) => {
    // Load the web page source code into a cheerio instance
    const $ = cheerio.load(res.data)

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

    // TODO implement
    const response = {
        statusCode: 200,
        // body: JSON.stringify('Hello from Lambda!'),
        headers: {
            "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('urlText'),
    };
    return response;
};
