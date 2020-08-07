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
          commentOwnerUsername: user.attributes.email.split('@')[0]
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
      <form action="#" method="post">
        <div class="input-group" >
          <textarea type="text" name="content" placeholder="Add your comment ..." class="form-control" 
            rows="3"
            cols="40"
            required
            value={this.state.content}
            onChange={this.handleChangeContent} />
          <span class="input-group-append" style={{width: '200px'}}>
            <button type="button" class="btn btn-primary" onClick={this.handleAddComment}>Add</button>
          </span>
        </div>
      </form>
    )
  }
}

export default CreateComment