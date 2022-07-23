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
  <ul>
    <li
      v-for="post in postStore?.posts?.filter((p) => !p.replyTo)"
      :key="post.uid"
    >
      <div>
        <h3>{{ post.body }}</h3>
      </div>
    </li>
  </ul>
</template>
