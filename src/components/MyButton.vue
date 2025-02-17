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
  color: #101010ff;
  border-radius: 5px;
  padding: 5px 1em;
  line-height: 3em;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
</style>
