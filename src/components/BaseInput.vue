<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    class="form-textarea m-0 block w-full border-0 border-b-2 border-b-gray-600 bg-white bg-clip-padding px-4 py-2 text-lg font-normal text-gray-700 transition ease-in-out focus:border-b-blue-600 focus:bg-white focus:text-gray-700 focus:ring-0"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"]);
defineProps(["label", "modelValue"]);
</script>
