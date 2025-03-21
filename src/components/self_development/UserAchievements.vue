<template>
  <div class="achievementsWrapper">
    <div class="goalBadge" v-if="userData?.achievements?.achievedGoals.length > 0">
      <p class="goalScore">{{ userData?.achievements?.achievedGoals.length }}</p>
    </div>
    <div class="planBadge" v-if="userData?.achievements?.finishedPlans.length > 0">
      <p class="planScore">{{ userData?.achievements?.finishedPlans.length }}</p>
    </div>
    <div class="obstacleBadge" v-if="userData?.achievements?.resolvedObstacles.length > 0">
      <p class="obstacleScore">{{ userData?.achievements?.resolvedObstacles.length }}</p>
    </div>
    <div class="fillBadge" v-if="filledFields === true"></div>
    <div class="registerBadge"></div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

// define props
const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})
// expose props
const { userData } = toRefs(props)
// methods
const filledFields = () => {
  if (
    userData.value.values.length > 14 &&
    userData.value.obstacles.length > 0 &&
    userData.value.resources.length > 0 &&
    userData.value.goals.length > 0 &&
    userData.value.plans.length > 0
  ) {
    return true
  } else {
    return false
  }
}
</script>

<style scoped>
.achievementsWrapper {
  display: grid;
  grid-template-columns: auto auto;
}
.goalBadge,
.planBadge,
.obstacleBadge,
.registerBadge,
.fillBadge {
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 10em;
  width: 10em;
}
.goalBadge {
  background-image: url(../../assets/goalBadge.svg);
}
.planBadge {
  background-image: url(../../assets/planBadge.svg);
}
.obstacleBadge {
  background-image: url(../../assets/obstacleBadge.svg);
}
.registerBadge {
  background-image: url(../../assets/registerBadge.svg);
}
.fillBadge {
  background-image: url(../../assets/fillBadge.svg);
}
.goalScore {
  font-size: 2em;
  position: absolute;
  top: 0.8em;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: fit-content;
  text-align: center;
}
.planScore {
  font-size: 2em;
  position: absolute;
  top: 0.6em;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: fit-content;
  text-align: center;
}
.obstacleScore {
  font-size: 2em;
  position: absolute;
  top: 0.8em;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: fit-content;
  text-align: center;
}
@media (min-width: 768px) {
  .achievementsWrapper {
    grid-template-columns: auto auto auto;
  }
}
@media (min-width: 1024px) {
  .achievementsWrapper {
    grid-template-columns: auto auto auto auto;
  }
}
</style>
