<template>
  <h3>{{ header }}</h3>
  <p>{{ description }}</p>
  <p>{{ importance }}</p>
  <p>{{ urgency }}</p>
  <p v-for="(measure, index) in measures" :key="measure">{{ index + 1 }}. {{ measure }}</p>
  <p v-for="(price, index) in prices" :key="price">{{ index + 1 }}. {{ price }}</p>
  <p v-for="(value, index) in values" :key="value">{{ index + 1 }}. {{ value }}</p>
  <MyButton btn-style="standard" btn-text="Edit" @click="editGoalDetails" />
  <MyButton btn-style="standard" btn-text="Delete" @click="deleteGoal" />
  <div v-if="editGoal">
    <h3><input type="text" placeholder="New goal header" v-model="newGoalHeader" /></h3>
    <p><input type="text" placeholder="New goal description" v-model="newGoalDescription" /></p>
    <select v-model="newGoalImportance">
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
    <p v-for="(measure, index) in measures" :key="measure">
      {{ index + 1 }}. {{ measure }}
      <MyButton btn-style="standard" btn-text="Delete" @click="deleteByIndex(measures, index)" />
    </p>
    <p><input type="text" placeholder="New goal measure" v-model="newGoalMeasure" /></p>
    <MyButton
      btn-style="standard"
      btn-text="Add"
      @click="addTextToArray(measures, newGoalMeasure)"
    />
    <p v-for="(price, index) in prices" :key="price">
      {{ index + 1 }}. {{ price }}
      <MyButton btn-style="standard" btn-text="Delete" @click="deleteByIndex(prices, index)" />
    </p>
    <p><input type="text" placeholder="New price" v-model="newPrice" /></p>
    <MyButton btn-style="standard" btn-text="Add" @click="addTextToArray(prices, newPrice)" />
    <p v-for="(value, index) in values" :key="value">
      {{ index + 1 }}. {{ value }}
      <MyButton btn-style="standard" btn-text="Delete" @click="deleteByIndex(values, index)" />
    </p>
    <p v-for="(value, index) in editableValues" :key="value.header">
      {{ index + 1 }}. {{ value.header }}
      <MyButton
        btn-style="standard"
        btn-text="Add"
        @click="addValueToGoal(values, value.header, index)"
      />
    </p>
    <p><input type="text" placeholder="New value header" v-model="newValue" /></p>
    <p><input type="text" placeholder="New value description" v-model="newValueDescription" /></p>
    <MyButton
      btn-style="standard"
      btn-text="Add"
      @click="addNewValue(values, newValue, newValueDescription)"
    />
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
  header: {
    type: String,
    required: true,
  },
  description: {
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
  measures: {
    type: Array,
    required: true,
  },
  prices: {
    type: Array,
    required: true,
  },
  values: {
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
  header,
  description,
  importance,
  urgency,
  measures,
  prices,
  values,
  goalIndex,
} = toRefs(props)
// declate variables
const editGoal = ref(false)
const newGoalHeader = ref('')
const newGoalDescription = ref('')
const newGoalMeasure = ref('')
const newPrice = ref('')
const newValue = ref('')
const newValueDescription = ref('')
const newGoalImportance = ref('')
const newGoalUrgency = ref('')
const editableValues = ref([])
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
  resourceRef.header = newGoalHeader.value
  resourceRef.description = newGoalDescription.value
  resourceRef.importance = parseInt(newGoalImportance.value)
  resourceRef.urgency = parseInt(newGoalUrgency.value)
  resourceRef.measures = measures.value
  resourceRef.prices = prices.value
  resourceRef.values = values.value
  try {
    await updateDoc(userRef, {
      goals: userData.value.goals,
      values: userData.value.values,
    })
    editGoal.value = false
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
// delete from array by index
function deleteByIndex(array, index) {
  array.splice(index, 1)
}
// add to array
function addTextToArray(array, text) {
  array.push(text)
}
// edit goal
const editGoalDetails = () => {
  editableValues.value = []
  editGoal.value = !editGoal.value
  for (let index = 0; index < userData.value.values.length; index++) {
    const element = userData.value.values[index]
    var valueFound = values.value.find(function (valueHeader) {
      return valueHeader === element.header
    })
    if (!valueFound) {
      editableValues.value.push(element)
    }
  }
  newGoalHeader.value = header.value
  newGoalDescription.value = description.value
  newGoalImportance.value = importance.value
  newGoalUrgency.value = urgency.value
}
//add new value to goal values
const addValueToGoal = (array, text, index) => {
  array.push(text)
  const valueToUpdate = userData.value.values.find(({ header }) => header === text)
  valueToUpdate.importance += 1
  deleteByIndex(editableValues.value, index)
}
// add new value
const addNewValue = async (array, valueHeader, valueDescription) => {
  const userUid = auth.value.currentUser.uid
  const userRef = doc(db.value, 'users', userUid)
  array.push(valueHeader)
  const newValueObject = {
    header: valueHeader,
    description: valueDescription,
    importance: 2,
  }
  userData.value.values.push(newValueObject)
  try {
    await updateDoc(userRef, {
      values: userData.value.values,
    })
  } catch (err) {
    console.log('Error adding documents', err)
  }
}
</script>
