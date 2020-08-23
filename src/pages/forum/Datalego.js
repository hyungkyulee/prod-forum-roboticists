import React, { Component } from 'react'
import CreatePost from '../../components/CreatePost'
import DisplayPosts from '../../components/DisplayPosts'
import ContentHeader from '../../components/ContentHeader'
import {
  Divider, Header, Icon,
} from 'semantic-ui-react'

export default class Datalego extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <ContentHeader title="D^t^L:go" />
        <CreatePost />
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='tag' />
            Posts listed
          </Header>
        </Divider>
        <DisplayPosts />
      </div>
    )
  }
}
