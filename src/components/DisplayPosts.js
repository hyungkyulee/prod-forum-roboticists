import React, { Component } from 'react'
import { listPosts } from '../graphql/queries'
import { onCreateComment, onCreateLike, onCreatePost, onDeletePost, onUpdatePost } from '../graphql/subscriptions'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import DeletePost from './DeletePost'
import EditPost from './EditPost'
import CreateComment from './CreateComment'
import { FaThumbsUp, FaSadTear } from 'react-icons/fa'
import DisplayComments from './DisplayComments'
import { createLike } from '../graphql/mutations'
import WhoLikedPost from './WhoLikedPost'

class DisplayPosts extends Component {

  state = {
    currentUserId: "",
    currentUsername: "",
    errorMessage: "",
    likedBy: [],
    isHovering: false,
    posts: []
  }

  componentDidMount = async () => {
    this.getPosts()

    // get/set the current signed-in user
    await Auth.currentUserInfo()
      .then(user => {
        this.setState({
          currentUserId: user.username,
          currentUsername: user.attributes.email.split('@')[0]
        })
      })

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

    this.createPostLikeListener = API.graphql(graphqlOperation(onCreateLike))
      .subscribe({
        next: postData => {
          const createdLike = postData.value.data.onCreateLike
          let posts = [...this.state.posts]
          for (let post of posts) {
            if (createdLike.post.id === post.id) {
              post.likes.items.push(createdLike)
            }
          }
          this.setState({posts})
        }
      })
  }

  componentWillUnmount() {
    this.createPostListener.unsubscribe()
    this.deletePostListener.unsubscribe()
    this.updatePostListener.unsubscribe()
    this.createPostCommentListener.unsubscribe()
    this.createPostLikeListener.unsubscribe()
  }

  getPosts = async () => {
    const result = await API.graphql(graphqlOperation(listPosts))
    // console.log("All Posts: ", JSON.stringify(result.data.listPosts))
    // console.log("All Posts: ", result.data.listPosts.items)
    
    this.setState({posts: result.data.listPosts.items})
  }

  isLikedPost = (postId) => {
    for (let post of this.state.posts) {
      if (post.id === postId) {
        if (post.postOwnerId === this.state.currentUserId) // if post owner is same as the login user, skip
          return true
        for (let item of post.likes.items) {
          if (item.likeOwnerId === this.state.currentUserId) { // if the login user did like previously, skip
            return true
          }
        }
      }
    }
    return false
  }

  handleLike = async postId => {
    if(this.isLikedPost(postId)) {
      return this.setState({errorMessage: "Can't Like your own post.."})
    }
    else {
      const input = {
        numberLikes: 1,
        likeOwnerId: this.state.currentUserId,
        likeOwnerUsername: this.state.currentUsername,
        likePostId: postId
      }

      try {
        const result = await API.graphql(graphqlOperation(createLike, {input}))
        console.log("Liked: ", result.data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  handleMouseHover = async postId => {
    this.setState({isHovering: !this.state.isHovering})
    let whoLikes = this.state.likedBy
    for(let post of this.state.posts) {
      if(post.id === postId) {
        for(let item of post.likes.items) {
          whoLikes.push(item.likeOwnerUsername)
        }
      }
      this.setState({likedBy: whoLikes})
    }

    console.log("Liked by: ", this.state.likedBy)
  }

  handleMouseHoverLeave = async () => {
    this.setState({isHovering: !this.state.isHovering})
    this.setState({likedBy: []})
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
            
            {/* <p> {post.postBody}</p> */}
            <p dangerouslySetInnerHTML={{ __html: post.postBody }} />
            <br />
            <span>
              { (post.postOwnerId === this.state.currentUserId) && 
                <DeletePost data={post} />
              }
              { (post.postOwnerId === this.state.currentUserId) && 
                <EditPost {...post} />
              }
              <span>
                <p className="alert"> {(post.postOwnerId === this.state.currentUserId) && this.state.errorMessage} </p>
                <p style={{color: (post.likes.items.length>0)? "blue" : "gray"}}
                  className="like-button"
                  onMouseEnter={ () => this.handleMouseHover(post.id)}
                  onMouseLeave={ () => this.handleMouseHoverLeave()}
                  onClick={() => this.handleLike(post.id)}>
                  <FaThumbsUp />
                  {
                    post.likes.items.length
                  }
                </p>
                {
                  this.state.isHovering &&
                    <div className="users-liked">
                      {(this.state.likedBy.length === 0) ? "liked by no one" : "liked by:" }
                      {(this.state.likedBy.length === 0) ? <FaSadTear /> : <WhoLikedPost data={this.state.likedBy} />}
                      
                    </div>
                }
              </span>
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