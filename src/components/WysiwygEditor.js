import React, { Component } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { WysiwygPreviewModal } from './WysiwygPreviewModal'
import SuggestionsTag from './SuggestionsTag'
import '../styles/global.scss'

const getHtml = editorState =>   draftToHtml(convertToRaw(editorState.getCurrentContent())); //At the top of the class component

class WysiwygEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      autocompleteState: null
    }
  }

  getTriggerRange = (trigger) => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    const text = range.startContainer.textContent.substring(0, range.startOffset);
    if (/s+$/.test(text)) return null;
    const index = text.lastIndexOf(trigger);
    if (index === -1) return null;
  
    return {
      text: text.substring(index),
      start: index,
      end: range.startOffset,
    };
  };

  onEditorStateChange = editorState => {
    this.setState({ editorState })
    // this.props.handleChangePostBody(this.state.editorState.getCurrentContent())
    // const contentState = this.state.editorState.getCurrentContent();
    // const raw = convertToRaw(contentState);
    // console.log("current Content: ", JSON.stringify(raw))
    // console.log("current Content: ", raw)
    // console.log(getHtml(editorState))
    this.props.handleChangePostBody(getHtml(editorState))
  }

  /* cannot do both with onEditorStateChange */
  onChange = (editorState) => {
    this.setState({editorState}, () => {
      const triggerRange = this.getTriggerRange('#')
      if (!triggerRange) {
          this.setState({ autocompleteState: null })
          return
      }

      this.setState({
          autocompleteState: {
              searchText: triggerRange.text.slice(1, triggerRange.text.length),
          },
      })
    })
  }

  render() {
    const { editorState, autocompleteState } = this.state
    return (
      <>
        <Editor 
          editorState={editorState}
          wrapperClassName="rich-editor draft-editor-wrapper"
          editorClassName="rich-editor DraftEditor-editorContainer"
          onEditorStateChange={this.onEditorStateChange}
          // onChange={this.onChange}
          placeholder="The message goes here..." />

        {/* <h4>HTML Log for testing</h4>
        <div className="html-view">
          {getHtml(editorState)}
        </div> */}
        {/* <button className="btn btn-success" data-toggle="modal" data-target="#WysiwygPreviewModal">
          Preview message
        </button> */}
        <SuggestionsTag
          autocompleteState={autocompleteState}
        />
        {/* <WysiwygPreviewModal output={getHtml(editorState)} /> */}
      </>
    );
  } 
}

export { WysiwygEditor };