<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";

// import CardQuoteProfile from "@/components/CardQuoteProfile.vue";
// import FeatureFullBisectedImageText from "@/components/FeatureFullBisectedImageText.vue";

defineProps<{ msg: string }>();

onMounted(() => {
  gsap.from(".logo", {
    duration: 0.6,
    opacity: 0,
    scale: 0,
    y: 100,
    ease: "power1",
    stagger: 0.1,
  });
});
</script>

<template>
  <h6 class="text-theme-red-600">
    A good <span class="text-theme-blue-700">{{ msg }}</span> starter
  </h6>

  <div class="mx-auto my-10 flex w-3/5 flex-wrap justify-items-center">
    <div class="logo mx-auto my-6 flex w-36 justify-items-center px-6">
      <a href="https://vuejs.org/guide/introduction.html" target="_blank">
        <img class="h-full w-full" src="/assets/images/vue.png" alt="" />
      </a>
    </div>
    <div class="logo mx-auto my-6 flex w-36 justify-items-center px-6">
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        <img class="h-full w-full" src="/assets/images/vite.svg" alt="" />
      </a>
    </div>
    <div class="logo mx-auto my-6 flex w-36 justify-items-center px-6">
      <a href="https://tailwindcss.com/resources" target="_blank">
        <img
          class="h-full w-full"
          src="/assets/images/tailwindcss.svg"
          alt=""
        />
      </a>
    </div>
  </div>

  <p class="my-4">See <code>README.md</code> for more information.</p>

  <hr class="my-16" />
</template>

<style scoped lang="postcss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
