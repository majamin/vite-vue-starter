<script setup lang="ts">
import { usePostStore } from "@/stores";
import { onMounted } from "vue";

const postStore = usePostStore();
onMounted(async () => {
  await postStore.initializeCollectionListener("posts");
});
</script>

<template>
  <!-- <pre>{{ JSON.stringify(postStore?.posts, null, 1) }}</pre> -->
  <div class="mx-auto flex max-w-5xl bg-blue-100">
    <div class="w-1/4 bg-green-100">
      <button class="btn btn-indigo">Start a Discussion</button>
    </div>
    <div class="ml-10 flex flex-col bg-red-100">
      <div class="">
        <div class="my-4" v-for="post in postStore?.posts?.filter((p) => !p.replyTo)" :key="post.uid">
          <div class="flex">
            <div
              class="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-slate-800 font-bold text-white">
              M
            </div>
            <router-link :to="{ name: 'PostDetails', params: { postid: post.id } }">
              <div class="flex flex-col items-center justify-center">
                <h5 class="mb-0 ml-4">{{ post.subject }}</h5>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
