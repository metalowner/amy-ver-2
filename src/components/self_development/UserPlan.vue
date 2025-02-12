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
    <select v-model="newPlanImportance">
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
    <p v-for="(goal, index) in editableGoals" :key="goal">
      {{ index + 1 }}. {{ goal.goalHeader }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="addGoalToPlan(goals, goal.header, index)"
      />
    </p>
    <p v-for="(value, index) in values" :key="value">{{ index + 1 }}. {{ value }}</p>
    <p v-for="(obstacle, index) in obstacles" :key="obstacle">{{ index + 1 }}. {{ obstacle }}</p>
    <p v-for="(resource, index) in resources" :key="resource">{{ index + 1 }}. {{ resource }}</p>
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
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
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
const newPlanImportance = ref(Number)
const newPlanUrgency = ref(Number)
const editableGoals = ref([])
// methods
// edit goal
const editPlanDetails = () => {
  editableGoals.value = []
  editPlan.value = !editPlan.value
  updateEditableArray(editableGoals.value, userData.value.goals)
}
// update editable array
function updateEditableArray(editableArray, dataArray) {
  for (let index = 0; index < dataArray.value.length; index++) {
    const element = dataArray[index]
    var elementFound = dataArray.find(function (header) {
      return header === element.header
    })
    if (!elementFound) {
      editableArray.push(element)
    }
  }
}
// delete function
const deletePlan = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const newGoalsArray = userData.value.plans.splice(planIndex.value, 1)
  try {
    await updateDoc(userRef, {
      plans: newGoalsArray,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// delete from array by index
function deleteByIndex(array, index) {
  array.splice(index, 1)
}
</script>
