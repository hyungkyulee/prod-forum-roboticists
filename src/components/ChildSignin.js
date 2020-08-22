import React from "react"
import { Auth, JS } from 'aws-amplify'
import { SignIn } from "aws-amplify-react" 
import { FaRegIdBadge } from "react-icons/fa"
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
            New to us? <a href='#'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
      
      // <div className="login-page">

      // <div className="login-box" style={{backgroundColor: 'transparent'}}>
      //   <div className="login-logo" style={{backgroundColor: 'rgba(0,119,246,0.5', color: '#ffffff'}}>
      //     <a style={{color: '#ffffff'}} href="/"><b><b>Roboticists</b></b> Network</a>
      //   </div>
      //   <div className="card">
      //     <div className="card-body login-card-body">
      //       <p className="login-box-msg">Sign in to step forwards</p>

      //       <form onSubmit={this.signIn}>
      //         <div className="input-group mb-3">
      //           <input
      //             type="text"
      //             id="username"
      //             className="form-control"
      //             placeholder="User Id..."
      //             name="Username"
      //             style={{marginTop:'0px'}}
      //           />
      //           <div className="input-group-append">
      //             <div className="input-group-text">
      //               <span className="fas fa-envelope"></span>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="input-group mb-3">
      //           <input
      //             type="password"
      //             id="password"
      //             placeholder="Password..."
      //             className="form-control"
      //             name="Password"
      //           />
      //           <div className="input-group-append">
      //             <div className="input-group-text">
      //               <span className="fas fa-lock"></span>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="row">
      //           <div className="col-8">
      //           </div>
      //           <div className="col-4">
      //             <button
      //               type="submit"
      //               className="btn btn-primary btn-block">
      //               Sign in
      //             </button>

      //           </div>
      //         </div>
      //       </form>

      //     </div>
      //   </div>
      // </div>

      // </div>
    )
  }
}