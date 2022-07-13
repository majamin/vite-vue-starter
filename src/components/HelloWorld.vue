<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

defineProps<{ msg: string }>();

const count = ref(0);

const isEven = (n: number): boolean => {
  return n % 2 === 0;
};

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

  <div class="logo mx-auto flex max-w-fit justify-items-center">
    <div class="m-6 flex w-20 justify-items-center">
      <a href="https://vuejs.org/guide/introduction.html" target="_blank">
        <img class="h-full w-full" src="/assets/images/vue.png" alt="" />
      </a>
    </div>
    <div class="logo m-6 flex w-20 justify-items-center">
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        <img class="h-full w-full" src="/assets/images/vite.svg" alt="" />
      </a>
    </div>
    <div class="logo m-6 flex w-20 justify-items-center">
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

  <h6>Vue <code>Transition</code> demo:</h6>

  <div class="my-4">
    <button
      class="rounded-md border-2 border-theme-blue-500 bg-white py-2 px-4 font-bold text-theme-blue-500 hover:bg-theme-blue-800 hover:text-white"
      type="button"
      @click="count++"
    >
      count is: {{ count }}
    </button>
  </div>

  <div class="my-8">
    <p>
      I'm an
      <Transition name="slide-fade" mode="out-in"
        ><span v-if="isEven(count)">even</span
        ><span v-else>odd</span></Transition
      >
      duck.
    </p>
  </div>

  <p class="mb-20">
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
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
