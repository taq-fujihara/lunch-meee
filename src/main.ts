import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";


import firebase from "firebase/app"
import {ui, db, auth} from "@/firebase";

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

