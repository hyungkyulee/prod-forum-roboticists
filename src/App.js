import React from 'react'
import './App.css'
import Header from './components/Header'
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'
import Footer from './components/Footer'
import ChildSignIn from './components/ChildSignin'
import MainSideMenu from './components/MainSideMenu'
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AboutForum from './pages/AboutForum'
import Projects from './pages/Projects'
import ForumMicroctrl from './pages/ForumMicroctrl'
import ForumStandards from './pages/ForumStandards'
import ForumML from './pages/ForumML'
import ForumAI from './pages/ForumAI'
import ForumDS from './pages/ForumDS'
import ForumOpencv from './pages/ForumOpencv'
import ProjectFRDL from './pages/ProjectFRDL'
import ForumDatalego from './pages/ForumDatalego'

function App() {

  const signOut = () => {
    Auth.signOut()
  }

  return (
    <Router>
      <div>
      <Header />
      <MainSideMenu />
        <Switch>
          <Route path="/forums/standards"> <ForumStandards /> </Route>
          <Route path="/forums/datalego"> <ForumDatalego /> </Route>
          <Route path="/forums/ml"> <ForumML /> </Route>
          <Route path="/forums/ai"> <ForumAI /> </Route>
          <Route path="/forums/ds"> <ForumDS /> </Route>
          <Route path="/forums/microctrl"> <ForumMicroctrl /> </Route>
          <Route path="/forums/opencv"> <ForumOpencv /> </Route>
          <Route path="/projects/facerecog"> <ProjectFRDL /> </Route>
          <Route path="/projects/r"> <Projects /> </Route>
          <Route path="/about-forum"> <AboutForum /> </Route>
          <Route path="/"> <Home /> </Route>
        </Switch>

        {/* <button style={{alignContent:'flex-end', textAlign:'center'}} onClick={signOut}>Logout</button>
        <CreatePost />
        <DisplayPosts /> */}
        
        <Footer />
      </div>
    </Router>
 
    // <div className="App">
      
    //   <button style={{alignContent:'flex-end', textAlign:'center'}} onClick={signOut}>Logout</button>
    //   <CreatePost />
    //   <DisplayPosts />


    // </div>
  );
}

// export default withAuthenticator(App,
//   { includeGreetings: false})

export default withAuthenticator(App,
  true, [
  <ChildSignIn />,
  // <ConfirmSignIn />,
  // <ForgotPassword />,
  // <Loading />,
  // <RequireNewPassword />,
  // <VerifyContact />

],
  null,
  null
);


