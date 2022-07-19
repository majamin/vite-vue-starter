<template>
  <h1>Welcome: {{ authStore.user?.email }}</h1>
  <!-- <pre>{{ JSON.stringify(imageStore?.images, null, 1) }}</pre> -->
  <!-- <ul>
    <li v-for="image in imageStore?.images" :key="image.uid">
      <img :src="image.url" />
      <div>
        <h2>{{ image.name }}</h2>
        <h3>{{ image.imageData.size }} {{ image.imageData.contentType }}</h3>
        <p>
          {{
            image.imageData?.updated &&
            new Date(image.imageData?.updated)?.toLocaleDateString()
          }}
        </p>
      </div>
    </li>
  </ul>
 -->
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores";
// import { useAuthStore, useImageStore } from "@/stores";
//import { onMounted } from "vue";

const authStore = useAuthStore();
//const imageStore = useImageStore();

//onMounted(async () => {
//  await imageStore.initializeCollectionListener("ImageInfo");
//});
</script>
