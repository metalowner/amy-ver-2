<template>
  <div class="statsWrapper" v-if="userData?.health">
    <div class="infoHeader">
      <h2>Статистика</h2>
      <MyButton btn-style="info" btn-text="i" @click="displayStats = !displayStats" />
    </div>

    <div class="statsSubHeader">
      <div class="subHeaderContent shadow">
        <p class="description">Занятое время</p>
        <h2>
          {{ userData?.health?.time?.total?.hours }}:{{ zeroIfNeeded
          }}{{ userData?.health?.time?.total?.minutes }}
        </h2>
      </div>

      <div class="subHeaderContent shadow" v-if="userData?.health?.totalHealth != undefined">
        <p class="description">Удовлетворительность</p>
        <h2>{{ lifeSatisfaction }}</h2>
      </div>
    </div>

    <div class="statsDiv" v-if="displayStats">
      <div class="gridBlock">
        <h3>Заполненность</h3>
        <div class="gridContent description">
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
        <div class="gridContent description">
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
import { computed, ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})
const { userData } = toRefs(props)
const displayStats = ref(false)

const lifeSatisfaction = computed(() => {
  const health = userData.value.health.totalHealth
  const social = userData.value.social.totalSocial
  const finances = userData.value.finances.totalFinances
  const hobbies = userData.value.hobbies.totalHobbies
  return (health + social + finances + hobbies) / 4
})

const zeroIfNeeded = computed(() => {
  return userData.value.health.time.total.minutes < 10 ? '0' : ''
})
</script>

<style scoped>
.grayBg {
  background: var(--gray-opacity);
}
.statsWrapper {
  padding: 1em;
  margin: 1em 0em;
  position: relative;
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
.statsSubHeader {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 0.5em;
  text-align: center;
  margin-top: 0.5em;
}
.statsSubHeader h2 {
  line-height: 1em;
  border-bottom: none;
  color: var(--black);
}
.subHeaderContent {
  padding: 0.5em;
  background: var(--gray-opacity);
  border-radius: 5px;
}
.subHeaderContent p {
  padding: none;
}
@media (min-width: 768px) {
  .statsDiv {
    grid-template-columns: auto auto;
  }
}
</style>
