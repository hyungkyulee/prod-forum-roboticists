import { API, Auth, graphqlOperation } from 'aws-amplify'
import React, { Component } from 'react'
import { createComment } from '../graphql/mutations'

class CreateComment extends Component {
  state = {
    commentOwnerId: "",
    commentOwnerUsername: "",
    content: "",
  }

  componentWillMount = async () => {
    await Auth.currentUserInfo()
      .then(user => {
        this.setState({
          commentOwnerId: user.username,
          commentOwnerUsername: user.attributes.email
        })
      })
  }

  handleChangeContent = event => this.setState({content: event.target.value})
  handleAddComment = async event => {
    event.preventDefault()
    const input = {
      commentPostId: this.props.postId,
      commentOwnerId: this.state.commentOwnerId,
      commentOwnerUsername: this.state.commentOwnerUsername,
      content: this.state.content,
      createdAt: new Date().toISOString(), 
    }

    await API.graphql(graphqlOperation(createComment, {input}))
    this.setState({ content: ""} )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddComment}>
          <textarea
            type="text"
            name="content"
            placeholder="Add your comment ..."
            rows="3"
            cols="40"
            required
            value={this.state.content}
            onChange={this.handleChangeContent} />

          <input className="btn" style={{fontSize: '19px'}} 
            type="submit" 
            value="Add Comment" />
        </form>
      </div>
    )
  }
}

export default CreateComment