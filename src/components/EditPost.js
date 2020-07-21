import { API, Auth, graphqlOperation } from 'aws-amplify'
import React, {Component} from 'react'
import { updatePost } from '../graphql/mutations'

class EditPost extends Component {
  state = {
    show: false,
    id: "",
    postOwnerId: "",
    postOwnerUsername: "",
    postTitle: "",
    postBody: "",
    postData: {
      postTitle: this.props.postTitle,
      postBody: this.props.postBody
    }
  }

  handleModal = () => {
    this.setState({show: !this.state.show}) // toggle the modal box
    document.body.scrollTop = 0 // display the modal box on the top layer
    document.documentElement.scrollTop = 0 // display the modal box on the top layer
  }

  handleUpdatePost = async (event) => {
    event.preventDefault()

    const input = {
      id: this.props.id,
      postOwnerId: this.state.postOwnerId, 
      postOwnerUsername: this.state.postOwnerUsername,
      postTitle: this.state.postData.postTitle,
      postBody: this.state.postData.postBody
    }

    await API.graphql(graphqlOperation(updatePost, {input}))

    // close modal box
    this.setState({show: !this.state.show})
  }

  handleTitle = event => {
    this.setState({
      postData: {...this.state.postData, postTitle: event.target.value}
    })
  }

  handleBody = event => {
    this.setState({
      postData: {...this.state.postData, postBody: event.target.value}
    })
  }

  componentWillMount = async () => {
    await Auth.currentUserInfo()
      .then(user => {
        this.setState({
          postOwnerId: user.username, 
          postOwnerUsername: user.attributes.email
        })
      })
  }

  /* use the angular bracket '<> </>' in order to allow to put the multiple models or divs */
  render() {
    return (
      <> 
      {
        this.state.show && (
          <div className="model">
            <button className="close" onClick={this.handleModal}>X</button>
            <form className="add-post" onSubmit={(event) => this.handleUpdatePost(event)}>
              <input style={{fontSize: "19px"}} 
                type="text" 
                name="postTitle"
                placeHolder="Title"
                value={this.state.postData.postTitle}
                onChange={this.handleTitle} />

              <input style={{height: "150px", fontSize: "19px"}} 
                type="text" 
                name="postBody"
                placeHolder="Title"
                value={this.state.postData.postBody}
                onChange={this.handleBody} />
              
              <button>Update</button>
            </form>
          </div>
        )
      }
      <button onClick={this.handleModal}>Edit</button>
      </>
    )
  }
}

export default EditPost;