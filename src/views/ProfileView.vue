<script setup>
import { db } from '@/main'
import PersonalInformation from '@/components/PersonalInformation.vue'
import { ref, toRefs } from 'vue'
import UserValue from '@/components/self_development/UserValue.vue'
import MyButton from '@/components/MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import UserGoal from '@/components/self_development/UserGoal.vue'
import UserPlan from '@/components/self_development/UserPlan.vue'
import MyCounter from '@/components/MyCounter.vue'
import TimeCalc from '@/components/self_development/TimeCalc.vue'

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
// declare value variables
const addNewValue = ref(false)
const newValueHeader = ref('')
const newValueDescription = ref('')
// declare obstacle variables
const addNewObstacle = ref(false)
const newObstacleHeader = ref('')
const newObstacleDescription = ref('')
// declare resources variables
const addNewResource = ref(false)
const newResourceHeader = ref('')
const newResourceDescription = ref('')
// declare goal variables
const addNewGoal = ref(false)
const newGoalHeader = ref('')
const newGoalDescription = ref('')
const newGoalValues = ref([])
const newGoalUrgency = ref(Number)
const newGoalImportance = ref(Number)
const newGoalLifeFields = ref([])
// declare plan variables
const addNewPlan = ref(false)
const newPlanHeader = ref('')
const newPlanUrgency = ref(Number)
const newPlanImportance = ref(Number)
const newPlanStartDate = ref(Date)
const newPlanGoals = ref([])
const newPlanValues = ref([])
const newPlanObstacles = ref([])
const newPlanResources = ref([])
const newPlanTime = ref(Object)
const newPlanTimeObject = ref({})
// info vars
const displayValuesInfo = ref(false)
const displayObstaclesInfo = ref(false)
const displayResourcesInfo = ref(false)
const displayGoalsInfo = ref(false)
const displayPlansInfo = ref(false)
// declare simple value save methods
const saveNewValue = async (array, newHeader, newDescription) => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const newValueObject = {
    header: newHeader,
    description: newDescription,
    importance: 1,
  }
  if (
    newValueObject.header != '' &&
    containsObject(newValueObject.header, userData.value[array]) == false
  ) {
    userData.value[array].push(newValueObject)
  }

  if (array == 'values') {
    addNewValue.value = false
  } else if (array == 'obstacles') {
    addNewObstacle.value = false
  } else {
    addNewResource.value = false
  }
  try {
    await updateDoc(userRef, {
      [array]: userData.value[array],
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}

// add new goal
const addNewGoalDetails = () => {
  addNewGoal.value = !addNewGoal.value
  newGoalImportance.value = 0
  newGoalUrgency.value = 0
}
// add new plan
const addNewPlanDetails = () => {
  addNewPlan.value = !addNewPlan.value
  newPlanStartDate.value = new Date()
  newPlanTimeObject.value = {
    repetition: 'daily',
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 15,
  }
}
// save new plan
const savePlan = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  if (
    newPlanHeader.value != '' &&
    containsObject(newPlanHeader.value, userData.value.plans) == false
  ) {
    const newPlanObject = {
      header: newPlanHeader.value,
      urgency: parseInt(newPlanUrgency.value.editableValue),
      importance: parseInt(newPlanImportance.value.editableValue),
      startDate: newPlanStartDate,
      goals: newPlanGoals.value,
      values: newPlanValues.value,
      obstacles: newPlanObstacles.value,
      resources: newPlanResources.value,
      time: newPlanTime.value.newTimeObject,
      daysPassed: 0,
      displayProgress: false,
    }
    if (newPlanObject.time.repetition == 'daily') {
      userData.value.health.time.total.minutes += newPlanObject.time.minutes
      userData.value.health.time.total.hours += newPlanObject.time.hours
      if (userData.value.health.time.total.minutes > 60) {
        userData.value.health.time.total.hours += 1
        userData.value.health.time.total.minutes -= 60
      }
    }
    userData.value.plans.push(newPlanObject)
    try {
      await updateDoc(userRef, {
        plans: userData.value.plans,
        health: userData.value.health,
      })
      addNewPlan.value = false
    } catch (err) {
      console.log('Error adding documents', err)
    }
  } else {
    alert('Нужен закголовок!')
  }
}
// save new goal
const saveGoal = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  if (
    newGoalHeader.value != '' &&
    containsObject(newGoalHeader.value, userData.value.goals) == false
  ) {
    const newGoalObject = {
      header: newGoalHeader.value,
      description: newGoalDescription.value,
      lifeFields: newGoalLifeFields.value,
      urgency: parseInt(newGoalUrgency.value.editableValue),
      values: newGoalValues.value,
      importance: parseInt(newGoalImportance.value.editableValue),
    }
    userData.value.goals.push(newGoalObject)
    try {
      await updateDoc(userRef, {
        goals: userData.value.goals,
      })
      addNewGoal.value = false
    } catch (err) {
      console.log('Error adding documents', err)
    }
  } else {
    addNewGoal.value = false
  }
}
// check if array contains object
const containsObject = (obj, list) => {
  var i
  for (i = 0; i < list.length; i++) {
    if (list[i].header == obj) {
      return true
    }
  }
  return false
}
</script>

<template>
  <div class="wrapper">
    <PersonalInformation :db="db" :auth="auth.auth" :userData="userData" />
    <div class="block">
      <h2>Ценности<MyButton btn-style="info" @click="displayValuesInfo = !displayValuesInfo" /></h2>
      <div class="popUp" v-if="displayValuesInfo">
        <p>
          Ценности это абстрактные состовляющие нашей мотивации в жизни и причина почему или для
          чего мы делаем всё что делаем, выбираем то что выбираем и отказываемся от того чего
          отказываемся.
        </p>
      </div>
      <MyButton btn-style="add" @click="addNewValue = !addNewValue" />
      <div class="innerBlock" v-if="addNewValue">
        <h3>
          <input type="text" placeholder="Загаловок новой ценности" v-model="newValueHeader" />
        </h3>
        <p>
          <input type="text" placeholder="Описания новой ценности" v-model="newValueDescription" />
        </p>
        <MyButton
          btn-style="save"
          @click="saveNewValue('values', newValueHeader, newValueDescription)"
        />
      </div>
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
    <div class="block">
      <h2>
        Припятствия<MyButton
          btn-style="info"
          @click="displayObstaclesInfo = !displayObstaclesInfo"
        />
      </h2>
      <div class="popUp" v-if="displayObstaclesInfo">
        <p>
          Препятствия это главные причины из-за которых мы терпим неудачи как нездоровые привычки,
          черты характера, загоны, и взгляды.
        </p>
      </div>
      <MyButton btn-style="add" @click="addNewObstacle = !addNewObstacle" />
      <div class="innerBlock" v-if="addNewObstacle">
        <h3>
          <input
            type="text"
            placeholder="Загаловок нового припятствия"
            v-model="newObstacleHeader"
          />
        </h3>
        <p>
          <input
            type="text"
            placeholder="Описания нового припятствия"
            v-model="newObstacleDescription"
          />
        </p>
        <MyButton
          btn-style="save"
          @click="saveNewValue('obstacles', newObstacleHeader, newObstacleDescription)"
        />
      </div>
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
    <div class="block">
      <h2>
        Ресурсы<MyButton btn-style="info" @click="displayResourcesInfo = !displayResourcesInfo" />
      </h2>
      <div class="popUp" v-if="displayResourcesInfo">
        <p>
          Ресурсы это рычаги для достижения целей и преодоления препятствий как знания, умения,
          навыки, знакомые, внешний вид и другие.
        </p>
      </div>
      <MyButton btn-style="add" @click="addNewResource = !addNewResource" />
      <div class="innerBlock" v-if="addNewResource">
        <h3>
          <input type="text" placeholder="Заголовок нового ресурса" v-model="newResourceHeader" />
        </h3>
        <p>
          <input
            type="text"
            placeholder="Описания нового ресурса"
            v-model="newResourceDescription"
          />
        </p>
        <MyButton
          btn-style="save"
          @click="saveNewValue('resources', newResourceHeader, newResourceDescription)"
        />
      </div>
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
    <div class="block">
      <h2>Цели<MyButton btn-style="info" @click="displayGoalsInfo = !displayGoalsInfo" /></h2>
      <div class="popUp" v-if="displayGoalsInfo">
        <p>
          Цели это конечные результаты которые нам нужны. Если вы можете ответить на вопрос "Что мне
          это даст?" значит это не цель а промежуточный результат.
        </p>
      </div>
      <MyButton btn-style="add" @click="addNewGoalDetails" />
      <div class="innerBlock" v-if="addNewGoal">
        <h3><input type="text" placeholder="Заголовок цели" v-model="newGoalHeader" /></h3>
        <p><input type="text" placeholder="Описания цели" v-model="newGoalDescription" /></p>
        <h4>Сферы жизни</h4>
        <div class="checkboxDiv">
          <label class="container"
            >Здоровье
            <input value="Здоровье" type="checkbox" v-model="newGoalLifeFields" />
            <span class="checkmark"></span>
          </label>
          <label class="container"
            >Социум
            <input value="Социум" type="checkbox" v-model="newGoalLifeFields" />
            <span class="checkmark"></span>
          </label>
          <label class="container"
            >Финансы
            <input value="Финансы" type="checkbox" v-model="newGoalLifeFields" />
            <span class="checkmark"></span>
          </label>
          <label class="container"
            >Увлечения
            <input value="Увлечения" type="checkbox" v-model="newGoalLifeFields" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="counterDiv">
          <p>
            <MyCounter label="Срочность" :input-value="1" :max-value="10" ref="newGoalUrgency" />
          </p>
          <p>
            <MyCounter label="Важность" :input-value="1" :max-value="10" ref="newGoalImportance" />
          </p>
        </div>
        <h4>Ценности</h4>
        <div class="checkboxDiv">
          <label class="container" v-for="value in userData?.values" :key="value"
            >{{ value.header }}
            <input :value="value.header" type="checkbox" v-model="newGoalValues" />
            <span class="checkmark"></span>
          </label>
        </div>
        <MyButton btn-style="save" @click="saveGoal" />
      </div>
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
    <div class="block">
      <h2>Планы<MyButton btn-style="info" @click="displayPlansInfo = !displayPlansInfo" /></h2>
      <div class="popUp" v-if="displayPlansInfo">
        <p>
          План это описания пути к цели состоящий из действия, повторяймости, препятствий и
          ресурсов.
        </p>
      </div>
      <MyButton btn-style="add" @click="addNewPlanDetails" />
      <div class="innerBlock" v-if="addNewPlan">
        <h4>Ваши цели</h4>
        <div class="checkboxDiv">
          <label class="container" v-for="value in userData?.goals" :key="value.header"
            >{{ value.header }}
            <input :value="value.header" type="checkbox" v-model="newPlanGoals" />
            <span class="checkmark"></span>
          </label>
        </div>
        <p><input type="text" placeholder="Ваше действие" v-model="newPlanHeader" /></p>
        <TimeCalc
          :time="newPlanTimeObject"
          label="Повторяймость"
          :total="userData?.health?.time?.total"
          :auth="auth.auth"
          :user-data="userData"
          field="plans"
          ref="newPlanTime"
        />
        <p>
          Дата начала: <input type="date" placeholder="Дата начала" v-model="newPlanStartDate" />
        </p>
        <div class="counterDiv">
          <p>
            <MyCounter label="Срочность" :input-value="1" :max-value="10" ref="newPlanUrgency" />
          </p>
          <p>
            <MyCounter label="Важность" :input-value="1" :max-value="10" ref="newPlanImportance" />
          </p>
        </div>

        <h4>Ценности</h4>
        <div class="checkboxDiv">
          <label class="container" v-for="value in userData?.values" :key="value"
            >{{ value.header }}
            <input :value="value.header" type="checkbox" v-model="newPlanValues" />
            <span class="checkmark"></span>
          </label>
        </div>
        <h4>Припятствия</h4>
        <div class="checkboxDiv">
          <label class="container" v-for="value in userData?.obstacles" :key="value"
            >{{ value.header }}
            <input :value="value.header" type="checkbox" v-model="newPlanObstacles" />
            <span class="checkmark"></span>
          </label>
        </div>
        <h4>Ресурсы</h4>
        <div class="checkboxDiv">
          <label class="container" v-for="value in userData?.resources" :key="value"
            >{{ value.header }}
            <input :value="value.header" type="checkbox" v-model="newPlanResources" />
            <span class="checkmark"></span>
          </label>
        </div>
        <MyButton btn-style="save" @click="savePlan" />
      </div>
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
</template>

<style scoped>
.wrapper {
  position: relative;
  padding: 1em;
  margin-left: auto;
  margin-right: auto;
}
.popUp {
  position: absolute;
  top: 3em;
  max-width: 25m;
  text-align: start;
}
.block {
  position: relative;
  max-width: 25em;
}
.block h2 {
  margin-left: 3em;
  margin-top: 1em;
  margin-bottom: 1em;
}
.innerBlock {
  position: relative;
  padding: 1em;
  padding-bottom: 3em;
  margin-bottom: 1em;
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
/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #fafaf2ff;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 5px;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #00bbbbff;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
input[type='number'] {
  /*for absolutely positioning spinners*/
  position: relative;
  padding: 0.5em;
  padding-right: 25px;
  width: 5em;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  opacity: 1;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: inner-spin-button !important;
  width: 25px;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}
</style>
