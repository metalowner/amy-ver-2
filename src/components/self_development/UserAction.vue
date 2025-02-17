<template>
  <h3>{{ header }}</h3>
  <p>{{ importance }}</p>
  <p>{{ urgency }}</p>
  <p>{{ startDate }}</p>
  <p>{{ actionType }}</p>
  <p>{{ duration }}</p>
  <p v-for="(plan, index) in plans" :key="plan">{{ index + 1 }}. {{ plan }}</p>
  <MyButton btn-style="standard" btn-text="Edit" @click="editActionDetails" />
  <MyButton btn-style="standard" btn-text="Delete" @click="deleteAction" />
  <div v-if="editAction">
    <h3><input type="text" placeholder="New action header" v-model="newActionHeader" /></h3>
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
    <p v-for="(plan, index) in plans" :key="plan">
      {{ index + 1 }}. {{ plan }}
      <MyButton btn-style="standard" btn-text="Delete" @click="deleteByIndex(plans, index)" />
    </p>
    <p v-for="(plan, index) in editablePlans" :key="plan.header">
      {{ index + 1 }}. {{ plan.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="addValueToAction('plans', editablePlans, plans, plan.header, index)"
      />
    </p>
    <MyButton btn-style="standard" btn-text="Save" @click="saveAction" />
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
  plans: {
    type: Array,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  actionType: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  actionIndex: {
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
  startDate,
  plans,
  actionType,
  duration,
  actionIndex,
} = toRefs(props)
// declare variables
const editAction = ref(false)
const newActionHeader = ref('')
const newActionUrgency = ref(Number)
const newActionType = ref('')
const newActionDuration = ref('')
const editablePlans = ref([])
// delete function
const deleteAction = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const newPlansArray = userData.value.plans.splice(actionIndex.value, 1)
  try {
    await updateDoc(userRef, {
      plans: newPlansArray,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// edit function
function editActionDetails() {
  editAction.value = !editAction.value
  newActionHeader.value = header.value
  newActionDuration.value = duration.value
  newActionType.value = actionType.value
  newActionUrgency.value = urgency.value
}
// save function
const saveAction = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const resourceRef = userData.value.actions[actionIndex.value]
  resourceRef.header = newActionHeader.value
  resourceRef.urgency = parseInt(newActionUrgency.value)
  resourceRef.plans = plans.value

  try {
    await updateDoc(userRef, {
      plans: userData.value.plans,
      actions: userData.value.actions,
    })
    editAction.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
//add new value to goal values
const addValueToAction = (array, editableArray, targetArray, text, index) => {
  targetArray.push(text)
  const valueToUpdate = userData.value[array].find(({ header }) => header === text)
  valueToUpdate.importance += 1
  deleteByIndex(editableArray, index)
}
// delete from array by index
function deleteByIndex(array, index) {
  array.splice(index, 1)
}
</script>
