<template>
  <div class="wrapper" :class="achievementIcon">
    <p class="badgeHeader">{{ header }}</p>
    <p class="badgeDescription">{{ description }}</p>
    <p class="badgeScore">{{ score }}</p>
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
console.log(achievementIndex.value)
</script>

<style scoped>
.wrapper {
  padding: 1em;
  width: 15em;
  height: 9em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}

.badge {
  background-image: url(../../assets/badge_0.svg);
  background-repeat: no-repeat;
  background-size: contain;
}

.badgeHeader {
  position: absolute;
  top: 1.6em;
  color: #fafaf2ff;
  opacity: 0;
}
.badgeDescription {
  position: absolute;
  top: 3.5em;
}
.badgeScore {
  position: absolute;
  color: #fafaf2ff;
  font-size: 2em;
  top: 2.5em;
}
</style>
