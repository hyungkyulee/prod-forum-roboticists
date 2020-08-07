import React, { Component } from 'react'

export default class ContentHeader extends Component {
  render() {
    const { title } = this.props

    return (
      <>
        <section className="content-header"> {/* Content Header (Page header) */}
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>{title}</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">{title}</li>
                  </ol>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>
      </>
    )
  }
}
