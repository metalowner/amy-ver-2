<script setup>
defineProps({
  btnStyle: {
    type: String,
    required: true,
  },
  btnText: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <a :class="btnStyle">{{ btnText }}</a>
</template>

<style scoped>
.standard {
  border: 1px solid black;
}
</style>
