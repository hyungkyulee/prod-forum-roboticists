import React, { Component } from 'react'
import ContentHeader from '../components/ContentHeader'
import { Form, Item } from 'semantic-ui-react'
import Amplify, { API} from 'aws-amplify'
import awsConfig from '../aws-exports'

Amplify.configure(awsConfig);

export default class Bites extends Component {
  state = {
    keyword: "",
    loading: false,
    posts: [],
  }

  componentDidMount() {
    // let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');

    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS');

    // // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

    // fetch(sign_in, {
    //   //mode: 'no-cors',
    //   credentials: 'include',
    //   method: 'GET',
    //   headers: headers
    // })
    // .then(response => response.json())
    // .then(json => console.log(json))
    // .catch(error => console.log('Authorization failed : ' + error.message));

    // Axios.get(`https://www.google.co.uk`)
    //   .then(response => {
    //     if(response.status === 200)
    //       {
    //         const html = response.data;
    //         const $ = Cheerio.load(html);
    //         let data = [];
    //         $('#cross_rate_1 tr').each((i, elem) => {
    //             data.push({
    //               Month: $(elem).find('td#left noWrap').text()
    //             })
    //         });
    //         console.log(data);
    //       }
    //     }, (error) => console.log('err') );

    // const searchUrl = `https://www.amazon.de/s/?page=${this.state.keyword}&keywords=graphic+card`;
    // await fetch(searchUrl, {
    //   method: 'GET',
    //   headers: {
    //     "access-control-allow-origin": "*",
    //     "Content-type": "application/json; charset=UTF-8",
    //     'Access-Control-Allow-Credentials': 'true'
    //   }})
    //   .then(response => {
    //     const htmlString = response.text();     // get response text
    //     const $ = Cheerio.load(htmlString);           // parse HTML string

    //     return $("#s-results-list-atf > li")             // select result <li>s
    //     .map((_, li) => ({                      // map to an list of objects
    //       asin: $(li).data("asin"),                   
    //       title: $("h2", li).text(),                
    //       price: $("span.a-color-price", li).text(),
    //       rating: $("span.a-icon-alt", li).text(),
    //       imageUrl: $("img.s-access-image").attr("src")
    //     }));
    //   })
    //   .catch(err => {
    //     alert(err); // Failed to fetch
    //   })

  }

  handleChangeCrawlKeyword = event => this.setState({ 
    [event.target.name] : event.target.value
  })

  handleLoadTitles = async () => {
    const {keyword} = this.state

    API.get("crawlerapi", `/title?tag=${keyword}`, {
      'headers': { 'x-api-key': 'SKXsnebh087bRTVt7fknTacJVVIcK6go3CCnu8tv' }
    })
    API.get("crawlerapi", `/title?tag=${keyword}`, {})
    .then(response => {
      // To do
      console.log(response)
    })
    .catch(error => {
      console.log("Fetch Error ~~!!!")
    })
  }

  render() {
    // const contents = document.getElementById('container').value
    const {posts} = this.state

    return (
      <div className="content-wrapper">
        <ContentHeader title="Hot Topics ..." />
        <Form>
          <Form.Input 
            fluid icon='book' 
            iconPosition='left'
            label='Keyword to crawl'
            placeholder='Title'
            required
            type='text'
            name='keyword'
            value={this.state.keyword}
            onChange={this.handleChangeCrawlKeyword}
          />
          <Form.Button onClick={this.handleLoadTitles}>Load</Form.Button>
        </Form>
        <Item.Group divided>
        {
          posts.map((post, index) => {
            return (
              <Item key={index}>
                {/* <Item.Image src='https://picsum.photos/200' /> */}
                <Item.Content>
                  <Item.Header as='a'>{post.postTitle}</Item.Header>
                  {/* <Item.Meta>
                    <span>{new Date(post.createdAt).toDateString()}</span>
                  </Item.Meta>
                  <Item.Description>
                    <p className="post-text" dangerouslySetInnerHTML={{ __html: post.postBody }} />
                  </Item.Description>
                  <Item.Extra>
                    <Imagg avatar circular src='https://picsum.photos/60' />
                    <span>{ "Wrote by: " } { post.postOwnerUsername }</span>
                  </Item.Extra> */}
                </Item.Content>
              </Item>
            )
          })
        }
        </Item.Group>
      </div>
    )
  }
}
