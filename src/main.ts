import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {Amplify} from '@aws-amplify/core';
import {Auth} from '@aws-amplify/auth';
import './index.css'

// import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

console.log(process.env.VITE_REGION)

Amplify.configure({
  // Note: Attempt to configure  Auth manually
  Auth: {
      // NOTE: We are not using Federated Authentication yet
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
      
      // REQUIRED - Amazon Cognito Region
      region: process.env.VITE_REGION,

      // NOTE: We are not using Federated Authentication yet
      // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
      // Required only if it's different from Amazon Cognito Region
      // identityPoolRegion: process.env.REGION,

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: process.env.VITE_USER_POOL_ID,

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: process.env.VITE_CLIENT_ID,

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      // mandatorySignIn: false,

      // OPTIONAL - Configuration for cookie storage
      // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
      // cookieStorage: {
      // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      //     domain: '.yourdomain.com',
      // // OPTIONAL - Cookie path
      //     path: '/',
      // // OPTIONAL - Cookie expiration in days
      //     expires: 365,
      // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      //     sameSite: "strict" | "lax",
      // // OPTIONAL - Cookie secure flag
      // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      //     secure: true
      // },

      // OPTIONAL - customized storage object
      // storage: MyStorage,
      
      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      // authenticationFlowType: 'USER_PASSWORD_AUTH',

      // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
      // clientMetadata: { myCustomKey: 'myCustomValue' },

       // OPTIONAL - Hosted UI configuration
      // oauth: {
      //     domain: 'your_cognito_domain',
      //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      //     redirectSignIn: 'http://localhost:3000/',
      //     redirectSignOut: 'http://localhost:3000/',
      //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
      // }
  },
  API: {
    endpoints: [
      {
        name: 'hpdAPI',
        endpoint: 'https://i6i2li2i83.execute-api.us-west-2.amazonaws.com',
        custom_header: async () => {
          return { Authorization: (await Auth.currentSession() as any)["idToken"]["jwtToken"] }
        }
      }
    ]
  }
});


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
