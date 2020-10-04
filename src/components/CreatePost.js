import React, { Component } from 'react'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createPost } from '../graphql/mutations'
import WysiwygEditor from './WysiwygEditor'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Button, Header, Form, Modal } from 'semantic-ui-react'

class CreatePost extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      postOwnderId: "",
      postOwnerUsername: "",
      postTitle: "",
      postBody: "",
    }
  }

  componentDidMount = async () => {
    this._isMounted = true
    await Auth.currentUserInfo()
      .then(user => {
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
    await this.setState({postBody: contents})
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

    await this.setState({ 
      postTitle: "", 
      postBody: "",
      open: false,
    })

  }

  render() {
    const { open } = this.state
    return (
      <Modal
        centererd="true"
        onClose={() => this.setState({open: false})}
        onOpen={() => this.setState({open: true})}
        open={open}
        trigger={<Button style={{background: 'rgba(0,181,173,1)', color: '#FFF'}}>Write New</Button>}
        style={{marginLeft: '10%', marginTop: '10%'}}
      >
        <Modal.Header>Creat a new post</Modal.Header>
        <Modal.Content image scrolling>
          <Form>
            <Modal.Description>
              <Header>
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
              </Header>
              <WysiwygEditor handleChangePostBody={this.handleChangePostBody} />
            </Modal.Description>
            <Form.Checkbox label='I agree to the Terms and Conditions' />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='grey' onClick={() => this.setState({open: false})}>Cancel</Button>
          <Button
            style={{background: 'rgba(0,181,173,0.7)', color: '#FFF'}}
            content='Add New'
            labelPosition='right'
            icon='checkmark'
            onClick={this.handleAddPost}
          />
        </Modal.Actions>
      
      </Modal>
    )
  }
}

export default CreatePost