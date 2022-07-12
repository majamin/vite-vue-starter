<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);

const isEven = (n: number): boolean => {
  return n % 2 === 0;
};
</script>

<template>
  <h4>{{ msg }}</h4>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <h4 class="mt-4">Transition demo:</h4>

  <div class="my-8">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>
