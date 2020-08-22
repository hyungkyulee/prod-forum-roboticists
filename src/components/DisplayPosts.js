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
import { Image, Item } from 'semantic-ui-react'


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

  getPosts = async (createdAt) => {
    const queryParams = {
      createdAt,
      sortDirection: 'DESC',
    }; // not working at the moment. it will work with key setup on schema.graphql.
    const result = await API.graphql(graphqlOperation(listPosts, queryParams))
    // console.log("All Posts: ", JSON.stringify(result.data.listPosts))
    // console.log("All Posts: ", result.data.listPosts.items)
    
    // ordering by javascript
    const sortedPosts = [].concat(result.data.listPosts.items).sort((a,b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0);
    
    // console.log("org:", result.data.listPosts.items)
    // console.log("sorted:", sortedPosts)

    this.setState({posts: sortedPosts})
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
      <Item.Group divided>
      {
        posts.map((post, index) => {
          return (
            <Item key={index}>
              <Item.Image src='https://picsum.photos/200' />
              <Item.Content>
                <Item.Header as='a'>{post.postTitle}</Item.Header>
                <Item.Meta>
                  <span>{new Date(post.createdAt).toDateString()}</span>
                </Item.Meta>
                <Item.Description>
                  <p className="post-text" dangerouslySetInnerHTML={{ __html: post.postBody }} />
                </Item.Description>
                <Item.Extra>
                  <Image avatar circular src='https://picsum.photos/60' />
                  <span>{ "Wrote by: " } { post.postOwnerUsername }</span>
                </Item.Extra>
              </Item.Content>
            </Item>

            // <div key={index} className="card card-primary card-outline">
            //   <div className="card-header">
            //     <h5 className="m-0"> { post.postTitle } </h5>
            //   </div>
            //   <div className="card-body">
            //     <h6 className="card-title">
            //       <span style={{fontStyle: "italic", color: "#0ca5e29"}}>
            //         { "Wrote by: " } { post.postOwnerUsername }

            //         { " on " }
            //         <time>
            //           {" "}
            //           {new Date(post.createdAt).toDateString()}
            //         </time>
            //       </span>
            //     </h6>
            //     {/* <p> {post.postBody}</p> */}
            //     <p className="card-text" dangerouslySetInnerHTML={{ __html: post.postBody }} />
            //     <div className="attachment-block clearfix"></div>
            //     <div className="clearfix">
            //       { (post.postOwnerId === this.state.currentUserId) && 
            //         <DeletePost data={post} />
            //       }
            //       { (post.postOwnerId === this.state.currentUserId) && 
            //         <EditPost {...post} />
            //       }
            //     </div>
            //     <div className="card-text card-feedback" style={{marginBottom: '10px'}}>
            //       <p className="alert"> {(post.postOwnerId === this.state.currentUserId) && this.state.errorMessage} </p>
            //       {/* <p style={{color: (post.likes.items.length>0)? "blue" : "gray"}}
            //         className="like-button"
            //         onMouseEnter={ () => this.handleMouseHover(post.id)}
            //         onMouseLeave={ () => this.handleMouseHoverLeave()}
            //         onClick={() => this.handleLike(post.id)}>
            //         <FaThumbsUp />
            //         {
            //           post.likes.items.length
            //         }
            //       </p> */}
            //       <button type="button" className="btn btn-default btn-sm" style={{width: '80px', marginRight: '5px'}}>
            //         <i className="fas fa-share mr-2" />Share
            //       </button>
            //       <button type="button" className="btn btn-default btn-sm" style={{width: '80px'}}
            //         onClick={() => this.handleLike(post.id)}>
            //         <i className="fas fa-thumbs-up mr-2" />Like
            //       </button>
            //       <span className="float-right text-mute">
            //         {/* {post.comments.items.length} comments */}
            //       </span>
            //       {/* {
            //         this.state.isHovering &&
            //           <p className="card-text">
            //             {(this.state.likedBy.length === 0) ? "liked by no one" : "liked by:" }
            //             {(this.state.likedBy.length === 0) ? <FaSadTear /> : <WhoLikedPost data={this.state.likedBy} />}
            //           </p>
            //       } */}
            //     </div>
                  
            //     <div className="card-footer card-comments">
            //       <CreateComment postId={post.id} />
            //       {/* {
            //         post.comments.items.length > 0 && 
            //         <h6 className="card-title" style={{marginBottom: '10px'}}>
                      
            //         </h6>
            //       } */}
            //       {
            //         post.comments.items.map((comment, index) => <DisplayComments key={index} commentData={comment} />)
            //       }
            //     </div>
            //   </div>
            // </div>
          )
        })
      }
      </Item.Group>
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