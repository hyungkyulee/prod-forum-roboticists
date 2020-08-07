import React, { Component } from 'react'
import CreatePost from '../components/CreatePost'
import DisplayPosts from '../components/DisplayPosts'

export default class ForumStandards extends Component {
  render() {
    return (
      <div>
        <CreatePost />
        <DisplayPosts />
      </div>
    )
  }
}
