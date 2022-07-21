import { defineStore, StateTree } from "pinia";

interface State {
  prefersDark: boolean;
}

export const useUserStore = defineStore("userStore", {
  // convert to a function
  state: (): State => ({
    prefersDark: false,
  }),
  actions: {
    userWantsLight: (state: StateTree) => (state.prefersDark = false),
    userWantsDark: (state: StateTree) => (state.prefersDark = true),
  },
});
