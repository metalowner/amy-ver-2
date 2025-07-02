<template>
  <div class="achievementsContainer">
    <div class="infoHeader">
      <h2>Достижения</h2>
      <MyButton class="infoBtn" btn-style="info" btn-text="i" @click="displayAchievementsInfo()" />
    </div>
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
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { toRefs } from 'vue'
import MyButton from '../MyButton.vue'

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
const displayAchievementsInfo = () => {
  Swal.fire({
    title: 'Достижения',
    text: 'Этот блок показывает ваши достижения типа заполнености полей, завершения планов, достижения целей и решений препятствий.',
    buttonsStyling: false,
    confirmButtonText: 'Понятно',
  })
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
.achievementsContainer {
  padding: 0em 1em;
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
