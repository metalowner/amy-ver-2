<template>
  <div class="wrapper shadow" @click="navigateRoute">
    <h2>{{ name }}</h2>
    <div class="icon"></div>
    <div class="stats">
      <p class="successRate">70%</p>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { toRefs } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
})
const { routeName, name } = toRefs(props)

const navigateRoute = () => {
  router.push(routeName.value)
}
</script>

<style scoped>
.wrapper {
  width: 10em;
  text-align: center;
}
</style>
