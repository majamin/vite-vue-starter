import { User as fbUser } from "firebase/auth";
import { defineStore } from "pinia";
import {
  fbAuthStateListener,
  fbCreateAccount,
  fbGetUserProfile,
  fbSignIn,
  fbSignOut,
} from "./firebase";
import router from "@/router";

export interface User {
  user: any;
  profile: any;
  userError: any;
}

export interface LoginData {
  email: string;
  password: string;
}

interface State {
  user: fbUser | null;
  profile: any;
  error: null;
}

export const useAuthStore = defineStore("authStore", {
  // convert to a function
  state: (): State => ({
    user: null,
    profile: null,
    error: null,
  }),
  getters: {
    isLoggedIn(): boolean {
      return this.user !== null;
    },
  },
  actions: {
    /**
     * listens for state changes, ie a user logging in or out
     * and if logging in, loading the associated profile info
     * @returns
     */
    initializeAuthListener() {
      return new Promise((resolve) => {
        fbAuthStateListener(async (user: any) => {
          this.user = user ? user : null;
          if (user) {
            const profile = (await fbGetUserProfile()) as any;
            this.profile = profile;
          }
          resolve(true);
        });
      });
    },

    async logInUser(data: LoginData) {
      try {
        const response = await fbSignIn(data);
        this.user = response.user ? response.user : null;
        this.error = null;
        router.push({ name: "UserProfile" });
        return true;
      } catch (e: any) {
        this.user = null;
        this.error = e;
        return false;
      }
    },

    async logoutUser() {
      try {
        await fbSignOut();
        this.user = null;
        this.profile = null;
        this.error = null;
        router.push({ name: "Home" });
        return true;
      } catch (e: any) {
        this.error = e;
        return false;
      }
    },

    async createAccount(data: LoginData, first: string, last: string) {
      try {
        const { user, profile } = await fbCreateAccount(data, first, last);
        this.user = user ? user : null;
        this.profile = profile ? profile : null;
        this.error = null;
        router.push({ name: "UserProfile" });
        return true;
      } catch (e: any) {
        this.user = null;
        this.error = e;
        return false;
      }
    },
  },
});
