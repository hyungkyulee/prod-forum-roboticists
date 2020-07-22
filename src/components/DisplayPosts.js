import React, { Component } from 'react'
import { listPosts } from '../graphql/queries'
import { onCreateComment, onCreatePost, onDeletePost, onUpdatePost } from '../graphql/subscriptions'
import { API, graphqlOperation } from 'aws-amplify'
import DeletePost from './DeletePost'
import EditPost from './EditPost'
import CreateComment from './CreateComment'
import { FaBeer } from 'react-icons/fa'
import DisplayComments from './DisplayComments'

class DisplayPosts extends Component {

  state = {
    posts: []
  }

  componentDidMount = async () => {
    this.getPosts()

    // subscription of graphql - king of broadcasting solution but very expensive method.
    this.createPostListener = API.graphql(graphqlOperation(onCreatePost))
      .subscribe({                                                                  // 1) createPost event triggered
        next: postData => {
          const newPost = postData.value.data.onCreatePost                          // 2) get new post created right now
          const prevPosts = this.state.posts.filter(post => post.id !== newPost.id) // 3) get the current set of posts
          const updatedPosts = [newPost, ...prevPosts]                              // 4) concatenate the new post to the current set of posts

          this.setState({ posts: updatedPosts })                                    // 5) update the current set of posts in state machine
        }
      })
    
    this.deletePostListener = API.graphql(graphqlOperation(onDeletePost))
      .subscribe({
        next: postData => {
          const deletedPost = postData.value.data.onDeletePost
          const updatedPosts = this.state.posts.filter(post => post.id !== deletedPost.id)
          this.setState({posts : updatedPosts})
        }
      })

    this.updatePostListener = API.graphql(graphqlOperation(onUpdatePost))
      .subscribe({
        next: postData => {
          const {posts} = this.state
          const updatePost = postData.value.data.onUpdatePost
          const index = posts.findIndex(post => post.id === updatePost.id)
          const updatePosts = [...posts.slice(0, index), updatePost, ...posts.slice(index+1)]

          this.setState({posts: updatePosts})
        }
      })

    this.createPostCommentListener = API.graphql(graphqlOperation(onCreateComment))
      .subscribe({
        next: commentData => {
          const createdComment = commentData.value.data.onCreateComment // same comment id as post id
          let posts = [ ...this.state.posts ]

          for (let post of posts ) {
            if (createdComment.post.id === post.id) {   // find out the post having this comment
              post.comments.items.push(createdComment)
            }
          }
          this.setState({ posts })
        }
      })
  }

  componentWillUnmount() {
    this.createPostListener.unsubscribe()
    this.deletePostListener.unsubscribe()
    this.updatePostListener.unsubscribe()
    this.createPostCommentListener.unsubscribe()
  }

  getPosts = async () => {
    const result = await API.graphql(graphqlOperation(listPosts))
    // console.log("All Posts: ", JSON.stringify(result.data.listPosts))
    // console.log("All Posts: ", result.data.listPosts.items)
    
    this.setState({posts: result.data.listPosts.items})
  }

  render() {
    const { posts } = this.state

    return (
      posts.map((post) => {
        return (
          <div className='posts' style={rowStyle} key={post.id}>
            <h1> { post.postTitle } </h1>
            <span style={{fontStyle: "italic", color: "#0ca5e29"}}>
              { "Wrote by: " } { post.postOwnerUsername }

              { " on " }
              <time>
                {" "}
                {new Date(post.createdAt).toDateString()}
              </time>
            </span>
            <p> {post.postBody}</p>
            <br />
            <span>
              <DeletePost data={post} />
              <EditPost {...post} />
            </span>
            <span>
              <CreateComment postId={post.id} />
              {
                post.comments.items.length > 0 && 
                <span style={{fontSize: '19px', color: 'gray'}}>
                  Comments: 
                </span>
              }
              {
                post.comments.items.map((comment, index) => <DisplayComments key={index} commentData={comment} />)
              }
            </span>
          </div>
        )
      })
      
    )
  }
}

const rowStyle = {
  background: '#f4f4f4',
  padding: '10px',
  border: '1px #ccc dotted',
  margin: '14px'
}

export default DisplayPosts