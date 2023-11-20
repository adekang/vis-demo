<script setup>
import {watch, ref} from 'vue';

const value = ref('');
const value1 = ref('');
watch(value, () => {
  console.log(value.value);
});
watch(value1, () => {
  console.log(value1.value);
});
</script>


<template>
  <h1>Home</h1>
  <a-space direction="vertical">
    <a-input v-model:value="value" placeholder="Basic usage"/>
    <a-input v-model:value.lazy="value1" autofocus placeholder="Lazy usage"/>
  </a-space>
</template>


<style lang='scss' scoped>


</style>
