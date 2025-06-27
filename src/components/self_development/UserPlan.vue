<template>
  <div>
    <div class="card" v-show="!editPlan">
      <h3 @click="displayPlanInfo = !displayPlanInfo">{{ header }}</h3>
      <div class="importanceDiv">
        <p class="importanceLabel">Важность</p>
        <p class="importance">{{ importance }}</p>
      </div>
      <div class="urgencyDiv">
        <p class="urgencyLabel">Срочность</p>
        <p class="urgency">{{ urgency }}</p>
      </div>
      <div class="subHeaderDiv description">
        <p>Начало: {{ startDate }}</p>
        <TimeCalc :time="time" field="planDisplay" />
      </div>
      <MyButton
        btn-style="arrowUp"
        @click="displayPlanInfo = !displayPlanInfo"
        v-show="displayPlanInfo"
      />
      <MyButton
        btn-style="arrowDown"
        @click="displayPlanInfo = !displayPlanInfo"
        v-show="!displayPlanInfo"
      />
      <MyButton btn-style="edit" @click="editPlanDetails" class="editBtn" />
    </div>
    <div>
      <div v-show="displayPlanInfo">
        <h4 class="infoHeader">Успешность</h4>
        <div class="infoBlock">
          <p class="description">Действий</p>
          <MyRange :edit-enabled="false" :input-value="success?.processSuccess" />
          <p class="description">Результатов</p>
          <MyRange :edit-enabled="false" :input-value="success?.resultsSuccess" />
        </div>

        <h4 class="infoHeader">Цели</h4>
        <div class="infoBlock">
          <p v-for="goal in goals" :key="goal">{{ goal }}</p>
        </div>

        <h4 class="infoHeader">Ценности</h4>
        <div class="infoBlock">
          <p v-for="value in values" :key="value">{{ value }}</p>
        </div>

        <h4 class="infoHeader">Препятствия</h4>
        <div class="infoBlock">
          <p v-for="obstacle in obstacles" :key="obstacle">
            {{ obstacle }}
          </p>
        </div>

        <h4 class="infoHeader">Ресурсы</h4>
        <div class="infoBlock">
          <p v-for="resource in resources" :key="resource">
            {{ resource }}
          </p>
        </div>
      </div>
    </div>

    <div class="editData" v-if="editPlan">
      <MyButton btn-style="edit" @click="editPlanDetails" class="editBtn" />
      <p><input type="text" placeholder="Новый заголовок" v-model="newPlanHeader" /></p>
      <TimeCalc
        :time="time"
        label="Повторяемость"
        :total="userData?.health?.time?.total"
        :auth="auth.auth"
        :user-data="userData"
        field="plans"
        ref="newPlanTime"
      />
      <div class="counterDiv">
        <p>
          <MyCounter
            label="Срочность"
            :input-value="urgency"
            :max-value="10"
            ref="newPlanUrgency"
          />
        </p>
        <p>
          <MyCounter
            label="Важность"
            :input-value="importance"
            :max-value="10"
            ref="newPlanImportance"
          />
        </p>
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

      <h4>Препятствия</h4>
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
      <div class="btnsDiv">
        <MyButton btn-style="standard" btn-text="Сохранить" @click="savePlan" />
        <MyButton btn-style="delete" btn-text="Удалить" @click="deletePlan" />
      </div>
      <div class="btnsDiv">
        <MyButton btn-style="complete" btn-text="Завершить" @click="completePlan" />
        <MyButton btn-style="cancelBottom" @click="editPlan = !editPlan" />
      </div>
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
  success: {
    type: Object,
    required: false,
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
  time,
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
const newPlanTime = ref({})
const displayPlanInfo = ref(false)
// methods
// edit goal
const editPlanDetails = () => {
  displayPlanInfo.value = false
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
  if (
    resourceRef.time != newPlanTime.value.newTimeObject &&
    newPlanTime.value.newTimeObject != null
  ) {
    resourceRef.time = newPlanTime.value.newTimeObject
  }

  try {
    await updateDoc(userRef, {
      plans: userData.value.plans,
      health: userData.value.health,
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
  const resourceRef = userData.value.plans[planIndex.value]
  if (resourceRef.time.repetition == 'daily') {
    const totalTime = userData.value.health.time.total
    totalTime.hours -= resourceRef.time.hours
    totalTime.minutes -= resourceRef.time.minutes
    if (userData.value.health.time.total.minutes > 60) {
      userData.value.health.time.total.hours += 1
      userData.value.health.time.total.minutes -= 60
    } else if (userData.value.health.time.total.minutes < 0) {
      userData.value.health.time.total.hours -= 1
      userData.value.health.time.total.minutes += 60
    }
  }
  userData.value.plans.splice(planIndex.value, 1)
  try {
    await updateDoc(userRef, {
      plans: userData.value.plans,
      health: userData.value.health,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}

const completePlan = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const resourceRef = userData.value.plans[planIndex.value]

  userData.value.achievements.finishedPlans.push(resourceRef)
  userData.value.plans.splice(planIndex.value, 1)
  try {
    await updateDoc(userRef, {
      plans: userData.value.plans,
      achievements: userData.value.achievements,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>

<style scoped>
h4 {
  text-align: center;
  background: var(--blue);
  margin-top: 0.5em;
  color: var(--white);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.editData {
  position: relative;
  padding: 2em 0.5em;
  margin-bottom: 0.5em;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 5px;
}
.infoHeader {
  position: relative;
}
.subHeaderDiv {
  display: grid;
  grid-template-columns: auto auto;
}
</style>
