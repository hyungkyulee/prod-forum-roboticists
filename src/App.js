import React from 'react'
import './App.css'
import DisplayPosts from './components/DisplayPosts'
import CreatePost from './components/CreatePost'
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'

function App() {

  const signOut = () => {
    Auth.signOut()
  }

  return (
    <div className="App">
      
      <button style={{alignContent:'flex-end', textAlign:'center'}} onClick={signOut}>Logout</button>
      <CreatePost />
      <DisplayPosts />


    </div>
  );
}

// export default withAuthenticator(App,
//   { includeGreetings: false})

const MyTheme = {
  googleSignInButton: { backgroundColor: "red", borderColor: "red" },
  button: { backgroundColor: "skyblue", borderColor: "gray", flex: 1, },
  signInButtonIcon: { display: "none" }
};

export default withAuthenticator(App, false, [], null, MyTheme, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
    signUpFields: [
      { label: "Name", key: "name", required: true, type: "string" }
    ]
  }
});


