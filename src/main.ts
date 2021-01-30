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
const db = firebase.firestore()
const auth = firebase.auth()

ui.disableAutoSignIn();

auth.onAuthStateChanged(async (user) => {
  if (user) {
    const userDoc = db.collection("users").doc(user.uid);
    const userExists = (await userDoc.get()).exists

    await db.collection("users").doc(user.uid).set(
      {
        displayName: user.displayName,
        email: user.email,
      },
      { merge: true },
    );

    if (!userExists) {
      const initialMessages = [
        "昼休憩入ります。",
        "昼休憩終了",
      ];
      await Promise.all(initialMessages.map(async m => {
        db.collection(`users/${userDoc.id}/messages`).add({ text: m })
      }))
    }

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

