import { defineStore } from "pinia";
import { fbCollectionListener, queryObjectCollection } from "./firebase";

interface State {
  posts: any[] | null;
}

export const usePostStore = defineStore("postStore", {
  // convert to a function
  state: (): State => ({
    posts: [],
  }),
  getters: {
    allPosts() {
      this.posts;
    },
    getPost() {
      return (id: string | string[]) =>
        this.posts?.find((post) => (post.id = id));
    },
  },
  actions: {
    initializeCollectionListener(collectionName: string) {
      return new Promise((resolve) => {
        fbCollectionListener(collectionName, async (data: any) => {
          this.posts = data ? data : null;
          resolve(true);
        });
      });
    },

    async loadPosts() {
      try {
        const data = await queryObjectCollection({
          collectionName: "posts",
        });
        this.posts = data ? data : null;
        return this.posts;
      } catch (e: any) {
        this.posts = null;
        return false;
      }
    },
  },
});
