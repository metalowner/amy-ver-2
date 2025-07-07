<script setup>
import { db } from '@/main'
import PersonalInformation from '@/components/PersonalInformation.vue'
import { computed, ref, toRefs } from 'vue'
import UserValue from '@/components/self_development/UserValue.vue'
import UserGoal from '@/components/self_development/UserGoal.vue'
import UserPlan from '@/components/self_development/UserPlan.vue'
import AIHelper from '@/components/ai/AIHelper.vue'
import TutorialHelper from '@/components/education/TutorialHelper.vue'
import AddHeader from '@/components/AddHeader.vue'
import LifeStory from '@/components/self_development/LifeStory.vue'
import MyButton from '@/components/MyButton.vue'
import Swal from 'sweetalert2'
import DreamLife from '@/components/self_development/DreamLife.vue'
import UserStats from '@/components/self_development/UserStats.vue'
import UserAchievements from '@/components/self_development/UserAchievements.vue'
import LifeFields from '@/components/self_development/LifeFields.vue'

const props = defineProps({
  auth: {
    type: Object,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
})

const { auth, userData } = toRefs(props)
// personal values vars
const displayPersonalValuesinfo = () => {
  Swal.fire({
    title: 'Личные качества',
    text: 'Это элементы, из которых формируется наш характер, включая: привычки, что нравится, что не нравится, на чём основываем решения, к чему стремимся и т.д.',
    buttonsStyling: false,
    confirmButtonText: 'Понятно',
  })
}
// declare values variables
const valuesHeader = ref({})
const valuesDescription =
  'Это основа вашего механизма принятия решений. Когда они воплощаются, вы чувствуете позитивные эмоции, а когда наоборот, вы чувствуете негативные эмоции. Чтобы понять есть ли у вас та или иная ценность проверьте присутствие данной ценности в ваших решениях и действиях.'
const displayValues = computed(() => {
  return valuesHeader.value.displayBlock
})
const displayValuesHelp = computed(() => {
  return valuesHeader.value.displayHelp
})
const valuesQuestion = {
  question: 'Опишите лучший день в вашей жизни',
  request: 'Какие у меня ценности если самый лучший день в моей жизни это',
  inputPlaceHolder: 'День когда...',
}
// obstacles variables
const obstaclesHeader = ref({})
const obstaclesDescription =
  'Это личные качества, которые являются основной причиной ваших провалов. В основном это причины, из-за которых не получается добывать удовлетворительное количество ресурсов.'
const displayObstacles = computed(() => {
  return obstaclesHeader.value.displayBlock
})
const displayObstaclesHelp = computed(() => {
  return obstaclesHeader.value.displayHelp
})
const obstaclesQuestion = {
  question: 'Опишите величайший провал в вашей жизни',
  request: 'Какие у меня личные препятствия если величайший провал в моей жизни это',
  inputPlaceHolder: 'Величайший провал моей жизни это... ',
}
// resources variables
const resourcesHeader = ref({})
const resourcesDescription =
  'Это ваши рычаги для достижения удовлетворительных успехов. Ресурсами могут быть навыки, опыт, черты характера, красота, манеры, мудрость и многое другое, что позволяет вам достигать успехов.'
const displayResources = computed(() => {
  return resourcesHeader.value.displayBlock
})
const displayResourcesHelp = computed(() => {
  return resourcesHeader.value.displayHelp
})
const resourcesQuestion = {
  question: 'Опишите величайший успех в вашей жизни',
  request: 'Какие у меня основные ресурсы если величайший успех в моей жизни это',
  inputPlaceHolder: 'Моё величайшее достижение это... ',
}
// goals variables
const goalsHeader = ref({})
const goalsDescription = 'Это ваши конечные результаты, которые определяют к чему вы стремитесь.'
const displayGoals = computed(() => {
  return goalsHeader.value.displayBlock
})
const displayGoalsHelp = computed(() => {
  return goalsHeader.value.displayHelp
})
const goalsQuestion = {
  question: 'Опишите лучший день в вашей жизни',
  request: 'Какие у меня ценности если самый лучший день в моей жизни это',
  inputPlaceHolder: 'День когда ',
}
// plans variables
const plansHeader = ref({})
const plansDescription =
  'Это ваши повторяемые действия, которые определяют что вы намерены делать и как часто.'
const displayPlans = computed(() => {
  return plansHeader.value.displayBlock
})
const displayPlansHelp = computed(() => {
  return plansHeader.value.displayHelp
})
const plansQuestion = {
  question: 'Опишите лучший день в вашей жизни',
  request: 'Какие у меня ценности если самый лучший день в моей жизни это',
  inputPlaceHolder: 'День когда ',
}
</script>

<template>
  <div class="wrapper">
    <PersonalInformation :db="db" :auth="auth.auth" :userData="userData" />
    <DreamLife :auth="auth.auth" :userData="userData" />
    <UserStats :user-data="userData" />
    <UserAchievements :user-data="userData" />
    <LifeFields :user-data="userData" />
    <LifeStory :user-data="userData" :auth="auth.auth" />

    <div class="profileGrid">
      <TutorialHelper />
      <div class="infoHeader">
        <h2>Личные качества</h2>
        <MyButton btn-style="info" btn-text="i" @click="displayPersonalValuesinfo()" />
      </div>
      <div class="block">
        <AddHeader
          header="Ценности"
          :description="valuesDescription"
          data-type="values"
          :auth="auth"
          :user-data="userData"
          ref="valuesHeader"
        />

        <div v-if="displayValuesHelp">
          <AIHelper
            :question-data="valuesQuestion"
            :user-data="userData"
            :auth="auth"
            array-name="values"
          />
        </div>

        <div class="cardsDiv" v-if="displayValues">
          <UserValue
            v-for="(value, index) in userData?.values"
            :key="value.header"
            :db="db"
            :auth="auth.auth"
            :user-data="userData"
            :index="index"
            :header="value.header"
            :description="value.description"
            :importance="value.importance"
            property="values"
          />
        </div>
      </div>
      <div class="block grayBg">
        <AddHeader
          header="Препятствия"
          :description="obstaclesDescription"
          data-type="obstacles"
          :auth="auth"
          :user-data="userData"
          ref="obstaclesHeader"
        />
        <div v-if="displayObstaclesHelp">
          <AIHelper
            :question-data="obstaclesQuestion"
            :user-data="userData"
            :auth="auth"
            array-name="obstacles"
          />
        </div>
        <div class="cardsDiv" v-if="displayObstacles">
          <UserValue
            v-for="(obstacle, index) in userData?.obstacles"
            :key="obstacle.header"
            :db="db"
            :auth="auth.auth"
            :user-data="userData"
            :index="index"
            :header="obstacle.header"
            :description="obstacle.description"
            :importance="obstacle.importance"
            property="obstacles"
          />
        </div>
      </div>
      <div class="block">
        <AddHeader
          header="Ресурсы"
          :description="resourcesDescription"
          data-type="resources"
          :auth="auth"
          :user-data="userData"
          ref="resourcesHeader"
        />
        <div v-if="displayResourcesHelp">
          <AIHelper
            :question-data="resourcesQuestion"
            :user-data="userData"
            :auth="auth"
            array-name="resources"
          />
        </div>
        <div class="cardsDiv" v-if="displayResources">
          <UserValue
            v-for="(resource, index) in userData?.resources"
            :key="resource.header"
            :db="db"
            :auth="auth.auth"
            :user-data="userData"
            :index="index"
            :header="resource.header"
            :description="resource.description"
            :importance="resource.importance"
            property="resources"
          />
        </div>
      </div>
      <div class="block grayBg">
        <AddHeader
          header="Цели"
          :description="goalsDescription"
          data-type="goals"
          :auth="auth"
          :user-data="userData"
          ref="goalsHeader"
        />
        <div v-if="displayGoalsHelp">
          <AIHelper
            :question-data="goalsQuestion"
            :user-data="userData"
            :auth="auth"
            array-name="goals"
          />
        </div>
        <div class="cardsDiv" v-if="displayGoals">
          <UserGoal
            v-for="(goal, index) in userData?.goals"
            :key="goal.header"
            :db="db"
            :auth="auth.auth"
            :user-data="userData"
            :header="goal.header"
            :description="goal.description"
            :importance="goal.importance"
            :goal-index="index"
            :measures="goal.measures"
            :prices="goal.prices"
            :urgency="goal.urgency"
            :values="goal.values"
            :life-fields="goal.lifeFields"
          />
        </div>
      </div>
      <div class="block">
        <AddHeader
          header="Планы"
          :description="plansDescription"
          data-type="plans"
          :auth="auth"
          :user-data="userData"
          ref="plansHeader"
        />
        <div v-if="displayPlansHelp">
          <AIHelper
            :question-data="plansQuestion"
            :user-data="userData"
            :auth="auth"
            array-name="plans"
          />
        </div>
        <div class="cardsDiv" v-if="displayPlans">
          <UserPlan
            v-for="(plan, index) in userData?.plans"
            :key="plan.header"
            :db="db"
            :auth="auth.auth"
            :user-data="userData"
            :header="plan.header"
            :importance="plan.importance"
            :plan-index="index"
            :urgency="plan.urgency"
            :values="plan.values"
            :start-date="plan.startDate"
            :goals="plan.goals"
            :obstacles="plan.obstacles"
            :resources="plan.resources"
            :time="plan.time"
            :success="plan.success"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper .infoHeader {
  margin: 0em 1em;
}
.block {
  position: relative;
  padding: 1em;
  padding-top: 0em;
  display: flex;
  flex-direction: column;
}
.grayBg {
  background-color: #10101005;
}
.cardsDiv {
  display: grid;
  grid-template-columns: auto;
}
.checkboxDiv {
  margin-top: 1em;
  display: grid;
  grid-template-columns: auto auto;
}
.counterDiv {
  margin: 1em 0em;
  display: grid;
  grid-template-columns: auto auto;
}

.profileGrid {
  display: grid;
  grid-template-columns: auto;
  margin-bottom: 1em;
  padding-bottom: 1em;
}

.blockHeaderDiv {
  display: flex;
  gap: 1em;
  align-items: center;
}

@media (min-width: 768px) {
  .cardsDiv {
    column-gap: 1em;
    align-items: start;
  }
  .popUp {
    left: 3em;
  }
  .wrapper {
    display: grid;
    grid-template-columns: 49% 49%;
    column-gap: 1em;
    justify-content: center;
  }
}
</style>
