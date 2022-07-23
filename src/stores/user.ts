import { defineStore, StateTree } from "pinia";

interface State {
  prefersDark: boolean;
}

export const useUserStore = defineStore("userStore", {
  // convert to a function
  state: (): State => ({
    prefersDark: false,
  }),
  getters: {
    isDark: (state: StateTree): boolean => state.prefersDark,
  },
  actions: {
    userWantsLight() {
      this.prefersDark = false;
    },
    userWantsDark() {
      this.prefersDark = true;
    },
    toggleDark() {
      this.prefersDark ? (this.prefersDark = false) : (this.prefersDark = true);
      // console.log(this.prefersDark);
    },
  },
});
