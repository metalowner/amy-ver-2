<template>
  <h3>{{ header }}</h3>
  <p>{{ startDate }}</p>
  <p>{{ deadline }}</p>
  <p>{{ importance }}</p>
  <p>{{ urgency }}</p>
  <p v-for="(goal, index) in goals" :key="goal">{{ index + 1 }}. {{ goal }}</p>
  <p v-for="(value, index) in values" :key="value">{{ index + 1 }}. {{ value }}</p>
  <p v-for="(obstacle, index) in obstacles" :key="obstacle">{{ index + 1 }}. {{ obstacle }}</p>
  <p v-for="(resource, index) in resources" :key="resource">{{ index + 1 }}. {{ resource }}</p>
  <MyButton btn-style="standard" btn-text="Delete" @click="deletePlan" />
  <MyButton btn-style="standard" btn-text="Edit" @click="editPlanDetails" />
  <div v-if="editPlan">
    <h3><input type="text" placeholder="New plan header" v-model="newPlanHeader" /></h3>
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
    <p v-for="(goal, index) in goals" :key="goal">
      {{ index + 1 }}. {{ goal }}
      <MyButton btn-style="standard" btn-text="Delete" @click="deleteByIndex(goals, index)" />
    </p>
    <p v-for="(goal, index) in editableGoals" :key="goal.header">
      {{ index + 1 }}. {{ goal.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="addValueToPlan('goals', goals, editableGoals, goal.header, index)"
      />
    </p>
    <p v-for="(value, index) in values" :key="value">
      {{ index + 1 }}. {{ value }}
      <MyButton btn-style="standard" btn-text="Delete" @click="deleteByIndex(values, index)" />
    </p>
    <p v-for="(value, index) in editableValues" :key="value.header">
      {{ index + 1 }}. {{ value.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="addValueToPlan('values', values, editableValues, value.header, index)"
      />
    </p>
    <p v-for="(obstacle, index) in obstacles" :key="obstacle">
      {{ index + 1 }}. {{ obstacle }}
      <MyButton btn-style="standard" btn-text="Delete" @click="deleteByIndex(obstacles, index)" />
    </p>
    <p v-for="(obstacle, index) in editableObstacles" :key="obstacle.header">
      {{ index + 1 }}. {{ obstacle.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="addValueToPlan('obstacles', obstacles, editableObstacles, obstacle.header, index)"
      />
    </p>
    <p v-for="(resource, index) in resources" :key="resource">
      {{ index + 1 }}. {{ resource }}
      <MyButton btn-style="standard" btn-text="Delete" @click="deleteByIndex(resources, index)" />
    </p>
    <p v-for="(resource, index) in editableResources" :key="resource.header">
      {{ index + 1 }}. {{ resource.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="addValueToPlan('resources', resources, editableResources, resource.header, index)"
      />
    </p>
    <MyButton btn-style="standard" btn-text="Save" @click="savePlan" />
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'
import { doc, updateDoc } from 'firebase/firestore'

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
  deadline: {
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
  deadline,
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
const editableGoals = ref([])
const editableValues = ref([])
const editableObstacles = ref([])
const editableResources = ref([])
// methods
// edit goal
const editPlanDetails = () => {
  newPlanHeader.value = header.value
  newPlanUrgency.value = urgency.value
  editPlan.value = !editPlan.value
  parseTime(startDate.value, deadline.value)
  updateEditableArray(editableGoals.value, goals.value, userData.value.goals)
  updateEditableArray(editableValues.value, values.value, userData.value.values)
  updateEditableArray(editableObstacles.value, obstacles.value, userData.value.obstacles)
  updateEditableArray(editableResources.value, resources.value, userData.value.resources)
}
//add new value to goal values
const addValueToPlan = (array, targetArray, editableArray, text, index) => {
  targetArray.push(text)
  const valueToUpdate = userData.value[array].find(({ header }) => header === text)
  valueToUpdate.importance += 1
  deleteByIndex(editableArray, index)
}
// update editable array
const updateEditableArray = (editableArray, targetArray, dataArray) => {
  editableArray.splice(0)
  for (let index = 0; index < dataArray.length; index++) {
    const element = dataArray[index]
    var elementFound = targetArray.find(function (value) {
      return value === element.header
    })
    if (!elementFound) {
      editableArray.push(element)
    }
  }
}
// save function
const savePlan = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const resourceRef = userData.value.plans[planIndex.value]
  resourceRef.header = newPlanHeader.value
  resourceRef.urgency = parseInt(newPlanUrgency.value)
  resourceRef.values = values.value
  resourceRef.goals = goals.value
  resourceRef.obstacles = obstacles.value
  resourceRef.resources = resources.value
  try {
    await updateDoc(userRef, {
      plans: userData.value.plans,
      goals: userData.value.goals,
      values: userData.value.values,
      obstacles: userData.value.obstacles,
      resources: userData.value.resources,
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
  const newPlansArray = userData.value.plans.splice(planIndex.value, 1)
  try {
    await updateDoc(userRef, {
      plans: newPlansArray,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// delete from array by index
function deleteByIndex(array, index) {
  array.splice(index, 1)
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
