import React, { Component } from 'react'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createPost } from '../graphql/mutations'
import { WysiwygEditor } from './WysiwygEditor'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Form } from 'semantic-ui-react'

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
          postOwnerId: user.username, // if default username is set to email, auth's username will be same as id (user.attributes.sub).
          postOwnerUsername: user.attributes.email.split('@')[0]
        })
      })
  }

  handleChangePost = event => this.setState({ 
    [event.target.name] : event.target.value
  })

  handleChangePostBody = async (contents) => {
    this.setState({postBody: contents})
    console.log("postBody: ", this.state.postBody)
  }

  handleAddPost = async event => {
    event.preventDefault()

    // input object should be aligned with the schema of mutation.js of graphql
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
      <Form>
        <Form.Input 
          fluid icon='book' 
          iconPosition='left'
          label='New Post'
          placeholder='Title'
          required
          type='text'
          name='postTitle'
          value={this.state.postTitle}
          onChange={this.handleChangePost}
        />
        <WysiwygEditor handleChangePostBody={this.handleChangePostBody} />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button onClick={this.handleAddPost}>Create a new post</Form.Button>
      </Form>
      // <section className="content">
      //   <div className="container-fluid">
      //     <div className="row">
      //       <div className="col-md-12">
      //         <form >
      //           <input className="form-control" 
      //             type="text" 
      //             name="postTitle"
      //             placeholder="Title ..."
      //             required 
      //             value={this.state.postTitle}
      //             onChange={this.handleChangePost} />

      //           <WysiwygEditor handleChangePostBody={this.handleChangePostBody} />

      //           <button type="button" className="btn btn-primary" style={{marginBottom: '20px'}}
      //             onClick={this.handleAddPost}>Write a new post</button>

      //         </form>
      //       </div>
      //     </div>
      //   </div>
      // </section>
    )
  }
}

export default CreatePost