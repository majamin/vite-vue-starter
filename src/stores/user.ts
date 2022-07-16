import { defineStore } from "pinia";

export type UserState = {
  user: string | null;
};

export const useUserStore = defineStore("User", {
  state: () =>
    ({
      user: null,
    } as UserState),
});
