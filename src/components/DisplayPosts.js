import React, { Component } from 'react'
import { listPosts } from '../graphql/queries'
import { onCreatePost } from '../graphql/subscriptions'
import { API, graphqlOperation } from 'aws-amplify'
import DeletePost from './DeletePost'
import EditPost from './EditPost'

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

          this.setState({ posts: updatedPosts })                                      // 5) update the current set of posts in state machine
        }
      })
  }

  componentWillUnmount() {
    this.createPostListener.unsubscribe()
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
            <DeletePost data={post} />
            <EditPost />
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