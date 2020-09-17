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

    const response = await API.get("crawlerapi", `/titles/${keyword}`, {
      'headers': { 
        'x-api-key': 'ook7dD2Cex7VnUhMAZfoS97KFmGBFipx8Jv9ZDV8',
        'Accept': '*/*'
      }
    })
    console.log("response", response)
    // .then(response => {
    //   // To do
    //   console.log(response.Value)
    //   this.setState({crawlerData : response})
    // })
    // .catch(error => {
    //   console.log("Fetch Error ~~!!!")
    // })
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
          <Item>
            <Item.Content>
              {/* <Item.Header as='a'>{post.postTitle}</Item.Header>
              <Item.Meta>
                <span>{new Date(post.createdAt).toDateString()}</span>
              </Item.Meta> */}
              <Item.Description>
                {/* <p className="post-text" dangerouslySetInnerHTML={{ __html: post.postBody }} /> */}
                { (loaded) && <p className="post-text" >{crawlerData}</p> }
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    )
  }
}
