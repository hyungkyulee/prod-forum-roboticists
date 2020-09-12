import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react'

export default class ContentHeader extends Component {

  render() {
    const {mobile, title} = this.props
    return (
      <Container text>
        <Header
          as='h1'
          content={title}
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em',
          }}
        />
        <Header
          as='h2'
          content='Do whatever you want when you want to.'
          style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em',
          }}
        />
        <Button primary size='huge'>
          Get Started
          <Icon name='right arrow' />
        </Button>
      </Container>
    )
  }
}

ContentHeader.propTypes = {
  mobile: PropTypes.bool,
  title: PropTypes.string,

}