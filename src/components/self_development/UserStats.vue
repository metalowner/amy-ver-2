<template>
  <div class="statsWrapper">
    <h2>Статистика</h2>
    <div class="statsSubHeader">
      <p>
        Занятое время суток: {{ userData?.health?.time?.total?.hours }}ч
        {{ userData?.health?.time?.total?.minutes }}м
      </p>
      <div v-if="userData?.health?.totalHealth != undefined">
        <p>Удовлитворительность жизни {{ lifeSatisfaction }}</p>
      </div>
    </div>

    <div class="statsDiv">
      <div class="gridBlock">
        <h3>Заполненость</h3>
        <div class="gridContent">
          <p>Число ценностей</p>
          <p class="stat">{{ userData?.values?.length }}</p>
          <p class="grayBg">Число препятствий</p>
          <p class="stat grayBg">{{ userData?.obstacles?.length }}</p>
          <p>Число ресурсов</p>
          <p class="stat">{{ userData?.resources?.length }}</p>
          <p class="grayBg">Число целей</p>
          <p class="stat grayBg">{{ userData?.goals?.length }}</p>
          <p>Число планов</p>
          <p class="stat">{{ userData?.plans?.length }}</p>
        </div>
      </div>
      <div class="gridBlock">
        <h3>Завершено</h3>
        <div class="gridContent">
          <p>Препятствий</p>
          <p class="stat">{{ userData?.achievements?.resolvedObstacles?.length }}</p>
          <p class="grayBg">Целей</p>
          <p class="stat grayBg">{{ userData?.achievements?.achievedGoals?.length }}</p>
          <p>Планов</p>
          <p class="stat">{{ userData?.achievements?.finishedPlans?.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})
const { userData } = toRefs(props)

const lifeSatisfaction = computed(() => {
  const health = userData.value.health.totalHealth
  const social = userData.value.social.totalSocial
  const finances = userData.value.finances.totalFinances
  const hobbies = userData.value.hobbies.totalHobbies
  return (health + social + finances + hobbies) / 4
})
</script>

<style scoped>
h2 {
  margin: 0em;
}
p {
  padding: 0em 1em;
}
.grayBg {
  background-color: #10101005;
}
.statsWrapper {
  background-color: #10101005;
  padding: 0em 1em;
  border-radius: 5px;
}
.statsDiv {
  display: grid;
  grid-template-columns: auto;
  column-gap: 1em;
}
.gridBlock {
  padding: 1em;
}
.gridContent {
  display: grid;
  grid-template-columns: auto auto;
}
.stat {
  text-align: right;
}
@media (min-width: 768px) {
  .statsDiv {
    grid-template-columns: auto auto;
  }
}
@media (min-width: 1024px) {
  h2 {
    max-width: 100%;
    text-align: center;
  }
  .statsSubHeader {
    display: grid;
    grid-template-columns: auto auto;
    text-align: center;
  }
}
</style>
