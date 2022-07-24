<script setup lang="ts">
// TODO: needs to implement "reacting to params changes"
//       https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
import { usePostStore } from "@/stores";
const postStore = usePostStore();
const getPost = postStore.getPost;
</script>
<template>
  <div>
    {{ getPost($route.params.postid) }}
  </div>
</template>
