import React, { Component } from 'react'
import ContentHeader from '../components/ContentHeader'
import { Form, Item } from 'semantic-ui-react'
import Amplify, { API} from 'aws-amplify'
import awsConfig from '../aws-exports'

Amplify.configure(awsConfig);

export default class Bites extends Component {
  state = {
    keyword: '',
    loaded: false,
    crawlerData: ''
  }

  handleChangeCrawlKeyword = event => this.setState({ 
    [event.target.name] : event.target.value
  })

  handleLoadTitles = async () => {
    const {keyword} = this.state

    await API.get("datalego", `/scrap/news/${keyword}`, {
    // await API.get("datalego", "/msg", {
      'headers': { 
        'x-api-key': 'ook7dD2Cex7VnUhMAZfoS97KFmGBFipx8Jv9ZDV8',
        'Accept': '*/*',
      },
      // 'responseType': 'text'
    })
    .then(response => {
      // To do
      console.log(`>>> res: ${response}`)
      this.setState({
        crawlerData : response.message,
        loaded: true,
      })
      console.log(this.state.crawlerData)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    // const contents = document.getElementById('container').value
    const {crawlerData, loaded} = this.state

    return (
      <div className="content-wrapper">
        <ContentHeader title="Hot Topics" tagline="Interested articles of data science can be searched from famouse websites. Please use the keyword of title you want to search via the below box and 'load' button."/>
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
          (loaded) && crawlerData.map( (article, index) => 
            <Item key={index}>
              <Item.Content>
                <Item.Header as='a'>{article.title}</Item.Header>
                <Item.Meta>
                  <span>{article.source}</span>
                </Item.Meta>
                <Item.Meta>
                  <span>{article.link}</span>
                </Item.Meta>
                <Item.Description>
                  {
                    (article.body === '') ? article.subtitle : article.body
                  }
                </Item.Description>
              </Item.Content>
            </Item>
          )
        }
        </Item.Group>
      </div>
    )
  }
}
