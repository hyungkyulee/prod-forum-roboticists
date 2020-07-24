import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="main-footer" style={{margin: 'auto 2%'}}>
        <strong>Copyright © 2019-2020 <a href="http://www.roboticists.net">Roboticists Network</a>.</strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 0.0.1
        </div>
      </footer>
    )
  }
}
