<template>
  <h3>{{ header }}</h3>
  <p>{{ description }}</p>
  <p>Важность: {{ importance }}</p>
  <p>Срочность: {{ urgency }}</p>
  <h4>Измерения</h4>
  <p v-for="(measure, index) in measures" :key="measure">{{ index + 1 }}. {{ measure }}</p>
  <h4>Цены</h4>
  <p v-for="(price, index) in prices" :key="price">{{ index + 1 }}. {{ price }}</p>
  <h4>Ценности</h4>
  <p v-for="(value, index) in values" :key="value">{{ index + 1 }}. {{ value }}</p>
  <MyButton btn-style="standard" btn-text="Редактировать" @click="editGoalDetails" />
  <MyButton btn-style="standard" btn-text="Удалить" @click="deleteGoal" />
  <div v-if="editGoal">
    <h3><input type="text" placeholder="Новый заголовок" v-model="newGoalHeader" /></h3>
    <p><input type="text" placeholder="Новое описания" v-model="newGoalDescription" /></p>
    <p>
      Срочность:
      <select v-model="newGoalUrgency">
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
    </p>
    <h4>Измерения</h4>
    <p v-for="(measure, index) in measures" :key="measure">
      {{ index + 1 }}. {{ measure }}
      <MyButton btn-style="standard" btn-text="Удалить" @click="deleteByIndex(measures, index)" />
    </p>
    <p><input type="text" placeholder="Новое измерения цели" v-model="newGoalMeasure" /></p>
    <MyButton
      btn-style="standard"
      btn-text="Добавить"
      @click="addTextToArray(measures, newGoalMeasure)"
    />
    <h4>Цены</h4>
    <p v-for="(price, index) in prices" :key="price">
      {{ index + 1 }}. {{ price }}
      <MyButton btn-style="standard" btn-text="Удалить" @click="deleteByIndex(prices, index)" />
    </p>
    <p><input type="text" placeholder="Новая цена" v-model="newPrice" /></p>
    <MyButton btn-style="standard" btn-text="Добавить" @click="addTextToArray(prices, newPrice)" />
    <h4>Ценности</h4>
    <p v-for="(value, index) in values" :key="value">
      {{ index + 1 }}. {{ value }}
      <MyButton btn-style="standard" btn-text="Удалить" @click="deleteByIndex(values, index)" />
    </p>
    <p v-for="(value, index) in editableValues" :key="value.header">
      {{ index + 1 }}. {{ value.header }}
      <MyButton
        btn-style="standard"
        btn-text="Добавить"
        @click="addValueToGoal(values, value.header, index)"
      />
    </p>
    <MyButton btn-style="standard" btn-text="Сохранить" @click="saveGoal" />
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
  newGoalUrgency.value = urgency.value
}
//add new value to goal values
const addValueToGoal = (array, text, index) => {
  array.push(text)
  const valueToUpdate = userData.value.values.find(({ header }) => header === text)
  valueToUpdate.importance += 1
  deleteByIndex(editableValues.value, index)
}
</script>
