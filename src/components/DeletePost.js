import { API, graphqlOperation } from 'aws-amplify'
import React, {Component} from 'react'
import { deletePost } from '../graphql/mutations'
import { Button } from 'semantic-ui-react'

class DeletePost extends Component {

  handleDeletePost = async postId => {
    const input = { id: postId }
    await API.graphql(graphqlOperation(deletePost, {input}))
  }

  render() {
    const post = this.props.data
    return (
      <Button color='red' onClick={ () => this.handleDeletePost(post.id) }>Delete</Button>
    )
  }
}

export default DeletePost;