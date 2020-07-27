import React from "react"
import { Auth, JS } from 'aws-amplify'
import { SignIn } from "aws-amplify-react" 
import '../../node_modules/admin-lte/plugins/fontawesome-free/css/all.min.css'
import '../../node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import '../../node_modules/admin-lte/dist/css/adminlte.min.css'
import { FaRegIdBadge } from "react-icons/fa"
// import '../../node_modules/admin-lte/plugins/jquery/jquery.min.js'
// import '../../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js'
// import '../../node_modules/admin-lte/dist/js/adminlte.min.js'

export default class ChildSignin extends SignIn {
  constructor(props) {
    super(props)

    this.signIn = this.signIn.bind(this)
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

  signIn(e) {
    e.preventDefault()
    this.setState({ message: '', loading: true })

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    Auth.signIn({
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
      <div className="login-page">

      <div class="login-box" style={{backgroundColor: 'transparent'}}>
        <div class="login-logo" style={{backgroundColor: 'rgba(0,119,246,0.5', color: '#ffffff'}}>
          <a style={{color: '#ffffff'}} href="/"><b><b>Roboticists</b></b> Network</a>
        </div>
        <div class="card">
          <div class="card-body login-card-body">
            <p class="login-box-msg">Sign in to step forwards</p>

            <form onSubmit={this.signIn}>
              <div class="input-group mb-3">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="User Id..."
                  name="Username"
                  style={{marginTop:'0px'}}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input
                  type="password"
                  id="password"
                  placeholder="Password..."
                  className="form-control"
                  name="Password"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-8">
                </div>
                <div class="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block">
                    Sign in
                  </button>

                </div>
              </div>
            </form>

            {/* {this.state.loading && Loading()} */}
          </div>
        </div>
      </div>

      </div>
    )
  }
}