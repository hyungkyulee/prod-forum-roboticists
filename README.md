# roboticists.net
Forum of Roboticists

## Dev Environment


### Setup AWS Amplify
(souce : https://aws.amazon.com/blogs/startups/building-your-app-from-idea-to-mvp-part-2/)

1) install Amplify CLI
```
$ npm install -g @aws-amplify/cli
```

2) Create a new IAM user and set the new credential
(* if you're going to use the existing credential, you don't need to do this step.)
```
$ amplify configure
Follow these steps to set up access to your AWS account:

Sign in to your AWS administrator account:
https://console.aws.amazon.com/
Press Enter to continue

Specify the AWS Region
? region:  eu-west-1
Specify the username of the new IAM user:
? user name:  ******
Complete the user creation using the AWS console
https://console.aws.amazon.com/iam/home?region=undefined#/users$new?step=final&accessKey&userNames=jinyus&permissionType=policies&policies=arn:aws:iam::aws:policy%2FAdministratorAccess
Press Enter to continue

Enter the access key of the newly created user:
? accessKeyId:  ********************
? secretAccessKey:  ****************************************
This would update/create the AWS Profile in your local machine
? Profile Name:  dintentdev
```

3) Create a new amplify project
(* When you run this command line, you have to login the same user as the credential of aws configure file)
```
$ amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project roboticists
? Enter a name for the environment prod
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: public
? Build Command:  gatsby build
? Start Command: npm run start
Using default provider  awscloudformation

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use dintentdev
Adding backend environment prod to AWS Amplify Console app: ******
⠧ Initializing project in the cloud...

:

$ amplify env list

| Environments |
| ------------ |
| *prod        |

```
When prompted for an AWS profile, choose the profile you created in the configuration step.

4) install Amplify NPM package
This will be used for react programming after deployment of Amplyfy API, Auth, Storage, etc.
```
$ npm i aws-amplify aws-amplify-react
```

#### API/Database
we need to create is an API and a database to store our data. This API needs to allow both authenticated and unauthenticated access.
Authenticated Admin users should be able to create and update items in the database while unauthenticated access will allow us to query the API at build time to fetch the data needed for the application.

1) To allow this, we’ll create an AWS AppSync GraphQL API & Amazon DynamoDB NoSQL database using the CLI:
```
$ amplify add api
? Please select from one of the below mentioned services: GraphQL
? Provide API name: roboticists
? Choose the default authorization type for the API API key
? Enter a description for the API key: 
? After how many days from now the API key should expire (1-365): 100
? Do you want to configure advanced settings for the GraphQL API Yes, I want to make some additional changes.
? Configure additional auth types? No
? Configure conflict detection? No
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: Single object with fields (e.g., “Todo” with ID, name, description) --> we can change/edit it later.
? Do you want to edit the schema now? Yes
Please edit the file in your editor: /Users/albert/_proj/roboticists/prod-forum-roboticists/amplify/backend/api/roboticists/schema.graphql
? Press enter to continue (see below regardng how to edit the schema.graphql file)

:
:

GraphQL schema compiled successfully.
```

2) change the schema.graphql for blog schema.
```
type Post @model{ 
   id: ID!
   postOwnerId: String!
   postOwnerUsername: String!
   postTitle: String!
   postBody: String!
   createdAt: String
   comments: [Comment] @connection(name: "PostComments") #relationship with comment, and it's array type
   likes: [Like] @connection(name: "PostLikes") #relationship with like, and it's array type
}

type Comment @model {
   id: ID!
   commentOwnerId: String!
   commentOwnerUsername: String!
   post: Post @connection(name: "PostComments")
   content: String!
   createdAt: String!
}
 
type Like @model {
   id: ID!
   numberLikes: Int!
   likeOwnerId: String!
   likeOwnerUsername: String!
   post: Post @connection(name: "PostLikes")
}
```

3) Deploy the change (API/Graphql) of amplify
```
$ amplify push
✔ Successfully pulled backend environment prod from the cloud.

Current Environment: prod

| Category | Resource name | Operation | Provider plugin   |
| -------- | ------------- | --------- | ----------------- |
| Api      | roboticists   | Create    | awscloudformation |
? Are you sure you want to continue? Yes

The following types do not have '@auth' enabled. Consider using @auth with @model
         - Post
         - Comment
         - Like
Learn more about @auth here: https://docs.amplify.aws/cli/graphql-transformer/directives#auth


GraphQL schema compiled successfully.

Edit your schema at /Users/albert/_proj/roboticists/prod-forum-roboticists/amplify/backend/api/roboticists/schema.graphql or place .graphql files in a directory at /Users/albert/_proj/roboticists/prod-forum-roboticists/amplify/backend/api/roboticists/schema
? Do you want to generate code for your newly created GraphQL API Yes
? Choose the code generation language target javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions src/graphql/**/*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2
:
:
:
:

✔ Generated GraphQL operations successfully and saved at src/graphql
✔ All resources are updated in the cloud

GraphQL endpoint: https://******.appsync-api.eu-west-1.amazonaws.com/graphql
GraphQL API KEY: da2-*************************
```
(* endpoint and API Key can be referred at [project]/src/aws-exports.js

4) Launch AWS to test Graphql api on Appsync
```
$ amplify console api
? Please select from one of the below mentioned services: GraphQL
```
   - Schema : we can see the javascript schema code created by 'schema.graphql' file from amplify cli
   - Data Source : DynamoDB Talbes linked with each model from 'schema.graphql' file
   - Queries : we can test graphql queries
     - Example (Add Post)
     ```
     mutation addPost {
      createPost(input: {
        postBody: "First post"
        postTitle: "First post"
        postOwnerId: "899sdde"
        postOwnerUsername: "HelloWorld"
      }) {
        id
        postBody
        postTitle
      }
     }
     ```
     
     result
     ```
     {
      "data": {
      "createPost": {
      "id": "1ee37297-d37b-4a0d-abd1-8949090e9e89",
      "postBody": "First post",
      "postTitle": "First post"
       }
      } 
     }
     ```
Now that we have the base project set up, let’s also go ahead and install the AWS Amplify client library:

5) programme the code 


#### Authentication
complete the authentication setup for this app will need to accomplish the following things:
Enable users to sign up and sign in
```
$ amplify add auth
Scanning for plugins...
Plugin scan successful
Using service: Cognito, provided by: awscloudformation
 
 The current configured provider is Amazon Cognito. 
 
 Do you want to use the default authentication and security configuration? Default configuration
 Warning: you will not be able to edit these selections. 
 How do you want users to be able to sign in? Email
 Do you want to configure advanced settings? No, I am done.
Successfully added resource roboticistsc2cce626 locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

$ amplify push
```

#### Storage
create the image storage service using Amazon S3:
```
$ amplify add storage
? Please select from one of the below mentioned services: Content (Images, audio
, video, etc.)
? Please provide a friendly name for your resource that will be used to label th
is category in the project: ***
? Please provide bucket name: ***
? Who should have access: Auth and guest users
? What kind of access do you want for Authenticated users? create/update, read, 
delete
? What kind of access do you want for Guest users? read
? Do you want to add a Lambda Trigger for your S3 Bucket? No
```


### AWS Appsync
API key renew

AWS -> service -> Appsync -> settings -> Configuration -> create the new API key -> copy it and update it into 'aws-expoerts.js'
```
:
"aws_appsync_apiKey": "da2-*************",
:
```

### AWS deployment 
#### Amplify Console
AWS -> service -> AWS Amplify -> Github

1) Step 1 - Add repository branch 
   - select the relevant repository from the github
2) Step 2 - Configure build settings
   - select the amplify backend environment
   - select the service role
3) Step 3 - Review
   - save and deploy

#### S3
amplify hosting add
configure the http or https, project name, etc.
amplify publish -> Y


### React Packages

#### react-icons
```
$ npm install react-icons --save
```

#### draft-js wysiwyg
1) install the package of draftjs and react-draft-wysiwyg
```
npm install -S draft-js react-draft-wysiwyg
```

2) install the conversion package from draftjs to html
```
npm install draftjs-to-html
```

3) link the bootstrap (update public/index.html)
```
 <!-- 
      Added the cdn link 
    -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    
:

<!-- Ensure the scripts below are put in this very order -->
     <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
     <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script> 

```
4) editor component : WysiwygEditor.js
5) apply for the additional style at App.css
6) import wysiwyg style from node_modules at CreatePost.js of App.js
7) put the component: <WysiwygEditor /> on the editing area (e.g. CreatePost.js)
8) preview modal component : WysiwygPreviewModal.js
