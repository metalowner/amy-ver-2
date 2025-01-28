<template>
  <h3>{{ goalHeader }}</h3>
  <p>{{ goalDescription }}</p>
  <p>{{ goalImportance }}</p>
  <p>{{ goalUrgency }}</p>
  <p v-for="measure in goalMeasures" :key="measure">{{ measure }}</p>
  <p v-for="price in goalPrice" :key="price">{{ price }}</p>
  <p v-for="value in goalValues" :key="value">{{ value }}</p>
  <MyButton btn-style="standard" btn-text="Edit" @click="editGoal = !editGoal" />
  <MyButton btn-style="standard" btn-text="Delete" @click="deleteGoal" />
  <div v-if="editGoal">
    <h3><input type="text" placeholder="New goal header" v-model="newGoalHeader" /></h3>
    <p><input type="text" placeholder="New goal description" v-model="newGoalDescription" /></p>
    <MyButton btn-style="standard" btn-text="Save" @click="saveGoal" />
  </div>
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore'
import { ref, toRefs } from 'vue'
import MyButton from '../MyButton.vue'

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
  goalHeader: {
    type: String,
    required: true,
  },
  goalDescription: {
    type: String,
    required: true,
  },
  goalImportance: {
    type: Number,
    required: true,
  },
  goalUrgency: {
    type: Number,
    required: true,
  },
  goalMeasures: {
    type: Array,
    required: true,
  },
  goalPrice: {
    type: Array,
    required: true,
  },
  goalValues: {
    type: Array,
    required: true,
  },
  goalIndex: {
    type: Number,
    required: true,
  },
})
// expose props
const {
  db,
  auth,
  userData,
  goalHeader,
  goalDescription,
  goalImportance,
  goalUrgency,
  goalMeasures,
  goalPrice,
  goalValues,
  goalIndex,
} = toRefs(props)
// declate variables
const editGoal = ref(false)
const newGoalHeader = ref('')
const newGoalDescription = ref('')
// define methods
// delete function
const deleteGoal = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const newGoalsArray = userData.value.goals.splice(goalIndex.value, 1)
  try {
    await updateDoc(userRef, {
      goals: newGoalsArray,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// save function
const saveGoal = async () => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  const resourceRef = userData.value.goals[goalIndex.value]
  if (newGoalHeader.value.length != '' && newGoalDescription.value.length != '') {
    resourceRef.goalHeader = newGoalHeader.value
    resourceRef.goalDescription = newGoalDescription.value
  } else if (newGoalHeader.value.length != '') {
    resourceRef.goalHeader = newGoalHeader.value
  } else {
    resourceRef.goalDescription = newGoalDescription.value
  }
  try {
    await updateDoc(userRef, {
      goals: userData.value.goals,
    })
    editGoal.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>
