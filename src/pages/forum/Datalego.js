import React, { Component } from 'react'
import CreatePost from '../../components/CreatePost'
import DisplayPosts from '../../components/DisplayPosts'
import ContentHeader from '../../components/ContentHeader'

export default class Datalego extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <ContentHeader title="DataL:go" />
        <CreatePost />

        <section className="content-header" style={{paddingBottom: '0px'}}>
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h4>Forum Articles</h4>
              </div>
            </div>
          </div>
        </section>
        <DisplayPosts />
      </div>
    )
  }
}
