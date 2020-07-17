import React, { Component } from 'react'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createPost } from '../graphql/mutations'

class CreatePost extends Component {
  state = {
    postOwnderId: "",
    postOwnerUsername: "",
    postTitle: "",
    postBody: ""
  }

  componentDidMount = async () => {
    await Auth.currentUserInfo()
      .then(user => {
        // console.log("Current User: ", user.attributes.email)
        // console.log("User ID: ", user.username)
        this.setState({
          postOwnerId: user.username,
          postOwnerUsername: user.attributes.email
        })
      })
  }

  handleChangePost = event => this.setState({ 
    [event.target.name] : event.target.value
  })

  handleAddPost = async event => {
    event.preventDefault()

    const input = {
      postOwnerId: this.state.postOwnerId,
      postOwnerUsername: this.state.postOwnerUsername,
      postTitle: this.state.postTitle,
      postBody: this.state.postBody,
      createdAt: new Date().toISOString()
    }

    await API.graphql(graphqlOperation(createPost, {input}))

    this.setState({ postTitle: "", postBody: ""})

  }

  render() {
    return (
      <form className="add-post" onSubmit={this.handleAddPost}>
        <input style={{fontSize: '19px'}}
          type="text" 
          name="postTitle"
          placeholder="Title"
          required 
          value={this.state.postTitle}
          onChange={this.handleChangePost} />

        <textarea 
          type="text" 
          name="postBody"
          rows="3"
          cols="40"
          placeholder="New Blog Post"
          required 
          value={this.state.postBody}
          onChange={this.handleChangePost} />

        <input className="btn" style={{fontSize: '19px'}}
          type="submit" />

      </form>
    )
  }
}

export default CreatePost