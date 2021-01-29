import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";


import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import * as firebaseui from 'firebaseui'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const ui = new firebaseui.auth.AuthUI(firebase.auth())

const auth = firebase.auth()

ui.disableAutoSignIn();

auth.onAuthStateChanged(user => {
  if (user) {
    createApp(App)
      .use(store)
      .use(router)
      .mount("#app");
  } else {
    ui.start(
      '#app',
      {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        signInFlow: "popup",
        callbacks: {
          uiShown: function() {
            // TODO
          },
        }
      }
    );
  }
});

