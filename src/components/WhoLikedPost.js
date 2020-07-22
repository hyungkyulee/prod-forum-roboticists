import React, { Component } from 'react'

class WhoLikedPost extends Component {
  
  render() {
    const allUsers = this.props.data
    return (
      allUsers.map((user) => {
        return(
          <>
          <div key={user}>
            <span style={{fontStyle:"bold", color: "gray"}}>
              {user}
            </span>
          </div>
          </>
        )
      })
    )
  }
}

export default WhoLikedPost