import { defineStore } from "pinia";
import { fbCollectionListener, queryObjectCollection } from "./firebase";

interface State {
  posts: any[] | null;
  error: null;
}

export const usePostStore = defineStore("postStore", {
  // convert to a function
  state: (): State => ({
    posts: [],
    error: null,
  }),
  getters: {
    allPosts: (state) => state.posts,
    postError: (state) => state.error,
  },
  actions: {
    /**
     * listen for changes on collection and update
     * store.
     *
     * @param collectionName
     * @returns
     */
    initializeCollectionListener(collectionName: string) {
      return new Promise((resolve) => {
        fbCollectionListener(collectionName, async (data: any) => {
          this.posts = data ? data : null;
          this.error = null;
          resolve(true);
        });
      });
    },
    /**
     * make intentional call to load posts for collectsion
     *
     * @param data
     */
    async loadPosts() {
      try {
        const data = await queryObjectCollection({
          collectionName: "posts",
        });
        this.posts = data ? data : null;
        this.error = null;
        return this.posts;
      } catch (e: any) {
        this.posts = null;
        this.error = e;
        return false;
      }
    },
  },
});
