<template>
  <div class="wrapper" :class="achievementIcon">
    <h4>{{ header }}</h4>
    <p>{{ description }}</p>
    <p>{{ score }}</p>
    <p>{{ achievementIndex }}</p>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

// define props
const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  achievementIndex: {
    type: Number,
    required: true,
  },
  achievementIcon: {
    type: String,
    required: true,
  },
})
// expose props
const { header, description, score, achievementIndex, achievementIcon } = toRefs(props)
</script>

<style scoped>
.wrapper {
  padding: 1em;
  border-radius: 5px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  max-width: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.badge {
  background-image: url(../../assets/badge_0.svg);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
