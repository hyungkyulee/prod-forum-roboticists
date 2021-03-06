/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { Auth, JS } from 'aws-amplify'
import { SignIn } from "aws-amplify-react" 
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default class ChildSignin extends SignIn {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      loading: false,
    }
  }

  triggerAuthEvent(event) {
    const state = this.props.authState
    if (this.props.onAuthEvent) {
      this.props.onAuthEvent(state, event)
    }
  }

  changeState(state, data) {
    if (this.props.onStateChange) {
      this.props.onStateChange(state, data)
    }

    this.triggerAuthEvent({
      type: 'stateChange',
      data: state,
    })
  }

  handleSignIn = async (e) => {
    e.preventDefault()
    this.setState({ message: '', loading: true })

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    await Auth.signIn({
      username, // Required, the username
      password,
    })
      .then(user => {
        Auth.verifiedContact(user).then(data => {
          if (!JS.isEmpty(data.verified)) {
            this.changeState('signedIn', user)
          } else {
            user = Object.assign(user, data)
            this.changeState('verifyContact', user)
          }
        })
      })
      .catch(err => {
        this.setState({ message: err.message })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  showComponent() {
    return (
      <>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' /> Log-in to your email
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input 
                fluid icon='user' 
                iconPosition='left'
                placeholder='E-mail address'
                type='text'
                id="username"
              />

              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                id="password"
              />

              <Button color='teal' fluid size='large' onClick={this.handleSignIn}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="#" onClick={() => this.changeState('signUp')}>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
      </>
    )
  }
}