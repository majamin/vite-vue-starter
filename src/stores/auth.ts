import { defineStore, storeToRefs, StateTree, _GettersTree as G } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/plugins/firebase";
import router from "@/router";

export interface LoginData {
  email: string;
  password: string;
}

export type WUser = {
  id: string | null;
  displayName: string | null;
  providerId: string | null;
  isLoggedIn: boolean;
  emailVerified: boolean;
};

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: {
      id: null,
      displayName: null,
      providerId: null,
      isLoggedIn: false,
      emailVerified: false,
    },
  }),

  getters: {
    getUserId: function (state: StateTree): string | null {
      return state.user.id;
    },
  },

  actions: {
    register(data: LoginData) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    loginEmailPassword(data: LoginData) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User verified: " + user.displayName);
          console.log("Verified by: " + userCredential.providerId);
          if (!user.emailVerified) {
            console.log("Email not verified: " + user.email);
          } else {
            console.log("Email verified: " + user.email);
            this.user.emailVerified = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // : Promise<void | NavigationFailure | undefined>
    logout() {
      signOut(auth).then(() => {
        return router.push("/login");
      });
    },
  },
});
