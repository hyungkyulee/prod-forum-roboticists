import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Header} from 'semantic-ui-react'

export default class ContentHeader extends Component {

  render() {
    const {mobile, title, tagline} = this.props
    return (
      <>
        <Header
          as='h2'
          content={title}
          style={{
            fontSize: mobile ? '1.5em' : '2.5em',
            fontWeight: 500,
            color: '#747474',
            marginBottom: 0,
            marginTop: mobile ? '0.3em' : '0.5em',
          }}
        />
        <Header
          as='h3'
          content={tagline}
          style={{
            fontSize: mobile ? '1em' : '1.7em',
            fontWeight: 300,
            color: '#00b5ad',
            marginTop: mobile ? '0.3em' : '0.5em',
            marginBottom: mobile ? '1em' : '2em',
          }}
        />
      </>
    )
  }
}

ContentHeader.propTypes = {
  mobile: PropTypes.bool,
  title: PropTypes.string,

}