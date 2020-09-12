import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ConfirmSignIn, ForgotPassword, Loading, RequireNewPassword, SignUp, VerifyContact, withAuthenticator } from 'aws-amplify-react'
import {
  Container,
} from 'semantic-ui-react'

import './App.css'
import './styles/global.scss'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import ChildSignIn from './components/ChildSignin'
import Home from './pages/Home'
import Datalego from './pages/forum/Datalego';
import ComputerVision from './pages/subject/ComputerVision';
import Microbot from './pages/forum/Microbot';
import PlayReact from './pages/subject/PlayReact';
import Bites from './pages/Bites';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';

function App() {

  return (
    <Router>
      <Container>
        <SiteHeader />
  
        <Switch>
          <Route path="/forum/datalego">
            <Datalego />
          </Route>
          <Route path="/forum/microbot">
            <Microbot />
          </Route>
          <Route path="/subject/comvision">
            <ComputerVision />
          </Route>
          <Route path="/subject/react">
            <PlayReact />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/bites">
            <Bites />
          </Route>
          <Route path="/about">
            <AboutUs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <SiteFooter />
      </Container>
    </Router>
  );
}

// export default withAuthenticator(App,
//   { includeGreetings: false})

export default withAuthenticator(App,
  true, [
  <ChildSignIn />,
  <SignUp />,
  <ConfirmSignIn />,
  <ForgotPassword />,
  <Loading />,
  <RequireNewPassword />,
  <VerifyContact />

],
  null,
  null
);


