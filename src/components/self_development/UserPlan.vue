<template>
  <div class="planWrapper">
    <h3>{{ header }}</h3>
    <TimeCalc label="Повторяймость" :time="time" field="planDisplay" />
    <p>Дата начала: {{ startDate }}</p>
    <h4 class="infoHeader">
      Приоритетность
      <MyButton btn-style="arrowDown" @click="displayPriorities = !displayPriorities" />
    </h4>
    <div v-if="displayPriorities" class="infoBlock">
      <p>Важность: {{ importance }}</p>
      <p>Срочность: {{ urgency }}</p>
    </div>
    <h4 class="infoHeader">
      Успешность <MyButton btn-style="arrowDown" @click="displaySuccess = !displaySuccess" />
    </h4>
    <div v-if="displaySuccess" class="infoBlock">
      <p>Действий</p>
      <MyRange :edit-enabled="false" :input-value="100" />
      <p>Результатов</p>
      <MyRange :edit-enabled="false" :input-value="100" />
    </div>

    <h4 class="infoHeader">
      Цели <MyButton btn-style="arrowDown" @click="displayGoals = !displayGoals" />
    </h4>
    <div v-if="displayGoals" class="infoBlock">
      <p v-for="(goal, index) in goals" :key="goal">{{ index + 1 }}. {{ goal }}</p>
    </div>

    <h4 class="infoHeader">
      Ценности <MyButton btn-style="arrowDown" @click="displayValues = !displayValues" />
    </h4>
    <div v-if="displayValues" class="infoBlock">
      <p v-for="(value, index) in values" :key="value">{{ index + 1 }}. {{ value }}</p>
    </div>

    <h4 class="infoHeader">
      Припятствия <MyButton btn-style="arrowDown" @click="displayObstacles = !displayObstacles" />
    </h4>
    <div v-if="displayObstacles" class="infoBlock">
      <p v-for="(obstacle, index) in obstacles" :key="obstacle">{{ index + 1 }}. {{ obstacle }}</p>
    </div>

    <h4 class="infoHeader">
      Ресурсы <MyButton btn-style="arrowDown" @click="displayResources = !displayResources" />
    </h4>
    <div v-if="displayResources" class="infoBlock">
      <p v-for="(resource, index) in resources" :key="resource">{{ index + 1 }}. {{ resource }}</p>
    </div>

    <MyButton btn-style="edit" @click="editPlanDetails" />
    <MyButton btn-style="delete" @click="deletePlan" />
    <div class="editData" v-if="editPlan">
      <p><input type="text" placeholder="Новый заголовок" v-model="newPlanHeader" /></p>
      <TimeCalc
        :time="time"
        label="Повторяймость"
        :total="userData?.health?.time?.total"
        :auth="auth.auth"
        :user-data="userData"
        field="plans"
        ref="newPlanTime"
      />
      <div class="counterDiv">
        <p><MyCounter label="Срочность" :input-value="urgency" ref="newPlanUrgency" /></p>
        <p><MyCounter label="Важность" :input-value="importance" ref="newPlanImportance" /></p>
      </div>
      <h4>Цели</h4>
      <div class="checkboxDiv">
        <label v-for="goal in userData.goals" :key="goal.header" class="container"
          >{{ goal.header }}
          <input :value="goal.header" type="checkbox" v-model="newPlanGoals" />
          <span class="checkmark"></span>
        </label>
      </div>
      <h4>Ценности</h4>
      <div class="checkboxDiv">
        <label v-for="value in userData.values" :key="value.header" class="container"
          >{{ value.header }}
          <input :value="value.header" type="checkbox" v-model="newPlanValues" />
          <span class="checkmark"></span>
        </label>
      </div>

      <h4>Припятствия</h4>
      <div class="checkboxDiv">
        <label v-for="obstacle in userData.obstacles" :key="obstacle.header" class="container"
          >{{ obstacle.header }}
          <input :value="obstacle.header" type="checkbox" v-model="newPlanObstacles" />
          <span class="checkmark"></span>
        </label>
      </div>
      <h4>Ресурсы</h4>
      <div class="checkboxDiv">
        <label v-for="resource in userData.resources" :key="resource.header" class="container"
          >{{ resource.header }}
          <input :value="resource.header" type="checkbox" v-model="newPlanResources" />
          <span class="checkmark"></span>
        </label>
      </div>

      <MyButton btn-style="save" @click="savePlan" />
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import MyRange from '../MyRange.vue'
import MyCounter from '../MyCounter.vue'
import TimeCalc from './TimeCalc.vue'

// declare component props
const props = defineProps({
  db: {
    type: Object,
    required: true,
  },
  auth: {
    type: Object,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  importance: {
    type: Number,
    required: true,
  },
  urgency: {
    type: Number,
    required: true,
  },
  goals: {
    type: Array,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  obstacles: {
    type: Array,
    required: true,
  },
  resources: {
    type: Array,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
  time: {
    type: Object,
    required: true,
  },
  planIndex: {
    type: Number,
    required: true,
  },
})
// expose props
const {
  db,
  auth,
  userData,
  header,
  importance,
  urgency,
  values,
  goals,
  obstacles,
  resources,
  startDate,
  planIndex,
} = toRefs(props)
// declate variables
const editPlan = ref(false)
const newPlanHeader = ref('')
const newPlanUrgency = ref(Number)
const newPlanImportance = ref(Number)
const newPlanGoals = ref([])
const newPlanValues = ref([])
const newPlanObstacles = ref([])
const newPlanResources = ref([])
const displayPriorities = ref(false)
const displaySuccess = ref(false)
const displayGoals = ref(false)
const displayValues = ref(false)
const displayObstacles = ref(false)
const displayResources = ref(false)
const newPlanTime = ref({})
// methods
// edit goal
const editPlanDetails = () => {
  editPlan.value = !editPlan.value
  newPlanHeader.value = header.value
  newPlanUrgency.value = urgency.value
  newPlanGoals.value = goals.value
  newPlanValues.value = values.value
  newPlanObstacles.value = obstacles.value
  newPlanResources.value = resources.value
}
// save function
const savePlan = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const resourceRef = userData.value.plans[planIndex.value]
  resourceRef.header = newPlanHeader.value
  resourceRef.urgency = parseInt(newPlanUrgency.value.editableValue)
  resourceRef.importance = parseInt(newPlanImportance.value.editableValue)
  resourceRef.values = newPlanValues.value
  resourceRef.goals = newPlanGoals.value
  resourceRef.obstacles = newPlanObstacles.value
  resourceRef.resources = newPlanResources.value
  resourceRef.time = newPlanTime.value.newTimeObject
  try {
    await updateDoc(userRef, {
      plans: userData.value.plans,
    })
    editPlan.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// delete function
const deletePlan = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  userData.value.plans.splice(planIndex.value, 1)
  try {
    await updateDoc(userRef, {
      plans: userData.value.plans,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// ellapsed time function
function parseTime(startDate, deadline) {
  let start = new Date(startDate)
  let now = new Date()
  let end = new Date(deadline)
  let daysPassed = now.getTime() - start.getTime()
  let daysRemaining = end.getTime() - now.getTime()

  console.log(differenceInDays(daysPassed))
  console.log(differenceInDays(daysRemaining))
}
// calculate ellapsed time in days
function differenceInDays(difference) {
  let result = Math.round(difference / (1000 * 3600 * 24))
  return result
}
</script>

<style scoped>
h3 {
  border-bottom: 1px solid #10101044;
  padding-bottom: 3px;
  margin-bottom: 3px;
}

h4 {
  border-bottom: 1px solid #10101022;
  padding-bottom: 1em;
  padding-top: 1em;
}
.planWrapper {
  padding: 1em;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 5px;
  margin-bottom: 1em;
  position: relative;
  padding-right: 3em;
  padding-bottom: 3em;
  max-width: 25em;
}
.editData {
  position: relative;
  padding-bottom: 3em;
  border-top: 1px solid #10101011;
  margin-top: 1em;
  padding-top: 1em;
  border-bottom: 1px solid #10101011;
}
.infoBlock {
  display: grid;
  grid-template-columns: auto auto;
  padding: 1em;
}
.infoHeader {
  position: relative;
}
</style>
