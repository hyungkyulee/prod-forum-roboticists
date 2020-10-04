import React, {Component} from 'react'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { Button, Header, Form, Modal } from 'semantic-ui-react'

import { updatePost } from '../graphql/mutations'
import { EditorState, convertToRaw, } from 'draft-js'

var stateFromHTML = require('draft-js-import-html').stateFromHTML

class EditPost extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: "",
      postOwnerId: "",
      postOwnerUsername: "",
      postTitle: this.props.data.postTitle,
      postBody: this.props.data.postBody,
      editorState:EditorState.createWithContent(stateFromHTML(this.props.data.postBody)),
    }
    this.handleModal = this.handleModal.bind(this)
  }

  componentDidMount = async () => {
    this._isMounted = true
    await Auth.currentUserInfo()
      .then(user => {
        this.setState({
          postOwnerId: user.username, 
          postOwnerUsername: user.attributes.email.split('@')[0]
        })
      })
  }

  async handleModal() {
    await this.setState({
      open: true,
      id: this.props.data.id,
      postTitle: this.props.data.postTitle,
      postBody: this.props.data.postBody,
      editorState: EditorState.createWithContent(stateFromHTML(this.props.data.postBody))
    })
  }

  handleUpdatePost = async (event) => {
    event.preventDefault()

    const input = {
      id: this.props.data.id,
      postOwnerId: this.state.postOwnerId, 
      postOwnerUsername: this.state.postOwnerUsername,
      postTitle: this.state.postData.postTitle,
      postBody: this.state.postData.postBody
    }

    await API.graphql(graphqlOperation(updatePost, {input}))

    await this.setState({open: false})
  }

  handleTitle = async (event) => {
    await this.setState({
      postData: {...this.state.postData, postTitle: event.target.value}
    })
  }

  handleChangePostBody = async (contents) => {
    await this.setState({
      postData: {...this.state.postData, postBody: contents}
    })
  }

  onEditorStateChange = async (editorState) => {

    await this.setState({ editorState })
    this.handleChangePostBody(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  /* use the angular bracket '<> </>' in order to allow to put the multiple models or divs */
  render() {
    const {open, editorState, postTitle} = this.state
    return (
      <> 
        <Modal
          centererd="true"
          onClose={() => this.setState({open: false})}
          onOpen={() => this.handleModal()}
          open={open}
          trigger={<Button>Edit</Button>}
          style={{marginLeft: '10%', marginTop: '10%'}}
        >
          <Modal.Header>Edit the post</Modal.Header>
          <Modal.Content image scrolling>
            <Form>
              <Modal.Description>
                <Header>
                  <Form.Input
                    fluid icon='book'
                    iconPosition='left'
                    label='Edit Post Title'
                    placeholder='Title'
                    required
                    type='text'
                    name='postTitle'
                    value={postTitle}
                    onChange={this.handleTitle}
                    />
                </Header>         
                <Editor
                  editorState={editorState}
                  onEditorStateChange={this.onEditorStateChange}
                  wrapperClassName="rich-editor draft-editor-wrapper"
                  editorClassName="rich-editor DraftEditor-editorContainer"
                />
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
              onClick={this.handleUpdatePost}
            />
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

export default EditPost;