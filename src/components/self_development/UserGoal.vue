<template>
  <div class="goalWrapper">
    <h3>{{ header }}</h3>
    <p class="goalDescription">{{ description }}</p>
    <h4 class="infoHeader">
      Сферы жизни <MyButton btn-style="arrowDown" @click="displayLifeFields = !displayLifeFields" />
    </h4>
    <div v-if="displayLifeFields" class="infoBlock">
      <p v-for="(lifeField, index) in lifeFields" :key="lifeField">
        {{ index + 1 }}. {{ lifeField }}
      </p>
    </div>
    <h4 class="infoHeader">
      Ценности <MyButton btn-style="arrowDown" @click="displayValues = !displayValues" />
    </h4>
    <div v-if="displayValues" class="infoBlock">
      <p v-for="(value, index) in values" :key="value">{{ index + 1 }}. {{ value }}</p>
    </div>
    <h4 class="infoHeader">
      Приоритетность
      <MyButton btn-style="arrowDown" @click="displayPriorities = !displayPriorities" />
    </h4>
    <div v-if="displayPriorities" class="infoBlock">
      <p>Важность: {{ importance }}</p>
      <p>Срочность: {{ urgency }}</p>
    </div>

    <MyButton btn-style="edit" @click="editGoalDetails" />
    <MyButton btn-style="delete" @click="deleteGoal" />
    <div class="editData" v-if="editGoal">
      <p><input type="text" placeholder="Новый заголовок" v-model="newGoalHeader" /></p>
      <p><input type="text" placeholder="Новое описания" v-model="newGoalDescription" /></p>
      <p>
        Срочность:
        <input type="number" min="1" max="10" v-model="newGoalUrgency" />
      </p>
      <p>
        Важность
        <input type="number" min="1" max="10" v-model="newGoalImportance" />
      </p>
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
      <MyButton btn-style="save" @click="saveGoal" />
    </div>
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
  values: {
    type: Array,
    required: true,
  },
  goalIndex: {
    type: Number,
    required: true,
  },
  lifeFields: {
    type: Array,
    required: true,
  },
})
// expose props
const { db, auth, userData, header, description, importance, urgency, values, goalIndex } =
  toRefs(props)
// declate variables
const editGoal = ref(false)
const newGoalHeader = ref('')
const newGoalDescription = ref('')
const newGoalUrgency = ref(Number)
const newGoalImportance = ref(Number)
const editableValues = ref([])
const displayValues = ref(false)
const displayLifeFields = ref(false)
const displayPriorities = ref(false)
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
  resourceRef.importance = newGoalImportance.value
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
  newGoalImportance.value = importance.value
}
//add new value to goal values
const addValueToGoal = (array, text, index) => {
  array.push(text)
  const valueToUpdate = userData.value.values.find(({ header }) => header === text)
  valueToUpdate.importance += 1
  deleteByIndex(editableValues.value, index)
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
  padding-bottom: 3px;
  margin-bottom: 3px;
}
.goalWrapper {
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
.goalDescription {
  margin-bottom: 1em;
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
