<script setup lang="ts">
// TODO: needs to implement "reacting to params changes"
//       https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
import { usePostStore } from "@/stores";
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
const postStore = usePostStore();
const getPost = postStore.getPost;
const route = useRoute();
const post = ref();

watch(
  () => route.params.postid,
  async () => {
    route.params.postid ? post.value = await getPost(route.params.postid) : null;
  }
);
</script>
<template>
  <div>
    {{ getPost($route.params.postid) }}
  </div>
</template>
