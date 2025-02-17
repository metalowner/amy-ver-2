<script setup>
import { db } from '@/main'
import PersonalInformation from '@/components/PersonalInformation.vue'
import { ref, toRefs } from 'vue'
import LifeStory from '@/components/self_development/LifeStory.vue'
import PersonalVision from '@/components/self_development/PersonalVision.vue'
import UserValue from '@/components/self_development/UserValue.vue'
import MyButton from '@/components/MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'
import UserGoal from '@/components/self_development/UserGoal.vue'
import UserPlan from '@/components/self_development/UserPlan.vue'
import UserAction from '@/components/self_development/UserAction.vue'

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
const editableGoalValues = ref([])
const newGoalUrgency = ref('')
const newGoalMeasures = ref([])
const newGoalMeasure = ref('')
const newGoalPrices = ref([])
const newGoalPrice = ref('')
// declare plan variables
const addNewPlan = ref(false)
const newPlanHeader = ref('')
const newPlanUrgency = ref('')
const newPlanDeadline = ref(Date)
const newPlanStartDate = ref(Date)
const newPlanGoals = ref([])
const newPlanEditableGoals = ref([])
const newPlanValues = ref([])
const newPlanEditableValues = ref([])
const newPlanObstacles = ref([])
const newPlanEditableObstacles = ref([])
const newPlanResources = ref([])
const newPlanEditableResources = ref([])
// declare action variables
const addNewAction = ref(false)
const newActionDuration = ref('')
const newActionHeader = ref('')
const newActionStartDate = ref(Date)
const newActionType = ref('')
const newActionPlans = ref([])
const newActionEditablePlans = ref([])
const newActionUrgency = ref('')
// declare simple value save methods
const saveNewValue = async (array, newHeader, newDescription) => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const newValueObject = {
    header: newHeader,
    description: newDescription,
    importance: 1,
  }
  userData.value[array].push(newValueObject)
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
  updateEditableArray(editableGoalValues.value, newGoalValues.value, userData.value.values)
  addNewGoal.value = !addNewGoal.value
}
// add new plan
const addNewPlanDetails = () => {
  addNewPlan.value = !addNewPlan.value
  updateEditableArray(newPlanEditableGoals.value, newPlanGoals.value, userData.value.goals)
  updateEditableArray(newPlanEditableValues.value, newPlanValues.value, userData.value.values)
  updateEditableArray(
    newPlanEditableObstacles.value,
    newPlanObstacles.value,
    userData.value.obstacles,
  )
  updateEditableArray(
    newPlanEditableResources.value,
    newPlanResources.value,
    userData.value.resources,
  )
}
// add new action
const addNewActionDetails = () => {
  addNewAction.value = !addNewAction.value
  updateEditableArray(newActionEditablePlans.value, newActionPlans.value, userData.value.plans)
}
// save new action
const saveAction = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const newActionObject = {
    actionType: newActionType.value,
    duration: newActionDuration.value,
    header: newActionHeader.value,
    importance: 1,
    plans: newActionPlans.value,
    urgency: parseInt(newActionUrgency.value),
    startDate: newActionStartDate,
  }
  userData.value.actions.push(newActionObject)
  try {
    await updateDoc(userRef, {
      plans: userData.value.plans,
      actions: userData.value.actions,
    })
    addNewAction.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// save new plan
const savePlan = async () => {
  const userUid = auth.value.auth.currentUser.uid
  const userRef = doc(db, 'users', userUid)
  const newPlanObject = {
    header: newPlanHeader.value,
    urgency: parseInt(newPlanUrgency.value),
    importance: 1,
    startDate: newPlanStartDate,
    deadline: newPlanDeadline,
    goals: newPlanGoals.value,
    values: newPlanValues.value,
    obstacles: newPlanObstacles.value,
    resources: newPlanResources.value,
  }
  userData.value.plans.push(newPlanObject)
  try {
    await updateDoc(userRef, {
      plans: userData.value.plans,
      goals: userData.value.goals,
      values: userData.value.values,
      obstacles: userData.value.obstacles,
      resources: userData.value.resources,
    })
    addNewPlan.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// save new goal
const saveGoal = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const newGoalObject = {
    header: newGoalHeader.value,
    description: newGoalDescription.value,
    urgency: parseInt(newGoalUrgency.value),
    measures: newGoalMeasures.value,
    prices: newGoalPrices.value,
    values: newGoalValues.value,
    importance: 1,
  }
  userData.value.goals.push(newGoalObject)
  try {
    await updateDoc(userRef, {
      goals: userData.value.goals,
      values: userData.value.values,
    })
    addNewGoal.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// add and update value
const addAndUpdateValue = (array, editableArray, targetArray, text, index) => {
  targetArray.push(text)
  const valueToUpdate = userData.value[array].find(({ header }) => header === text)
  valueToUpdate.importance += 1
  deleteByIndex(editableArray, index)
}
// update editable array
function updateEditableArray(editableArray, targetArray, dataArray) {
  editableArray.splice(0)
  for (let index = 0; index < dataArray.length; index++) {
    const element = dataArray[index]
    var elementFound = targetArray.find(function (header) {
      return header === element.header
    })
    if (!elementFound) {
      editableArray.push(element)
    }
  }
}
// add to array
function addTextToArray(array, text) {
  array.push(text)
}
// delete from array by index
function deleteByIndex(array, index) {
  array.splice(index, 1)
}
</script>

<template>
  <PersonalInformation :db="db" :auth="auth.auth" :userData="userData" />
  <LifeStory :db="db" :auth="auth.auth" :userData="userData" />
  <PersonalVision :db="db" :auth="auth.auth" :userData="userData" />
  <h2>Values</h2>
  <MyButton btn-style="standard" btn-text="Add value" @click="addNewValue = !addNewValue" />
  <div v-if="addNewValue">
    <h3><input type="text" placeholder="New value header" v-model="newValueHeader" /></h3>
    <p><input type="text" placeholder="New value description" v-model="newValueDescription" /></p>
    <MyButton
      btn-style="standard"
      btn-text="Save"
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
  <h2>Obstacles</h2>
  <MyButton
    btn-style="standard"
    btn-text="Add obstacle"
    @click="addNewObstacle = !addNewObstacle"
  />
  <div v-if="addNewObstacle">
    <h3><input type="text" placeholder="New obstacle header" v-model="newObstacleHeader" /></h3>
    <p>
      <input type="text" placeholder="New obstacle description" v-model="newObstacleDescription" />
    </p>
    <MyButton
      btn-style="standard"
      btn-text="Save"
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
  <h2>Resources</h2>
  <MyButton
    btn-style="standard"
    btn-text="Add resource"
    @click="addNewResource = !addNewResource"
  />
  <div v-if="addNewResource">
    <h3><input type="text" placeholder="New resource header" v-model="newResourceHeader" /></h3>
    <p>
      <input type="text" placeholder="New resource description" v-model="newResourceDescription" />
    </p>
    <MyButton
      btn-style="standard"
      btn-text="Save"
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
  <h2>Goals</h2>
  <MyButton btn-style="standard" btn-text="Add new goal" @click="addNewGoalDetails" />
  <div v-if="addNewGoal">
    <h3><input type="text" placeholder="Goal Header" v-model="newGoalHeader" /></h3>
    <p><input type="text" placeholder="Goal description" v-model="newGoalDescription" /></p>
    <select v-model="newGoalUrgency">
      <option disabled value="">Please choose one</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
    </select>
    <p v-for="(measure, index) in newGoalMeasures" :key="measure">
      {{ index + 1 }}. {{ measure }}
      <MyButton
        btn-style="standard"
        btn-text="Delete"
        @click="deleteByIndex(newGoalMeasures, index)"
      />
    </p>
    <p><input type="text" placeholder="New goal measure" v-model="newGoalMeasure" /></p>
    <MyButton
      btn-style="standard"
      btn-text="Add"
      @click="addTextToArray(newGoalMeasures, newGoalMeasure)"
    />
    <p v-for="(price, index) in newGoalPrices" :key="price">
      {{ index + 1 }}. {{ price }}
      <MyButton
        btn-style="standard"
        btn-text="Delete"
        @click="deleteByIndex(newGoalPrices, index)"
      />
    </p>
    <p><input type="text" placeholder="New price" v-model="newGoalPrice" /></p>
    <MyButton
      btn-style="standard"
      btn-text="Add"
      @click="addTextToArray(newGoalPrices, newGoalPrice)"
    />
    <p v-for="(value, index) in newGoalValues" :key="value">
      {{ index + 1 }}. {{ value }}
      <MyButton
        btn-style="standard"
        btn-text="Delete"
        @click="deleteByIndex(newGoalValues, index)"
      />
    </p>
    <p v-for="(value, index) in editableGoalValues" :key="value.header">
      {{ index + 1 }}. {{ value.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="addAndUpdateValue('values', editableGoalValues, newGoalValues, value.header, index)"
      />
    </p>
    <MyButton btn-style="standard" btn-text="Save" @click="saveGoal" />
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
  />
  <h2>Plans</h2>
  <MyButton btn-style="standard" btn-text="Add new plan" @click="addNewPlanDetails" />
  <div v-if="addNewPlan">
    <h3><input type="text" placeholder="New plan header" v-model="newPlanHeader" /></h3>
    <p><input type="date" placeholder="Start date" v-model="newPlanStartDate" /></p>
    <p><input type="date" placeholder="End date" v-model="newPlanDeadline" /></p>
    <select v-model="newPlanUrgency">
      <option disabled value="">Please choose one</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
    </select>
    <p v-for="(goal, index) in newPlanGoals" :key="goal">
      {{ index + 1 }}. {{ goal }}
      <MyButton
        btn-style="standard"
        btn-text="Delete"
        @click="deleteByIndex(newPlanGoals, index)"
      />
    </p>
    <p v-for="(goal, index) in newPlanEditableGoals" :key="goal.header">
      {{ index + 1 }}. {{ goal.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="addAndUpdateValue('goals', newPlanEditableGoals, newPlanGoals, goal.header, index)"
      />
    </p>
    <p v-for="(value, index) in newPlanValues" :key="value">
      {{ index + 1 }}. {{ value }}
      <MyButton
        btn-style="standard"
        btn-text="Delete"
        @click="deleteByIndex(newPlanValues, index)"
      />
    </p>
    <p v-for="(value, index) in newPlanEditableValues" :key="value.header">
      {{ index + 1 }}. {{ value.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="
          addAndUpdateValue('values', newPlanEditableValues, newPlanValues, value.header, index)
        "
      />
    </p>
    <p v-for="(obstacle, index) in newPlanObstacles" :key="obstacle">
      {{ index + 1 }}. {{ obstacle }}
      <MyButton
        btn-style="standard"
        btn-text="Delete"
        @click="deleteByIndex(newPlanObstacles, index)"
      />
    </p>
    <p v-for="(obstacle, index) in newPlanEditableObstacles" :key="obstacle.header">
      {{ index + 1 }}. {{ obstacle.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="
          addAndUpdateValue(
            'obstacles',
            newPlanEditableObstacles,
            newPlanObstacles,
            obstacle.header,
            index,
          )
        "
      />
    </p>
    <p v-for="(resource, index) in newPlanResources" :key="resource">
      {{ index + 1 }}. {{ resource }}
      <MyButton
        btn-style="standard"
        btn-text="Delete"
        @click="deleteByIndex(newPlanResources, index)"
      />
    </p>
    <p v-for="(resource, index) in newPlanEditableResources" :key="resource.header">
      {{ index + 1 }}. {{ resource.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="
          addAndUpdateValue(
            'resources',
            newPlanEditableResources,
            newPlanResources,
            resource.header,
            index,
          )
        "
      />
    </p>
    <MyButton btn-style="standard" btn-text="Save" @click="savePlan" />
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
    :deadline="plan.deadline"
    :goals="plan.goals"
    :obstacles="plan.obstacles"
    :resources="plan.resources"
  />
  <h2>Actions</h2>
  <MyButton btn-style="standard" btn-text="Add new action" @click="addNewActionDetails" />
  <div v-if="addNewAction">
    <h3><input type="text" placeholder="New action header" v-model="newActionHeader" /></h3>
    <p><input type="date" placeholder="Start date" v-model="newActionStartDate" /></p>
    <select v-model="newActionUrgency">
      <option disabled value="">Please choose one</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
    </select>
    <select v-model="newActionType">
      <option disabled value="">Please choose one</option>
      <option>Learn</option>
      <option>Plan</option>
      <option>Execute</option>
    </select>
    <select v-model="newActionDuration">
      <option disabled value="">Please choose one</option>
      <option>Daily</option>
      <option>Weekly</option>
      <option>Monthly</option>
      <option>One time</option>
    </select>
    <p v-for="(plan, index) in newActionPlans" :key="plan">
      {{ index + 1 }}. {{ plan }}
      <MyButton
        btn-style="standard"
        btn-text="Delete"
        @click="deleteByIndex(newActionPlans, index)"
      />
    </p>
    <p v-for="(plan, index) in newActionEditablePlans" :key="plan.header">
      {{ index + 1 }}. {{ plan.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="
          addAndUpdateValue('plans', newActionEditablePlans, newActionPlans, plan.header, index)
        "
      />
    </p>
    <MyButton btn-style="standard" btn-text="Save" @click="saveAction" />
  </div>
  <UserAction
    v-for="(action, index) in userData?.actions"
    :key="action.header"
    :db="db"
    :auth="auth.auth"
    :user-data="userData"
    :header="action.header"
    :importance="action.importance"
    :action-index="index"
    :action-type="action.actionType"
    :duration="action.duration"
    :plans="action.plans"
    :start-date="action.startDate"
    :urgency="action.urgency"
  />
</template>
